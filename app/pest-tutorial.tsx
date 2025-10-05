
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

const { width } = Dimensions.get('window');

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  tips: string[];
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: 'Take Clear Photos',
    description: 'For best results, capture clear, well-lit images of the affected plant parts.',
    icon: 'camera.fill',
    tips: [
      'Use natural lighting when possible',
      'Keep the camera steady',
      'Focus on the affected area',
      'Include some healthy plant parts for comparison'
    ]
  },
  {
    id: 2,
    title: 'AI Analysis',
    description: 'Our AI will analyze your image and identify potential pests, diseases, or weeds.',
    icon: 'brain.head.profile',
    tips: [
      'Analysis typically takes 2-5 seconds',
      'Higher quality images give better results',
      'The AI is trained on Zimbabwe-specific pests',
      'Confidence scores help gauge accuracy'
    ]
  },
  {
    id: 3,
    title: 'Get Treatment Plans',
    description: 'Receive detailed treatment recommendations including organic and chemical options.',
    icon: 'cross.case.fill',
    tips: [
      'Multiple treatment options provided',
      'Dosage information included',
      'Safety precautions highlighted',
      'Prevention tips for future outbreaks'
    ]
  },
  {
    id: 4,
    title: 'Track Your Results',
    description: 'Keep a history of your identifications and monitor treatment effectiveness.',
    icon: 'chart.line.uptrend.xyaxis',
    tips: [
      'View identification history',
      'Track treatment outcomes',
      'Export results for records',
      'Share with extension officers'
    ]
  }
];

export default function PestTutorialScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const renderHeaderRight = () => (
    <TouchableOpacity
      onPress={() => router.push('/pest-identification')}
      style={styles.headerButton}
    >
      <Text style={styles.skipText}>Skip</Text>
    </TouchableOpacity>
  );

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/pest-identification');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = tutorialSteps[currentStep];

  return (
    <SafeAreaView style={[commonStyles.safeArea, { backgroundColor: colors.background }]}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "How It Works",
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.text,
            headerRight: renderHeaderRight,
          }}
        />
      )}

      <View style={styles.container}>
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {currentStep + 1} of {tutorialSteps.length}
          </Text>
        </View>

        {/* Content */}
        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.stepContainer}>
            {/* Icon */}
            <View style={styles.iconContainer}>
              <IconSymbol name={step.icon} size={64} color={colors.primary} />
            </View>

            {/* Title and Description */}
            <Text style={[commonStyles.title, styles.stepTitle]}>{step.title}</Text>
            <Text style={[commonStyles.text, styles.stepDescription]}>
              {step.description}
            </Text>

            {/* Tips */}
            <View style={styles.tipsContainer}>
              <Text style={[commonStyles.subtitle, styles.tipsTitle]}>Tips:</Text>
              {step.tips.map((tip, index) => (
                <View key={index} style={styles.tipItem}>
                  <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Navigation */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={[
              styles.navButton,
              styles.prevButton,
              currentStep === 0 && styles.disabledButton
            ]}
            onPress={prevStep}
            disabled={currentStep === 0}
          >
            <IconSymbol 
              name="chevron.left" 
              size={20} 
              color={currentStep === 0 ? colors.textSecondary : colors.primary} 
            />
            <Text style={[
              styles.navButtonText,
              currentStep === 0 && styles.disabledText
            ]}>
              Previous
            </Text>
          </TouchableOpacity>

          <View style={styles.dotsContainer}>
            {tutorialSteps.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentStep && styles.activeDot
                ]}
              />
            ))}
          </View>

          <TouchableOpacity
            style={[styles.navButton, styles.nextButton]}
            onPress={nextStep}
          >
            <Text style={styles.nextButtonText}>
              {currentStep === tutorialSteps.length - 1 ? 'Get Started' : 'Next'}
            </Text>
            <IconSymbol name="chevron.right" size={20} color={colors.card} />
          </TouchableOpacity>
        </View>
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
  },
  skipText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.secondary,
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    justifyContent: 'center',
    minHeight: '100%',
  },
  stepContainer: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.highlight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  stepTitle: {
    textAlign: 'center',
    marginBottom: 16,
    color: colors.primary,
  },
  stepDescription: {
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    fontSize: 16,
  },
  tipsContainer: {
    width: '100%',
    maxWidth: 300,
  },
  tipsTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tipText: {
    flex: 1,
    marginLeft: 8,
    color: colors.text,
    lineHeight: 20,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  prevButton: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  nextButton: {
    backgroundColor: colors.primary,
  },
  disabledButton: {
    opacity: 0.5,
  },
  navButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
  },
  nextButtonText: {
    marginRight: 8,
    fontSize: 16,
    fontWeight: '500',
    color: colors.card,
  },
  disabledText: {
    color: colors.textSecondary,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
  },
  activeDot: {
    backgroundColor: colors.primary,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
