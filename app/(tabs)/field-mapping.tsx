
import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  Platform,
  ScrollView,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { IconSymbol } from '@/components/IconSymbol';
import FieldBoundaryCard from '@/components/FieldBoundaryCard';
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
  area: number; // in hectares
  soilType?: string;
  createdAt: Date;
}

export default function FieldMappingScreen() {
  const router = useRouter();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [currentField, setCurrentField] = useState<LocationPoint[]>([]);
  const [savedFields, setSavedFields] = useState<FieldBoundary[]>([]);
  const [permissionStatus, setPermissionStatus] = useState<string>('checking');
  const [isLoading, setIsLoading] = useState(false);
  const locationSubscription = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
    checkLocationPermission();
    return () => {
      if (locationSubscription.current) {
        locationSubscription.current.remove();
      }
    };
  }, []);

  const checkLocationPermission = async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
        setPermissionStatus(newStatus);
      } else {
        setPermissionStatus(status);
      }
      
      if (status === 'granted' || permissionStatus === 'granted') {
        getCurrentLocation();
      }
    } catch (error) {
      console.log('Error checking location permission:', error);
      Alert.alert('Error', 'Failed to check location permissions');
    }
  };

  const getCurrentLocation = async () => {
    try {
      setIsLoading(true);
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(currentLocation);
    } catch (error) {
      console.log('Error getting current location:', error);
      Alert.alert('Error', 'Failed to get current location');
    } finally {
      setIsLoading(false);
    }
  };

  const startFieldMapping = async () => {
    if (permissionStatus !== 'granted') {
      Alert.alert('Permission Required', 'Location permission is required for field mapping');
      return;
    }

    try {
      setIsTracking(true);
      setCurrentField([]);
      
      // Start watching position with high accuracy
      locationSubscription.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 2000, // Update every 2 seconds
          distanceInterval: 5, // Update every 5 meters
        },
        (newLocation) => {
          const point: LocationPoint = {
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
            timestamp: newLocation.timestamp,
            accuracy: newLocation.coords.accuracy || undefined,
          };
          
          setCurrentField(prev => [...prev, point]);
          setLocation(newLocation);
        }
      );

      Alert.alert(
        'Field Mapping Started', 
        'Walk around the perimeter of your field. The app will track your GPS coordinates to create a boundary map.'
      );
    } catch (error) {
      console.log('Error starting field mapping:', error);
      Alert.alert('Error', 'Failed to start field mapping');
      setIsTracking(false);
    }
  };

  const stopFieldMapping = () => {
    if (locationSubscription.current) {
      locationSubscription.current.remove();
      locationSubscription.current = null;
    }
    setIsTracking(false);

    if (currentField.length < 3) {
      Alert.alert('Insufficient Points', 'You need at least 3 points to create a field boundary');
      return;
    }

    // Calculate approximate area (simplified calculation)
    const area = calculatePolygonArea(currentField);
    
    Alert.prompt(
      'Save Field',
      `Field mapped with ${currentField.length} points.\nEstimated area: ${area.toFixed(2)} hectares.\n\nEnter field name:`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Save', 
          onPress: (fieldName) => saveField(fieldName || `Field ${savedFields.length + 1}`, area)
        }
      ]
    );
  };

  const saveField = (name: string, area: number) => {
    const newField: FieldBoundary = {
      id: Date.now().toString(),
      name,
      points: [...currentField],
      area,
      createdAt: new Date(),
    };

    setSavedFields(prev => [...prev, newField]);
    setCurrentField([]);
    
    Alert.alert('Success', `Field "${name}" saved successfully!`);
  };

  const calculatePolygonArea = (points: LocationPoint[]): number => {
    if (points.length < 3) return 0;

    // Simplified area calculation using shoelace formula
    // Convert to approximate meters and then to hectares
    let area = 0;
    const earthRadius = 6371000; // Earth radius in meters

    for (let i = 0; i < points.length; i++) {
      const j = (i + 1) % points.length;
      const lat1 = points[i].latitude * Math.PI / 180;
      const lat2 = points[j].latitude * Math.PI / 180;
      const deltaLon = (points[j].longitude - points[i].longitude) * Math.PI / 180;
      
      const x1 = deltaLon * Math.cos((lat1 + lat2) / 2);
      const y1 = lat2 - lat1;
      
      area += x1 * y1;
    }

    area = Math.abs(area) * earthRadius * earthRadius / 2;
    return area / 10000; // Convert square meters to hectares
  };

  const deleteField = (fieldId: string) => {
    Alert.alert(
      'Delete Field',
      'Are you sure you want to delete this field?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => setSavedFields(prev => prev.filter(field => field.id !== fieldId))
        }
      ]
    );
  };

  const viewFieldDetails = (field: FieldBoundary) => {
    router.push({
      pathname: '/field-details',
      params: { 
        id: field.id, 
        name: field.name 
      }
    });
  };

  const renderHeaderRight = () => (
    <TouchableOpacity
      onPress={() => Alert.alert("Field Mapping Help", "1. Tap 'Start Mapping' to begin\n2. Walk around your field perimeter\n3. Tap 'Stop Mapping' when complete\n4. Save your field with a name\n\nNote: Keep the app open and maintain GPS signal for accurate mapping.")}
      style={styles.headerButton}
    >
      <IconSymbol name="questionmark.circle" color={colors.text} size={20} />
    </TouchableOpacity>
  );

  if (permissionStatus === 'checking') {
    return (
      <SafeAreaView style={[commonStyles.safeArea, { backgroundColor: colors.background }]}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[commonStyles.text, styles.loadingText]}>Checking location permissions...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (permissionStatus !== 'granted') {
    return (
      <SafeAreaView style={[commonStyles.safeArea, { backgroundColor: colors.background }]}>
        <View style={styles.centerContainer}>
          <IconSymbol name="location.slash" size={64} color={colors.textSecondary} />
          <Text style={[commonStyles.title, styles.permissionTitle]}>Location Permission Required</Text>
          <Text style={[commonStyles.text, styles.permissionText]}>
            Field mapping requires access to your device's location to track field boundaries using GPS.
          </Text>
          <TouchableOpacity 
            style={[commonStyles.button, styles.permissionButton]}
            onPress={checkLocationPermission}
          >
            <Text style={commonStyles.buttonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[commonStyles.safeArea, { backgroundColor: colors.background }]}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Field Mapping",
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.text,
            headerRight: renderHeaderRight,
          }}
        />
      )}

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Current Location Info */}
        <View style={[commonStyles.card, styles.locationCard]}>
          <View style={styles.cardHeader}>
            <IconSymbol name="location.fill" size={24} color={colors.primary} />
            <Text style={[commonStyles.subtitle, styles.cardTitle]}>Current Location</Text>
          </View>
          
          {isLoading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : location ? (
            <View style={styles.locationInfo}>
              <Text style={commonStyles.text}>
                Latitude: {location.coords.latitude.toFixed(6)}
              </Text>
              <Text style={commonStyles.text}>
                Longitude: {location.coords.longitude.toFixed(6)}
              </Text>
              <Text style={commonStyles.textSecondary}>
                Accuracy: ±{location.coords.accuracy?.toFixed(1) || 'Unknown'}m
              </Text>
            </View>
          ) : (
            <Text style={commonStyles.textSecondary}>Getting location...</Text>
          )}
          
          <TouchableOpacity 
            style={[styles.refreshButton]}
            onPress={getCurrentLocation}
            disabled={isLoading}
          >
            <IconSymbol name="arrow.clockwise" size={16} color={colors.primary} />
            <Text style={[commonStyles.text, styles.refreshText]}>Refresh</Text>
          </TouchableOpacity>
        </View>

        {/* Field Mapping Controls */}
        <View style={[commonStyles.card, styles.controlsCard]}>
          <View style={styles.cardHeader}>
            <IconSymbol name="map" size={24} color={colors.accent} />
            <Text style={[commonStyles.subtitle, styles.cardTitle]}>Field Mapping</Text>
          </View>

          {currentField.length > 0 && (
            <View style={styles.trackingInfo}>
              <Text style={commonStyles.text}>
                Points recorded: {currentField.length}
              </Text>
              <Text style={commonStyles.textSecondary}>
                Estimated area: {calculatePolygonArea(currentField).toFixed(2)} hectares
              </Text>
            </View>
          )}

          <View style={styles.controlButtons}>
            {!isTracking ? (
              <TouchableOpacity 
                style={[commonStyles.button, styles.startButton]}
                onPress={startFieldMapping}
              >
                <IconSymbol name="play.fill" size={16} color={colors.card} />
                <Text style={[commonStyles.buttonText, styles.buttonTextWithIcon]}>Start Mapping</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={[commonStyles.button, styles.stopButton]}
                onPress={stopFieldMapping}
              >
                <IconSymbol name="stop.fill" size={16} color={colors.card} />
                <Text style={[commonStyles.buttonText, styles.buttonTextWithIcon]}>Stop Mapping</Text>
              </TouchableOpacity>
            )}
          </View>

          {isTracking && (
            <View style={styles.trackingIndicator}>
              <View style={styles.pulsingDot} />
              <Text style={[commonStyles.textSecondary, styles.trackingText]}>
                Tracking your location...
              </Text>
            </View>
          )}
        </View>

        {/* Saved Fields */}
        <View style={[commonStyles.card, styles.fieldsCard]}>
          <View style={styles.cardHeader}>
            <IconSymbol name="square.grid.3x3" size={24} color={colors.success} />
            <Text style={[commonStyles.subtitle, styles.cardTitle]}>Saved Fields</Text>
          </View>

          {savedFields.length === 0 ? (
            <Text style={commonStyles.textSecondary}>No fields mapped yet</Text>
          ) : (
            savedFields.map((field) => (
              <FieldBoundaryCard
                key={field.id}
                field={field}
                onPress={() => viewFieldDetails(field)}
                onDelete={() => deleteField(field.id)}
              />
            ))
          )}
        </View>

        {/* Map Notice */}
        <View style={[commonStyles.card, styles.noticeCard]}>
          <IconSymbol name="info.circle" size={20} color={colors.info} />
          <Text style={[commonStyles.textSecondary, styles.noticeText]}>
            Note: Interactive maps are not supported in Natively. This feature provides GPS-based field boundary tracking and area calculations. In a full implementation, you would see your field boundaries overlaid on a map of Zimbabwe with soil type information.
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.card,
  },
  loadingText: {
    marginTop: 16,
    textAlign: 'center',
  },
  permissionTitle: {
    marginTop: 16,
    textAlign: 'center',
    color: colors.text,
  },
  permissionText: {
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  permissionButton: {
    marginTop: 20,
    backgroundColor: colors.primary,
  },
  locationCard: {
    marginBottom: 16,
  },
  controlsCard: {
    marginBottom: 16,
  },
  fieldsCard: {
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
    marginBottom: 12,
  },
  cardTitle: {
    marginLeft: 8,
  },
  locationInfo: {
    marginBottom: 12,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.highlight,
  },
  refreshText: {
    marginLeft: 4,
    color: colors.primary,
  },
  trackingInfo: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: colors.highlight,
    borderRadius: 8,
  },
  controlButtons: {
    marginBottom: 12,
  },
  startButton: {
    backgroundColor: colors.success,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopButton: {
    backgroundColor: colors.error,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextWithIcon: {
    marginLeft: 8,
  },
  trackingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: colors.highlight,
    borderRadius: 8,
  },
  pulsingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
    marginRight: 8,
  },
  trackingText: {
    fontStyle: 'italic',
  },
  noticeText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 13,
  },
  bottomSpacing: {
    height: Platform.OS === 'ios' ? 20 : 100,
  },
});
