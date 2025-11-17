import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Scale } from 'lucide-react-native';
import Button from '@/components/Button';
import Colors from '@/constants/colors';

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.primaryDark]}
      style={styles.gradient}
    >
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Scale size={48} color={Colors.accent} strokeWidth={2.5} />
          </View>
          <Text style={styles.appName}>Lex Rwanda</Text>
          <Text style={styles.tagline}>Digital Justice for All</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Access Justice</Text>
          <Text style={styles.title}>Anytime, Anywhere</Text>
          <Text style={styles.description}>
            Connect with verified lawyers, generate legal documents with AI, and report crimes safely
          </Text>
        </View>

        <View style={styles.footer}>
          <Button
            title="Get Started"
            onPress={() => router.push('/auth/role-select')}
            style={styles.primaryButton}
            testID="get-started-button"
          />
          <Button
            title="Sign In"
            onPress={() => router.push('/auth/login')}
            variant="outline"
            style={styles.outlineButton}
            textStyle={styles.outlineButtonText}
            testID="sign-in-button"
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.white + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold' as const,
    color: Colors.white,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: Colors.accent,
    fontWeight: '600' as const,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    color: Colors.white,
    lineHeight: 40,
  },
  description: {
    fontSize: 16,
    color: Colors.white + 'DD',
    marginTop: 20,
    lineHeight: 24,
  },
  footer: {
    gap: 12,
    paddingBottom: 20,
  },
  primaryButton: {
    backgroundColor: Colors.accent,
  },
  outlineButton: {
    borderColor: Colors.white,
    backgroundColor: 'transparent',
  },
  outlineButtonText: {
    color: Colors.white,
  },
});
