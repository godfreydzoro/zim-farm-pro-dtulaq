
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

interface AlertData {
  id: string;
  type: 'drought' | 'frost' | 'pest' | 'disease' | 'weather';
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
}

interface AlertCardProps {
  alert: AlertData;
}

export default function AlertCard({ alert }: AlertCardProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return colors.error;
      case 'medium':
        return colors.warning;
      case 'low':
        return colors.info;
      default:
        return colors.textSecondary;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'drought':
        return 'sun.max.fill';
      case 'frost':
        return 'snowflake';
      case 'pest':
        return 'ant.fill';
      case 'disease':
        return 'cross.fill';
      case 'weather':
        return 'cloud.bolt.rain.fill';
      default:
        return 'exclamationmark.triangle.fill';
    }
  };

  return (
    <View style={[commonStyles.card, styles.alertCard, { borderLeftColor: getSeverityColor(alert.severity) }]}>
      <View style={styles.header}>
        <View style={styles.alertInfo}>
          <IconSymbol 
            name={getAlertIcon(alert.type)} 
            size={24} 
            color={getSeverityColor(alert.severity)} 
          />
          <View style={styles.titleContainer}>
            <Text style={[commonStyles.subtitle, styles.alertTitle]}>{alert.title}</Text>
            <Text style={[commonStyles.textSecondary, styles.timestamp]}>{alert.timestamp}</Text>
          </View>
        </View>
      </View>
      
      <Text style={[commonStyles.text, styles.message]}>{alert.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  alertCard: {
    borderLeftWidth: 4,
    marginHorizontal: 4,
  },
  header: {
    marginBottom: 8,
  },
  alertInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  titleContainer: {
    marginLeft: 12,
    flex: 1,
  },
  alertTitle: {
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 12,
  },
  message: {
    marginLeft: 36,
  },
});
