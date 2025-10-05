
import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

export default function ProfileScreen() {
  const [farmerData, setFarmerData] = useState({
    name: 'John Mukamuri',
    location: 'Harare Province',
    farmSize: '5.2 hectares',
    primaryCrops: ['Maize', 'Tobacco', 'Soybean'],
    experience: '12 years',
    phone: '+263 77 123 4567',
    email: 'john.mukamuri@email.com'
  });

  const profileSections = [
    {
      title: 'Farm Information',
      icon: 'house.fill',
      items: [
        { label: 'Farm Location', value: farmerData.location, icon: 'location.fill' },
        { label: 'Farm Size', value: farmerData.farmSize, icon: 'ruler.fill' },
        { label: 'Primary Crops', value: farmerData.primaryCrops.join(', '), icon: 'leaf.fill' },
        { label: 'Experience', value: farmerData.experience, icon: 'clock.fill' },
      ]
    },
    {
      title: 'Contact Information',
      icon: 'person.fill',
      items: [
        { label: 'Phone', value: farmerData.phone, icon: 'phone.fill' },
        { label: 'Email', value: farmerData.email, icon: 'envelope.fill' },
      ]
    }
  ];

  const quickSettings = [
    {
      title: 'Language Settings',
      description: 'English, Shona, Ndebele',
      icon: 'globe',
      color: colors.primary,
      onPress: () => Alert.alert('Language Settings', 'Choose your preferred language:\n• English\n• Shona\n• Ndebele')
    },
    {
      title: 'Notification Preferences',
      description: 'Weather alerts, crop reminders',
      icon: 'bell.fill',
      color: colors.accent,
      onPress: () => Alert.alert('Notifications', 'Configure notifications for:\n• Weather alerts\n• Planting reminders\n• Market price updates\n• Pest/disease warnings')
    },
    {
      title: 'Data & Sync',
      description: 'Offline mode, data backup',
      icon: 'icloud.fill',
      color: colors.info,
      onPress: () => Alert.alert('Data & Sync', 'Manage your data:\n• Enable offline mode\n• Backup farm data\n• Sync across devices')
    },
    {
      title: 'Extension Services',
      description: 'Connect with agricultural advisors',
      icon: 'person.2.fill',
      color: colors.success,
      onPress: () => Alert.alert('Extension Services', 'Connect with:\n• Local agricultural extension officers\n• Veterinary services\n• Input suppliers\n• Market cooperatives')
    }
  ];

  const renderHeaderRight = () => (
    <TouchableOpacity
      onPress={() => Alert.alert("Edit Profile", "Profile editing functionality would be available here.")}
      style={styles.headerButton}
    >
      <IconSymbol name="pencil" color={colors.text} size={20} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[commonStyles.safeArea, { backgroundColor: colors.background }]}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Farmer Profile",
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
        {/* Profile Header */}
        <View style={[commonStyles.card, styles.profileHeader]}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <IconSymbol name="person.fill" size={48} color={colors.card} />
            </View>
          </View>
          <Text style={[commonStyles.title, styles.farmerName]}>{farmerData.name}</Text>
          <Text style={[commonStyles.textSecondary, styles.farmerTitle]}>Smallholder Farmer</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>5.2</Text>
              <Text style={styles.statLabel}>Hectares</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Crops</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Years</Text>
            </View>
          </View>
        </View>

        {/* Profile Sections */}
        {profileSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={[commonStyles.card, styles.section]}>
            <View style={styles.sectionHeader}>
              <IconSymbol name={section.icon} size={24} color={colors.primary} />
              <Text style={[commonStyles.subtitle, styles.sectionTitle]}>{section.title}</Text>
            </View>
            {section.items.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.infoItem}>
                <View style={styles.infoLeft}>
                  <IconSymbol name={item.icon} size={16} color={colors.textSecondary} />
                  <Text style={[commonStyles.textSecondary, styles.infoLabel]}>{item.label}</Text>
                </View>
                <Text style={[commonStyles.text, styles.infoValue]}>{item.value}</Text>
              </View>
            ))}
          </View>
        ))}

        {/* Quick Settings */}
        <View style={styles.settingsSection}>
          <Text style={[commonStyles.subtitle, styles.settingsTitle]}>Quick Settings</Text>
          {quickSettings.map((setting, index) => (
            <TouchableOpacity
              key={index}
              style={[commonStyles.card, styles.settingCard]}
              onPress={setting.onPress}
              activeOpacity={0.7}
            >
              <View style={[styles.settingIcon, { backgroundColor: setting.color }]}>
                <IconSymbol name={setting.icon} size={20} color={colors.card} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[commonStyles.text, styles.settingTitle]}>{setting.title}</Text>
                <Text style={[commonStyles.textSecondary, styles.settingDescription]}>{setting.description}</Text>
              </View>
              <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* App Information */}
        <View style={[commonStyles.card, styles.appInfoCard]}>
          <View style={styles.appInfoHeader}>
            <IconSymbol name="info.circle.fill" size={24} color={colors.info} />
            <Text style={[commonStyles.subtitle, styles.appInfoTitle]}>About ZimFarm Pro</Text>
          </View>
          <Text style={commonStyles.text}>
            Version 1.0.0{'\n'}
            Your comprehensive farming assistant for Zimbabwe
          </Text>
          <View style={styles.appInfoButtons}>
            <TouchableOpacity 
              style={styles.appInfoButton}
              onPress={() => Alert.alert('Help & Support', 'Access help documentation, tutorials, and contact support team.')}
            >
              <Text style={styles.appInfoButtonText}>Help & Support</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.appInfoButton}
              onPress={() => Alert.alert('Privacy Policy', 'View our privacy policy and data usage terms.')}
            >
              <Text style={styles.appInfoButtonText}>Privacy Policy</Text>
            </TouchableOpacity>
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
  profileHeader: {
    alignItems: 'center',
    backgroundColor: colors.highlight,
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  farmerName: {
    marginBottom: 4,
    color: colors.primary,
  },
  farmerTitle: {
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.secondary,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    marginLeft: 8,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    marginLeft: 8,
  },
  infoValue: {
    fontWeight: '500',
    textAlign: 'right',
    flex: 1,
  },
  settingsSection: {
    marginBottom: 20,
  },
  settingsTitle: {
    marginBottom: 12,
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 8,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontWeight: '600',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
  },
  appInfoCard: {
    backgroundColor: colors.highlight,
    marginBottom: 16,
  },
  appInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  appInfoTitle: {
    marginLeft: 8,
  },
  appInfoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  appInfoButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  appInfoButtonText: {
    color: colors.card,
    fontSize: 14,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: Platform.OS === 'ios' ? 20 : 100,
  },
});
