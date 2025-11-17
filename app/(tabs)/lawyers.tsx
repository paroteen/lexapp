import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, Filter, MapPin, Star } from 'lucide-react-native';
import InputField from '@/components/InputField';
import Colors from '@/constants/colors';
import { mockLawyers, EXPERTISE_OPTIONS, LOCATIONS } from '@/mocks/lawyers';

export default function LawyersScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const filteredLawyers = mockLawyers.filter((lawyer) => {
    const matchesSearch = lawyer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lawyer.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesExpertise = selectedExpertise.length === 0 ||
      selectedExpertise.some(e => lawyer.expertise.includes(e));
    
    const matchesLocation = !selectedLocation || lawyer.location === selectedLocation;
    
    return matchesSearch && matchesExpertise && matchesLocation && lawyer.verified;
  });

  const toggleExpertise = (expertise: string) => {
    setSelectedExpertise((prev) =>
      prev.includes(expertise) ? prev.filter((e) => e !== expertise) : [...prev, expertise]
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Find a Lawyer</Text>
        <Text style={styles.subtitle}>Connect with verified legal professionals</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={Colors.textLight} style={styles.searchIcon} />
          <InputField
            label=""
            placeholder="Search by name or expertise..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      {showFilters && (
        <View style={styles.filtersContainer}>
          <Text style={styles.filterTitle}>Expertise</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {EXPERTISE_OPTIONS.map((expertise) => (
              <TouchableOpacity
                key={expertise}
                style={[
                  styles.filterChip,
                  selectedExpertise.includes(expertise) && styles.filterChipActive,
                ]}
                onPress={() => toggleExpertise(expertise)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedExpertise.includes(expertise) && styles.filterChipTextActive,
                  ]}
                >
                  {expertise}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.filterTitle}>Location</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            <TouchableOpacity
              style={[styles.filterChip, !selectedLocation && styles.filterChipActive]}
              onPress={() => setSelectedLocation(null)}
            >
              <Text style={[styles.filterChipText, !selectedLocation && styles.filterChipTextActive]}>
                All Locations
              </Text>
            </TouchableOpacity>
            {LOCATIONS.map((location) => (
              <TouchableOpacity
                key={location}
                style={[
                  styles.filterChip,
                  selectedLocation === location && styles.filterChipActive,
                ]}
                onPress={() => setSelectedLocation(location)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedLocation === location && styles.filterChipTextActive,
                  ]}
                >
                  {location}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <ScrollView
        style={styles.lawyersList}
        contentContainerStyle={styles.lawyersListContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.resultsCount}>
          {filteredLawyers.length} lawyer{filteredLawyers.length !== 1 ? 's' : ''} found
        </Text>

        {filteredLawyers.map((lawyer) => (
          <TouchableOpacity
            key={lawyer.id}
            style={styles.lawyerCard}
            onPress={() => router.push(`/lawyer/${lawyer.id}`)}
          >
            <Image source={{ uri: lawyer.photoUrl }} style={styles.lawyerPhoto} />
            <View style={styles.lawyerInfo}>
              <Text style={styles.lawyerName}>{lawyer.fullName}</Text>
              <View style={styles.lawyerMeta}>
                <View style={styles.ratingContainer}>
                  <Star size={14} color={Colors.accent} fill={Colors.accent} />
                  <Text style={styles.ratingText}>
                    {lawyer.rating} ({lawyer.reviewCount})
                  </Text>
                </View>
                <View style={styles.locationContainer}>
                  <MapPin size={14} color={Colors.textLight} />
                  <Text style={styles.locationText}>{lawyer.location}</Text>
                </View>
              </View>
              <View style={styles.expertiseList}>
                {lawyer.expertise.slice(0, 3).map((exp, idx) => (
                  <View key={idx} style={styles.expertiseTag}>
                    <Text style={styles.expertiseTagText}>{exp}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.experience}>{lawyer.yearsOfExperience} years experience</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 16,
  },
  searchInputContainer: {
    flex: 1,
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: 18,
    zIndex: 1,
  },
  searchInput: {
    paddingLeft: 44,
  },
  filterButton: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 12,
    marginTop: 8,
  },
  filterScroll: {
    marginBottom: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterChipText: {
    fontSize: 14,
    color: Colors.text,
  },
  filterChipTextActive: {
    color: Colors.white,
    fontWeight: '600' as const,
  },
  lawyersList: {
    flex: 1,
  },
  lawyersListContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  resultsCount: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  lawyerCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lawyerPhoto: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
    backgroundColor: Colors.backgroundGray,
  },
  lawyerInfo: {
    flex: 1,
  },
  lawyerName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 6,
  },
  lawyerMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  expertiseList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 6,
  },
  expertiseTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: Colors.primary + '15',
  },
  expertiseTagText: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '600' as const,
  },
  experience: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
});
