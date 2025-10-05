
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Alert,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import SoilTypeOverlay from '@/components/SoilTypeOverlay';
import { colors, commonStyles } from '@/styles/commonStyles';
import { soilTypes, soilTypeDescriptions } from '@/data/zimbabweData';

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

export default function FieldDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // In a real app, you would fetch field data based on the ID
  // For now, we'll create a sample field
  const [field] = useState<FieldBoundary>({
    id: params.id as string || '1',
    name: params.name as string || 'Sample Field',
    points: [
      { latitude: -17.8252, longitude: 31.0335, timestamp: Date.now() },
      { latitude: -17.8262, longitude: 31.0345, timestamp: Date.now() },
      { latitude: -17.8272, longitude: 31.0335, timestamp: Date.now() },
      { latitude: -17.8262, longitude: 31.0325, timestamp: Date.now() },
    ],
    area: 2.5,
    soilType: 'Clay loam',
    createdAt: new Date(),
  });

  const [selectedSoilType, setSelectedSoilType] = useState(field.soilType || '');
  const [showSoilOverlay, setShowSoilOverlay] = useState(false);

  const calculatePerimeter = (): number => {
    if (field.points.length < 2) return 0;
    
    let perimeter = 0;
    for (let i = 0; i < field.points.length; i++) {
      const current = field.points[i];
      const next = field.points[(i + 1) % field.points.length];
      
      // Haversine formula for distance between two points
      const R = 6371000; // Earth's radius in meters
      const lat1 = current.latitude * Math.PI / 180;
      const lat2 = next.latitude * Math.PI / 180;
      const deltaLat = (next.latitude - current.latitude) * Math.PI / 180;
      const deltaLon = (next.longitude - current.longitude) * Math.PI / 180;
      
      const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
                Math.cos(lat1) * Math.cos(lat2) *
                Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c;
      
      perimeter += distance;
    }
    
    return perimeter;
  };

  const getCenterPoint = () => {
    if (field.points.length === 0) return { latitude: 0, longitude: 0 };
    
    const avgLat = field.points.reduce((sum, p) => sum + p.latitude, 0) / field.points.length;
    const avgLon = field.points.reduce((sum, p) => sum + p.longitude, 0) / field.points.length;
    
    return { latitude: avgLat, longitude: avgLon };
  };

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

  const updateSoilType = () => {
    setShowSoilOverlay(true);
  };

  const handleSoilTypeSelect = (soilType: string) => {
    setSelectedSoilType(soilType);
    setShowSoilOverlay(false);
    Alert.alert('Success', `Soil type updated to ${soilType}`);
  };

  const exportFieldData = () => {
    const fieldData = {
      name: field.name,
      area: field.area,
      perimeter: calculatePerimeter(),
      soilType: selectedSoilType,
      coordinates: field.points,
      center: getCenterPoint(),
      createdAt: field.createdAt.toISOString(),
    };

    Alert.alert(
      'Export Field Data',
      `Field data prepared for export:\n\n${JSON.stringify(fieldData, null, 2).substring(0, 200)}...`,
      [
        { text: 'OK' }
      ]
    );
  };

  const renderHeaderRight = () => (
    <TouchableOpacity
      onPress={() => Alert.alert("Field Actions", "Additional field management options would be available here, such as sharing field data, exporting to KML, or integrating with farming equipment.")}
      style={styles.headerButton}
    >
      <IconSymbol name="ellipsis.circle" color={colors.text} size={20} />
    </TouchableOpacity>
  );

  const center = getCenterPoint();
  const perimeter = calculatePerimeter();

  return (
    <SafeAreaView style={[commonStyles.safeArea, { backgroundColor: colors.background }]}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: field.name,
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.text,
            headerRight: renderHeaderRight,
          }}
        />
      )}

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Field Overview */}
        <View style={[commonStyles.card, styles.overviewCard]}>
          <View style={styles.cardHeader}>
            <IconSymbol name="map.fill" size={24} color={colors.primary} />
            <Text style={[commonStyles.subtitle, styles.cardTitle]}>Field Overview</Text>
          </View>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <IconSymbol name="ruler" size={20} color={colors.success} />
              <Text style={[commonStyles.text, styles.statLabel]}>Area</Text>
              <Text style={[commonStyles.title, styles.statValue]}>{field.area.toFixed(2)} ha</Text>
            </View>
            
            <View style={styles.statItem}>
              <IconSymbol name="arrow.triangle.2.circlepath" size={20} color={colors.info} />
              <Text style={[commonStyles.text, styles.statLabel]}>Perimeter</Text>
              <Text style={[commonStyles.title, styles.statValue]}>{(perimeter / 1000).toFixed(2)} km</Text>
            </View>
            
            <View style={styles.statItem}>
              <IconSymbol name="location" size={20} color={colors.accent} />
              <Text style={[commonStyles.text, styles.statLabel]}>Points</Text>
              <Text style={[commonStyles.title, styles.statValue]}>{field.points.length}</Text>
            </View>
            
            <View style={styles.statItem}>
              <IconSymbol name="calendar" size={20} color={colors.warning} />
              <Text style={[commonStyles.text, styles.statLabel]}>Created</Text>
              <Text style={[commonStyles.text, styles.statValue]}>{field.createdAt.toLocaleDateString()}</Text>
            </View>
          </View>
        </View>

        {/* Soil Information */}
        <View style={[commonStyles.card, styles.soilCard]}>
          <View style={styles.cardHeader}>
            <IconSymbol name="globe.americas" size={24} color={colors.accent} />
            <Text style={[commonStyles.subtitle, styles.cardTitle]}>Soil Information</Text>
          </View>
          
          <View style={styles.soilTypeContainer}>
            <View style={[styles.soilTypeIndicator, { backgroundColor: getSoilTypeColor(selectedSoilType) }]} />
            <View style={styles.soilTypeInfo}>
              <Text style={[commonStyles.text, styles.soilTypeText]}>
                {selectedSoilType || 'Not specified'}
              </Text>
              {selectedSoilType && soilTypeDescriptions[selectedSoilType] && (
                <Text style={[commonStyles.textSecondary, styles.soilDescription]}>
                  {soilTypeDescriptions[selectedSoilType].description}
                </Text>
              )}
            </View>
          </View>
          
          <TouchableOpacity 
            style={[commonStyles.button, styles.updateButton]}
            onPress={updateSoilType}
          >
            <IconSymbol name="pencil" size={16} color={colors.card} />
            <Text style={[commonStyles.buttonText, styles.buttonTextWithIcon]}>Update Soil Type</Text>
          </TouchableOpacity>
        </View>

        {/* Soil Type Overlay */}
        {showSoilOverlay && (
          <View style={styles.overlayContainer}>
            <SoilTypeOverlay
              selectedSoilType={selectedSoilType}
              onSoilTypeSelect={handleSoilTypeSelect}
              showDetails={true}
            />
            <TouchableOpacity 
              style={[commonStyles.button, styles.closeButton]}
              onPress={() => setShowSoilOverlay(false)}
            >
              <Text style={commonStyles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Location Details */}
        <View style={[commonStyles.card, styles.locationCard]}>
          <View style={styles.cardHeader}>
            <IconSymbol name="location.fill" size={24} color={colors.success} />
            <Text style={[commonStyles.subtitle, styles.cardTitle]}>Location Details</Text>
          </View>
          
          <View style={styles.coordinateItem}>
            <Text style={[commonStyles.text, styles.coordinateLabel]}>Center Point:</Text>
            <Text style={[commonStyles.textSecondary, styles.coordinateValue]}>
              {center.latitude.toFixed(6)}°, {center.longitude.toFixed(6)}°
            </Text>
          </View>
          
          <View style={styles.boundaryPoints}>
            <Text style={[commonStyles.text, styles.pointsTitle]}>Boundary Points:</Text>
            {field.points.map((point, index) => (
              <View key={index} style={styles.pointItem}>
                <Text style={[commonStyles.textSecondary, styles.pointIndex]}>
                  {index + 1}.
                </Text>
                <Text style={[commonStyles.textSecondary, styles.pointCoords]}>
                  {point.latitude.toFixed(6)}°, {point.longitude.toFixed(6)}°
                </Text>
                {point.accuracy && (
                  <Text style={[commonStyles.textSecondary, styles.pointAccuracy]}>
                    ±{point.accuracy.toFixed(1)}m
                  </Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Actions */}
        <View style={[commonStyles.card, styles.actionsCard]}>
          <View style={styles.cardHeader}>
            <IconSymbol name="gear" size={24} color={colors.warning} />
            <Text style={[commonStyles.subtitle, styles.cardTitle]}>Field Actions</Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.exportButton]}
            onPress={exportFieldData}
          >
            <IconSymbol name="square.and.arrow.up" size={20} color={colors.info} />
            <Text style={[commonStyles.text, styles.actionButtonText]}>Export Field Data</Text>
            <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.shareButton]}
            onPress={() => Alert.alert('Share Field', 'Field sharing functionality would allow you to share field boundaries with other farmers, agricultural advisors, or equipment operators.')}
          >
            <IconSymbol name="person.2" size={20} color={colors.success} />
            <Text style={[commonStyles.text, styles.actionButtonText]}>Share with Others</Text>
            <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.cropButton]}
            onPress={() => Alert.alert('Crop Planning', 'This would open crop planning tools specific to this field, considering its size, soil type, and location within Zimbabwe.')}
          >
            <IconSymbol name="leaf.fill" size={20} color={colors.accent} />
            <Text style={[commonStyles.text, styles.actionButtonText]}>Plan Crops for Field</Text>
            <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Map Notice */}
        <View style={[commonStyles.card, styles.noticeCard]}>
          <IconSymbol name="info.circle" size={20} color={colors.info} />
          <Text style={[commonStyles.textSecondary, styles.noticeText]}>
            In a full implementation, this screen would display an interactive map showing your field boundaries overlaid on satellite imagery with soil type data for Zimbabwe. The field would be highlighted with different colors based on soil composition and agricultural zones.
          </Text>
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
  overviewCard: {
    marginBottom: 16,
  },
  soilCard: {
    marginBottom: 16,
  },
  locationCard: {
    marginBottom: 16,
  },
  actionsCard: {
    marginBottom: 16,
  },
  noticeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.highlight,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    marginLeft: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.highlight,
    borderRadius: 8,
    marginBottom: 8,
  },
  statLabel: {
    marginTop: 4,
    fontSize: 13,
  },
  statValue: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: '600',
  },
  soilTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: colors.highlight,
    borderRadius: 8,
  },
  soilTypeIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  soilTypeInfo: {
    flex: 1,
  },
  soilTypeText: {
    marginBottom: 4,
  },
  soilDescription: {
    fontSize: 13,
    fontStyle: 'italic',
  },
  updateButton: {
    backgroundColor: colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextWithIcon: {
    marginLeft: 8,
  },
  coordinateItem: {
    marginBottom: 16,
  },
  coordinateLabel: {
    marginBottom: 4,
  },
  coordinateValue: {
    fontFamily: 'monospace',
    fontSize: 13,
  },
  boundaryPoints: {
    marginTop: 8,
  },
  pointsTitle: {
    marginBottom: 8,
  },
  pointItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  pointIndex: {
    width: 24,
    fontSize: 13,
  },
  pointCoords: {
    flex: 1,
    fontFamily: 'monospace',
    fontSize: 12,
  },
  pointAccuracy: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.highlight,
    borderRadius: 8,
    marginBottom: 8,
  },
  actionButtonText: {
    flex: 1,
    marginLeft: 12,
  },
  exportButton: {
    borderLeftWidth: 3,
    borderLeftColor: colors.info,
  },
  shareButton: {
    borderLeftWidth: 3,
    borderLeftColor: colors.success,
  },
  cropButton: {
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  noticeText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 13,
  },
  overlayContainer: {
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: colors.textSecondary,
    marginTop: 8,
  },
  bottomSpacing: {
    height: Platform.OS === 'ios' ? 20 : 100,
  },
});
