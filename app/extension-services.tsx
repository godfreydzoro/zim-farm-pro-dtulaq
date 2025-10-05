
import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Platform, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { extensionServices, zimbabweProvinces } from '@/data/zimbabweData';

export default function ExtensionServicesScreen() {
  const router = useRouter();
  const [selectedProvince, setSelectedProvince] = useState<string>('All');

  const filteredServices = selectedProvince === 'All' 
    ? extensionServices 
    : extensionServices.filter(service => service.province === selectedProvince);

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`).catch(() => {
      Alert.alert('Error', 'Unable to make phone call');
    });
  };

  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`).catch(() => {
      Alert.alert('Error', 'Unable to open email client');
    });
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
            title: "Extension Services",
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
          <Text style={[commonStyles.title, styles.title]}>Extension Services</Text>
          <Text style={[commonStyles.textSecondary, styles.subtitle]}>
            Connect with agricultural extension officers and support services
          </Text>
        </View>

        {/* Province Filter */}
        <View style={styles.filterContainer}>
          <Text style={[commonStyles.textSecondary, styles.filterLabel]}>Filter by Province:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedProvince === 'All' && styles.activeFilterButton
              ]}
              onPress={() => setSelectedProvince('All')}
            >
              <Text style={[
                styles.filterButtonText,
                selectedProvince === 'All' && styles.activeFilterButtonText
              ]}>
                All Provinces
              </Text>
            </TouchableOpacity>
            {zimbabweProvinces.map((province) => (
              <TouchableOpacity
                key={province}
                style={[
                  styles.filterButton,
                  selectedProvince === province && styles.activeFilterButton
                ]}
                onPress={() => setSelectedProvince(province)}
              >
                <Text style={[
                  styles.filterButtonText,
                  selectedProvince === province && styles.activeFilterButtonText
                ]}>
                  {province}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Services List */}
        <View style={styles.servicesList}>
          <Text style={[commonStyles.subtitle, styles.sectionTitle]}>
            Available Services ({filteredServices.length})
          </Text>
          
          {filteredServices.map((service) => (
            <View key={service.id} style={[commonStyles.card, styles.serviceCard]}>
              {/* Service Header */}
              <View style={styles.serviceHeader}>
                <View style={styles.serviceInfo}>
                  <Text style={[commonStyles.subtitle, styles.serviceName]}>{service.name}</Text>
                  <Text style={[commonStyles.textSecondary, styles.serviceProvince]}>
                    {service.province} Province
                  </Text>
                </View>
                <View style={styles.serviceIcon}>
                  <IconSymbol name="building.2.fill" size={24} color={colors.primary} />
                </View>
              </View>

              {/* Officer Information */}
              <View style={styles.officerInfo}>
                <IconSymbol name="person.fill" size={16} color={colors.accent} />
                <Text style={[commonStyles.text, styles.officerName]}>{service.officer}</Text>
              </View>

              {/* Contact Information */}
              <View style={styles.contactSection}>
                <View style={styles.contactItem}>
                  <IconSymbol name="location.fill" size={16} color={colors.info} />
                  <Text style={[commonStyles.textSecondary, styles.contactText]}>
                    {service.address}
                  </Text>
                </View>
                <View style={styles.contactItem}>
                  <IconSymbol name="clock.fill" size={16} color={colors.success} />
                  <Text style={[commonStyles.textSecondary, styles.contactText]}>
                    {service.workingHours}
                  </Text>
                </View>
              </View>

              {/* Services Offered */}
              <View style={styles.servicesSection}>
                <Text style={[commonStyles.text, styles.servicesTitle]}>Services Offered:</Text>
                <View style={styles.servicesTags}>
                  {service.services.map((serviceItem, index) => (
                    <View key={index} style={styles.serviceTag}>
                      <Text style={styles.serviceTagText}>{serviceItem}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Specialization */}
              <View style={styles.specializationSection}>
                <Text style={[commonStyles.text, styles.specializationTitle]}>Specialization:</Text>
                <View style={styles.specializationTags}>
                  {service.specialization.map((spec, index) => (
                    <View key={index} style={styles.specializationTag}>
                      <Text style={styles.specializationTagText}>{spec}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Contact Buttons */}
              <View style={styles.contactButtons}>
                <TouchableOpacity 
                  style={styles.contactButton}
                  onPress={() => handleCall(service.phone)}
                >
                  <IconSymbol name="phone.fill" size={16} color={colors.card} />
                  <Text style={styles.contactButtonText}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.contactButton, styles.emailButton]}
                  onPress={() => handleEmail(service.email)}
                >
                  <IconSymbol name="envelope.fill" size={16} color={colors.card} />
                  <Text style={styles.contactButtonText}>Email</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Emergency Contacts */}
        <View style={[commonStyles.card, styles.emergencyCard]}>
          <View style={styles.emergencyHeader}>
            <IconSymbol name="exclamationmark.triangle.fill" size={24} color={colors.warning} />
            <Text style={[commonStyles.subtitle, styles.emergencyTitle]}>Emergency Contacts</Text>
          </View>
          <Text style={commonStyles.text}>
            For urgent agricultural emergencies, pest outbreaks, or disease reports:
          </Text>
          <View style={styles.emergencyContacts}>
            <TouchableOpacity 
              style={styles.emergencyButton}
              onPress={() => handleCall('+263 4 700 000')}
            >
              <IconSymbol name="phone.fill" size={16} color={colors.card} />
              <Text style={styles.emergencyButtonText}>Agricultural Hotline</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.emergencyButton}
              onPress={() => handleCall('+263 4 701 000')}
            >
              <IconSymbol name="exclamationmark.triangle.fill" size={16} color={colors.card} />
              <Text style={styles.emergencyButtonText}>Pest Alert Line</Text>
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
  filterContainer: {
    marginBottom: 16,
  },
  filterLabel: {
    marginBottom: 8,
  },
  filterScroll: {
    flexDirection: 'row',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.card,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  activeFilterButton: {
    backgroundColor: colors.primary,
  },
  filterButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterButtonText: {
    color: colors.card,
  },
  servicesList: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 12,
    color: colors.primary,
  },
  serviceCard: {
    marginBottom: 16,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    marginBottom: 2,
  },
  serviceProvince: {
    fontSize: 12,
  },
  serviceIcon: {
    padding: 4,
  },
  officerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  officerName: {
    marginLeft: 8,
    fontWeight: '600',
  },
  contactSection: {
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  contactText: {
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  servicesSection: {
    marginBottom: 12,
  },
  servicesTitle: {
    fontWeight: '600',
    marginBottom: 8,
  },
  servicesTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  serviceTag: {
    backgroundColor: colors.highlight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  serviceTagText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  specializationSection: {
    marginBottom: 16,
  },
  specializationTitle: {
    fontWeight: '600',
    marginBottom: 8,
  },
  specializationTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  specializationTag: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  specializationTagText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  emailButton: {
    backgroundColor: colors.accent,
  },
  contactButtonText: {
    color: colors.card,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  emergencyCard: {
    backgroundColor: colors.highlight,
    marginBottom: 16,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  emergencyTitle: {
    marginLeft: 8,
    color: colors.warning,
  },
  emergencyContacts: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  emergencyButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.warning,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  emergencyButtonText: {
    color: colors.card,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  bottomSpacing: {
    height: Platform.OS === 'ios' ? 20 : 100,
  },
});
