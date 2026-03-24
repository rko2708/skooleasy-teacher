import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';

import { TeacherCard } from '@/components/teacher/card';
import { TeacherScreen } from '@/components/teacher/screen';
import { ThemedText } from '@/components/themed-text';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { teacherService } from '@/services/teacher-service';
import type { AssignmentEntry } from '@/types/teacher';

export default function AssignmentsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const [items, setItems] = useState<AssignmentEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadAssignments() {
      const assignments = await teacherService.getAssignments();

      if (!active) {
        return;
      }

      setItems(assignments);
      setLoading(false);
    }

    loadAssignments();

    return () => {
      active = false;
    };
  }, []);

  useFocusEffect(() => {
    let active = true;

    async function refreshAssignments() {
      const assignments = await teacherService.getAssignments();

      if (!active) {
        return;
      }

      setItems(assignments);
      setLoading(false);
    }

    refreshAssignments();

    return () => {
      active = false;
    };
  });

  return (
    <TeacherScreen
      header={
        <View style={styles.header}>
          <ThemedText style={[styles.eyebrow, { color: palette.muted }]}>Assignments</ThemedText>
          <ThemedText type="title" style={[styles.title, { fontFamily: Fonts.serif }]}>
            Homework and Review Queue
          </ThemedText>
          <ThemedText style={[styles.description, { color: palette.muted }]}>
            Teachers should be able to draft, publish, review, and grade student work from here.
          </ThemedText>
          <Pressable
            onPress={() => router.push('/assignments/create')}
            style={[styles.createButton, { backgroundColor: palette.accentStrong }]}>
            <ThemedText style={[styles.createButtonText, { color: palette.background }]}>
              Create assignment
            </ThemedText>
          </Pressable>
        </View>
      }>
      {loading ? (
        <TeacherCard>
          <ActivityIndicator color={palette.accentStrong} />
          <ThemedText style={[styles.description, { color: palette.muted }]}>
            Loading assignment queue...
          </ThemedText>
        </TeacherCard>
      ) : (
        <>
          {items.map((item) => (
            <Pressable key={item.id} onPress={() => router.push(`/assignments/${item.id}`)}>
              <TeacherCard>
                <View style={styles.topRow}>
                  <View style={styles.copy}>
                    <ThemedText type="subtitle">{item.title}</ThemedText>
                    <ThemedText style={[styles.description, { color: palette.muted }]}>
                      {item.classLabel}
                    </ThemedText>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: palette.badgeBackground }]}>
                    <ThemedText style={[styles.statusText, { color: palette.accentStrong }]}>
                      {item.status}
                    </ThemedText>
                  </View>
                </View>

                <ThemedText style={styles.summary}>{item.dueLabel}</ThemedText>
                <View style={styles.bottomRow}>
                  <ThemedText style={[styles.description, { color: palette.muted }]}>
                    {item.submissions}
                  </ThemedText>
                  <ThemedText style={[styles.openHint, { color: palette.accentStrong }]}>
                    Review details
                  </ThemedText>
                </View>
              </TeacherCard>
            </Pressable>
          ))}

          <TeacherCard>
            <ThemedText type="subtitle">Expected next actions</ThemedText>
            <ThemedText style={styles.summary}>Create assignment</ThemedText>
            <ThemedText style={[styles.description, { color: palette.muted }]}>
              Select class, subject, due date, instructions, and attachments before publishing.
            </ThemedText>
            <ThemedText style={styles.summary}>Review submissions</ThemedText>
            <ThemedText style={[styles.description, { color: palette.muted }]}>
              Teachers should be able to mark late work, grade, and return feedback comments.
            </ThemedText>
          </TeacherCard>
        </>
      )}
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
    fontSize: 31,
    lineHeight: 35,
  },
  createButton: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 11,
    marginTop: 4,
  },
  createButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
  },
  topRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  copy: {
    flex: 1,
    gap: 3,
  },
  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  summary: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '600',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'center',
  },
  openHint: {
    fontSize: 13,
    fontWeight: '700',
  },
});
