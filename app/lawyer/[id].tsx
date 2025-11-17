import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, Modal } from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Star, MapPin, Briefcase, Calendar, X } from 'lucide-react-native';
import Button from '@/components/Button';
import Colors from '@/constants/colors';
import { mockLawyers } from '@/mocks/lawyers';

export default function LawyerProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const lawyer = mockLawyers.find((l) => l.id === id);

  if (!lawyer) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Lawyer not found</Text>
      </View>
    );
  }

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Error', 'Please select a date and time');
      return;
    }

    Alert.alert(
      'Booking Confirmed',
      `Your appointment with ${lawyer.fullName} is confirmed for ${selectedDate} at ${selectedTime}`,
      [
        {
          text: 'OK',
          onPress: () => {
            setShowBooking(false);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: lawyer.fullName,
          headerShown: true,
        }}
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.heroSection}>
          <Image source={{ uri: lawyer.photoUrl }} style={styles.photo} />
          <View style={styles.heroInfo}>
            <Text style={styles.name}>{lawyer.fullName}</Text>
            <View style={styles.metaRow}>
              <View style={styles.rating}>
                <Star size={16} color={Colors.accent} fill={Colors.accent} />
                <Text style={styles.ratingText}>
                  {lawyer.rating} ({lawyer.reviewCount} reviews)
                </Text>
              </View>
            </View>
            <View style={styles.metaRow}>
              <MapPin size={16} color={Colors.textSecondary} />
              <Text style={styles.metaText}>{lawyer.location}</Text>
            </View>
            <View style={styles.metaRow}>
              <Briefcase size={16} color={Colors.textSecondary} />
              <Text style={styles.metaText}>{lawyer.yearsOfExperience} years experience</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bio}>{lawyer.bio}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Areas of Expertise</Text>
          <View style={styles.expertiseContainer}>
            {lawyer.expertise.map((exp, idx) => (
              <View key={idx} style={styles.expertiseChip}>
                <Text style={styles.expertiseText}>{exp}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.contactCard}>
            <Text style={styles.contactLabel}>Email</Text>
            <Text style={styles.contactValue}>{lawyer.email}</Text>
            <View style={styles.contactDivider} />
            <Text style={styles.contactLabel}>Phone</Text>
            <Text style={styles.contactValue}>{lawyer.phone}</Text>
            <View style={styles.contactDivider} />
            <Text style={styles.contactLabel}>Bar Number</Text>
            <Text style={styles.contactValue}>{lawyer.barNumber}</Text>
          </View>
        </View>

        <View style={[styles.section, { paddingBottom: insets.bottom + 20 }]}>
          <Button
            title="Book Appointment"
            onPress={() => setShowBooking(true)}
            testID="book-appointment-button"
          />
        </View>
      </ScrollView>

      <Modal
        visible={showBooking}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowBooking(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { paddingBottom: insets.bottom + 20 }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Book Appointment</Text>
              <TouchableOpacity onPress={() => setShowBooking(false)}>
                <X size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={styles.modalSubtitle}>Select Date</Text>
              <View style={styles.availabilityContainer}>
                {lawyer.availability.map((avail, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={[
                      styles.dateChip,
                      selectedDate === avail.day && styles.dateChipSelected,
                    ]}
                    onPress={() => {
                      setSelectedDate(avail.day);
                      setSelectedTime('');
                    }}
                  >
                    <Text
                      style={[
                        styles.dateChipText,
                        selectedDate === avail.day && styles.dateChipTextSelected,
                      ]}
                    >
                      {avail.day}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {selectedDate && (
                <>
                  <Text style={styles.modalSubtitle}>Select Time</Text>
                  <View style={styles.timeSlotsContainer}>
                    {lawyer.availability
                      .find((a) => a.day === selectedDate)
                      ?.slots.map((slot, idx) => (
                        <TouchableOpacity
                          key={idx}
                          style={[
                            styles.timeSlot,
                            selectedTime === slot && styles.timeSlotSelected,
                          ]}
                          onPress={() => setSelectedTime(slot)}
                        >
                          <Calendar size={16} color={selectedTime === slot ? Colors.white : Colors.primary} />
                          <Text
                            style={[
                              styles.timeSlotText,
                              selectedTime === slot && styles.timeSlotTextSelected,
                            ]}
                          >
                            {slot}
                          </Text>
                        </TouchableOpacity>
                      ))}
                  </View>
                </>
              )}
            </ScrollView>

            <View style={styles.modalFooter}>
              <Button
                title="Confirm Booking"
                onPress={handleBooking}
                disabled={!selectedDate || !selectedTime}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingBottom: 20,
  },
  heroSection: {
    backgroundColor: Colors.white,
    padding: 20,
    alignItems: 'center',
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    backgroundColor: Colors.backgroundGray,
  },
  heroInfo: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: Colors.text,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 15,
    color: Colors.text,
  },
  metaText: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: Colors.text,
    marginBottom: 16,
  },
  bio: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  expertiseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  expertiseChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.primary,
  },
  expertiseText: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: '600' as const,
  },
  contactCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  contactLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500' as const,
  },
  contactDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 12,
  },
  errorText: {
    fontSize: 16,
    color: Colors.error,
    textAlign: 'center',
    marginTop: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: Colors.text,
  },
  modalBody: {
    flex: 1,
    padding: 20,
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 12,
  },
  availabilityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  dateChip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  dateChipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  dateChipText: {
    fontSize: 15,
    color: Colors.text,
  },
  dateChipTextSelected: {
    color: Colors.white,
    fontWeight: '600' as const,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  timeSlotSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  timeSlotText: {
    fontSize: 15,
    color: Colors.text,
  },
  timeSlotTextSelected: {
    color: Colors.white,
    fontWeight: '600' as const,
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});
