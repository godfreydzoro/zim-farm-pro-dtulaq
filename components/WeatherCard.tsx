
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  rainfall: number;
  windSpeed: number;
}

interface WeatherCardProps {
  weather: WeatherData;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return 'sun.max.fill';
      case 'cloudy':
        return 'cloud.fill';
      case 'rainy':
        return 'cloud.rain.fill';
      case 'stormy':
        return 'cloud.bolt.rain.fill';
      default:
        return 'sun.max.fill';
    }
  };

  return (
    <View style={[commonStyles.card, styles.weatherCard]}>
      <View style={styles.header}>
        <Text style={commonStyles.subtitle}>{weather.location} Weather</Text>
        <IconSymbol 
          name={getWeatherIcon(weather.condition)} 
          size={32} 
          color={colors.accent} 
        />
      </View>
      
      <View style={styles.temperatureRow}>
        <Text style={styles.temperature}>{weather.temperature}°C</Text>
        <Text style={[commonStyles.text, styles.condition]}>{weather.condition}</Text>
      </View>
      
      <View style={styles.detailsGrid}>
        <View style={styles.detailItem}>
          <IconSymbol name="drop.fill" size={16} color={colors.info} />
          <Text style={commonStyles.textSecondary}>Humidity: {weather.humidity}%</Text>
        </View>
        <View style={styles.detailItem}>
          <IconSymbol name="cloud.rain.fill" size={16} color={colors.info} />
          <Text style={commonStyles.textSecondary}>Rainfall: {weather.rainfall}mm</Text>
        </View>
        <View style={styles.detailItem}>
          <IconSymbol name="wind" size={16} color={colors.info} />
          <Text style={commonStyles.textSecondary}>Wind: {weather.windSpeed} km/h</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherCard: {
    backgroundColor: colors.highlight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  temperatureRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  temperature: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
    marginRight: 12,
  },
  condition: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    minWidth: '30%',
  },
});
