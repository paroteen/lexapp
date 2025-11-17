import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, User, Scale } from 'lucide-react-native';
import Colors from '@/constants/colors';

export default function RoleSelectScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()}
        testID="back-button"
      >
        <ChevronLeft size={24} color={Colors.text} />
      </TouchableOpacity>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Role</Text>
          <Text style={styles.subtitle}>How would you like to use Lex Rwanda?</Text>
        </View>

        <View style={styles.rolesContainer}>
          <TouchableOpacity
            style={styles.roleCard}
            onPress={() => router.push('/auth/citizen-signup')}
            activeOpacity={0.7}
            testID="citizen-role-button"
          >
            <View style={[styles.roleIcon, { backgroundColor: Colors.primary + '15' }]}>
              <User size={40} color={Colors.primary} strokeWidth={2} />
            </View>
            <Text style={styles.roleTitle}>I&apos;m a Citizen</Text>
            <Text style={styles.roleDescription}>
              Access legal services, find lawyers, generate documents, and report crimes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.roleCard}
            onPress={() => router.push('/auth/lawyer-signup')}
            activeOpacity={0.7}
            testID="lawyer-role-button"
          >
            <View style={[styles.roleIcon, { backgroundColor: Colors.secondary + '15' }]}>
              <Scale size={40} color={Colors.secondary} strokeWidth={2} />
            </View>
            <Text style={styles.roleTitle}>I&apos;m a Lawyer</Text>
            <Text style={styles.roleDescription}>
              Offer your services, connect with clients, and grow your legal practice
            </Text>
          </TouchableOpacity>
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
  backButton: {
    padding: 16,
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    color: Colors.text,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  rolesContainer: {
    gap: 20,
  },
  roleCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  roleIcon: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  roleTitle: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: Colors.text,
    marginBottom: 12,
  },
  roleDescription: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
