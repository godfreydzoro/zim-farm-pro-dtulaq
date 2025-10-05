
import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Platform, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

export default function NotificationSettingsScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    weatherAlerts: true,
    plantingReminders: true,
    harvestReminders: true,
    marketPrices: false,
    pestAlerts: true,
    droughtWarnings: true,
    extensionUpdates: false,
    dailyTips: true,
  });

  const [notificationTime, setNotificationTime] = useState('08:00');

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const notificationTypes = [
    {
      key: 'weatherAlerts' as keyof typeof settings,
      title: 'Weather Alerts',
      description: 'Severe weather warnings and forecasts',
      icon: 'cloud.rain.fill',
      color: colors.info,
      critical: true
    },
    {
      key: 'plantingReminders' as keyof typeof settings,
      title: 'Planting Reminders',
      description: 'Optimal planting times for your crops',
      icon: 'leaf.fill',
      color: colors.success,
      critical: false
    },
    {
      key: 'harvestReminders' as keyof typeof settings,
      title: 'Harvest Reminders',
      description: 'When your crops are ready for harvest',
      icon: 'scissors',
      color: colors.warning,
      critical: false
    },
    {
      key: 'marketPrices' as keyof typeof settings,
      title: 'Market Price Updates',
      description: 'Daily commodity price changes',
      icon: 'chart.line.uptrend.xyaxis',
      color: colors.accent,
      critical: false
    },
    {
      key: 'pestAlerts' as keyof typeof settings,
      title: 'Pest & Disease Alerts',
      description: 'Outbreak warnings in your area',
      icon: 'exclamationmark.triangle.fill',
      color: colors.error,
      critical: true
    },
    {
      key: 'droughtWarnings' as keyof typeof settings,
      title: 'Drought Warnings',
      description: 'Water scarcity and conservation alerts',
      icon: 'drop.fill',
      color: colors.warning,
      critical: true
    },
    {
      key: 'extensionUpdates' as keyof typeof settings,
      title: 'Extension Service Updates',
      description: 'News from agricultural extension offices',
      icon: 'person.2.fill',
      color: colors.primary,
      critical: false
    },
    {
      key: 'dailyTips' as keyof typeof settings,
      title: 'Daily Farming Tips',
      description: 'Helpful tips and best practices',
      icon: 'lightbulb.fill',
      color: colors.accent,
      critical: false
    }
  ];

  const timeOptions = [
    '06:00', '07:00', '08:00', '09:00', '10:00',
    '17:00', '18:00', '19:00', '20:00'
  ];

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
            title: "Notification Settings",
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
          <IconSymbol name="bell.fill" size={48} color={colors.accent} />
          <Text style={[commonStyles.title, styles.title]}>Notification Settings</Text>
          <Text style={[commonStyles.textSecondary, styles.subtitle]}>
            Customize your farming alerts and reminders
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => {
              const allEnabled = Object.values(settings).every(v => v);
              const newSettings = Object.keys(settings).reduce((acc, key) => ({
                ...acc,
                [key]: !allEnabled
              }), {} as typeof settings);
              setSettings(newSettings);
            }}
          >
            <IconSymbol name="checkmark.circle.fill" size={20} color={colors.card} />
            <Text style={styles.quickActionText}>Toggle All</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.quickActionButton, styles.criticalButton]}
            onPress={() => {
              const criticalKeys = notificationTypes.filter(n => n.critical).map(n => n.key);
              const newSettings = { ...settings };
              criticalKeys.forEach(key => {
                newSettings[key] = true;
              });
              setSettings(newSettings);
            }}
          >
            <IconSymbol name="exclamationmark.triangle.fill" size={20} color={colors.card} />
            <Text style={styles.quickActionText}>Enable Critical</Text>
          </TouchableOpacity>
        </View>

        {/* Notification Types */}
        <View style={styles.notificationsList}>
          <Text style={[commonStyles.subtitle, styles.sectionTitle]}>Notification Types</Text>
          
          {notificationTypes.map((notification) => (
            <View key={notification.key} style={[commonStyles.card, styles.notificationCard]}>
              <View style={styles.notificationHeader}>
                <View style={[styles.notificationIcon, { backgroundColor: notification.color }]}>
                  <IconSymbol name={notification.icon} size={20} color={colors.card} />
                </View>
                <View style={styles.notificationInfo}>
                  <View style={styles.titleRow}>
                    <Text style={[commonStyles.text, styles.notificationTitle]}>
                      {notification.title}
                    </Text>
                    {notification.critical && (
                      <View style={styles.criticalBadge}>
                        <Text style={styles.criticalText}>Critical</Text>
                      </View>
                    )}
                  </View>
                  <Text style={[commonStyles.textSecondary, styles.notificationDescription]}>
                    {notification.description}
                  </Text>
                </View>
                <Switch
                  value={settings[notification.key]}
                  onValueChange={() => toggleSetting(notification.key)}
                  trackColor={{ false: colors.secondary, true: notification.color }}
                  thumbColor={colors.card}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Notification Timing */}
        <View style={[commonStyles.card, styles.timingCard]}>
          <View style={styles.timingHeader}>
            <IconSymbol name="clock.fill" size={24} color={colors.primary} />
            <Text style={[commonStyles.subtitle, styles.timingTitle]}>Notification Timing</Text>
          </View>
          <Text style={[commonStyles.textSecondary, styles.timingDescription]}>
            Choose when you&apos;d like to receive daily notifications
          </Text>
          
          <View style={styles.timeOptions}>
            {timeOptions.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeOption,
                  notificationTime === time && styles.selectedTimeOption
                ]}
                onPress={() => setNotificationTime(time)}
              >
                <Text style={[
                  styles.timeOptionText,
                  notificationTime === time && styles.selectedTimeOptionText
                ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Notification Channels */}
        <View style={[commonStyles.card, styles.channelsCard]}>
          <View style={styles.channelsHeader}>
            <IconSymbol name="speaker.wave.2.fill" size={24} color={colors.info} />
            <Text style={[commonStyles.subtitle, styles.channelsTitle]}>Delivery Methods</Text>
          </View>
          
          <View style={styles.channelsList}>
            <View style={styles.channelItem}>
              <IconSymbol name="bell.fill" size={20} color={colors.accent} />
              <View style={styles.channelInfo}>
                <Text style={[commonStyles.text, styles.channelName]}>Push Notifications</Text>
                <Text style={[commonStyles.textSecondary, styles.channelDescription]}>
                  Instant alerts on your device
                </Text>
              </View>
              <Switch
                value={true}
                onValueChange={() => console.log('Toggle push notifications')}
                trackColor={{ false: colors.secondary, true: colors.accent }}
                thumbColor={colors.card}
              />
            </View>
            
            <View style={styles.channelItem}>
              <IconSymbol name="envelope.fill" size={20} color={colors.primary} />
              <View style={styles.channelInfo}>
                <Text style={[commonStyles.text, styles.channelName]}>SMS Alerts</Text>
                <Text style={[commonStyles.textSecondary, styles.channelDescription]}>
                  Critical alerts via text message
                </Text>
              </View>
              <Switch
                value={false}
                onValueChange={() => console.log('Toggle SMS alerts')}
                trackColor={{ false: colors.secondary, true: colors.primary }}
                thumbColor={colors.card}
              />
            </View>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={() => {
            Alert.alert('Settings Saved', 'Your notification preferences have been saved successfully.');
            router.back();
          }}
        >
          <IconSymbol name="checkmark" size={20} color={colors.card} />
          <Text style={styles.saveButtonText}>Save Notification Settings</Text>
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
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  quickActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  criticalButton: {
    backgroundColor: colors.error,
  },
  quickActionText: {
    color: colors.card,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  notificationsList: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 12,
    color: colors.primary,
  },
  notificationCard: {
    marginBottom: 12,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontWeight: '600',
    flex: 1,
  },
  criticalBadge: {
    backgroundColor: colors.error,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  criticalText: {
    color: colors.card,
    fontSize: 10,
    fontWeight: '600',
  },
  notificationDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  timingCard: {
    backgroundColor: colors.highlight,
    marginBottom: 20,
  },
  timingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timingTitle: {
    marginLeft: 8,
    color: colors.primary,
  },
  timingDescription: {
    marginBottom: 16,
  },
  timeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  selectedTimeOption: {
    backgroundColor: colors.primary,
  },
  timeOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  selectedTimeOptionText: {
    color: colors.card,
  },
  channelsCard: {
    marginBottom: 20,
  },
  channelsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  channelsTitle: {
    marginLeft: 8,
    color: colors.info,
  },
  channelsList: {
    gap: 16,
  },
  channelItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  channelInfo: {
    flex: 1,
    marginLeft: 12,
  },
  channelName: {
    fontWeight: '600',
    marginBottom: 2,
  },
  channelDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 20,
  },
  saveButtonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  bottomSpacing: {
    height: Platform.OS === 'ios' ? 20 : 100,
  },
});
