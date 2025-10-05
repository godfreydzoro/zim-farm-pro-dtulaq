
import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

export default function LanguageSettingsScreen() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      description: 'Default language for the app'
    },
    {
      code: 'sn',
      name: 'Shona',
      nativeName: 'ChiShona',
      description: 'Mutauro wekuZimbabwe'
    },
    {
      code: 'nd',
      name: 'Ndebele',
      nativeName: 'IsiNdebele',
      description: 'Ulimi lwaseZimbabwe'
    }
  ];

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    Alert.alert(
      'Language Changed',
      `Language has been set to ${language}. The app will restart to apply changes.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Restart App', onPress: () => console.log('App would restart here') }
      ]
    );
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
            title: "Language Settings",
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
          <IconSymbol name="globe" size={48} color={colors.primary} />
          <Text style={[commonStyles.title, styles.title]}>Language Settings</Text>
          <Text style={[commonStyles.textSecondary, styles.subtitle]}>
            Choose your preferred language for the app interface
          </Text>
        </View>

        {/* Current Language */}
        <View style={[commonStyles.card, styles.currentCard]}>
          <View style={styles.currentHeader}>
            <IconSymbol name="checkmark.circle.fill" size={24} color={colors.success} />
            <Text style={[commonStyles.subtitle, styles.currentTitle]}>Current Language</Text>
          </View>
          <Text style={[commonStyles.text, styles.currentLanguage]}>{selectedLanguage}</Text>
        </View>

        {/* Language Options */}
        <View style={styles.languagesList}>
          <Text style={[commonStyles.subtitle, styles.sectionTitle]}>Available Languages</Text>
          
          {languages.map((language) => (
            <TouchableOpacity
              key={language.code}
              style={[
                commonStyles.card,
                styles.languageCard,
                selectedLanguage === language.name && styles.selectedLanguageCard
              ]}
              onPress={() => handleLanguageSelect(language.name)}
            >
              <View style={styles.languageInfo}>
                <View style={styles.languageHeader}>
                  <Text style={[commonStyles.text, styles.languageName]}>{language.name}</Text>
                  <Text style={[commonStyles.textSecondary, styles.nativeName]}>
                    {language.nativeName}
                  </Text>
                </View>
                <Text style={[commonStyles.textSecondary, styles.languageDescription]}>
                  {language.description}
                </Text>
              </View>
              
              <View style={styles.selectionIndicator}>
                {selectedLanguage === language.name ? (
                  <IconSymbol name="checkmark.circle.fill" size={24} color={colors.success} />
                ) : (
                  <IconSymbol name="circle" size={24} color={colors.textSecondary} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Language Features */}
        <View style={[commonStyles.card, styles.featuresCard]}>
          <View style={styles.featuresHeader}>
            <IconSymbol name="star.fill" size={24} color={colors.accent} />
            <Text style={[commonStyles.subtitle, styles.featuresTitle]}>Language Features</Text>
          </View>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <IconSymbol name="checkmark" size={16} color={colors.success} />
              <Text style={[commonStyles.text, styles.featureText]}>
                Complete interface translation
              </Text>
            </View>
            <View style={styles.featureItem}>
              <IconSymbol name="checkmark" size={16} color={colors.success} />
              <Text style={[commonStyles.text, styles.featureText]}>
                Localized crop names and terminology
              </Text>
            </View>
            <View style={styles.featureItem}>
              <IconSymbol name="checkmark" size={16} color={colors.success} />
              <Text style={[commonStyles.text, styles.featureText]}>
                Cultural farming practices
              </Text>
            </View>
            <View style={styles.featureItem}>
              <IconSymbol name="checkmark" size={16} color={colors.success} />
              <Text style={[commonStyles.text, styles.featureText]}>
                Local weather terminology
              </Text>
            </View>
          </View>
        </View>

        {/* Regional Information */}
        <View style={[commonStyles.card, styles.regionalCard]}>
          <View style={styles.regionalHeader}>
            <IconSymbol name="map.fill" size={24} color={colors.info} />
            <Text style={[commonStyles.subtitle, styles.regionalTitle]}>Regional Usage</Text>
          </View>
          <View style={styles.regionalInfo}>
            <View style={styles.regionalItem}>
              <Text style={[commonStyles.text, styles.regionalLanguage]}>English</Text>
              <Text style={[commonStyles.textSecondary, styles.regionalUsage]}>
                National language, used in all provinces
              </Text>
            </View>
            <View style={styles.regionalItem}>
              <Text style={[commonStyles.text, styles.regionalLanguage]}>Shona</Text>
              <Text style={[commonStyles.textSecondary, styles.regionalUsage]}>
                Mashonaland, Manicaland, Masvingo provinces
              </Text>
            </View>
            <View style={styles.regionalItem}>
              <Text style={[commonStyles.text, styles.regionalLanguage]}>Ndebele</Text>
              <Text style={[commonStyles.textSecondary, styles.regionalUsage]}>
                Matabeleland, Bulawayo provinces
              </Text>
            </View>
          </View>
        </View>

        {/* Apply Button */}
        <TouchableOpacity 
          style={styles.applyButton}
          onPress={() => {
            Alert.alert('Settings Saved', 'Language settings have been saved successfully.');
            router.back();
          }}
        >
          <IconSymbol name="checkmark" size={20} color={colors.card} />
          <Text style={styles.applyButtonText}>Apply Language Settings</Text>
        </TouchableOpacity>

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
  currentCard: {
    backgroundColor: colors.highlight,
    marginBottom: 20,
  },
  currentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  currentTitle: {
    marginLeft: 8,
    color: colors.success,
  },
  currentLanguage: {
    fontSize: 18,
    fontWeight: '600',
  },
  languagesList: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 12,
    color: colors.primary,
  },
  languageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 16,
  },
  selectedLanguageCard: {
    borderWidth: 2,
    borderColor: colors.success,
    backgroundColor: colors.highlight,
  },
  languageInfo: {
    flex: 1,
  },
  languageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  languageName: {
    fontWeight: '600',
    marginRight: 12,
  },
  nativeName: {
    fontStyle: 'italic',
  },
  languageDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  selectionIndicator: {
    marginLeft: 12,
  },
  featuresCard: {
    backgroundColor: colors.highlight,
    marginBottom: 20,
  },
  featuresHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featuresTitle: {
    marginLeft: 8,
    color: colors.accent,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    marginLeft: 12,
    flex: 1,
  },
  regionalCard: {
    marginBottom: 20,
  },
  regionalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  regionalTitle: {
    marginLeft: 8,
    color: colors.info,
  },
  regionalInfo: {
    gap: 12,
  },
  regionalItem: {
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  regionalLanguage: {
    fontWeight: '600',
    marginBottom: 4,
  },
  regionalUsage: {
    fontSize: 13,
    lineHeight: 18,
  },
  applyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 20,
  },
  applyButtonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  bottomSpacing: {
    height: Platform.OS === 'ios' ? 20 : 100,
  },
});
