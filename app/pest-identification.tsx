
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
  Image,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, useCameraPermissions } from 'expo-camera';

const { width } = Dimensions.get('window');

interface IdentificationResult {
  id: string;
  confidence: number;
  identifiedPest: string;
  timestamp: string;
  imageUri: string;
  severity: 'low' | 'medium' | 'high';
  recommendations: string[];
}

export default function PestIdentificationScreen() {
  const router = useRouter();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [identificationResult, setIdentificationResult] = useState<IdentificationResult | null>(null);
  const cameraRef = useRef<CameraView>(null);

  const renderHeaderRight = () => (
    <TouchableOpacity
      onPress={() => router.push('/pest-history')}
      style={styles.headerButton}
    >
      <IconSymbol name="clock" color={colors.text} size={20} />
    </TouchableOpacity>
  );

  const requestPermissions = async () => {
    if (!cameraPermission?.granted) {
      const result = await requestCameraPermission();
      return result.granted;
    }
    return true;
  };

  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert('Permission Required', 'Camera permission is required to take photos.');
      return;
    }
    setShowCamera(true);
  };

  const capturePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        
        if (photo) {
          setSelectedImage(photo.uri);
          setShowCamera(false);
          analyzeImage(photo.uri);
        }
      } catch (error) {
        console.log('Error taking photo:', error);
        Alert.alert('Error', 'Failed to take photo. Please try again.');
      }
    }
  };

  const pickFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
        analyzeImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const analyzeImage = async (imageUri: string) => {
    setIsAnalyzing(true);
    setIdentificationResult(null);

    try {
      // Simulate AI analysis with a delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock AI result - in a real app, this would call an AI service
      const mockResult: IdentificationResult = {
        id: `result-${Date.now()}`,
        confidence: 0.89,
        identifiedPest: 'fall-armyworm',
        timestamp: new Date().toISOString(),
        imageUri,
        severity: 'high',
        recommendations: [
          'Apply Bacillus thuringiensis (Bt) spray immediately',
          'Monitor field daily for spread',
          'Consider chemical treatment if organic methods fail',
          'Remove and destroy heavily infested plants'
        ]
      };

      setIdentificationResult(mockResult);
    } catch (error) {
      console.log('Error analyzing image:', error);
      Alert.alert('Error', 'Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const retakePhoto = () => {
    setSelectedImage(null);
    setIdentificationResult(null);
    setShowCamera(false);
  };

  const viewDetailedResults = () => {
    if (identificationResult) {
      router.push({
        pathname: '/pest-results',
        params: {
          resultId: identificationResult.id,
          pestId: identificationResult.identifiedPest,
          confidence: identificationResult.confidence.toString(),
          severity: identificationResult.severity,
          imageUri: identificationResult.imageUri
        }
      });
    }
  };

  if (showCamera) {
    return (
      <SafeAreaView style={[commonStyles.safeArea, { backgroundColor: 'black' }]}>
        <Stack.Screen
          options={{
            title: "Take Photo",
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white',
            headerLeft: () => (
              <TouchableOpacity onPress={() => setShowCamera(false)}>
                <IconSymbol name="xmark" color="white" size={20} />
              </TouchableOpacity>
            ),
          }}
        />
        
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing="back"
        >
          <View style={styles.cameraOverlay}>
            <View style={styles.cameraFrame} />
            <Text style={styles.cameraInstructions}>
              Position the pest, disease, or weed within the frame
            </Text>
            
            <View style={styles.cameraControls}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowCamera(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.captureButton}
                onPress={capturePhoto}
              >
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.galleryButton}
                onPress={() => {
                  setShowCamera(false);
                  pickFromGallery();
                }}
              >
                <IconSymbol name="photo" color="white" size={24} />
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[commonStyles.safeArea, { backgroundColor: colors.background }]}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Pest Identification",
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
          <IconSymbol name="camera.fill" size={48} color={colors.primary} />
          <Text style={[commonStyles.title, styles.title]}>AI Pest Identification</Text>
          <Text style={[commonStyles.textSecondary, styles.subtitle]}>
            Take a photo to identify pests, diseases, and weeds affecting your crops
          </Text>
        </View>

        {/* Image Selection */}
        {!selectedImage && !isAnalyzing && (
          <View style={styles.imageSelectionContainer}>
            <TouchableOpacity
              style={[styles.actionButton, styles.cameraButton]}
              onPress={takePhoto}
            >
              <IconSymbol name="camera.fill" size={32} color={colors.card} />
              <Text style={styles.actionButtonText}>Take Photo</Text>
              <Text style={styles.actionButtonSubtext}>Use camera to capture image</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.galleryButtonAction]}
              onPress={pickFromGallery}
            >
              <IconSymbol name="photo.fill" size={32} color={colors.card} />
              <Text style={styles.actionButtonText}>Choose from Gallery</Text>
              <Text style={styles.actionButtonSubtext}>Select existing photo</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Selected Image */}
        {selectedImage && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
            
            {!isAnalyzing && !identificationResult && (
              <TouchableOpacity
                style={styles.retakeButton}
                onPress={retakePhoto}
              >
                <IconSymbol name="arrow.clockwise" size={16} color={colors.primary} />
                <Text style={styles.retakeButtonText}>Retake Photo</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Analysis Loading */}
        {isAnalyzing && (
          <View style={styles.analysisContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={[commonStyles.subtitle, styles.analysisText]}>
              Analyzing Image...
            </Text>
            <Text style={commonStyles.textSecondary}>
              Our AI is identifying the pest or disease in your image
            </Text>
          </View>
        )}

        {/* Results */}
        {identificationResult && (
          <View style={styles.resultsContainer}>
            <View style={[commonStyles.card, styles.resultCard]}>
              <View style={styles.resultHeader}>
                <IconSymbol 
                  name={identificationResult.severity === 'high' ? 'exclamationmark.triangle.fill' : 
                        identificationResult.severity === 'medium' ? 'exclamationmark.circle.fill' : 
                        'checkmark.circle.fill'} 
                  size={24} 
                  color={identificationResult.severity === 'high' ? colors.error : 
                         identificationResult.severity === 'medium' ? colors.warning : 
                         colors.success} 
                />
                <View style={styles.resultInfo}>
                  <Text style={[commonStyles.subtitle, styles.resultTitle]}>
                    Fall Armyworm Detected
                  </Text>
                  <Text style={commonStyles.textSecondary}>
                    Confidence: {Math.round(identificationResult.confidence * 100)}%
                  </Text>
                </View>
              </View>

              <View style={styles.severityContainer}>
                <Text style={styles.severityLabel}>Severity Level:</Text>
                <View style={[
                  styles.severityBadge,
                  { backgroundColor: identificationResult.severity === 'high' ? colors.error : 
                                   identificationResult.severity === 'medium' ? colors.warning : 
                                   colors.success }
                ]}>
                  <Text style={styles.severityText}>
                    {identificationResult.severity.toUpperCase()}
                  </Text>
                </View>
              </View>

              <Text style={[commonStyles.subtitle, styles.recommendationsTitle]}>
                Immediate Actions:
              </Text>
              {identificationResult.recommendations.slice(0, 2).map((recommendation, index) => (
                <View key={index} style={styles.recommendationItem}>
                  <IconSymbol name="checkmark.circle" size={16} color={colors.success} />
                  <Text style={styles.recommendationText}>{recommendation}</Text>
                </View>
              ))}

              <TouchableOpacity
                style={styles.detailsButton}
                onPress={viewDetailedResults}
              >
                <Text style={styles.detailsButtonText}>View Detailed Treatment Plan</Text>
                <IconSymbol name="chevron.right" size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Tips */}
        <View style={[commonStyles.card, styles.tipsCard]}>
          <Text style={[commonStyles.subtitle, styles.tipsTitle]}>Photography Tips</Text>
          <View style={styles.tipItem}>
            <IconSymbol name="lightbulb" size={16} color={colors.warning} />
            <Text style={styles.tipText}>Take photos in good lighting conditions</Text>
          </View>
          <View style={styles.tipItem}>
            <IconSymbol name="viewfinder" size={16} color={colors.warning} />
            <Text style={styles.tipText}>Focus on the affected area of the plant</Text>
          </View>
          <View style={styles.tipItem}>
            <IconSymbol name="hand.raised" size={16} color={colors.warning} />
            <Text style={styles.tipText}>Keep the camera steady for clear images</Text>
          </View>
          <View style={styles.tipItem}>
            <IconSymbol name="ruler" size={16} color={colors.warning} />
            <Text style={styles.tipText}>Include some healthy plant parts for comparison</Text>
          </View>
        </View>

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
    marginBottom: 24,
  },
  title: {
    color: colors.primary,
    textAlign: 'center',
    marginTop: 12,
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 8,
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.card,
  },
  imageSelectionContainer: {
    gap: 16,
    marginBottom: 24,
  },
  actionButton: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 12,
    marginBottom: 8,
  },
  cameraButton: {
    backgroundColor: colors.primary,
  },
  galleryButtonAction: {
    backgroundColor: colors.secondary,
  },
  actionButtonText: {
    color: colors.card,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
  },
  actionButtonSubtext: {
    color: colors.card,
    fontSize: 14,
    opacity: 0.8,
    marginTop: 4,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  selectedImage: {
    width: width - 32,
    height: (width - 32) * 0.75,
    borderRadius: 12,
    marginBottom: 12,
  },
  retakeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  retakeButtonText: {
    color: colors.primary,
    marginLeft: 8,
    fontWeight: '500',
  },
  analysisContainer: {
    alignItems: 'center',
    padding: 32,
    marginBottom: 24,
  },
  analysisText: {
    marginTop: 16,
    marginBottom: 8,
  },
  resultsContainer: {
    marginBottom: 24,
  },
  resultCard: {
    backgroundColor: colors.highlight,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultInfo: {
    marginLeft: 12,
    flex: 1,
  },
  resultTitle: {
    marginBottom: 4,
  },
  severityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  severityLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginRight: 12,
  },
  severityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    color: colors.card,
    fontSize: 12,
    fontWeight: '600',
  },
  recommendationsTitle: {
    marginBottom: 12,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  recommendationText: {
    flex: 1,
    marginLeft: 8,
    color: colors.text,
    lineHeight: 20,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  detailsButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  tipsCard: {
    backgroundColor: colors.highlight,
    marginBottom: 16,
  },
  tipsTitle: {
    marginBottom: 16,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipText: {
    marginLeft: 12,
    color: colors.text,
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50,
  },
  cameraFrame: {
    width: width * 0.8,
    height: width * 0.8,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  cameraInstructions: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 8,
    borderRadius: 8,
  },
  cameraControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 40,
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
  },
  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSpacing: {
    height: Platform.OS === 'ios' ? 20 : 100,
  },
});
