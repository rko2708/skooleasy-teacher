import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Redirect } from 'expo-router';

import { TeacherCard } from '@/components/teacher/card';
import { TeacherScreen } from '@/components/teacher/screen';
import { ThemedText } from '@/components/themed-text';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '@/providers/auth-provider';

export default function SignInScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const { initialized, session, signIn } = useAuth();
  const [email, setEmail] = useState('ananya.mehta@skooleasy.school');
  const [password, setPassword] = useState('teacher123');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (session) {
    return <Redirect href="/(tabs)" />;
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError('');

    try {
      await signIn({ email, password });
    } catch (submissionError) {
      const message =
        submissionError instanceof Error ? submissionError.message : 'Unable to sign in.';
      setError(message);
      setSubmitting(false);
    }
  }

  return (
    <TeacherScreen
      header={
        <View style={styles.header}>
          <ThemedText style={[styles.eyebrow, { color: palette.muted }]}>Teacher Access</ThemedText>
          <ThemedText type="title" style={[styles.title, { fontFamily: Fonts.serif }]}>
            Sign in to SkoolEasy
          </ThemedText>
          <ThemedText style={[styles.description, { color: palette.muted }]}>
            {initialized
              ? 'Use teacher credentials to unlock attendance, assignments, and class workflows.'
              : 'Preparing secure teacher session...'}
          </ThemedText>
        </View>
      }>
      <TeacherCard
        footer={
          <Pressable
            disabled={submitting || !initialized}
            onPress={handleSubmit}
            style={[
              styles.submitButton,
              {
                backgroundColor:
                  submitting || !initialized ? palette.surfaceMuted : palette.accentStrong,
                opacity: submitting ? 0.7 : 1,
              },
            ]}>
            {submitting ? (
              <ActivityIndicator color={palette.background} />
            ) : (
              <ThemedText style={[styles.submitButtonText, { color: palette.background }]}>
                Sign in
              </ThemedText>
            )}
          </Pressable>
        }>
        <View style={styles.inputGroup}>
          <ThemedText type="defaultSemiBold">Email</ThemedText>
          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="teacher@school.edu"
            placeholderTextColor={palette.muted}
            style={[
              styles.input,
              {
                backgroundColor: palette.surfaceMuted,
                borderColor: palette.border,
                color: palette.text,
              },
            ]}
            value={email}
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText type="defaultSemiBold">Password</ThemedText>
          <TextInput
            onChangeText={setPassword}
            placeholder="Enter password"
            placeholderTextColor={palette.muted}
            secureTextEntry
            style={[
              styles.input,
              {
                backgroundColor: palette.surfaceMuted,
                borderColor: palette.border,
                color: palette.text,
              },
            ]}
            value={password}
          />
        </View>

        {error ? (
          <ThemedText style={[styles.errorText, { color: palette.warning }]}>{error}</ThemedText>
        ) : null}
      </TeacherCard>
    </TeacherScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 6,
  },
  eyebrow: {
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 33,
    lineHeight: 37,
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
  },
  inputGroup: {
    gap: 8,
  },
  input: {
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
  },
  submitButton: {
    alignItems: 'center',
    borderRadius: 16,
    minHeight: 52,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  submitButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  errorText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '600',
  },
});
