
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

interface LocationPoint {
  latitude: number;
  longitude: number;
  timestamp: number;
  accuracy?: number;
}

interface FieldBoundary {
  id: string;
  name: string;
  points: LocationPoint[];
  area: number;
  soilType?: string;
  createdAt: Date;
}

interface FieldBoundaryCardProps {
  field: FieldBoundary;
  onPress?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

export default function FieldBoundaryCard({ 
  field, 
  onPress, 
  onDelete, 
  showActions = true 
}: FieldBoundaryCardProps) {
  
  const getSoilTypeColor = (soilType?: string) => {
    if (!soilType) return colors.textSecondary;
    
    switch (soilType.toLowerCase()) {
      case 'clay loam':
        return '#8B4513';
      case 'sandy loam':
        return '#F4A460';
      case 'silt loam':
        return '#D2B48C';
      case 'clay':
        return '#A0522D';
      case 'sandy clay':
        return '#CD853F';
      case 'well-drained':
        return '#DEB887';
      case 'fertile loam':
        return '#228B22';
      case 'red clay':
        return '#B22222';
      case 'black cotton soil':
        return '#2F4F4F';
      default:
        return colors.textSecondary;
    }
  };

  const getFieldStatusIcon = () => {
    if (field.area > 10) return 'square.grid.3x3.fill';
    if (field.area > 5) return 'square.grid.2x2.fill';
    return 'square.fill';
  };

  const getFieldStatusColor = () => {
    if (field.area > 10) return colors.success;
    if (field.area > 5) return colors.warning;
    return colors.info;
  };

  return (
    <TouchableOpacity 
      style={[commonStyles.card, styles.fieldCard]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <IconSymbol 
            name={getFieldStatusIcon()} 
            size={20} 
            color={getFieldStatusColor()} 
          />
          <Text style={[commonStyles.subtitle, styles.fieldName]}>{field.name}</Text>
        </View>
        
        {showActions && onDelete && (
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={onDelete}
          >
            <IconSymbol name="trash" size={16} color={colors.error} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <IconSymbol name="ruler" size={16} color={colors.textSecondary} />
            <Text style={[commonStyles.textSecondary, styles.infoText]}>
              {field.area.toFixed(2)} ha
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <IconSymbol name="location" size={16} color={colors.textSecondary} />
            <Text style={[commonStyles.textSecondary, styles.infoText]}>
              {field.points.length} points
            </Text>
          </View>
        </View>

        {field.soilType && (
          <View style={styles.soilTypeContainer}>
            <View style={[styles.soilTypeIndicator, { backgroundColor: getSoilTypeColor(field.soilType) }]} />
            <Text style={[commonStyles.textSecondary, styles.soilTypeText]}>
              Soil: {field.soilType}
            </Text>
          </View>
        )}

        <View style={styles.metaInfo}>
          <Text style={[commonStyles.textSecondary, styles.dateText]}>
            Created: {field.createdAt.toLocaleDateString()}
          </Text>
          
          {field.points.length > 0 && (
            <Text style={[commonStyles.textSecondary, styles.coordinatesText]}>
              Center: {(field.points.reduce((sum, p) => sum + p.latitude, 0) / field.points.length).toFixed(4)}°, {(field.points.reduce((sum, p) => sum + p.longitude, 0) / field.points.length).toFixed(4)}°
            </Text>
          )}
        </View>
      </View>

      {onPress && (
        <View style={styles.footer}>
          <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fieldCard: {
    marginVertical: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fieldName: {
    marginLeft: 8,
    flex: 1,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.highlight,
  },
  content: {
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoText: {
    marginLeft: 4,
    fontSize: 13,
  },
  soilTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  soilTypeIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  soilTypeText: {
    fontSize: 13,
  },
  metaInfo: {
    marginTop: 4,
  },
  dateText: {
    fontSize: 12,
    marginBottom: 2,
  },
  coordinatesText: {
    fontSize: 11,
    fontFamily: 'monospace',
  },
  footer: {
    alignItems: 'flex-end',
    marginTop: 4,
  },
});
