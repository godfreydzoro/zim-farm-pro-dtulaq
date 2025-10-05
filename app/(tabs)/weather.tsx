
import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import WeatherCard from '@/components/WeatherCard';
import { zimbabweProvinces } from '@/data/zimbabweData';

export default function WeatherScreen() {
  const [selectedProvince, setSelectedProvince] = useState('Harare');

  // Sample weather data for different provinces
  const weatherData = {
    'Harare': { location: 'Harare', temperature: 24, condition: 'Sunny', humidity: 65, rainfall: 2.5, windSpeed: 12 },
    'Bulawayo': { location: 'Bulawayo', temperature: 22, condition: 'Cloudy', humidity: 58, rainfall: 1.2, windSpeed: 15 },
    'Manicaland': { location: 'Manicaland', temperature: 20, condition: 'Rainy', humidity: 78, rainfall: 8.5, windSpeed: 8 },
    'Mashonaland Central': { location: 'Mashonaland Central', temperature: 23, condition: 'Sunny', humidity: 62, rainfall: 3.1, windSpeed: 10 },
    'Mashonaland East': { location: 'Mashonaland East', temperature: 25, condition: 'Cloudy', humidity: 68, rainfall: 4.2, windSpeed: 14 },
    'Mashonaland West': { location: 'Mashonaland West', temperature: 26, condition: 'Sunny', humidity: 55, rainfall: 1.8, windSpeed: 16 },
    'Masvingo': { location: 'Masvingo', temperature: 27, condition: 'Sunny', humidity: 52, rainfall: 0.8, windSpeed: 18 },
    'Matabeleland North': { location: 'Matabeleland North', temperature: 28, condition: 'Sunny', humidity: 48, rainfall: 0.5, windSpeed: 20 },
    'Matabeleland South': { location: 'Matabeleland South', temperature: 29, condition: 'Sunny', humidity: 45, rainfall: 0.2, windSpeed: 22 },
    'Midlands': { location: 'Midlands', temperature: 25, condition: 'Cloudy', humidity: 60, rainfall: 2.8, windSpeed: 13 }
  };

  const forecast = [
    { day: 'Today', high: 24, low: 18, condition: 'Sunny', icon: 'sun.max.fill' },
    { day: 'Tomorrow', high: 26, low: 19, condition: 'Cloudy', icon: 'cloud.fill' },
    { day: 'Wednesday', high: 23, low: 17, condition: 'Rainy', icon: 'cloud.rain.fill' },
    { day: 'Thursday', high: 25, low: 18, condition: 'Sunny', icon: 'sun.max.fill' },
    { day: 'Friday', high: 27, low: 20, condition: 'Sunny', icon: 'sun.max.fill' },
  ];

  const renderHeaderRight = () => (
    <TouchableOpacity
      onPress={() => Alert.alert("Refresh", "Weather data would be refreshed from meteorological services.")}
      style={styles.headerButton}
    >
      <IconSymbol name="arrow.clockwise" color={colors.text} size={20} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[commonStyles.safeArea, { backgroundColor: colors.background }]}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Weather & Climate",
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
          <Text style={[commonStyles.title, styles.title]}>Weather & Climate</Text>
          <Text style={[commonStyles.textSecondary, styles.subtitle]}>
            Real-time weather data for Zimbabwe's provinces
          </Text>
        </View>

        {/* Province Selector */}
        <View style={[commonStyles.card, styles.selectorCard]}>
          <Text style={[commonStyles.subtitle, styles.selectorTitle]}>Select Province</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.provinceSelector}>
            {zimbabweProvinces.map((province) => (
              <TouchableOpacity
                key={province}
                style={[
                  styles.provinceButton,
                  selectedProvince === province && styles.selectedProvinceButton
                ]}
                onPress={() => setSelectedProvince(province)}
              >
                <Text style={[
                  styles.provinceButtonText,
                  selectedProvince === province && styles.selectedProvinceButtonText
                ]}>
                  {province}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Current Weather */}
        <WeatherCard weather={weatherData[selectedProvince as keyof typeof weatherData]} />

        {/* 5-Day Forecast */}
        <View style={styles.forecastSection}>
          <Text style={[commonStyles.subtitle, styles.sectionTitle]}>5-Day Forecast</Text>
          <View style={[commonStyles.card, styles.forecastCard]}>
            {forecast.map((day, index) => (
              <View key={index} style={[styles.forecastItem, index < forecast.length - 1 && styles.forecastItemBorder]}>
                <Text style={[commonStyles.text, styles.forecastDay]}>{day.day}</Text>
                <View style={styles.forecastWeather}>
                  <IconSymbol name={day.icon} size={24} color={colors.primary} />
                  <Text style={[commonStyles.textSecondary, styles.forecastCondition]}>{day.condition}</Text>
                </View>
                <View style={styles.forecastTemp}>
                  <Text style={[commonStyles.text, styles.highTemp]}>{day.high}°</Text>
                  <Text style={[commonStyles.textSecondary, styles.lowTemp]}>{day.low}°</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Seasonal Information */}
        <View style={[commonStyles.card, styles.seasonalCard]}>
          <View style={styles.seasonalHeader}>
            <IconSymbol name="calendar" size={24} color={colors.accent} />
            <Text style={[commonStyles.subtitle, styles.seasonalTitle]}>Seasonal Information</Text>
          </View>
          <View style={styles.seasonalContent}>
            <View style={styles.seasonItem}>
              <Text style={[commonStyles.text, styles.seasonName]}>Rainy Season</Text>
              <Text style={commonStyles.textSecondary}>October - March</Text>
              <Text style={commonStyles.textSecondary}>Main growing season for most crops</Text>
            </View>
            <View style={styles.seasonItem}>
              <Text style={[commonStyles.text, styles.seasonName]}>Dry Season</Text>
              <Text style={commonStyles.textSecondary}>April - September</Text>
              <Text style={commonStyles.textSecondary}>Harvest time and winter crop season</Text>
            </View>
          </View>
        </View>

        {/* Agricultural Alerts */}
        <View style={[commonStyles.card, styles.alertsCard]}>
          <View style={styles.alertsHeader}>
            <IconSymbol name="exclamationmark.triangle.fill" size={24} color={colors.warning} />
            <Text style={[commonStyles.subtitle, styles.alertsTitle]}>Agricultural Weather Alerts</Text>
          </View>
          <View style={styles.alertItem}>
            <View style={styles.alertIcon}>
              <IconSymbol name="thermometer.sun.fill" size={16} color={colors.warning} />
            </View>
            <View style={styles.alertContent}>
              <Text style={commonStyles.text}>Heat Wave Warning</Text>
              <Text style={commonStyles.textSecondary}>Temperatures above 30°C expected. Increase irrigation frequency.</Text>
            </View>
          </View>
          <View style={styles.alertItem}>
            <View style={styles.alertIcon}>
              <IconSymbol name="cloud.rain.fill" size={16} color={colors.info} />
            </View>
            <View style={styles.alertContent}>
              <Text style={commonStyles.text}>Rainfall Advisory</Text>
              <Text style={commonStyles.textSecondary}>Heavy rains predicted this weekend. Prepare drainage systems.</Text>
            </View>
          </View>
        </View>

        {/* Climate Data */}
        <View style={[commonStyles.card, styles.climateCard]}>
          <Text style={[commonStyles.subtitle, styles.climateTitle]}>Climate Data for {selectedProvince}</Text>
          <View style={styles.climateGrid}>
            <View style={styles.climateItem}>
              <Text style={commonStyles.textSecondary}>Average Annual Rainfall</Text>
              <Text style={[commonStyles.text, styles.climateValue]}>650mm</Text>
            </View>
            <View style={styles.climateItem}>
              <Text style={commonStyles.textSecondary}>Average Temperature</Text>
              <Text style={[commonStyles.text, styles.climateValue]}>21°C</Text>
            </View>
            <View style={styles.climateItem}>
              <Text style={commonStyles.textSecondary}>Frost Risk Period</Text>
              <Text style={[commonStyles.text, styles.climateValue]}>May - Aug</Text>
            </View>
            <View style={styles.climateItem}>
              <Text style={commonStyles.textSecondary}>Growing Degree Days</Text>
              <Text style={[commonStyles.text, styles.climateValue]}>2,850</Text>
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
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    color: colors.primary,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 4,
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.card,
  },
  selectorCard: {
    backgroundColor: colors.highlight,
    marginBottom: 16,
  },
  selectorTitle: {
    marginBottom: 12,
  },
  provinceSelector: {
    flexDirection: 'row',
  },
  provinceButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: colors.card,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  selectedProvinceButton: {
    backgroundColor: colors.primary,
  },
  provinceButtonText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '500',
  },
  selectedProvinceButtonText: {
    color: colors.card,
  },
  forecastSection: {
    marginVertical: 16,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  forecastCard: {
    padding: 0,
  },
  forecastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  forecastItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  forecastDay: {
    flex: 1,
    fontWeight: '600',
  },
  forecastWeather: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forecastCondition: {
    marginLeft: 8,
  },
  forecastTemp: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  highTemp: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  lowTemp: {
    fontSize: 14,
  },
  seasonalCard: {
    backgroundColor: colors.highlight,
    marginVertical: 16,
  },
  seasonalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  seasonalTitle: {
    marginLeft: 8,
  },
  seasonalContent: {
    gap: 16,
  },
  seasonItem: {
    paddingLeft: 16,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  seasonName: {
    fontWeight: '600',
    marginBottom: 4,
  },
  alertsCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
    marginVertical: 16,
  },
  alertsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  alertsTitle: {
    marginLeft: 8,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  alertIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  alertContent: {
    flex: 1,
  },
  climateCard: {
    marginVertical: 16,
  },
  climateTitle: {
    marginBottom: 16,
  },
  climateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  climateItem: {
    width: '48%',
    marginBottom: 16,
  },
  climateValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 4,
  },
  bottomSpacing: {
    height: Platform.OS === 'ios' ? 20 : 100,
  },
});
