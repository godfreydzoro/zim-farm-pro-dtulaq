
import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Platform, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { marketPrices } from '@/data/zimbabweData';

export default function MarketPricesScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState<'crop' | 'price' | 'change'>('crop');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const sortedPrices = [...marketPrices].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'crop':
        aValue = a.crop;
        bValue = b.crop;
        break;
      case 'price':
        aValue = a.price;
        bValue = b.price;
        break;
      case 'change':
        aValue = parseFloat(a.change.replace('%', ''));
        bValue = parseFloat(b.change.replace('%', ''));
        break;
      default:
        aValue = a.crop;
        bValue = b.crop;
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return 'arrow.up.right';
      case 'down': return 'arrow.down.right';
      default: return 'minus';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return colors.success;
      case 'down': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const handleSort = (newSortBy: 'crop' | 'price' | 'change') => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  const renderHeaderRight = () => (
    <TouchableOpacity
      onPress={() => router.back()}
      style={styles.headerButton}
    >
      <IconSymbol name="xmark" color={colors.text} size={20} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[commonStyles.safeArea, { backgroundColor: colors.background }]}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Market Prices",
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.text,
            headerRight: renderHeaderRight,
          }}
        />
      )}

      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[commonStyles.title, styles.title]}>Market Prices</Text>
          <Text style={[commonStyles.textSecondary, styles.subtitle]}>
            Latest commodity prices from Zimbabwe markets
          </Text>
        </View>

        {/* Market Summary */}
        <View style={[commonStyles.card, styles.summaryCard]}>
          <View style={styles.summaryHeader}>
            <IconSymbol name="chart.bar.fill" size={24} color={colors.primary} />
            <Text style={[commonStyles.subtitle, styles.summaryTitle]}>Market Summary</Text>
          </View>
          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {marketPrices.filter(p => p.trend === 'up').length}
              </Text>
              <Text style={styles.statLabel}>Rising</Text>
              <IconSymbol name="arrow.up" size={16} color={colors.success} />
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {marketPrices.filter(p => p.trend === 'down').length}
              </Text>
              <Text style={styles.statLabel}>Falling</Text>
              <IconSymbol name="arrow.down" size={16} color={colors.error} />
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{marketPrices.length}</Text>
              <Text style={styles.statLabel}>Total</Text>
              <IconSymbol name="chart.line.uptrend.xyaxis" size={16} color={colors.info} />
            </View>
          </View>
        </View>

        {/* Sort Controls */}
        <View style={styles.sortContainer}>
          <Text style={[commonStyles.textSecondary, styles.sortLabel]}>Sort by:</Text>
          <View style={styles.sortButtons}>
            {[
              { key: 'crop', label: 'Crop' },
              { key: 'price', label: 'Price' },
              { key: 'change', label: 'Change' }
            ].map((sort) => (
              <TouchableOpacity
                key={sort.key}
                style={[
                  styles.sortButton,
                  sortBy === sort.key && styles.activeSortButton
                ]}
                onPress={() => handleSort(sort.key as any)}
              >
                <Text style={[
                  styles.sortButtonText,
                  sortBy === sort.key && styles.activeSortButtonText
                ]}>
                  {sort.label}
                </Text>
                {sortBy === sort.key && (
                  <IconSymbol 
                    name={sortOrder === 'asc' ? 'arrow.up' : 'arrow.down'} 
                    size={12} 
                    color={colors.card} 
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Price List */}
        <View style={styles.priceList}>
          {sortedPrices.map((item, index) => (
            <View key={index} style={[commonStyles.card, styles.priceCard]}>
              <View style={styles.priceHeader}>
                <View style={styles.cropInfo}>
                  <Text style={[commonStyles.subtitle, styles.cropName]}>{item.crop}</Text>
                  <Text style={[commonStyles.textSecondary, styles.marketName]}>{item.market}</Text>
                </View>
                <View style={styles.trendContainer}>
                  <IconSymbol 
                    name={getTrendIcon(item.trend)} 
                    size={20} 
                    color={getTrendColor(item.trend)} 
                  />
                </View>
              </View>
              
              <View style={styles.priceDetails}>
                <View style={styles.priceRow}>
                  <Text style={styles.priceValue}>${item.price}</Text>
                  <Text style={styles.priceUnit}>per {item.unit.split('/')[1]}</Text>
                </View>
                <View style={styles.changeRow}>
                  <Text style={[
                    styles.changeValue,
                    { color: getTrendColor(item.trend) }
                  ]}>
                    {item.change}
                  </Text>
                  <Text style={commonStyles.textSecondary}>vs last week</Text>
                </View>
              </View>
              
              <View style={styles.priceFooter}>
                <Text style={commonStyles.textSecondary}>
                  Updated: {new Date(item.lastUpdated).toLocaleDateString()}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Market Information */}
        <View style={[commonStyles.card, styles.infoCard]}>
          <View style={styles.infoHeader}>
            <IconSymbol name="info.circle.fill" size={24} color={colors.info} />
            <Text style={[commonStyles.subtitle, styles.infoTitle]}>Market Information</Text>
          </View>
          <Text style={commonStyles.text}>
            Prices are updated weekly and sourced from major commodity exchanges and marketing boards in Zimbabwe. 
            Actual prices may vary by location and quality grade.
          </Text>
          <View style={styles.infoButtons}>
            <TouchableOpacity style={styles.infoButton}>
              <IconSymbol name="phone.fill" size={16} color={colors.primary} />
              <Text style={styles.infoButtonText}>Contact Markets</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.infoButton}>
              <IconSymbol name="location.fill" size={16} color={colors.primary} />
              <Text style={styles.infoButtonText}>Find Markets</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 16,
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.card,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    color: colors.primary,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 4,
  },
  summaryCard: {
    backgroundColor: colors.highlight,
    marginBottom: 16,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryTitle: {
    marginLeft: 8,
  },
  summaryStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    marginBottom: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.secondary,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sortLabel: {
    marginRight: 12,
  },
  sortButtons: {
    flexDirection: 'row',
    flex: 1,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.card,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  activeSortButton: {
    backgroundColor: colors.primary,
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginRight: 4,
  },
  activeSortButtonText: {
    color: colors.card,
  },
  priceList: {
    marginBottom: 16,
  },
  priceCard: {
    marginBottom: 12,
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cropInfo: {
    flex: 1,
  },
  cropName: {
    marginBottom: 2,
  },
  marketName: {
    fontSize: 12,
  },
  trendContainer: {
    padding: 4,
  },
  priceDetails: {
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginRight: 8,
  },
  priceUnit: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeValue: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  priceFooter: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
  },
  infoCard: {
    backgroundColor: colors.highlight,
    marginBottom: 16,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoTitle: {
    marginLeft: 8,
  },
  infoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  infoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.card,
    borderRadius: 8,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  infoButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  bottomSpacing: {
    height: Platform.OS === 'ios' ? 20 : 100,
  },
});
