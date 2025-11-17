import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'lucide-react-native';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import Colors from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';

export default function ReportScreen() {
  const insets = useSafeAreaInsets();
  useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    anonymous: false,
  });
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      Alert.alert('Permission Required', 'Please allow access to your photo library');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets) {
      const newImages = result.assets.map(asset => asset.uri);
      setImages([...images, ...newImages]);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.location) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Report Submitted',
        'Your crime report has been submitted successfully. Authorities will review it shortly.',
        [
          {
            text: 'OK',
            onPress: () => {
              setFormData({
                title: '',
                description: '',
                location: '',
                date: new Date().toISOString().split('T')[0],
                anonymous: false,
              });
              setImages([]);
            },
          },
        ]
      );
    }, 1500);
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
          <Text style={styles.title}>Report a Crime</Text>
          <Text style={styles.subtitle}>Submit your report securely and confidentially</Text>
        </View>

        <View style={styles.warningCard}>
          <Text style={styles.warningText}>
            This service is for reporting crimes in Rwanda. Your report will be reviewed by authorities. In case of emergency, call 112.
          </Text>
        </View>

        <View style={styles.form}>
          <InputField
            label="Incident Title"
            placeholder="Brief description of the incident"
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
            required
          />

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              What Happened? <Text style={styles.required}>*</Text>
            </Text>
            <InputField
              label=""
              placeholder="Describe the incident in detail..."
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              multiline
              numberOfLines={6}
              style={styles.textArea}
            />
          </View>

          <InputField
            label="Location"
            placeholder="Where did this happen?"
            value={formData.location}
            onChangeText={(text) => setFormData({ ...formData, location: text })}
            required
          />

          <InputField
            label="Date of Incident"
            placeholder="YYYY-MM-DD"
            value={formData.date}
            onChangeText={(text) => setFormData({ ...formData, date: text })}
            required
          />

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Photos or Videos (Optional)</Text>
            <TouchableOpacity style={styles.mediaPicker} onPress={handlePickImage}>
              <Camera size={24} color={Colors.primary} />
              <Text style={styles.mediaPickerText}>
                {images.length > 0 ? `${images.length} file(s) selected` : 'Add photos or videos'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setFormData({ ...formData, anonymous: !formData.anonymous })}
          >
            <View style={[styles.checkboxBox, formData.anonymous && styles.checkboxBoxChecked]}>
              {formData.anonymous && <View style={styles.checkboxCheck} />}
            </View>
            <Text style={styles.checkboxLabel}>Report anonymously</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Your Privacy</Text>
          <Text style={styles.infoText}>
            All reports are handled confidentially. If you choose to report anonymously, your identity will not be shared with anyone.
          </Text>
        </View>

        <Button
          title="Submit Report"
          onPress={handleSubmit}
          loading={loading}
        />
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
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
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
  warningCard: {
    backgroundColor: Colors.warning + '15',
    borderLeftWidth: 4,
    borderLeftColor: Colors.warning,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  warningText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
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
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  mediaPicker: {
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
  mediaPickerText: {
    fontSize: 15,
    color: Colors.text,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxBoxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkboxCheck: {
    width: 12,
    height: 12,
    borderRadius: 3,
    backgroundColor: Colors.white,
  },
  checkboxLabel: {
    fontSize: 15,
    color: Colors.text,
  },
  infoCard: {
    backgroundColor: Colors.primary + '10',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});
