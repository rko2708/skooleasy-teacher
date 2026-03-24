import { StyleSheet, View } from 'react-native';

import { TeacherCard } from '@/components/teacher/card';
import { TeacherScreen } from '@/components/teacher/screen';
import { ThemedText } from '@/components/themed-text';
import { Colors, Fonts } from '@/constants/theme';
import { teacherProfile, todaysSchedule } from '@/data/teacher-app';
import { useColorScheme } from '@/hooks/use-color-scheme';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export default function ScheduleScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];

  return (
    <TeacherScreen
      header={
        <View style={styles.header}>
          <ThemedText style={[styles.eyebrow, { color: palette.muted }]}>Timetable</ThemedText>
          <ThemedText type="title" style={[styles.title, { fontFamily: Fonts.serif }]}>
            Weekly Schedule
          </ThemedText>
          <ThemedText style={[styles.description, { color: palette.muted }]}>
            Built for teacher-first planning, with substitutions, room updates, and attendance prompts.
          </ThemedText>
        </View>
      }>
      <TeacherCard>
        <View style={styles.weekRow}>
          {weekDays.map((day) => (
            <View
              key={day}
              style={[
                styles.weekDay,
                {
                  backgroundColor: day === 'Tue' ? palette.badgeBackground : palette.surfaceMuted,
                  borderColor: palette.border,
                },
              ]}>
              <ThemedText
                style={[
                  styles.weekDayText,
                  { color: day === 'Tue' ? palette.accentStrong : palette.muted },
                ]}>
                {day}
              </ThemedText>
            </View>
          ))}
        </View>
      </TeacherCard>

      <TeacherCard
        footer={
          <ThemedText style={[styles.footerText, { color: palette.muted }]}>
            {teacherProfile.role} access should unlock full-class attendance from schedule entries tied to the homeroom.
          </ThemedText>
        }>
        <ThemedText type="subtitle">Tuesday periods</ThemedText>
        {todaysSchedule.map((item) => (
          <View key={item.id} style={[styles.periodRow, { borderBottomColor: palette.border }]}>
            <View style={styles.timeBlock}>
              <ThemedText style={[styles.timeLabel, { color: palette.accentStrong }]}>{item.time}</ThemedText>
              <ThemedText style={[styles.roomLabel, { color: palette.muted }]}>{item.room}</ThemedText>
            </View>

            <View style={styles.periodCopy}>
              <ThemedText type="defaultSemiBold">
                {item.subject} · {item.classLabel}
              </ThemedText>
              <ThemedText style={[styles.description, { color: palette.muted }]}>
                {item.status === 'substitute'
                  ? 'Substitution period. Pull lesson notes and lab resources from the teacher handover endpoint.'
                  : 'Attendance, lesson plan, and assignment shortcuts should be available from this row.'}
              </ThemedText>
            </View>
          </View>
        ))}
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
    fontSize: 32,
    lineHeight: 36,
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
  },
  weekRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  weekDay: {
    minWidth: 58,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  weekDayText: {
    fontSize: 14,
    fontWeight: '700',
  },
  periodRow: {
    flexDirection: 'row',
    gap: 14,
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
  },
  timeBlock: {
    width: 108,
    gap: 5,
  },
  timeLabel: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
  },
  roomLabel: {
    fontSize: 13,
  },
  periodCopy: {
    flex: 1,
    gap: 6,
  },
  footerText: {
    fontSize: 13,
    lineHeight: 19,
  },
});
