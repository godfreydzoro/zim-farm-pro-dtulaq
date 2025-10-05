
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

interface PestIdentificationCardProps {
  onPress: () => void;
  title?: string;
  description?: string;
  buttonText?: string;
  icon?: string;
}

export default function PestIdentificationCard({
  onPress,
  title = "AI Pest Identification",
  description = "Use your camera to identify pests, diseases, and weeds affecting your crops. Get instant recommendations for treatment and prevention.",
  buttonText = "Identify Pest or Disease",
  icon = "camera.fill"
}: PestIdentificationCardProps) {
  return (
    <View style={[commonStyles.card, styles.card]}>
      <View style={styles.header}>
        <IconSymbol name={icon} size={24} color={colors.primary} />
        <Text style={[commonStyles.subtitle, styles.title]}>{title}</Text>
      </View>
      <Text style={commonStyles.text}>{description}</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <IconSymbol name={icon} size={20} color={colors.card} />
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.highlight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    marginLeft: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 12,
  },
  buttonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
