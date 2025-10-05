
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { sampleIdentificationResults, pestsAndDiseases } from '@/data/zimbabweData';

export default function PestHistoryScreen() {
  const router = useRouter();
  const [sortBy, setSortBy] = useState<'date' | 'severity' | 'confidence'>('date');
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const renderHeaderRight = () => (
    <TouchableOpacity
      onPress={() => Alert.alert("Export", "Export functionality would be available here.")}
      style={styles.headerButton}
    >
      <IconSymbol name="square.and.arrow.up" color={colors.text} size={20} />
    </TouchableOpacity>
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return colors.error;
      case 'medium': return colors.warning;
      case 'low': return colors.success;
      default: return colors.textSecondary;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPestName = (pestId: string) => {
    const pest = pestsAndDiseases.find(p => p.id === pestId);
    return pest?.name || 'Unknown Pest';
  };

  const viewResult = (result: any) => {
    router.push({
      pathname: '/pest-results',
      params: {
        resultId: result.id,
        pestId: result.identifiedPest,
        confidence: result.confidence.toString(),
        severity: result.severity,
        imageUri: result.imageUri
      }
    });
  };

  const deleteResult = (resultId: string) => {
    Alert.alert(
      'Delete Result',
      'Are you sure you want to delete this identification result?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            // In a real app, this would delete from storage
            Alert.alert('Deleted', 'Result has been deleted.');
          }
        }
      ]
    );
  };

  // Mock data for demonstration - in a real app, this would come from storage
  const mockResults = [
    {
      id: 'result-1',
      confidence: 0.92,
      identifiedPest: 'fall-armyworm',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      imageUri: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
      severity: 'high' as const,
      location: 'Field A - Maize',
      recommendations: ['Apply Bt spray immediately', 'Monitor field daily']
    },
    {
      id: 'result-2',
      confidence: 0.87,
      identifiedPest: 'aphids',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      imageUri: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
      severity: 'medium' as const,
      location: 'Field B - Tobacco',
      recommendations: ['Use soap spray treatment', 'Encourage beneficial insects']
    },
    {
      id: 'result-3',
      confidence: 0.94,
      identifiedPest: 'striga',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
      imageUri: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
      severity: 'high' as const,
      location: 'Field C - Sorghum',
      recommendations: ['Hand weeding before flowering', 'Use resistant varieties']
    }
  ];

  const filteredResults = mockResults.filter(result => {
    if (filterSeverity === 'all') return true;
    return result.severity === filterSeverity;
  });

  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      case 'severity':
        const severityOrder = { high: 3, medium: 2, low: 1 };
        return severityOrder[b.severity] - severityOrder[a.severity];
      case 'confidence':
        return b.confidence - a.confidence;
      default:
        return 0;
    }
  });

  return (
    <SafeAreaView style={[commonStyles.safeArea, { backgroundColor: colors.background }]}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Identification History",
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
          <Text style={[commonStyles.title, styles.title]}>Identification History</Text>
          <Text style={[commonStyles.textSecondary, styles.subtitle]}>
            View and manage your past pest identifications
          </Text>
        </View>

        {/* Filters and Sorting */}
        <View style={[commonStyles.card, styles.filtersCard]}>
          <Text style={[commonStyles.subtitle, styles.filtersTitle]}>Filter & Sort</Text>
          
          {/* Severity Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Severity Level:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {['all', 'high', 'medium', 'low'].map((severity) => (
                <TouchableOpacity
                  key={severity}
                  style={[
                    styles.filterButton,
                    filterSeverity === severity && { 
                      backgroundColor: severity === 'all' ? colors.primary : getSeverityColor(severity) 
                    }
                  ]}
                  onPress={() => setFilterSeverity(severity as any)}
                >
                  <Text style={[
                    styles.filterButtonText,
                    filterSeverity === severity && styles.selectedFilterText
                  ]}>
                    {severity.charAt(0).toUpperCase() + severity.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Sort Options */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Sort by:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {[
                { key: 'date', label: 'Date' },
                { key: 'severity', label: 'Severity' },
                { key: 'confidence', label: 'Confidence' }
              ].map((option) => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.filterButton,
                    sortBy === option.key && { backgroundColor: colors.primary }
                  ]}
                  onPress={() => setSortBy(option.key as any)}
                >
                  <Text style={[
                    styles.filterButtonText,
                    sortBy === option.key && styles.selectedFilterText
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Results Count */}
        <View style={styles.resultsHeader}>
          <Text style={[commonStyles.subtitle, styles.resultsCount]}>
            {sortedResults.length} Result{sortedResults.length !== 1 ? 's' : ''}
          </Text>
        </View>

        {/* Results List */}
        {sortedResults.length === 0 ? (
          <View style={[commonStyles.card, styles.emptyState]}>
            <IconSymbol name="camera" size={48} color={colors.textSecondary} />
            <Text style={[commonStyles.subtitle, styles.emptyTitle]}>No Results Found</Text>
            <Text style={commonStyles.textSecondary}>
              {filterSeverity === 'all' 
                ? "You haven't made any pest identifications yet."
                : `No results found for ${filterSeverity} severity level.`
              }
            </Text>
            <TouchableOpacity
              style={styles.identifyButton}
              onPress={() => router.push('/pest-identification')}
            >
              <IconSymbol name="camera.fill" size={20} color={colors.card} />
              <Text style={styles.identifyButtonText}>Start Identifying</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.resultsList}>
            {sortedResults.map((result) => (
              <TouchableOpacity
                key={result.id}
                style={[commonStyles.card, styles.resultCard]}
                onPress={() => viewResult(result)}
              >
                <View style={styles.resultContent}>
                  <Image source={{ uri: result.imageUri }} style={styles.resultImage} />
                  
                  <View style={styles.resultInfo}>
                    <View style={styles.resultHeader}>
                      <Text style={[commonStyles.subtitle, styles.pestName]}>
                        {getPestName(result.identifiedPest)}
                      </Text>
                      <View style={[
                        styles.severityBadge,
                        { backgroundColor: getSeverityColor(result.severity) }
                      ]}>
                        <Text style={styles.severityText}>
                          {result.severity.toUpperCase()}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.resultDetails}>
                      <View style={styles.detailItem}>
                        <IconSymbol name="location" size={14} color={colors.textSecondary} />
                        <Text style={styles.detailText}>{result.location}</Text>
                      </View>
                      
                      <View style={styles.detailItem}>
                        <IconSymbol name="clock" size={14} color={colors.textSecondary} />
                        <Text style={styles.detailText}>{formatDate(result.timestamp)}</Text>
                      </View>
                      
                      <View style={styles.detailItem}>
                        <IconSymbol name="checkmark.circle" size={14} color={colors.success} />
                        <Text style={styles.detailText}>
                          {Math.round(result.confidence * 100)}% confidence
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.recommendationPreview} numberOfLines={2}>
                      {result.recommendations[0]}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteResult(result.id)}
                  >
                    <IconSymbol name="trash" size={16} color={colors.error} />
                  </TouchableOpacity>
                </View>

                <View style={styles.resultFooter}>
                  <TouchableOpacity
                    style={styles.viewButton}
                    onPress={() => viewResult(result)}
                  >
                    <Text style={styles.viewButtonText}>View Details</Text>
                    <IconSymbol name="chevron.right" size={14} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Statistics Card */}
        {sortedResults.length > 0 && (
          <View style={[commonStyles.card, styles.statsCard]}>
            <Text style={[commonStyles.subtitle, styles.statsTitle]}>Statistics</Text>
            
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{mockResults.length}</Text>
                <Text style={styles.statLabel}>Total Scans</Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {mockResults.filter(r => r.severity === 'high').length}
                </Text>
                <Text style={styles.statLabel}>High Severity</Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {Math.round(mockResults.reduce((acc, r) => acc + r.confidence, 0) / mockResults.length * 100)}%
                </Text>
                <Text style={styles.statLabel}>Avg. Confidence</Text>
              </View>
            </View>
          </View>
        )}

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
    alignItems: 'center',
    marginBottom: 20,
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
  filtersCard: {
    backgroundColor: colors.highlight,
    marginBottom: 16,
  },
  filtersTitle: {
    marginBottom: 16,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
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
  filterButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
  selectedFilterText: {
    color: colors.card,
  },
  resultsHeader: {
    marginBottom: 16,
  },
  resultsCount: {
    color: colors.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: colors.card,
  },
  emptyTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  identifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  identifyButtonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  resultsList: {
    gap: 12,
  },
  resultCard: {
    backgroundColor: colors.card,
    padding: 0,
  },
  resultContent: {
    flexDirection: 'row',
    padding: 16,
  },
  resultImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  resultInfo: {
    flex: 1,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  pestName: {
    flex: 1,
    marginRight: 8,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  severityText: {
    color: colors.card,
    fontSize: 10,
    fontWeight: '600',
  },
  resultDetails: {
    gap: 4,
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  recommendationPreview: {
    fontSize: 12,
    color: colors.text,
    fontStyle: 'italic',
  },
  deleteButton: {
    padding: 8,
  },
  resultFooter: {
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  statsCard: {
    backgroundColor: colors.highlight,
    marginTop: 16,
  },
  statsTitle: {
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  bottomSpacing: {
    height: Platform.OS === 'ios' ? 20 : 100,
  },
});
