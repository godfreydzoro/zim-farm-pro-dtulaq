
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  onPress: () => void;
}

interface QuickActionCardProps {
  action: QuickAction;
}

export default function QuickActionCard({ action }: QuickActionCardProps) {
  return (
    <TouchableOpacity 
      style={[commonStyles.card, styles.actionCard]} 
      onPress={action.onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: action.color }]}>
        <IconSymbol 
          name={action.icon} 
          size={24} 
          color={colors.card} 
        />
      </View>
      
      <View style={styles.content}>
        <Text style={[commonStyles.subtitle, styles.title]}>{action.title}</Text>
        <Text style={[commonStyles.textSecondary, styles.description]}>{action.description}</Text>
      </View>
      
      <IconSymbol 
        name="chevron.right" 
        size={16} 
        color={colors.textSecondary} 
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
  },
});
