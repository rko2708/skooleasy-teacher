import { useState } from 'react';
import { Alert, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Stack, router } from 'expo-router';

import { TeacherCard } from '@/components/teacher/card';
import { TeacherScreen } from '@/components/teacher/screen';
import { ThemedText } from '@/components/themed-text';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { teacherService } from '@/services/teacher-service';

const initialForm = {
  title: '',
  classLabel: 'Grade 7-B',
  subject: 'Mathematics',
  dueLabel: '',
  instructions: '',
  attachmentLabel: '',
};

export default function CreateAssignmentScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);

  function updateField(field: keyof typeof initialForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleCreate() {
    if (!form.title || !form.dueLabel || !form.instructions) {
      Alert.alert('Missing details', 'Title, due label, and instructions are required.');
      return;
    }

    setSaving(true);
    const created = await teacherService.createAssignment(form);
    setSaving(false);
    router.replace(`/assignments/${created.id}`);
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Create Assignment', headerBackTitle: 'Assignments' }} />
      <TeacherScreen
        header={
          <View style={styles.header}>
            <ThemedText style={[styles.eyebrow, { color: palette.muted }]}>Create Assignment</ThemedText>
            <ThemedText type="title" style={[styles.title, { fontFamily: Fonts.serif }]}>
              Draft a New Task
            </ThemedText>
            <ThemedText style={[styles.description, { color: palette.muted }]}>
              This flow should later submit to the assignments API and return the teacher to the review detail screen.
            </ThemedText>
          </View>
        }>
        <TeacherCard
          footer={
            <Pressable
              onPress={handleCreate}
              disabled={saving}
              style={[
                styles.createButton,
                {
                  backgroundColor: saving ? palette.surfaceMuted : palette.accentStrong,
                  opacity: saving ? 0.7 : 1,
                },
              ]}>
              <ThemedText
                style={[
                  styles.createButtonText,
                  { color: saving ? palette.muted : palette.background },
                ]}>
                {saving ? 'Creating draft...' : 'Create assignment'}
              </ThemedText>
            </Pressable>
          }>
          <InputField
            label="Title"
            value={form.title}
            onChangeText={(value) => updateField('title', value)}
            palette={palette}
            placeholder="Fractions checkpoint worksheet"
          />
          <InputField
            label="Class"
            value={form.classLabel}
            onChangeText={(value) => updateField('classLabel', value)}
            palette={palette}
            placeholder="Grade 7-B"
          />
          <InputField
            label="Subject"
            value={form.subject}
            onChangeText={(value) => updateField('subject', value)}
            palette={palette}
            placeholder="Mathematics"
          />
          <InputField
            label="Due Label"
            value={form.dueLabel}
            onChangeText={(value) => updateField('dueLabel', value)}
            palette={palette}
            placeholder="Due Thursday, 4:00 PM"
          />
          <InputField
            label="Attachment"
            value={form.attachmentLabel}
            onChangeText={(value) => updateField('attachmentLabel', value)}
            palette={palette}
            placeholder="worksheet-fractions.pdf"
          />
          <InputField
            label="Instructions"
            value={form.instructions}
            onChangeText={(value) => updateField('instructions', value)}
            palette={palette}
            placeholder="Write clear task instructions for students."
            multiline
          />
        </TeacherCard>
      </TeacherScreen>
    </>
  );
}

type InputFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  palette: (typeof Colors)['light'];
  multiline?: boolean;
};

function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  palette,
  multiline = false,
}: InputFieldProps) {
  return (
    <View style={styles.inputGroup}>
      <ThemedText type="defaultSemiBold">{label}</ThemedText>
      <TextInput
        multiline={multiline}
        numberOfLines={multiline ? 5 : 1}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={palette.muted}
        style={[
          styles.input,
          {
            backgroundColor: palette.surfaceMuted,
            borderColor: palette.border,
            color: palette.text,
            minHeight: multiline ? 120 : 52,
            textAlignVertical: multiline ? 'top' : 'center',
          },
        ]}
        value={value}
      />
    </View>
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
    fontSize: 31,
    lineHeight: 35,
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
  createButton: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
});
