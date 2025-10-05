
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { soilTypeDescriptions } from '@/data/zimbabweData';

interface SoilTypeOverlayProps {
  selectedSoilType?: string;
  onSoilTypeSelect?: (soilType: string) => void;
  showDetails?: boolean;
}

export default function SoilTypeOverlay({ 
  selectedSoilType, 
  onSoilTypeSelect, 
  showDetails = false 
}: SoilTypeOverlayProps) {
  
  const getSoilTypeColor = (soilType: string) => {
    switch (soilType.toLowerCase()) {
      case 'clay loam': return '#8B4513';
      case 'sandy loam': return '#F4A460';
      case 'silt loam': return '#D2B48C';
      case 'clay': return '#A0522D';
      case 'sandy clay': return '#CD853F';
      case 'well-drained': return '#DEB887';
      case 'fertile loam': return '#228B22';
      case 'red clay': return '#B22222';
      case 'black cotton soil': return '#2F4F4F';
      default: return colors.textSecondary;
    }
  };

  const getFertilityIcon = (fertility: string) => {
    switch (fertility.toLowerCase()) {
      case 'very high': return 'star.fill';
      case 'high': return 'star.leadinghalf.filled';
      case 'medium': return 'star';
      default: return 'star';
    }
  };

  const getDrainageIcon = (drainage: string) => {
    switch (drainage.toLowerCase()) {
      case 'excellent': return 'drop.fill';
      case 'good': return 'drop.degreesign.fill';
      case 'moderate': return 'drop';
      case 'poor': return 'drop.triangle';
      default: return 'drop';
    }
  };

  return (
    <View style={[commonStyles.card, styles.overlayCard]}>
      <View style={styles.header}>
        <IconSymbol name="globe.americas" size={24} color={colors.accent} />
        <Text style={[commonStyles.subtitle, styles.title]}>Zimbabwe Soil Types</Text>
      </View>

      <ScrollView style={styles.soilList} showsVerticalScrollIndicator={false}>
        {Object.entries(soilTypeDescriptions).map(([soilType, details]) => (
          <TouchableOpacity
            key={soilType}
            style={[
              styles.soilItem,
              selectedSoilType === soilType && styles.selectedSoilItem
            ]}
            onPress={() => onSoilTypeSelect?.(soilType)}
            activeOpacity={0.7}
          >
            <View style={styles.soilHeader}>
              <View style={[styles.soilColorIndicator, { backgroundColor: getSoilTypeColor(soilType) }]} />
              <Text style={[commonStyles.text, styles.soilName]}>{soilType}</Text>
              {selectedSoilType === soilType && (
                <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
              )}
            </View>

            {showDetails && (
              <View style={styles.soilDetails}>
                <Text style={[commonStyles.textSecondary, styles.soilDescription]}>
                  {details.description}
                </Text>
                
                <View style={styles.soilProperties}>
                  <View style={styles.propertyItem}>
                    <IconSymbol 
                      name={getFertilityIcon(details.fertility)} 
                      size={14} 
                      color={colors.warning} 
                    />
                    <Text style={[commonStyles.textSecondary, styles.propertyText]}>
                      {details.fertility} fertility
                    </Text>
                  </View>
                  
                  <View style={styles.propertyItem}>
                    <IconSymbol 
                      name={getDrainageIcon(details.drainageLevel)} 
                      size={14} 
                      color={colors.info} 
                    />
                    <Text style={[commonStyles.textSecondary, styles.propertyText]}>
                      {details.drainageLevel} drainage
                    </Text>
                  </View>
                </View>

                <View style={styles.suitableCrops}>
                  <Text style={[commonStyles.textSecondary, styles.cropsLabel]}>
                    Suitable crops:
                  </Text>
                  <View style={styles.cropsList}>
                    {details.suitableCrops.map((crop, index) => (
                      <View key={crop} style={styles.cropTag}>
                        <Text style={[commonStyles.textSecondary, styles.cropText]}>
                          {crop}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.legend}>
        <Text style={[commonStyles.textSecondary, styles.legendText]}>
          Tap a soil type to select it for your field
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlayCard: {
    maxHeight: 400,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    marginLeft: 8,
  },
  soilList: {
    maxHeight: 300,
  },
  soilItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: colors.highlight,
  },
  selectedSoilItem: {
    backgroundColor: colors.primary + '20',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  soilHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  soilColorIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  soilName: {
    flex: 1,
    fontWeight: '500',
  },
  soilDetails: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  soilDescription: {
    fontSize: 13,
    marginBottom: 8,
  },
  soilProperties: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  propertyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  propertyText: {
    marginLeft: 4,
    fontSize: 12,
  },
  suitableCrops: {
    marginTop: 4,
  },
  cropsLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  cropsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cropTag: {
    backgroundColor: colors.card,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 2,
  },
  cropText: {
    fontSize: 11,
  },
  legend: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  legendText: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
