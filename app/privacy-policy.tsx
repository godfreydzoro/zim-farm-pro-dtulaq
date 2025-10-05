
import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

export default function PrivacyPolicyScreen() {
  const router = useRouter();

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
            title: "Privacy Policy",
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
          <IconSymbol name="shield.fill" size={48} color={colors.primary} />
          <Text style={[commonStyles.title, styles.title]}>Privacy Policy</Text>
          <Text style={[commonStyles.textSecondary, styles.subtitle]}>
            Last updated: January 15, 2024
          </Text>
        </View>

        {/* Introduction */}
        <View style={[commonStyles.card, styles.section]}>
          <Text style={[commonStyles.subtitle, styles.sectionTitle]}>Introduction</Text>
          <Text style={[commonStyles.text, styles.sectionText]}>
            ZimFarm Pro (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and related services.
          </Text>
        </View>

        {/* Information We Collect */}
        <View style={[commonStyles.card, styles.section]}>
          <Text style={[commonStyles.subtitle, styles.sectionTitle]}>Information We Collect</Text>
          
          <View style={styles.subsection}>
            <Text style={[commonStyles.text, styles.subsectionTitle]}>Personal Information</Text>
            <Text style={[commonStyles.textSecondary, styles.sectionText]}>
              • Name and contact information{'\n'}
              • Farm location and size{'\n'}
              • Crop preferences and farming practices{'\n'}
              • Device information and identifiers
            </Text>
          </View>

          <View style={styles.subsection}>
            <Text style={[commonStyles.text, styles.subsectionTitle]}>Location Data</Text>
            <Text style={[commonStyles.textSecondary, styles.sectionText]}>
              We collect precise location data when you use our field mapping features. This data is used to provide location-specific weather forecasts, soil information, and agricultural recommendations.
            </Text>
          </View>

          <View style={styles.subsection}>
            <Text style={[commonStyles.text, styles.subsectionTitle]}>Usage Data</Text>
            <Text style={[commonStyles.textSecondary, styles.sectionText]}>
              We collect information about how you use the app, including features accessed, time spent, and interaction patterns to improve our services.
            </Text>
          </View>
        </View>

        {/* How We Use Information */}
        <View style={[commonStyles.card, styles.section]}>
          <Text style={[commonStyles.subtitle, styles.sectionTitle]}>How We Use Your Information</Text>
          <Text style={[commonStyles.textSecondary, styles.sectionText]}>
            We use the collected information to:{'\n\n'}
            • Provide personalized farming recommendations{'\n'}
            • Send weather alerts and crop notifications{'\n'}
            • Improve app functionality and user experience{'\n'}
            • Provide customer support{'\n'}
            • Ensure app security and prevent fraud{'\n'}
            • Comply with legal obligations
          </Text>
        </View>

        {/* Data Sharing */}
        <View style={[commonStyles.card, styles.section]}>
          <Text style={[commonStyles.subtitle, styles.sectionTitle]}>Information Sharing</Text>
          <Text style={[commonStyles.textSecondary, styles.sectionText]}>
            We do not sell, trade, or rent your personal information to third parties. We may share information in the following circumstances:{'\n\n'}
            • With agricultural extension services (with your consent){'\n'}
            • With weather data providers for accurate forecasts{'\n'}
            • With service providers who assist in app operations{'\n'}
            • When required by law or to protect our rights{'\n'}
            • In case of business transfer or merger
          </Text>
        </View>

        {/* Data Security */}
        <View style={[commonStyles.card, styles.section]}>
          <Text style={[commonStyles.subtitle, styles.sectionTitle]}>Data Security</Text>
          <Text style={[commonStyles.textSecondary, styles.sectionText]}>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:{'\n\n'}
            • Encryption of data in transit and at rest{'\n'}
            • Regular security assessments{'\n'}
            • Access controls and authentication{'\n'}
            • Secure data storage practices
          </Text>
        </View>

        {/* Data Retention */}
        <View style={[commonStyles.card, styles.section]}>
          <Text style={[commonStyles.subtitle, styles.sectionTitle]}>Data Retention</Text>
          <Text style={[commonStyles.textSecondary, styles.sectionText]}>
            We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. You may request deletion of your data at any time through the app settings or by contacting us.
          </Text>
        </View>

        {/* Your Rights */}
        <View style={[commonStyles.card, styles.section]}>
          <Text style={[commonStyles.subtitle, styles.sectionTitle]}>Your Rights</Text>
          <Text style={[commonStyles.textSecondary, styles.sectionText]}>
            You have the right to:{'\n\n'}
            • Access your personal information{'\n'}
            • Correct inaccurate data{'\n'}
            • Delete your personal information{'\n'}
            • Restrict processing of your data{'\n'}
            • Data portability{'\n'}
            • Withdraw consent at any time{'\n'}
            • Lodge a complaint with supervisory authorities
          </Text>
        </View>

        {/* Children's Privacy */}
        <View style={[commonStyles.card, styles.section]}>
          <Text style={[commonStyles.subtitle, styles.sectionTitle]}>Children&apos;s Privacy</Text>
          <Text style={[commonStyles.textSecondary, styles.sectionText]}>
            Our app is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
          </Text>
        </View>

        {/* Changes to Policy */}
        <View style={[commonStyles.card, styles.section]}>
          <Text style={[commonStyles.subtitle, styles.sectionTitle]}>Changes to This Policy</Text>
          <Text style={[commonStyles.textSecondary, styles.sectionText]}>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy in the app and updating the &quot;Last updated&quot; date. You are advised to review this Privacy Policy periodically for any changes.
          </Text>
        </View>

        {/* Contact Information */}
        <View style={[commonStyles.card, styles.contactSection]}>
          <View style={styles.contactHeader}>
            <IconSymbol name="envelope.fill" size={24} color={colors.primary} />
            <Text style={[commonStyles.subtitle, styles.contactTitle]}>Contact Us</Text>
          </View>
          <Text style={[commonStyles.textSecondary, styles.sectionText]}>
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </Text>
          <View style={styles.contactDetails}>
            <View style={styles.contactItem}>
              <IconSymbol name="envelope" size={16} color={colors.textSecondary} />
              <Text style={[commonStyles.text, styles.contactText]}>privacy@zimfarmpro.zw</Text>
            </View>
            <View style={styles.contactItem}>
              <IconSymbol name="phone" size={16} color={colors.textSecondary} />
              <Text style={[commonStyles.text, styles.contactText]}>+263-4-123-4567</Text>
            </View>
            <View style={styles.contactItem}>
              <IconSymbol name="location" size={16} color={colors.textSecondary} />
              <Text style={[commonStyles.text, styles.contactText]}>
                123 Agricultural Drive, Harare, Zimbabwe
              </Text>
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
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    color: colors.primary,
    marginBottom: 12,
  },
  sectionText: {
    lineHeight: 22,
  },
  subsection: {
    marginBottom: 16,
  },
  subsectionTitle: {
    fontWeight: '600',
    marginBottom: 8,
  },
  contactSection: {
    backgroundColor: colors.highlight,
    marginBottom: 16,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactTitle: {
    marginLeft: 8,
    color: colors.primary,
  },
  contactDetails: {
    marginTop: 16,
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  contactText: {
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  bottomSpacing: {
    height: Platform.OS === 'ios' ? 20 : 100,
  },
});
