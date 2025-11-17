import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Scale, FileText, AlertCircle, Users, Calendar, TrendingUp } from 'lucide-react-native';
import ServiceCard from '@/components/ServiceCard';
import Colors from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, isLawyer } = useAuth();

  const citizenName = user && 'fullName' in user.data ? user.data.fullName : 'User';
  const lawyerName = user && 'fullName' in user.data ? user.data.fullName : 'Lawyer';

  if (isLawyer()) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Welcome back,</Text>
              <Text style={styles.name}>{lawyerName}</Text>
            </View>
            <View style={styles.badge}>
              <Scale size={20} color={Colors.accent} />
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Calendar size={24} color={Colors.primary} />
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Appointments</Text>
            </View>
            <View style={styles.statCard}>
              <Users size={24} color={Colors.secondary} />
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Clients</Text>
            </View>
            <View style={styles.statCard}>
              <TrendingUp size={24} color={Colors.success} />
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <ServiceCard
              title="View Appointments"
              description="Check your upcoming client meetings"
              icon={Calendar}
              onPress={() => router.push('/(tabs)/profile')}
              color={Colors.primary}
            />
            <ServiceCard
              title="Update Profile"
              description="Edit your professional information"
              icon={Users}
              onPress={() => router.push('/(tabs)/profile')}
              color={Colors.secondary}
            />
          </View>

          <View style={styles.notice}>
            <Text style={styles.noticeTitle}>Verification Status</Text>
            <Text style={styles.noticeText}>
              Your account is verified and active. You&apos;re visible to all users looking for legal services.
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.name}>{citizenName}</Text>
          </View>
          <View style={styles.badge}>
            <Scale size={20} color={Colors.accent} />
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Access Justice with Ease</Text>
          <Text style={styles.heroSubtitle}>
            Your complete legal services platform in Rwanda
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          
          <ServiceCard
            title="Find a Lawyer"
            description="Browse verified lawyers by expertise and location"
            icon={Users}
            onPress={() => router.push('/(tabs)/lawyers')}
            color={Colors.primary}
            testID="find-lawyer-card"
          />

          <ServiceCard
            title="AI Document Generator"
            description="Generate legal documents instantly with AI"
            icon={FileText}
            onPress={() => router.push('/(tabs)/ai-docs')}
            color={Colors.secondary}
            testID="ai-docs-card"
          />

          <ServiceCard
            title="Report a Crime"
            description="Submit a crime report safely and securely"
            icon={AlertCircle}
            onPress={() => router.push('/(tabs)/report')}
            color={Colors.error}
            testID="report-crime-card"
          />
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Why Choose Lex Rwanda?</Text>
          <View style={styles.infoPoints}>
            <Text style={styles.infoPoint}>✓ Verified legal professionals</Text>
            <Text style={styles.infoPoint}>✓ AI-powered document generation</Text>
            <Text style={styles.infoPoint}>✓ Secure and confidential</Text>
            <Text style={styles.infoPoint}>✓ 24/7 accessibility</Text>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: Colors.text,
    marginTop: 4,
  },
  badge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: 'bold' as const,
    color: Colors.white,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 15,
    color: Colors.white + 'DD',
    lineHeight: 22,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: Colors.text,
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: Colors.backgroundGray,
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: Colors.text,
    marginBottom: 16,
  },
  infoPoints: {
    gap: 10,
  },
  infoPoint: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: Colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  notice: {
    backgroundColor: Colors.success + '15',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 8,
  },
  noticeText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});
