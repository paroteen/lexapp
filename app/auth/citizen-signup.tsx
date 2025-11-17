import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import Colors from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';

export default function CitizenSignupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { signUpCitizen } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    nationalId: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!formData.fullName || !formData.nationalId || !formData.phone || !formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    const result = await signUpCitizen(formData);
    setLoading(false);

    if (result.success) {
      router.replace('/(tabs)/home');
    } else {
      Alert.alert('Error', result.error || 'Failed to create account');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create Citizen Account</Text>
          <Text style={styles.subtitle}>Join Lex Rwanda to access legal services</Text>
        </View>

        <View style={styles.form}>
          <InputField
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChangeText={(text) => setFormData({ ...formData, fullName: text })}
            required
            autoCapitalize="words"
            testID="fullName-input"
          />

          <InputField
            label="National ID Number"
            placeholder="1 XXXX X XXXXXXX X XX"
            value={formData.nationalId}
            onChangeText={(text) => setFormData({ ...formData, nationalId: text })}
            required
            keyboardType="numeric"
            testID="nationalId-input"
          />

          <InputField
            label="Phone Number"
            placeholder="+250 7XX XXX XXX"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            required
            keyboardType="phone-pad"
            testID="phone-input"
          />

          <InputField
            label="Email Address"
            placeholder="your.email@example.com"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            required
            keyboardType="email-address"
            autoCapitalize="none"
            testID="email-input"
          />

          <InputField
            label="Password"
            placeholder="Minimum 6 characters"
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            required
            secureTextEntry
            testID="password-input"
          />

          <InputField
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
            required
            secureTextEntry
            testID="confirmPassword-input"
          />
        </View>

        <View style={styles.footer}>
          <Button
            title="Create Account"
            onPress={handleSignup}
            loading={loading}
            testID="signup-button"
          />
          <Button
            title="Already have an account? Sign In"
            onPress={() => router.push('/auth/login')}
            variant="outline"
            testID="login-link"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  form: {
    marginBottom: 24,
  },
  footer: {
    gap: 12,
  },
});
