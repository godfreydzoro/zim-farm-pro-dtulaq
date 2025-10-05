
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { pestsAndDiseases } from '@/data/zimbabweData';

export default function PestDatabaseScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'pest' | 'disease' | 'weed'>('all');
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const renderHeaderRight = () => (
    <TouchableOpacity
      onPress={() => router.push('/pest-identification')}
      style={styles.headerButton}
    >
      <IconSymbol name="camera.fill" color={colors.text} size={20} />
    </TouchableOpacity>
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return colors.error;
      case 'medium': return colors.warning;
      case 'low': return colors.success;
      default: return colors.textSecondary;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pest': return 'ant';
      case 'disease': return 'cross.circle';
      case 'weed': return 'leaf';
      default: return 'exclamationmark.triangle';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pest': return colors.error;
      case 'disease': return colors.warning;
      case 'weed': return colors.success;
      default: return colors.textSecondary;
    }
  };

  const filteredPests = pestsAndDiseases.filter(pest => {
    const matchesSearch = pest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pest.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pest.affectedCrops.some(crop => crop.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = filterType === 'all' || pest.type === filterType;
    const matchesSeverity = filterSeverity === 'all' || pest.severity === filterSeverity;
    
    return matchesSearch && matchesType && matchesSeverity;
  });

  const viewPestDetails = (pest: any) => {
    router.push({
      pathname: '/pest-results',
      params: {
        pestId: pest.id,
        confidence: '1.0',
        severity: pest.severity
      }
    });
  };

  return (
    <SafeAreaView style={[commonStyles.safeArea, { backgroundColor: colors.background }]}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Pest Database",
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
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[commonStyles.title, styles.title]}>Pest Database</Text>
          <Text style={[commonStyles.textSecondary, styles.subtitle]}>
            Browse common pests, diseases, and weeds affecting crops in Zimbabwe
          </Text>
        </View>

        {/* Search Bar */}
        <View style={[commonStyles.card, styles.searchCard]}>
          <View style={styles.searchContainer}>
            <IconSymbol name="magnifyingglass" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search pests, diseases, or crops..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <IconSymbol name="xmark.circle.fill" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filters */}
        <View style={[commonStyles.card, styles.filtersCard]}>
          <Text style={[commonStyles.subtitle, styles.filtersTitle]}>Filters</Text>
          
          {/* Type Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Type:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {['all', 'pest', 'disease', 'weed'].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.filterButton,
                    filterType === type && { backgroundColor: colors.primary }
                  ]}
                  onPress={() => setFilterType(type as any)}
                >
                  <Text style={[
                    styles.filterButtonText,
                    filterType === type && styles.selectedFilterText
                  ]}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Severity Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Severity:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {['all', 'high', 'medium', 'low'].map((severity) => (
                <TouchableOpacity
                  key={severity}
                  style={[
                    styles.filterButton,
                    filterSeverity === severity && { 
                      backgroundColor: severity === 'all' ? colors.primary : getSeverityColor(severity) 
                    }
                  ]}
                  onPress={() => setFilterSeverity(severity as any)}
                >
                  <Text style={[
                    styles.filterButtonText,
                    filterSeverity === severity && styles.selectedFilterText
                  ]}>
                    {severity.charAt(0).toUpperCase() + severity.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Results Count */}
        <View style={styles.resultsHeader}>
          <Text style={[commonStyles.subtitle, styles.resultsCount]}>
            {filteredPests.length} Result{filteredPests.length !== 1 ? 's' : ''}
          </Text>
        </View>

        {/* Pest List */}
        {filteredPests.length === 0 ? (
          <View style={[commonStyles.card, styles.emptyState]}>
            <IconSymbol name="magnifyingglass" size={48} color={colors.textSecondary} />
            <Text style={[commonStyles.subtitle, styles.emptyTitle]}>No Results Found</Text>
            <Text style={commonStyles.textSecondary}>
              Try adjusting your search terms or filters
            </Text>
          </View>
        ) : (
          <View style={styles.pestsList}>
            {filteredPests.map((pest) => (
              <TouchableOpacity
                key={pest.id}
                style={[commonStyles.card, styles.pestCard]}
                onPress={() => viewPestDetails(pest)}
              >
                <View style={styles.pestHeader}>
                  <View style={styles.pestInfo}>
                    <View style={styles.pestTitleRow}>
                      <IconSymbol 
                        name={getTypeIcon(pest.type)} 
                        size={20} 
                        color={getTypeColor(pest.type)} 
                      />
                      <Text style={[commonStyles.subtitle, styles.pestName]}>{pest.name}</Text>
                    </View>
                    <Text style={styles.scientificName}>{pest.scientificName}</Text>
                    <Text style={styles.pestType}>
                      {pest.type.charAt(0).toUpperCase() + pest.type.slice(1)}
                    </Text>
                  </View>
                  
                  <View style={[
                    styles.severityBadge,
                    { backgroundColor: getSeverityColor(pest.severity) }
                  ]}>
                    <Text style={styles.severityText}>
                      {pest.severity.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <Text style={styles.pestDescription} numberOfLines={2}>
                  {pest.description}
                </Text>

                <View style={styles.affectedCropsContainer}>
                  <Text style={styles.affectedCropsLabel}>Affects:</Text>
                  <View style={styles.cropsContainer}>
                    {pest.affectedCrops.slice(0, 3).map((crop, index) => (
                      <View key={index} style={styles.cropTag}>
                        <Text style={styles.cropTagText}>{crop}</Text>
                      </View>
                    ))}
                    {pest.affectedCrops.length > 3 && (
                      <Text style={styles.moreCrops}>
                        +{pest.affectedCrops.length - 3} more
                      </Text>
                    )}
                  </View>
                </View>

                <View style={styles.pestFooter}>
                  <Text style={styles.viewDetailsText}>Tap to view treatment options</Text>
                  <IconSymbol name="chevron.right" size={16} color={colors.primary} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

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
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: colors.primary,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 4,
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.card,
  },
  searchCard: {
    backgroundColor: colors.card,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.highlight,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: colors.text,
  },
  filtersCard: {
    backgroundColor: colors.highlight,
    marginBottom: 16,
  },
  filtersTitle: {
    marginBottom: 16,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
  },
  filterScroll: {
    flexDirection: 'row',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.card,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  filterButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
  selectedFilterText: {
    color: colors.card,
  },
  resultsHeader: {
    marginBottom: 16,
  },
  resultsCount: {
    color: colors.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: colors.card,
  },
  emptyTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  pestsList: {
    gap: 12,
  },
  pestCard: {
    backgroundColor: colors.card,
  },
  pestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  pestInfo: {
    flex: 1,
  },
  pestTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  pestName: {
    marginLeft: 8,
    flex: 1,
  },
  scientificName: {
    fontSize: 14,
    fontStyle: 'italic',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  pestType: {
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 12,
  },
  severityText: {
    color: colors.card,
    fontSize: 10,
    fontWeight: '600',
  },
  pestDescription: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  affectedCropsContainer: {
    marginBottom: 12,
  },
  affectedCropsLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  cropsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
  },
  cropTag: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  cropTagText: {
    color: colors.card,
    fontSize: 10,
    fontWeight: '500',
  },
  moreCrops: {
    fontSize: 10,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  pestFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
  },
  viewDetailsText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  bottomSpacing: {
    height: Platform.OS === 'ios' ? 20 : 100,
  },
});
