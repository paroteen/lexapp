import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FileText, Send, X } from 'lucide-react-native';
import { useRorkAgent } from '@rork-ai/toolkit-sdk';
import InputField from '@/components/InputField';

import Colors from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';

export default function AIDocsScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const [showChat, setShowChat] = useState(false);
  const [inputText, setInputText] = useState('');

  const { messages, sendMessage } = useRorkAgent({ tools: {} });

  const documentTypes = [
    { id: 'contract', name: 'Contract', description: 'Employment, service, or rental contracts' },
    { id: 'affidavit', name: 'Affidavit', description: 'Sworn statements for legal proceedings' },
    { id: 'complaint', name: 'Complaint Letter', description: 'Formal complaints to authorities' },
    { id: 'land', name: 'Land Agreement', description: 'Property and land transaction documents' },
    { id: 'poa', name: 'Power of Attorney', description: 'Authority delegation documents' },
    { id: 'business', name: 'Business Agreement', description: 'Partnership and business contracts' },
  ];

  const handleStartGeneration = (docType: string) => {
    if (!user) return;
    
    const initialMessage = `I need help generating a ${docType}. Please guide me through the process by asking relevant questions.`;
    sendMessage(initialMessage);
    setShowChat(true);
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      sendMessage(inputText);
      setInputText('');
    }
  };

  if (showChat) {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={[styles.chatContainer, { paddingTop: insets.top }]}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatTitle}>AI Document Generator</Text>
            <TouchableOpacity onPress={() => setShowChat(false)}>
              <X size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.messagesContainer} contentContainerStyle={styles.messagesContent}>
            {messages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.messageBubble,
                  message.role === 'user' ? styles.userMessage : styles.assistantMessage,
                ]}
              >
                {message.parts.map((part, idx) => {
                  if (part.type === 'text') {
                    return (
                      <Text
                        key={idx}
                        style={[
                          styles.messageText,
                          message.role === 'user' ? styles.userMessageText : styles.assistantMessageText,
                        ]}
                      >
                        {part.text}
                      </Text>
                    );
                  }
                  return null;
                })}
              </View>
            ))}
          </ScrollView>

          <View style={[styles.inputContainer, { paddingBottom: insets.bottom + 8 }]}>
            <InputField
              label=""
              placeholder="Type your response..."
              value={inputText}
              onChangeText={setInputText}
              style={styles.chatInput}
              multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Send size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Document Generator</Text>
        <Text style={styles.subtitle}>Generate legal documents powered by AI</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.infoCard}>
          <FileText size={32} color={Colors.primary} />
          <Text style={styles.infoTitle}>How It Works</Text>
          <Text style={styles.infoText}>
            1. Select a document type{'\n'}
            2. Answer a few questions{'\n'}
            3. Review and download your document
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Choose Document Type</Text>

        {documentTypes.map((docType) => (
          <TouchableOpacity
            key={docType.id}
            style={styles.docTypeCard}
            onPress={() => handleStartGeneration(docType.name)}
          >
            <View style={styles.docTypeIcon}>
              <FileText size={24} color={Colors.primary} />
            </View>
            <View style={styles.docTypeInfo}>
              <Text style={styles.docTypeName}>{docType.name}</Text>
              <Text style={styles.docTypeDescription}>{docType.description}</Text>
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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  infoCard: {
    backgroundColor: Colors.primary + '10',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: Colors.text,
    marginTop: 16,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 24,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: Colors.text,
    marginBottom: 16,
  },
  docTypeCard: {
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
  docTypeIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: Colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  docTypeInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  docTypeName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  docTypeDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: Colors.text,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.white,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  userMessageText: {
    color: Colors.white,
  },
  assistantMessageText: {
    color: Colors.text,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: 12,
  },
  chatInput: {
    flex: 1,
  },
  sendButton: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
