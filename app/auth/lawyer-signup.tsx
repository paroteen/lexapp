import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';
import { FileText } from 'lucide-react-native';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import Colors from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import { EXPERTISE_OPTIONS } from '@/mocks/lawyers';

export default function LawyerSignupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { signUpLawyer } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    barNumber: '',
    location: 'Kigali',
    yearsOfExperience: '',
    degreeUri: '',
  });
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setFormData({ ...formData, degreeUri: result.assets[0].uri });
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const toggleExpertise = (expertise: string) => {
    setSelectedExpertise((prev) =>
      prev.includes(expertise)
        ? prev.filter((e) => e !== expertise)
        : [...prev, expertise]
    );
  };

  const handleSignup = async () => {
    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.email ||
      !formData.password ||
      !formData.barNumber ||
      !formData.yearsOfExperience ||
      selectedExpertise.length === 0
    ) {
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
    const result = await signUpLawyer({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      barNumber: formData.barNumber,
      location: formData.location,
      expertise: selectedExpertise,
      yearsOfExperience: parseInt(formData.yearsOfExperience),
      degreeUri: formData.degreeUri,
      verified: false,
    });
    setLoading(false);

    if (result.success) {
      router.replace('/auth/pending-verification');
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
          <Text style={styles.title}>Create Lawyer Account</Text>
          <Text style={styles.subtitle}>Join our network of legal professionals</Text>
        </View>

        <View style={styles.form}>
          <InputField
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChangeText={(text) => setFormData({ ...formData, fullName: text })}
            required
            autoCapitalize="words"
          />

          <InputField
            label="Phone Number"
            placeholder="+250 7XX XXX XXX"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            required
            keyboardType="phone-pad"
          />

          <InputField
            label="Email Address"
            placeholder="your.email@example.com"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            required
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <InputField
            label="Bar Association Number"
            placeholder="BAR-XXXX-XXX"
            value={formData.barNumber}
            onChangeText={(text) => setFormData({ ...formData, barNumber: text })}
            required
            autoCapitalize="characters"
          />

          <InputField
            label="Years of Experience"
            placeholder="Number of years"
            value={formData.yearsOfExperience}
            onChangeText={(text) => setFormData({ ...formData, yearsOfExperience: text })}
            required
            keyboardType="numeric"
          />

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Areas of Expertise <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.expertiseContainer}>
              {EXPERTISE_OPTIONS.map((expertise) => (
                <TouchableOpacity
                  key={expertise}
                  style={[
                    styles.expertiseChip,
                    selectedExpertise.includes(expertise) && styles.expertiseChipSelected,
                  ]}
                  onPress={() => toggleExpertise(expertise)}
                >
                  <Text
                    style={[
                      styles.expertiseChipText,
                      selectedExpertise.includes(expertise) && styles.expertiseChipTextSelected,
                    ]}
                  >
                    {expertise}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Law School Degree (Optional)</Text>
            <TouchableOpacity style={styles.documentPicker} onPress={handlePickDocument}>
              <FileText size={24} color={Colors.primary} />
              <Text style={styles.documentPickerText}>
                {formData.degreeUri ? 'Document Selected' : 'Upload PDF or Image'}
              </Text>
            </TouchableOpacity>
          </View>

          <InputField
            label="Password"
            placeholder="Minimum 6 characters"
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            required
            secureTextEntry
          />

          <InputField
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
            required
            secureTextEntry
          />
        </View>

        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            Your account will be reviewed by our team. You&apos;ll receive a notification once verified.
          </Text>
        </View>

        <View style={styles.footer}>
          <Button
            title="Create Account"
            onPress={handleSignup}
            loading={loading}
          />
          <Button
            title="Already have an account? Sign In"
            onPress={() => router.push('/auth/login')}
            variant="outline"
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
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 8,
  },
  required: {
    color: Colors.error,
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
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  expertiseChipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  expertiseChipText: {
    fontSize: 14,
    color: Colors.text,
  },
  expertiseChipTextSelected: {
    color: Colors.white,
    fontWeight: '600' as const,
  },
  documentPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    borderStyle: 'dashed' as const,
    backgroundColor: Colors.backgroundGray,
  },
  documentPickerText: {
    fontSize: 15,
    color: Colors.text,
  },
  notice: {
    backgroundColor: Colors.secondary + '15',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  noticeText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  footer: {
    gap: 12,
  },
});
