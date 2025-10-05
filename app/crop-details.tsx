
import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { cropsCalendar } from '@/data/zimbabweData';

export default function CropDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'calendar' | 'practices' | 'market'>('overview');

  const cropName = params.cropName as string;
  const cropCalendar = cropsCalendar.find(c => c.crop === cropName);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return colors.success;
      case 'caution': return colors.warning;
      case 'not-recommended': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const getCropImage = (cropName: string) => {
    const name = cropName.toLowerCase();
    if (name.includes('maize')) return 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400';
    if (name.includes('tobacco')) return 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=400';
    if (name.includes('cotton')) return 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=400';
    if (name.includes('soybean')) return 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=400';
    if (name.includes('wheat')) return 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400';
    return 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400';
  };

  const getBestPractices = (cropName: string) => {
    const practices = {
      'Maize': [
        'Plant with first effective rains (October-November)',
        'Use certified seeds and proper spacing (75cm x 25cm)',
        'Apply basal fertilizer at planting',
        'Top dress with nitrogen at 4-6 weeks',
        'Control weeds early and regularly',
        'Monitor for fall armyworm and other pests',
        'Harvest at proper moisture content (12.5%)'
      ],
      'Tobacco': [
        'Prepare seedbeds in August-September',
        'Transplant healthy seedlings in October',
        'Maintain proper plant spacing (90cm x 60cm)',
        'Top plants to remove flower heads',
        'Remove suckers regularly',
        'Harvest leaves when mature (bottom to top)',
        'Cure leaves properly for quality'
      ],
      'Cotton': [
        'Plant after soil temperature reaches 16°C',
        'Use recommended varieties for your area',
        'Maintain plant population of 40,000-50,000 plants/ha',
        'Apply fertilizer based on soil test results',
        'Monitor and control bollworm and other pests',
        'Harvest when bolls are fully open',
        'Store cotton in clean, dry conditions'
      ]
    };
    return practices[cropName as keyof typeof practices] || [
      'Follow recommended planting dates',
      'Use quality seeds and proper spacing',
      'Apply fertilizers as recommended',
      'Control weeds and pests regularly',
      'Harvest at proper maturity'
    ];
  };

  const tabs = [
    { key: 'overview', label: 'Overview', icon: 'info.circle' },
    { key: 'calendar', label: 'Calendar', icon: 'calendar' },
    { key: 'practices', label: 'Practices', icon: 'list.bullet' },
    { key: 'market', label: 'Market', icon: 'chart.line.uptrend.xyaxis' }
  ];

  const renderHeaderRight = () => (
    <TouchableOpacity
      onPress={() => router.back()}
      style={styles.headerButton}
    >
      <IconSymbol name="xmark" color={colors.text} size={20} />
    </TouchableOpacity>
  );

  const renderOverview = () => (
    <View>
      {/* Crop Image */}
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: getCropImage(cropName) }}
          style={styles.cropImage}
          resizeMode="cover"
        />
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(params.status as string) }]}>
          <Text style={styles.statusText}>
            {(params.status as string).charAt(0).toUpperCase() + (params.status as string).slice(1)}
          </Text>
        </View>
      </View>

      {/* Basic Information */}
      <View style={[commonStyles.card, styles.infoCard]}>
        <Text style={[commonStyles.subtitle, styles.sectionTitle]}>Basic Information</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <IconSymbol name="calendar" size={20} color={colors.primary} />
            <View style={styles.infoContent}>
              <Text style={commonStyles.textSecondary}>Planting Season</Text>
              <Text style={commonStyles.text}>{params.plantingMonth}</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <IconSymbol name="calendar.badge.clock" size={20} color={colors.accent} />
            <View style={styles.infoContent}>
              <Text style={commonStyles.textSecondary}>Harvest Season</Text>
              <Text style={commonStyles.text}>{params.harvestMonth}</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <IconSymbol name="globe" size={20} color={colors.info} />
            <View style={styles.infoContent}>
              <Text style={commonStyles.textSecondary}>Soil Type</Text>
              <Text style={commonStyles.text}>{params.soilType}</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <IconSymbol name="drop" size={20} color={colors.success} />
            <View style={styles.infoContent}>
              <Text style={commonStyles.textSecondary}>Water Requirement</Text>
              <Text style={commonStyles.text}>{params.waterRequirement}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const renderCalendar = () => (
    <View>
      {cropCalendar ? (
        <View style={[commonStyles.card, styles.calendarCard]}>
          <Text style={[commonStyles.subtitle, styles.sectionTitle]}>
            {cropName} Growing Calendar
          </Text>
          {cropCalendar.activities.map((activity, index) => (
            <View key={index} style={styles.calendarItem}>
              <View style={styles.monthBadge}>
                <Text style={styles.monthText}>{activity.month.slice(0, 3)}</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={[commonStyles.text, styles.activityTitle]}>{activity.activity}</Text>
                <Text style={commonStyles.textSecondary}>{activity.description}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={[commonStyles.card, styles.noDataCard]}>
          <IconSymbol name="calendar.badge.exclamationmark" size={48} color={colors.textSecondary} />
          <Text style={[commonStyles.text, styles.noDataText]}>
            Calendar data not available for {cropName}
          </Text>
        </View>
      )}
    </View>
  );

  const renderPractices = () => (
    <View style={[commonStyles.card, styles.practicesCard]}>
      <Text style={[commonStyles.subtitle, styles.sectionTitle]}>Best Practices</Text>
      {getBestPractices(cropName).map((practice, index) => (
        <View key={index} style={styles.practiceItem}>
          <View style={styles.practiceNumber}>
            <Text style={styles.practiceNumberText}>{index + 1}</Text>
          </View>
          <Text style={[commonStyles.text, styles.practiceText]}>{practice}</Text>
        </View>
      ))}
    </View>
  );

  const renderMarket = () => (
    <View style={[commonStyles.card, styles.marketCard]}>
      <Text style={[commonStyles.subtitle, styles.sectionTitle]}>Market Information</Text>
      <View style={styles.marketInfo}>
        <IconSymbol name="chart.line.uptrend.xyaxis" size={24} color={colors.primary} />
        <Text style={commonStyles.text}>
          Market prices and trends for {cropName} would be displayed here.
        </Text>
      </View>
      <TouchableOpacity 
        style={styles.marketButton}
        onPress={() => router.push('/market-prices')}
      >
        <Text style={styles.marketButtonText}>View Market Prices</Text>
        <IconSymbol name="arrow.right" size={16} color={colors.card} />
      </TouchableOpacity>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'calendar': return renderCalendar();
      case 'practices': return renderPractices();
      case 'market': return renderMarket();
      default: return renderOverview();
    }
  };

  return (
    <SafeAreaView style={[commonStyles.safeArea, { backgroundColor: colors.background }]}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: cropName,
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.text,
            headerRight: renderHeaderRight,
          }}
        />
      )}

      <View style={styles.container}>
        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.tab,
                  activeTab === tab.key && styles.activeTab
                ]}
                onPress={() => setActiveTab(tab.key as any)}
              >
                <IconSymbol 
                  name={tab.icon} 
                  size={18} 
                  color={activeTab === tab.key ? colors.card : colors.textSecondary} 
                />
                <Text style={[
                  styles.tabText,
                  activeTab === tab.key && styles.activeTabText
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Content */}
        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {renderContent()}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.card,
  },
  tabContainer: {
    backgroundColor: colors.card,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: colors.background,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.card,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  cropImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: colors.card,
    fontSize: 12,
    fontWeight: '600',
  },
  infoCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    color: colors.primary,
  },
  infoGrid: {
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  calendarCard: {
    marginBottom: 16,
  },
  calendarItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  monthBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    minWidth: 40,
    alignItems: 'center',
  },
  monthText: {
    color: colors.card,
    fontSize: 12,
    fontWeight: '600',
  },
  activityContent: {
    marginLeft: 12,
    flex: 1,
  },
  activityTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  noDataCard: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  noDataText: {
    marginTop: 12,
    textAlign: 'center',
  },
  practicesCard: {
    marginBottom: 16,
  },
  practiceItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  practiceNumber: {
    backgroundColor: colors.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  practiceNumberText: {
    color: colors.card,
    fontSize: 12,
    fontWeight: '600',
  },
  practiceText: {
    flex: 1,
    lineHeight: 20,
  },
  marketCard: {
    marginBottom: 16,
  },
  marketInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  marketButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  marketButtonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  bottomSpacing: {
    height: Platform.OS === 'ios' ? 20 : 100,
  },
});
