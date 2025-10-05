
import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { cropsCalendar } from '@/data/zimbabweData';

export default function CropsCalendarScreen() {
  const router = useRouter();
  const [selectedCrop, setSelectedCrop] = useState(cropsCalendar[0]?.crop || 'Maize');
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentCropCalendar = cropsCalendar.find(c => c.crop === selectedCrop);

  const getMonthActivities = (month: string) => {
    return currentCropCalendar?.activities.filter(activity => activity.month === month) || [];
  };

  const getMonthColor = (month: string) => {
    const activities = getMonthActivities(month);
    if (activities.length === 0) return colors.card;
    
    const activity = activities[0];
    if (activity.activity.toLowerCase().includes('plant')) return colors.success;
    if (activity.activity.toLowerCase().includes('harvest')) return colors.warning;
    if (activity.activity.toLowerCase().includes('preparation')) return colors.info;
    return colors.primary;
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
            title: "Crops Calendar",
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
          <Text style={[commonStyles.title, styles.title]}>Crops Calendar</Text>
          <Text style={[commonStyles.textSecondary, styles.subtitle]}>
            Planting and harvesting schedules for major crops
          </Text>
        </View>

        {/* Crop Selector */}
        <View style={styles.cropSelector}>
          <Text style={[commonStyles.textSecondary, styles.selectorLabel]}>Select Crop:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cropScroll}>
            {cropsCalendar.map((crop) => (
              <TouchableOpacity
                key={crop.crop}
                style={[
                  styles.cropButton,
                  selectedCrop === crop.crop && styles.activeCropButton
                ]}
                onPress={() => setSelectedCrop(crop.crop)}
              >
                <Text style={[
                  styles.cropButtonText,
                  selectedCrop === crop.crop && styles.activeCropButtonText
                ]}>
                  {crop.crop}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Calendar Grid */}
        <View style={[commonStyles.card, styles.calendarCard]}>
          <View style={styles.calendarHeader}>
            <IconSymbol name="calendar" size={24} color={colors.primary} />
            <Text style={[commonStyles.subtitle, styles.calendarTitle]}>
              {selectedCrop} Growing Calendar
            </Text>
          </View>
          
          <View style={styles.monthsGrid}>
            {months.map((month) => {
              const activities = getMonthActivities(month);
              const hasActivity = activities.length > 0;
              
              return (
                <TouchableOpacity
                  key={month}
                  style={[
                    styles.monthCard,
                    { backgroundColor: getMonthColor(month) },
                    selectedMonth === month && styles.selectedMonthCard
                  ]}
                  onPress={() => setSelectedMonth(selectedMonth === month ? null : month)}
                >
                  <Text style={[
                    styles.monthName,
                    hasActivity && styles.activeMonthName
                  ]}>
                    {month.slice(0, 3)}
                  </Text>
                  {hasActivity && (
                    <View style={styles.activityIndicator}>
                      <IconSymbol name="circle.fill" size={6} color={colors.card} />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Selected Month Details */}
        {selectedMonth && (
          <View style={[commonStyles.card, styles.detailsCard]}>
            <View style={styles.detailsHeader}>
              <Text style={[commonStyles.subtitle, styles.detailsTitle]}>
                {selectedMonth} Activities
              </Text>
              <TouchableOpacity onPress={() => setSelectedMonth(null)}>
                <IconSymbol name="xmark.circle.fill" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
            
            {getMonthActivities(selectedMonth).map((activity, index) => (
              <View key={index} style={styles.activityDetail}>
                <View style={styles.activityIcon}>
                  <IconSymbol name="leaf.fill" size={16} color={colors.primary} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={[commonStyles.text, styles.activityName]}>{activity.activity}</Text>
                  <Text style={[commonStyles.textSecondary, styles.activityDescription]}>
                    {activity.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Full Year Overview */}
        <View style={[commonStyles.card, styles.overviewCard]}>
          <View style={styles.overviewHeader}>
            <IconSymbol name="list.bullet" size={24} color={colors.primary} />
            <Text style={[commonStyles.subtitle, styles.overviewTitle]}>
              Full Year Overview - {selectedCrop}
            </Text>
          </View>
          
          {currentCropCalendar?.activities.map((activity, index) => (
            <View key={index} style={styles.overviewItem}>
              <View style={styles.monthBadge}>
                <Text style={styles.monthBadgeText}>{activity.month.slice(0, 3)}</Text>
              </View>
              <View style={styles.overviewContent}>
                <Text style={[commonStyles.text, styles.overviewActivity]}>{activity.activity}</Text>
                <Text style={[commonStyles.textSecondary, styles.overviewDescription]}>
                  {activity.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Legend */}
        <View style={[commonStyles.card, styles.legendCard]}>
          <Text style={[commonStyles.subtitle, styles.legendTitle]}>Legend</Text>
          <View style={styles.legendItems}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: colors.success }]} />
              <Text style={commonStyles.textSecondary}>Planting</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: colors.warning }]} />
              <Text style={commonStyles.textSecondary}>Harvesting</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: colors.info }]} />
              <Text style={commonStyles.textSecondary}>Preparation</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: colors.primary }]} />
              <Text style={commonStyles.textSecondary}>Maintenance</Text>
            </View>
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
  cropSelector: {
    marginBottom: 16,
  },
  selectorLabel: {
    marginBottom: 8,
  },
  cropScroll: {
    flexDirection: 'row',
  },
  cropButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.card,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  activeCropButton: {
    backgroundColor: colors.primary,
  },
  cropButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
  activeCropButtonText: {
    color: colors.card,
  },
  calendarCard: {
    marginBottom: 16,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarTitle: {
    marginLeft: 8,
  },
  monthsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  monthCard: {
    width: '22%',
    aspectRatio: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  selectedMonthCard: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  monthName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeMonthName: {
    color: colors.card,
  },
  activityIndicator: {
    position: 'absolute',
    bottom: 4,
  },
  detailsCard: {
    backgroundColor: colors.highlight,
    marginBottom: 16,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailsTitle: {
    color: colors.primary,
  },
  activityDetail: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityName: {
    fontWeight: '600',
    marginBottom: 2,
  },
  activityDescription: {
    lineHeight: 18,
  },
  overviewCard: {
    marginBottom: 16,
  },
  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  overviewTitle: {
    marginLeft: 8,
  },
  overviewItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingBottom: 12,
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
    marginRight: 12,
  },
  monthBadgeText: {
    color: colors.card,
    fontSize: 12,
    fontWeight: '600',
  },
  overviewContent: {
    flex: 1,
  },
  overviewActivity: {
    fontWeight: '600',
    marginBottom: 2,
  },
  overviewDescription: {
    lineHeight: 18,
  },
  legendCard: {
    backgroundColor: colors.highlight,
    marginBottom: 16,
  },
  legendTitle: {
    marginBottom: 12,
    color: colors.primary,
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  bottomSpacing: {
    height: Platform.OS === 'ios' ? 20 : 100,
  },
});
