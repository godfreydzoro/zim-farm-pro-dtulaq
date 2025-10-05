
import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text, Alert, Platform, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";
import WeatherCard from "@/components/WeatherCard";
import CropCard from "@/components/CropCard";
import AlertCard from "@/components/AlertCard";
import QuickActionCard from "@/components/QuickActionCard";
import { sampleWeatherData, sampleCrops, sampleAlerts } from "@/data/zimbabweData";

export default function HomeScreen() {
  const theme = useTheme();
  const [selectedProvince, setSelectedProvince] = useState('Harare');

  const quickActions = [
    {
      id: '1',
      title: 'Field Mapping',
      description: 'Map your field boundaries',
      icon: 'map.fill',
      color: colors.primary,
      onPress: () => Alert.alert('Field Mapping', 'Note: react-native-maps is not supported in Natively. This feature would normally show an interactive map of Zimbabwe with field boundary mapping capabilities.')
    },
    {
      id: '2',
      title: 'Crop Calendar',
      description: 'View planting schedules',
      icon: 'calendar',
      color: colors.accent,
      onPress: () => Alert.alert('Crop Calendar', 'This would show detailed planting and harvesting calendars for different crops based on Zimbabwe\'s growing seasons.')
    },
    {
      id: '3',
      title: 'Market Prices',
      description: 'Check current crop prices',
      icon: 'chart.line.uptrend.xyaxis',
      color: colors.success,
      onPress: () => Alert.alert('Market Prices', 'Current market prices:\n• Maize: $320/tonne (+5%)\n• Tobacco: $4200/tonne (+12%)\n• Cotton: $1800/tonne (-3%)\n• Soybean: $450/tonne (+8%)')
    },
    {
      id: '4',
      title: 'Extension Services',
      description: 'Find nearby agricultural offices',
      icon: 'building.2.fill',
      color: colors.info,
      onPress: () => Alert.alert('Extension Services', 'This would show nearby agricultural extension offices, input suppliers, and contact information for agricultural advisors.')
    }
  ];

  const renderHeaderRight = () => (
    <TouchableOpacity
      onPress={() => Alert.alert("Settings", "App settings and preferences would be available here.")}
      style={styles.headerButton}
    >
      <IconSymbol name="gear" color={colors.text} size={20} />
    </TouchableOpacity>
  );

  const renderHeaderLeft = () => (
    <TouchableOpacity
      onPress={() => Alert.alert("Menu", "Navigation menu with additional features would be available here.")}
      style={styles.headerButton}
    >
      <IconSymbol name="line.horizontal.3" color={colors.text} size={20} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[commonStyles.safeArea, { backgroundColor: colors.background }]}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "ZimFarm Pro",
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.text,
            headerRight: renderHeaderRight,
            headerLeft: renderHeaderLeft,
          }}
        />
      )}
      
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Header */}
        <View style={styles.welcomeSection}>
          <Text style={[commonStyles.title, styles.welcomeTitle]}>Welcome to ZimFarm Pro</Text>
          <Text style={[commonStyles.textSecondary, styles.welcomeSubtitle]}>
            Your comprehensive farming assistant for Zimbabwe
          </Text>
        </View>

        {/* Weather Card */}
        <WeatherCard weather={sampleWeatherData} />

        {/* Alerts Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={commonStyles.subtitle}>Farm Alerts</Text>
            <IconSymbol name="bell.fill" size={20} color={colors.warning} />
          </View>
          {sampleAlerts.slice(0, 2).map(alert => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[commonStyles.subtitle, styles.sectionTitle]}>Quick Actions</Text>
          {quickActions.map(action => (
            <QuickActionCard key={action.id} action={action} />
          ))}
        </View>

        {/* Recommended Crops */}
        <View style={styles.section}>
          <Text style={[commonStyles.subtitle, styles.sectionTitle]}>Recommended Crops for {selectedProvince}</Text>
          {sampleCrops.slice(0, 4).map(crop => (
            <CropCard 
              key={crop.id} 
              crop={crop} 
              onPress={() => Alert.alert(
                crop.name, 
                `Planting Season: ${crop.plantingMonth}\nHarvest Season: ${crop.harvestMonth}\nSoil Type: ${crop.soilType}\nWater Requirement: ${crop.waterRequirement}\n\nStatus: ${crop.status.charAt(0).toUpperCase() + crop.status.slice(1)}`
              )}
            />
          ))}
        </View>

        {/* Conservation Tips */}
        <View style={[commonStyles.card, styles.tipsCard]}>
          <View style={styles.tipsHeader}>
            <IconSymbol name="leaf.fill" size={24} color={colors.success} />
            <Text style={[commonStyles.subtitle, styles.tipsTitle]}>Conservation Agriculture Tips</Text>
          </View>
          <Text style={commonStyles.text}>
            • Practice crop rotation to maintain soil fertility{'\n'}
            • Use cover crops during off-season{'\n'}
            • Implement minimum tillage techniques{'\n'}
            • Maintain crop residues for soil protection
          </Text>
        </View>

        {/* Bottom spacing for floating tab bar */}
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
  welcomeSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  welcomeTitle: {
    color: colors.primary,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    textAlign: 'center',
    marginTop: 4,
  },
  section: {
    marginVertical: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.card,
  },
  tipsCard: {
    backgroundColor: colors.highlight,
    marginVertical: 12,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipsTitle: {
    marginLeft: 8,
  },
  bottomSpacing: {
    height: Platform.OS === 'ios' ? 20 : 100,
  },
});
