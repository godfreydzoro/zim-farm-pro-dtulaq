
import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Platform, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

export default function HelpSupportScreen() {
  const router = useRouter();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqItems = [
    {
      question: 'How do I add a new field to my farm?',
      answer: 'Go to the Field Mapping tab, tap the "+" button, and use GPS to mark your field boundaries. You can also manually enter field details.'
    },
    {
      question: 'Why are my weather alerts not working?',
      answer: 'Check your notification settings in Profile > Notification Preferences. Ensure weather alerts are enabled and you have granted notification permissions.'
    },
    {
      question: 'How accurate are the market prices?',
      answer: 'Market prices are updated weekly from official sources including commodity exchanges and marketing boards. Prices may vary by location and quality.'
    },
    {
      question: 'Can I use the app offline?',
      answer: 'Yes! Enable offline mode in Data & Sync Settings. The app will sync your data when you reconnect to the internet.'
    },
    {
      question: 'How do I change the app language?',
      answer: 'Go to Profile > Language Settings and select your preferred language (English, Shona, or Ndebele). The app will restart to apply changes.'
    },
    {
      question: 'What crops are supported?',
      answer: 'The app supports major Zimbabwean crops including maize, tobacco, cotton, soybean, wheat, and barley, with detailed growing calendars and best practices.'
    }
  ];

  const supportChannels = [
    {
      title: 'Phone Support',
      description: 'Call our agricultural support hotline',
      icon: 'phone.fill',
      color: colors.success,
      action: () => Linking.openURL('tel:+263-4-123-4567')
    },
    {
      title: 'Email Support',
      description: 'Send us your questions via email',
      icon: 'envelope.fill',
      color: colors.primary,
      action: () => Linking.openURL('mailto:support@zimfarmpro.zw')
    },
    {
      title: 'WhatsApp',
      description: 'Chat with our support team',
      icon: 'message.fill',
      color: colors.accent,
      action: () => Linking.openURL('https://wa.me/263771234567')
    },
    {
      title: 'Visit Office',
      description: 'Find our nearest support center',
      icon: 'location.fill',
      color: colors.info,
      action: () => Alert.alert('Support Centers', 'Harare: 123 Agricultural Drive\nBulawayo: 456 Farm Road\nMutare: 789 Mountain View')
    }
  ];

  const quickActions = [
    {
      title: 'User Guide',
      description: 'Complete app tutorial and guides',
      icon: 'book.fill',
      color: colors.primary,
      action: () => Alert.alert('User Guide', 'The complete user guide would open here with step-by-step tutorials.')
    },
    {
      title: 'Video Tutorials',
      description: 'Watch how-to videos',
      icon: 'play.rectangle.fill',
      color: colors.accent,
      action: () => Alert.alert('Video Tutorials', 'Video tutorials would be available here covering all app features.')
    },
    {
      title: 'Report Bug',
      description: 'Report issues or bugs',
      icon: 'exclamationmark.triangle.fill',
      color: colors.error,
      action: () => Alert.alert('Report Bug', 'Bug reporting form would open here to collect issue details.')
    },
    {
      title: 'Feature Request',
      description: 'Suggest new features',
      icon: 'lightbulb.fill',
      color: colors.warning,
      action: () => Alert.alert('Feature Request', 'Feature request form would open here to collect your suggestions.')
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
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
            title: "Help & Support",
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
          <IconSymbol name="questionmark.circle.fill" size={48} color={colors.primary} />
          <Text style={[commonStyles.title, styles.title]}>Help & Support</Text>
          <Text style={[commonStyles.textSecondary, styles.subtitle]}>
            Get help with ZimFarm Pro and contact our support team
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={[commonStyles.subtitle, styles.sectionTitle]}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[commonStyles.card, styles.quickActionCard]}
                onPress={action.action}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                  <IconSymbol name={action.icon} size={24} color={colors.card} />
                </View>
                <Text style={[commonStyles.text, styles.quickActionTitle]}>{action.title}</Text>
                <Text style={[commonStyles.textSecondary, styles.quickActionDescription]}>
                  {action.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <Text style={[commonStyles.subtitle, styles.sectionTitle]}>Frequently Asked Questions</Text>
          
          {faqItems.map((faq, index) => (
            <View key={index} style={[commonStyles.card, styles.faqCard]}>
              <TouchableOpacity
                style={styles.faqHeader}
                onPress={() => toggleFAQ(index)}
              >
                <Text style={[commonStyles.text, styles.faqQuestion]}>{faq.question}</Text>
                <IconSymbol 
                  name={expandedFAQ === index ? "chevron.up" : "chevron.down"} 
                  size={16} 
                  color={colors.textSecondary} 
                />
              </TouchableOpacity>
              
              {expandedFAQ === index && (
                <View style={styles.faqAnswer}>
                  <Text style={[commonStyles.textSecondary, styles.faqAnswerText]}>
                    {faq.answer}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Contact Support */}
        <View style={styles.supportSection}>
          <Text style={[commonStyles.subtitle, styles.sectionTitle]}>Contact Support</Text>
          <Text style={[commonStyles.textSecondary, styles.supportDescription]}>
            Need more help? Our agricultural experts are here to assist you.
          </Text>
          
          <View style={styles.supportChannels}>
            {supportChannels.map((channel, index) => (
              <TouchableOpacity
                key={index}
                style={[commonStyles.card, styles.supportCard]}
                onPress={channel.action}
              >
                <View style={[styles.supportIcon, { backgroundColor: channel.color }]}>
                  <IconSymbol name={channel.icon} size={20} color={colors.card} />
                </View>
                <View style={styles.supportInfo}>
                  <Text style={[commonStyles.text, styles.supportTitle]}>{channel.title}</Text>
                  <Text style={[commonStyles.textSecondary, styles.supportChannelDescription]}>
                    {channel.description}
                  </Text>
                </View>
                <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* App Information */}
        <View style={[commonStyles.card, styles.appInfoCard]}>
          <View style={styles.appInfoHeader}>
            <IconSymbol name="info.circle.fill" size={24} color={colors.info} />
            <Text style={[commonStyles.subtitle, styles.appInfoTitle]}>App Information</Text>
          </View>
          
          <View style={styles.appInfoDetails}>
            <View style={styles.appInfoItem}>
              <Text style={[commonStyles.textSecondary, styles.appInfoLabel]}>Version:</Text>
              <Text style={[commonStyles.text, styles.appInfoValue]}>1.0.0</Text>
            </View>
            <View style={styles.appInfoItem}>
              <Text style={[commonStyles.textSecondary, styles.appInfoLabel]}>Build:</Text>
              <Text style={[commonStyles.text, styles.appInfoValue]}>2024.01.15</Text>
            </View>
            <View style={styles.appInfoItem}>
              <Text style={[commonStyles.textSecondary, styles.appInfoLabel]}>Platform:</Text>
              <Text style={[commonStyles.text, styles.appInfoValue]}>{Platform.OS}</Text>
            </View>
          </View>
        </View>

        {/* Emergency Support */}
        <View style={[commonStyles.card, styles.emergencyCard]}>
          <View style={styles.emergencyHeader}>
            <IconSymbol name="exclamationmark.triangle.fill" size={24} color={colors.error} />
            <Text style={[commonStyles.subtitle, styles.emergencyTitle]}>Emergency Support</Text>
          </View>
          <Text style={[commonStyles.text, styles.emergencyDescription]}>
            For urgent agricultural emergencies, pest outbreaks, or critical issues:
          </Text>
          <TouchableOpacity 
            style={styles.emergencyButton}
            onPress={() => Linking.openURL('tel:+263-4-700-000')}
          >
            <IconSymbol name="phone.fill" size={16} color={colors.card} />
            <Text style={styles.emergencyButtonText}>Emergency Hotline: +263-4-700-000</Text>
          </TouchableOpacity>
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
  },
  sectionTitle: {
    marginBottom: 16,
    color: colors.primary,
  },
  quickActionsSection: {
    marginBottom: 24,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    width: '47%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  quickActionDescription: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  faqSection: {
    marginBottom: 24,
  },
  faqCard: {
    marginBottom: 8,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontWeight: '600',
    flex: 1,
    marginRight: 12,
  },
  faqAnswer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
  },
  faqAnswerText: {
    lineHeight: 20,
  },
  supportSection: {
    marginBottom: 24,
  },
  supportDescription: {
    marginBottom: 16,
  },
  supportChannels: {
    gap: 8,
  },
  supportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  supportIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  supportInfo: {
    flex: 1,
  },
  supportTitle: {
    fontWeight: '600',
    marginBottom: 2,
  },
  supportChannelDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  appInfoCard: {
    backgroundColor: colors.highlight,
    marginBottom: 16,
  },
  appInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  appInfoTitle: {
    marginLeft: 8,
    color: colors.info,
  },
  appInfoDetails: {
    gap: 8,
  },
  appInfoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appInfoLabel: {
    flex: 1,
  },
  appInfoValue: {
    fontWeight: '500',
  },
  emergencyCard: {
    backgroundColor: '#ffebee',
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
    marginBottom: 16,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  emergencyTitle: {
    marginLeft: 8,
    color: colors.error,
  },
  emergencyDescription: {
    marginBottom: 16,
    lineHeight: 20,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.error,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  emergencyButtonText: {
    color: colors.card,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  bottomSpacing: {
    height: Platform.OS === 'ios' ? 20 : 100,
  },
});
