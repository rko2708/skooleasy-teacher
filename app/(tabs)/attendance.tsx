import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';

import { TeacherCard } from '@/components/teacher/card';
import { TeacherScreen } from '@/components/teacher/screen';
import { ThemedText } from '@/components/themed-text';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { teacherService } from '@/services/teacher-service';
import type { AttendanceEntry, InsightItem } from '@/types/teacher';

export default function AttendanceScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const [attendance, setAttendance] = useState<AttendanceEntry[]>([]);
  const [insights, setInsights] = useState<InsightItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadInsights() {
      const insightItems = await teacherService.getAttendanceInsights();

      if (!active) {
        return;
      }

      setInsights(insightItems);
    }

    loadInsights();

    return () => {
      active = false;
    };
  }, []);

  useFocusEffect(() => {
    let active = true;

    async function loadAttendance() {
      const attendanceItems = await teacherService.getAttendance();

      if (!active) {
        return;
      }

      setAttendance(attendanceItems);
      setLoading(false);
    }

    loadAttendance();

    return () => {
      active = false;
    };
  });

  return (
    <TeacherScreen
      header={
        <View style={styles.header}>
          <ThemedText style={[styles.eyebrow, { color: palette.muted }]}>Attendance</ThemedText>
          <ThemedText type="title" style={[styles.title, { fontFamily: Fonts.serif }]}>
            Daily Attendance Desk
          </ThemedText>
          <ThemedText style={[styles.description, { color: palette.muted }]}>
            Class teachers manage daily attendance while subject teachers can complete period-based rolls.
          </ThemedText>
        </View>
      }>
      {loading ? (
        <TeacherCard>
          <ActivityIndicator color={palette.accentStrong} />
          <ThemedText style={[styles.description, { color: palette.muted }]}>
            Loading attendance desk...
          </ThemedText>
        </TeacherCard>
      ) : (
        <>
          {attendance.map((entry) => (
            <Pressable key={entry.id} onPress={() => router.push(`/attendance/${entry.id}`)}>
              <TeacherCard>
                <View style={styles.topRow}>
                  <View style={styles.copy}>
                    <ThemedText type="subtitle">{entry.classLabel}</ThemedText>
                    <ThemedText style={[styles.description, { color: palette.muted }]}>
                      {entry.mode} attendance
                    </ThemedText>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          entry.status === 'pending' ? palette.warningSoft : palette.successSoft,
                      },
                    ]}>
                    <ThemedText style={[styles.statusText, { color: palette.accentStrong }]}>
                      {entry.status}
                    </ThemedText>
                  </View>
                </View>

                <ThemedText style={styles.summary}>{entry.summary}</ThemedText>
                <View style={styles.bottomRow}>
                  <ThemedText style={[styles.description, { color: palette.muted }]}>
                    {entry.cutoffLabel}
                  </ThemedText>
                  <ThemedText style={[styles.openHint, { color: palette.accentStrong }]}>
                    Open roster
                  </ThemedText>
                </View>
              </TeacherCard>
            </Pressable>
          ))}

          <TeacherCard>
            <ThemedText type="subtitle">Class teacher follow-ups</ThemedText>
            {insights.map((item) => (
              <View key={item.id} style={styles.insightRow}>
                <View style={[styles.dot, { backgroundColor: palette.warning }]} />
                <View style={styles.copy}>
                  <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
                  <ThemedText style={[styles.description, { color: palette.muted }]}>
                    {item.detail}
                  </ThemedText>
                </View>
              </View>
            ))}
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
  },
  insightRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
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
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    marginTop: 8,
  },
});
