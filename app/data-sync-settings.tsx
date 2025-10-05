
import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Platform, Switch, Alert, ProgressBarAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

export default function DataSyncSettingsScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    autoSync: true,
    offlineMode: false,
    wifiOnly: true,
    backgroundSync: true,
    dataCompression: true,
  });
  
  const [syncProgress, setSyncProgress] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState('2024-01-15 08:30 AM');

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleManualSync = () => {
    setIsSyncing(true);
    setSyncProgress(0);
    
    // Simulate sync progress
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSyncing(false);
          setLastSync(new Date().toLocaleString());
          Alert.alert('Sync Complete', 'All data has been synchronized successfully.');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleBackupData = () => {
    Alert.alert(
      'Backup Data',
      'This will create a backup of all your farm data. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Backup', onPress: () => {
          Alert.alert('Backup Created', 'Your farm data has been backed up successfully.');
        }}
      ]
    );
  };

  const handleRestoreData = () => {
    Alert.alert(
      'Restore Data',
      'This will restore your farm data from the latest backup. This action cannot be undone. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Restore', style: 'destructive', onPress: () => {
          Alert.alert('Data Restored', 'Your farm data has been restored from backup.');
        }}
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
            title: "Data & Sync Settings",
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
          <IconSymbol name="icloud.fill" size={48} color={colors.info} />
          <Text style={[commonStyles.title, styles.title]}>Data & Sync Settings</Text>
          <Text style={[commonStyles.textSecondary, styles.subtitle]}>
            Manage your data synchronization and backup preferences
          </Text>
        </View>

        {/* Sync Status */}
        <View style={[commonStyles.card, styles.statusCard]}>
          <View style={styles.statusHeader}>
            <IconSymbol name="arrow.triangle.2.circlepath" size={24} color={colors.success} />
            <Text style={[commonStyles.subtitle, styles.statusTitle]}>Sync Status</Text>
          </View>
          
          <View style={styles.statusInfo}>
            <View style={styles.statusItem}>
              <Text style={[commonStyles.textSecondary, styles.statusLabel]}>Last Sync:</Text>
              <Text style={[commonStyles.text, styles.statusValue]}>{lastSync}</Text>
            </View>
            <View style={styles.statusItem}>
              <Text style={[commonStyles.textSecondary, styles.statusLabel]}>Status:</Text>
              <View style={styles.statusIndicator}>
                <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
                <Text style={[commonStyles.text, styles.statusValue]}>Up to date</Text>
              </View>
            </View>
          </View>

          {isSyncing && (
            <View style={styles.syncProgress}>
              <Text style={[commonStyles.textSecondary, styles.progressLabel]}>
                Syncing... {syncProgress}%
              </Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${syncProgress}%` }]} />
              </View>
            </View>
          )}

          <TouchableOpacity 
            style={[styles.syncButton, isSyncing && styles.syncButtonDisabled]}
            onPress={handleManualSync}
            disabled={isSyncing}
          >
            <IconSymbol 
              name={isSyncing ? "arrow.triangle.2.circlepath" : "arrow.clockwise"} 
              size={16} 
              color={colors.card} 
            />
            <Text style={styles.syncButtonText}>
              {isSyncing ? 'Syncing...' : 'Sync Now'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sync Settings */}
        <View style={styles.settingsList}>
          <Text style={[commonStyles.subtitle, styles.sectionTitle]}>Sync Settings</Text>
          
          <View style={[commonStyles.card, styles.settingCard]}>
            <View style={styles.settingHeader}>
              <View style={styles.settingInfo}>
                <Text style={[commonStyles.text, styles.settingTitle]}>Auto Sync</Text>
                <Text style={[commonStyles.textSecondary, styles.settingDescription]}>
                  Automatically sync data when changes are made
                </Text>
              </View>
              <Switch
                value={settings.autoSync}
                onValueChange={() => toggleSetting('autoSync')}
                trackColor={{ false: colors.secondary, true: colors.success }}
                thumbColor={colors.card}
              />
            </View>
          </View>

          <View style={[commonStyles.card, styles.settingCard]}>
            <View style={styles.settingHeader}>
              <View style={styles.settingInfo}>
                <Text style={[commonStyles.text, styles.settingTitle]}>Offline Mode</Text>
                <Text style={[commonStyles.textSecondary, styles.settingDescription]}>
                  Work without internet connection
                </Text>
              </View>
              <Switch
                value={settings.offlineMode}
                onValueChange={() => toggleSetting('offlineMode')}
                trackColor={{ false: colors.secondary, true: colors.warning }}
                thumbColor={colors.card}
              />
            </View>
          </View>

          <View style={[commonStyles.card, styles.settingCard]}>
            <View style={styles.settingHeader}>
              <View style={styles.settingInfo}>
                <Text style={[commonStyles.text, styles.settingTitle]}>WiFi Only</Text>
                <Text style={[commonStyles.textSecondary, styles.settingDescription]}>
                  Only sync when connected to WiFi
                </Text>
              </View>
              <Switch
                value={settings.wifiOnly}
                onValueChange={() => toggleSetting('wifiOnly')}
                trackColor={{ false: colors.secondary, true: colors.info }}
                thumbColor={colors.card}
              />
            </View>
          </View>

          <View style={[commonStyles.card, styles.settingCard]}>
            <View style={styles.settingHeader}>
              <View style={styles.settingInfo}>
                <Text style={[commonStyles.text, styles.settingTitle]}>Background Sync</Text>
                <Text style={[commonStyles.textSecondary, styles.settingDescription]}>
                  Sync data even when app is closed
                </Text>
              </View>
              <Switch
                value={settings.backgroundSync}
                onValueChange={() => toggleSetting('backgroundSync')}
                trackColor={{ false: colors.secondary, true: colors.primary }}
                thumbColor={colors.card}
              />
            </View>
          </View>

          <View style={[commonStyles.card, styles.settingCard]}>
            <View style={styles.settingHeader}>
              <View style={styles.settingInfo}>
                <Text style={[commonStyles.text, styles.settingTitle]}>Data Compression</Text>
                <Text style={[commonStyles.textSecondary, styles.settingDescription]}>
                  Compress data to reduce bandwidth usage
                </Text>
              </View>
              <Switch
                value={settings.dataCompression}
                onValueChange={() => toggleSetting('dataCompression')}
                trackColor={{ false: colors.secondary, true: colors.accent }}
                thumbColor={colors.card}
              />
            </View>
          </View>
        </View>

        {/* Data Management */}
        <View style={[commonStyles.card, styles.managementCard]}>
          <View style={styles.managementHeader}>
            <IconSymbol name="externaldrive.fill" size={24} color={colors.primary} />
            <Text style={[commonStyles.subtitle, styles.managementTitle]}>Data Management</Text>
          </View>
          
          <View style={styles.storageInfo}>
            <View style={styles.storageItem}>
              <Text style={[commonStyles.textSecondary, styles.storageLabel]}>Local Storage:</Text>
              <Text style={[commonStyles.text, styles.storageValue]}>2.4 MB</Text>
            </View>
            <View style={styles.storageItem}>
              <Text style={[commonStyles.textSecondary, styles.storageLabel]}>Cloud Storage:</Text>
              <Text style={[commonStyles.text, styles.storageValue]}>1.8 MB</Text>
            </View>
            <View style={styles.storageItem}>
              <Text style={[commonStyles.textSecondary, styles.storageLabel]}>Last Backup:</Text>
              <Text style={[commonStyles.text, styles.storageValue]}>Jan 14, 2024</Text>
            </View>
          </View>

          <View style={styles.managementButtons}>
            <TouchableOpacity 
              style={styles.managementButton}
              onPress={handleBackupData}
            >
              <IconSymbol name="square.and.arrow.up" size={16} color={colors.card} />
              <Text style={styles.managementButtonText}>Backup Data</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.managementButton, styles.restoreButton]}
              onPress={handleRestoreData}
            >
              <IconSymbol name="square.and.arrow.down" size={16} color={colors.card} />
              <Text style={styles.managementButtonText}>Restore Data</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Data Types */}
        <View style={[commonStyles.card, styles.dataTypesCard]}>
          <View style={styles.dataTypesHeader}>
            <IconSymbol name="list.bullet.rectangle" size={24} color={colors.accent} />
            <Text style={[commonStyles.subtitle, styles.dataTypesTitle]}>Synced Data Types</Text>
          </View>
          
          <View style={styles.dataTypesList}>
            {[
              { name: 'Field Boundaries', icon: 'map', size: '0.8 MB' },
              { name: 'Crop Records', icon: 'leaf.fill', size: '0.6 MB' },
              { name: 'Weather Data', icon: 'cloud.fill', size: '0.4 MB' },
              { name: 'Market Prices', icon: 'chart.line.uptrend.xyaxis', size: '0.3 MB' },
              { name: 'Settings', icon: 'gearshape.fill', size: '0.1 MB' }
            ].map((dataType, index) => (
              <View key={index} style={styles.dataTypeItem}>
                <IconSymbol name={dataType.icon} size={16} color={colors.primary} />
                <Text style={[commonStyles.text, styles.dataTypeName]}>{dataType.name}</Text>
                <Text style={[commonStyles.textSecondary, styles.dataTypeSize]}>{dataType.size}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={() => {
            Alert.alert('Settings Saved', 'Your data sync preferences have been saved successfully.');
            router.back();
          }}
        >
          <IconSymbol name="checkmark" size={20} color={colors.card} />
          <Text style={styles.saveButtonText}>Save Sync Settings</Text>
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
  statusCard: {
    backgroundColor: colors.highlight,
    marginBottom: 20,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusTitle: {
    marginLeft: 8,
    color: colors.success,
  },
  statusInfo: {
    gap: 8,
    marginBottom: 16,
  },
  statusItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: {
    flex: 1,
  },
  statusValue: {
    fontWeight: '500',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  syncProgress: {
    marginBottom: 16,
  },
  progressLabel: {
    marginBottom: 8,
    textAlign: 'center',
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.secondary,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.success,
  },
  syncButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  syncButtonDisabled: {
    backgroundColor: colors.textSecondary,
  },
  syncButtonText: {
    color: colors.card,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  settingsList: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 12,
    color: colors.primary,
  },
  settingCard: {
    marginBottom: 12,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  managementCard: {
    marginBottom: 20,
  },
  managementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  managementTitle: {
    marginLeft: 8,
    color: colors.primary,
  },
  storageInfo: {
    gap: 8,
    marginBottom: 16,
  },
  storageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storageLabel: {
    flex: 1,
  },
  storageValue: {
    fontWeight: '500',
  },
  managementButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  managementButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  restoreButton: {
    backgroundColor: colors.warning,
  },
  managementButtonText: {
    color: colors.card,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  dataTypesCard: {
    marginBottom: 20,
  },
  dataTypesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dataTypesTitle: {
    marginLeft: 8,
    color: colors.accent,
  },
  dataTypesList: {
    gap: 12,
  },
  dataTypeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  dataTypeName: {
    flex: 1,
    marginLeft: 12,
  },
  dataTypeSize: {
    fontSize: 13,
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
