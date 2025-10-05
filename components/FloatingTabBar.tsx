
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { useRouter, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import React from 'react';

export interface TabBarItem {
  name: string;
  route: string;
  icon: string;
  label: string;
}

interface FloatingTabBarProps {
  tabs: TabBarItem[];
  containerWidth?: number;
  borderRadius?: number;
  bottomMargin?: number;
}

export default function FloatingTabBar({ 
  tabs, 
  containerWidth = Dimensions.get('window').width - 32,
  borderRadius = 25,
  bottomMargin = 34
}: FloatingTabBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();
  
  const activeIndex = useSharedValue(0);
  
  // Find the active tab index
  React.useEffect(() => {
    const currentIndex = tabs.findIndex(tab => pathname.includes(tab.name));
    if (currentIndex !== -1) {
      activeIndex.value = withSpring(currentIndex);
    }
  }, [pathname, tabs]);

  const handleTabPress = (route: string) => {
    console.log('Navigating to:', route);
    router.push(route as any);
  };

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    const tabWidth = containerWidth / tabs.length;
    return {
      transform: [
        {
          translateX: interpolate(
            activeIndex.value,
            [0, tabs.length - 1],
            [0, tabWidth * (tabs.length - 1)]
          ),
        },
      ],
    };
  });

  return (
    <SafeAreaView style={[styles.safeArea, { bottom: bottomMargin }]} edges={['bottom']}>
      <View style={[styles.container, { width: containerWidth, borderRadius }]}>
        <BlurView intensity={80} style={[styles.blurView, { borderRadius }]}>
          <View style={styles.tabContainer}>
            <Animated.View 
              style={[
                styles.activeIndicator, 
                { 
                  width: containerWidth / tabs.length,
                  backgroundColor: colors.primary,
                  borderRadius: borderRadius - 5
                },
                animatedIndicatorStyle
              ]} 
            />
            {tabs.map((tab, index) => {
              const isActive = pathname.includes(tab.name);
              
              return (
                <TouchableOpacity
                  key={tab.name}
                  style={[styles.tab, { width: containerWidth / tabs.length }]}
                  onPress={() => handleTabPress(tab.route)}
                  activeOpacity={0.7}
                >
                  <IconSymbol
                    name={tab.icon}
                    size={24}
                    color={isActive ? colors.card : colors.text}
                  />
                  <Text style={[
                    styles.tabLabel,
                    { color: isActive ? colors.card : colors.text }
                  ]}>
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </BlurView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    left: 16,
    right: 16,
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  container: {
    height: 70,
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : colors.card,
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
    elevation: 8,
  },
  blurView: {
    flex: 1,
    overflow: 'hidden',
  },
  tabContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    height: '80%',
    top: '10%',
    left: '2%',
    width: '96%',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    zIndex: 1,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
});
