import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { User, Mail, Phone, MapPin, Shield, FileText } from 'lucide-react-native';
import Button from '@/components/Button';
import Colors from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, signOut, isLawyer } = useAuth();

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/auth/welcome');
          },
        },
      ]
    );
  };

  if (!user) return null;

  const userData = user.data;
  const fullName = 'fullName' in userData ? userData.fullName : '';
  const email = 'email' in userData ? userData.email : '';
  const phone = 'phone' in userData ? userData.phone : '';

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.avatar}>
            <User size={40} color={Colors.white} />
          </View>
          <Text style={styles.name}>{fullName}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{isLawyer() ? 'Lawyer' : 'Citizen'}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Mail size={20} color={Colors.primary} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{email}</Text>
              </View>
            </View>

            <View style={styles.infoDivider} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Phone size={20} color={Colors.primary} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>{phone}</Text>
              </View>
            </View>

            {isLawyer() && 'location' in userData && (
              <>
                <View style={styles.infoDivider} />
                <View style={styles.infoRow}>
                  <View style={styles.infoIcon}>
                    <MapPin size={20} color={Colors.primary} />
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Location</Text>
                    <Text style={styles.infoValue}>{userData.location}</Text>
                  </View>
                </View>
              </>
            )}

            {isLawyer() && 'barNumber' in userData && (
              <>
                <View style={styles.infoDivider} />
                <View style={styles.infoRow}>
                  <View style={styles.infoIcon}>
                    <Shield size={20} color={Colors.primary} />
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Bar Number</Text>
                    <Text style={styles.infoValue}>{userData.barNumber}</Text>
                  </View>
                </View>
              </>
            )}

            {isLawyer() && 'yearsOfExperience' in userData && (
              <>
                <View style={styles.infoDivider} />
                <View style={styles.infoRow}>
                  <View style={styles.infoIcon}>
                    <FileText size={20} color={Colors.primary} />
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Experience</Text>
                    <Text style={styles.infoValue}>{userData.yearsOfExperience} years</Text>
                  </View>
                </View>
              </>
            )}

            {!isLawyer() && 'nationalId' in userData && (
              <>
                <View style={styles.infoDivider} />
                <View style={styles.infoRow}>
                  <View style={styles.infoIcon}>
                    <Shield size={20} color={Colors.primary} />
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>National ID</Text>
                    <Text style={styles.infoValue}>{userData.nationalId}</Text>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>

        {isLawyer() && 'expertise' in userData && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Areas of Expertise</Text>
            <View style={styles.expertiseContainer}>
              {userData.expertise.map((exp, idx) => (
                <View key={idx} style={styles.expertiseChip}>
                  <Text style={styles.expertiseText}>{exp}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Button
            title="Sign Out"
            onPress={handleSignOut}
            variant="danger"
            testID="sign-out-button"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: Colors.text,
    marginBottom: 8,
  },
  roleBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Colors.secondary + '20',
  },
  roleText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.secondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: Colors.text,
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500' as const,
  },
  infoDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 12,
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
});
