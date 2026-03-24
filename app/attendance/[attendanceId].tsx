import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import { TeacherCard } from '@/components/teacher/card';
import { TeacherScreen } from '@/components/teacher/screen';
import { ThemedText } from '@/components/themed-text';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { teacherService } from '@/services/teacher-service';
import type {
  AttendanceDetail,
  AttendanceStudent,
  StudentAttendanceStatus,
} from '@/types/teacher';

const statusOptions: StudentAttendanceStatus[] = ['Present', 'Absent', 'Late', 'Leave'];

export default function AttendanceDetailScreen() {
  const { attendanceId } = useLocalSearchParams<{ attendanceId: string }>();
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const [detail, setDetail] = useState<AttendanceDetail | null>(null);
  const [students, setStudents] = useState<AttendanceStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    let active = true;

    async function loadDetail() {
      const result = await teacherService.getAttendanceDetail(attendanceId);

      if (!active || !result) {
        setLoading(false);
        return;
      }

      setDetail(result);
      setStudents(result.students);
      setLoading(false);
    }

    loadDetail();

    return () => {
      active = false;
    };
  }, [attendanceId]);

  const summary = useMemo(() => {
    const counts: Record<StudentAttendanceStatus, number> = {
      Present: 0,
      Absent: 0,
      Late: 0,
      Leave: 0,
    };

    students.forEach((student) => {
      counts[student.status] += 1;
    });

    return counts;
  }, [students]);

  const isDirty =
    detail !== null &&
    detail.students.some((student, index) => student.status !== students[index]?.status);

  async function handleSave() {
    if (!detail) {
      return;
    }

    setSaving(true);
    setSaveMessage('');

    const updated = await teacherService.saveAttendance(detail.id, students);

    setDetail(updated);
    setStudents(updated.students);
    setSaving(false);
    setSaveMessage(`Saved at ${updated.cutoffLabel.replace('Saved at ', '')}`);
  }

  function updateStudentStatus(studentId: string, status: StudentAttendanceStatus) {
    setStudents((current) =>
      current.map((student) => (student.id === studentId ? { ...student, status } : student)),
    );
    setSaveMessage('');
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Attendance Detail', headerBackTitle: 'Attendance' }} />
      <TeacherScreen
        header={
          <View style={styles.header}>
            <ThemedText style={[styles.eyebrow, { color: palette.muted }]}>Attendance Detail</ThemedText>
            <ThemedText type="title" style={[styles.title, { fontFamily: Fonts.serif }]}>
              {detail?.classLabel ?? 'Loading roster'}
            </ThemedText>
            <ThemedText style={[styles.description, { color: palette.muted }]}>
              {detail ? `${detail.sessionLabel} · ${detail.subject}` : 'Fetching roster and current marks.'}
            </ThemedText>
          </View>
        }>
        {loading ? (
          <TeacherCard>
            <ActivityIndicator color={palette.accentStrong} />
            <ThemedText style={[styles.description, { color: palette.muted }]}>
              Loading attendance detail...
            </ThemedText>
          </TeacherCard>
        ) : !detail ? (
          <TeacherCard>
            <ThemedText type="subtitle">Attendance record not found</ThemedText>
            <ThemedText style={[styles.description, { color: palette.muted }]}>
              The roster could not be loaded for this class session.
            </ThemedText>
          </TeacherCard>
        ) : (
          <>
            <TeacherCard>
              <ThemedText type="subtitle">Session summary</ThemedText>
              <View style={styles.summaryRow}>
                {statusOptions.map((status) => (
                  <View key={status} style={[styles.summaryBadge, { backgroundColor: palette.surfaceMuted }]}>
                    <ThemedText style={[styles.summaryCount, { color: palette.accentStrong }]}>
                      {summary[status]}
                    </ThemedText>
                    <ThemedText style={[styles.summaryLabel, { color: palette.muted }]}>
                      {status}
                    </ThemedText>
                  </View>
                ))}
              </View>
              <ThemedText style={[styles.description, { color: palette.muted }]}>
                {detail.teacherNote}
              </ThemedText>
            </TeacherCard>

            <TeacherCard
              footer={
                <View style={styles.footerRow}>
                  <View style={styles.footerCopy}>
                    <ThemedText type="defaultSemiBold">
                      {isDirty ? 'Unsaved changes' : 'All changes saved'}
                    </ThemedText>
                    <ThemedText style={[styles.description, { color: palette.muted }]}>
                      {saveMessage || detail.cutoffLabel}
                    </ThemedText>
                  </View>
                  <Pressable
                    disabled={!isDirty || saving}
                    onPress={handleSave}
                    style={[
                      styles.saveButton,
                      {
                        backgroundColor:
                          !isDirty || saving ? palette.surfaceMuted : palette.accentStrong,
                        opacity: saving ? 0.7 : 1,
                      },
                    ]}>
                    <ThemedText
                      style={[
                        styles.saveButtonText,
                        { color: !isDirty || saving ? palette.muted : palette.background },
                      ]}>
                      {saving ? 'Saving...' : 'Save attendance'}
                    </ThemedText>
                  </Pressable>
                </View>
              }>
              <ThemedText type="subtitle">Student roster</ThemedText>
              {students.map((student) => (
                <View key={student.id} style={[styles.studentRow, { borderBottomColor: palette.border }]}>
                  <View style={styles.studentCopy}>
                    <ThemedText type="defaultSemiBold">{student.name}</ThemedText>
                    <ThemedText style={[styles.description, { color: palette.muted }]}>
                      Roll no. {student.rollNumber}
                    </ThemedText>
                  </View>
                  <View style={styles.optionWrap}>
                    {statusOptions.map((status) => {
                      const isSelected = student.status === status;

                      return (
                        <Pressable
                          key={status}
                          onPress={() => updateStudentStatus(student.id, status)}
                          style={[
                            styles.optionButton,
                            {
                              backgroundColor: isSelected ? palette.badgeBackground : palette.surfaceMuted,
                              borderColor: isSelected ? palette.accentStrong : palette.border,
                            },
                          ]}>
                          <ThemedText
                            style={[
                              styles.optionText,
                              { color: isSelected ? palette.accentStrong : palette.muted },
                            ]}>
                            {status}
                          </ThemedText>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
              ))}
            </TeacherCard>
          </>
        )}
      </TeacherScreen>
    </>
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
  summaryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  summaryBadge: {
    minWidth: 76,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: 'center',
    gap: 3,
  },
  summaryCount: {
    fontSize: 20,
    fontWeight: '800',
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  footerRow: {
    gap: 14,
  },
  footerCopy: {
    gap: 4,
  },
  saveButton: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  studentRow: {
    gap: 12,
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
  },
  studentCopy: {
    gap: 3,
  },
  optionWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  optionText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
