
import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import CropCard from '@/components/CropCard';
import { sampleCrops, agroEcologicalZones } from '@/data/zimbabweData';
import { useRouter } from 'expo-router';

export default function CropsScreen() {
  const router = useRouter();
  const [selectedZone, setSelectedZone] = useState('Zone II');
  const [filterStatus, setFilterStatus] = useState<'all' | 'optimal' | 'caution' | 'not-recommended'>('all');

  const filteredCrops = sampleCrops.filter(crop => {
    if (filterStatus === 'all') return true;
    return crop.status === filterStatus;
  });

  const statusFilters = [
    { key: 'all', label: 'All Crops', color: colors.textSecondary },
    { key: 'optimal', label: 'Optimal', color: colors.success },
    { key: 'caution', label: 'Caution', color: colors.warning },
    { key: 'not-recommended', label: 'Not Recommended', color: colors.error },
  ];

  const renderHeaderRight = () => (
    <TouchableOpacity
      onPress={() => Alert.alert("Search", "Search functionality for crops would be available here.")}
      style={styles.headerButton}
    >
      <IconSymbol name="magnifyingglass" color={colors.text} size={20} />
    </TouchableOpacity>
  );

  const showCropDetails = (crop: any) => {
    router.push({
      pathname: '/crop-details',
      params: { 
        cropId: crop.id,
        cropName: crop.name,
        plantingMonth: crop.plantingMonth,
        harvestMonth: crop.harvestMonth,
        soilType: crop.soilType,
        waterRequirement: crop.waterRequirement,
        status: crop.status
      }
    });
  };

  return (
    <SafeAreaView style={[commonStyles.safeArea, { backgroundColor: colors.background }]}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Crop Database",
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
          <Text style={[commonStyles.title, styles.title]}>Crop Database</Text>
          <Text style={[commonStyles.textSecondary, styles.subtitle]}>
            Crops suitable for Zimbabwe's agro-ecological zones
          </Text>
        </View>

        {/* Agro-Ecological Zone Selector */}
        <View style={[commonStyles.card, styles.zoneCard]}>
          <Text style={[commonStyles.subtitle, styles.zoneTitle]}>Agro-Ecological Zone</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.zoneSelector}>
            {agroEcologicalZones.map((zone) => (
              <TouchableOpacity
                key={zone.zone}
                style={[
                  styles.zoneButton,
                  selectedZone === zone.zone && styles.selectedZoneButton
                ]}
                onPress={() => setSelectedZone(zone.zone)}
              >
                <Text style={[
                  styles.zoneButtonText,
                  selectedZone === zone.zone && styles.selectedZoneButtonText
                ]}>
                  {zone.zone}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          {/* Zone Info */}
          {agroEcologicalZones.find(z => z.zone === selectedZone) && (
            <View style={styles.zoneInfo}>
              <Text style={commonStyles.text}>
                {agroEcologicalZones.find(z => z.zone === selectedZone)?.description}
              </Text>
              <Text style={commonStyles.textSecondary}>
                Rainfall: {agroEcologicalZones.find(z => z.zone === selectedZone)?.rainfall}
              </Text>
            </View>
          )}
        </View>

        {/* Status Filters */}
        <View style={styles.filtersContainer}>
          <Text style={[commonStyles.subtitle, styles.filtersTitle]}>Filter by Status</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
            {statusFilters.map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterButton,
                  filterStatus === filter.key && { backgroundColor: filter.color }
                ]}
                onPress={() => setFilterStatus(filter.key as any)}
              >
                <Text style={[
                  styles.filterButtonText,
                  filterStatus === filter.key && styles.selectedFilterText
                ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Crops List */}
        <View style={styles.cropsSection}>
          <Text style={[commonStyles.subtitle, styles.sectionTitle]}>
            Available Crops ({filteredCrops.length})
          </Text>
          
          {filteredCrops.map((crop) => (
            <CropCard
              key={crop.id}
              crop={crop}
              onPress={() => showCropDetails(crop)}
            />
          ))}
        </View>

        {/* Planting Calendar Info */}
        <View style={[commonStyles.card, styles.calendarCard]}>
          <View style={styles.calendarHeader}>
            <IconSymbol name="calendar" size={24} color={colors.primary} />
            <Text style={[commonStyles.subtitle, styles.calendarTitle]}>Zimbabwe Growing Seasons</Text>
          </View>
          <Text style={commonStyles.text}>
            <Text style={{ fontWeight: 'bold' }}>Main Season:</Text> October - March (Summer rains){'\n'}
            <Text style={{ fontWeight: 'bold' }}>Winter Season:</Text> April - September (Dry season){'\n'}
            <Text style={{ fontWeight: 'bold' }}>Irrigation Season:</Text> May - August (Winter crops)
          </Text>
        </View>

        {/* Pest Identification Card */}
        <View style={[commonStyles.card, styles.pestCard]}>
          <View style={styles.pestHeader}>
            <IconSymbol name="camera" size={24} color={colors.primary} />
            <Text style={[commonStyles.subtitle, styles.pestTitle]}>AI Pest Identification</Text>
          </View>
          <Text style={commonStyles.text}>
            Use your camera to identify pests, diseases, and weeds affecting your crops. Get instant recommendations for treatment and prevention.
          </Text>
          
          <View style={styles.pestButtons}>
            <TouchableOpacity
              style={[styles.pestButton, styles.primaryButton]}
              onPress={() => router.push('/pest-identification')}
            >
              <IconSymbol name="camera.fill" size={20} color={colors.card} />
              <Text style={styles.pestButtonText}>Identify Pest</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.pestButton, styles.secondaryButton]}
              onPress={() => router.push('/pest-database')}
            >
              <IconSymbol name="book.closed" size={20} color={colors.primary} />
              <Text style={[styles.pestButtonText, { color: colors.primary }]}>Browse Database</Text>
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
  headerButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.card,
  },
  zoneCard: {
    backgroundColor: colors.highlight,
    marginBottom: 16,
  },
  zoneTitle: {
    marginBottom: 12,
  },
  zoneSelector: {
    marginBottom: 12,
  },
  zoneButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.card,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  selectedZoneButton: {
    backgroundColor: colors.primary,
  },
  zoneButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
  selectedZoneButtonText: {
    color: colors.card,
  },
  zoneInfo: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filtersTitle: {
    marginBottom: 8,
  },
  filtersScroll: {
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
  cropsSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  calendarCard: {
    backgroundColor: colors.highlight,
    marginBottom: 16,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  calendarTitle: {
    marginLeft: 8,
  },
  pestCard: {
    backgroundColor: colors.highlight,
    marginBottom: 16,
  },
  pestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pestTitle: {
    marginLeft: 8,
  },
  pestButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  pestButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  pestButtonText: {
    color: colors.card,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  bottomSpacing: {
    height: Platform.OS === 'ios' ? 20 : 100,
  },
});
