import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Clock, CheckCircle } from 'lucide-react-native';
import Button from '@/components/Button';
import Colors from '@/constants/colors';

export default function PendingVerificationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Clock size={64} color={Colors.secondary} strokeWidth={1.5} />
        </View>
        
        <Text style={styles.title}>Account Pending Verification</Text>
        <Text style={styles.description}>
          Thank you for registering as a lawyer. Your account is currently under review by our admin team.
        </Text>

        <View style={styles.steps}>
          <View style={styles.step}>
            <CheckCircle size={24} color={Colors.success} />
            <Text style={styles.stepText}>Application Submitted</Text>
          </View>
          <View style={styles.step}>
            <Clock size={24} color={Colors.warning} />
            <Text style={styles.stepText}>Documents Under Review</Text>
          </View>
          <View style={styles.step}>
            <Clock size={24} color={Colors.textLight} />
            <Text style={[styles.stepText, styles.stepTextInactive]}>Account Activation</Text>
          </View>
        </View>

        <Text style={styles.notice}>
          You&apos;ll receive an email notification once your account is verified. This usually takes 1-2 business days.
        </Text>
      </View>

      <View style={styles.footer}>
        <Button
          title="Go to Login"
          onPress={() => router.replace('/auth/login')}
          testID="go-to-login-button"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.secondary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  steps: {
    width: '100%',
    gap: 20,
    marginBottom: 32,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepText: {
    fontSize: 16,
    color: Colors.text,
  },
  stepTextInactive: {
    color: Colors.textLight,
  },
  notice: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  footer: {
    paddingBottom: 20,
  },
});
