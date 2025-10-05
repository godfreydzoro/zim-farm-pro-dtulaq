
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

interface CropData {
  id: string;
  name: string;
  plantingMonth: string;
  harvestMonth: string;
  soilType: string;
  waterRequirement: string;
  status: 'optimal' | 'caution' | 'not-recommended';
}

interface CropCardProps {
  crop: CropData;
  onPress?: () => void;
}

export default function CropCard({ crop, onPress }: CropCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
        return colors.success;
      case 'caution':
        return colors.warning;
      case 'not-recommended':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'checkmark.circle.fill';
      case 'caution':
        return 'exclamationmark.triangle.fill';
      case 'not-recommended':
        return 'xmark.circle.fill';
      default:
        return 'questionmark.circle.fill';
    }
  };

  const getCropIcon = (cropName: string) => {
    const name = cropName.toLowerCase();
    if (name.includes('maize') || name.includes('corn')) return 'leaf.fill';
    if (name.includes('tobacco')) return 'leaf.fill';
    if (name.includes('cotton')) return 'cloud.fill';
    if (name.includes('soybean')) return 'circle.fill';
    if (name.includes('wheat')) return 'leaf.fill';
    return 'leaf.fill';
  };

  return (
    <TouchableOpacity 
      style={[commonStyles.card, styles.cropCard]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.cropInfo}>
          <IconSymbol 
            name={getCropIcon(crop.name)} 
            size={24} 
            color={colors.primary} 
          />
          <Text style={[commonStyles.subtitle, styles.cropName]}>{crop.name}</Text>
        </View>
        <View style={styles.statusContainer}>
          <IconSymbol 
            name={getStatusIcon(crop.status)} 
            size={20} 
            color={getStatusColor(crop.status)} 
          />
        </View>
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={commonStyles.textSecondary}>Planting: {crop.plantingMonth}</Text>
          <Text style={commonStyles.textSecondary}>Harvest: {crop.harvestMonth}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={commonStyles.textSecondary}>Soil: {crop.soilType}</Text>
          <Text style={commonStyles.textSecondary}>Water: {crop.waterRequirement}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cropCard: {
    marginHorizontal: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cropInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cropName: {
    marginLeft: 8,
    flex: 1,
  },
  statusContainer: {
    padding: 4,
  },
  detailsContainer: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
