import { StyleSheet, View } from 'react-native';

import { TeacherCard } from '@/components/teacher/card';
import { TeacherScreen } from '@/components/teacher/screen';
import { ThemedText } from '@/components/themed-text';
import { Colors, Fonts } from '@/constants/theme';
import {
  assignments,
  dashboardStats,
  notices,
  studentSupportItems,
  teacherProfile,
  todaysSchedule,
} from '@/data/teacher-app';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function DashboardScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];

  return (
    <TeacherScreen
      header={
        <View style={styles.headerStack}>
          <ThemedText style={[styles.eyebrow, { color: palette.muted }]}>
            {teacherProfile.school}
          </ThemedText>
          <ThemedText type="title" style={[styles.title, { fontFamily: Fonts.serif }]}>
            Teacher Command Center
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: palette.muted }]}>
            {teacherProfile.name} · {teacherProfile.role} · {teacherProfile.homeroom}
          </ThemedText>
        </View>
      }>
      <TeacherCard style={[styles.heroCard, { backgroundColor: palette.heroBackground, borderColor: palette.heroBorder }]}>
        <View style={styles.heroRow}>
          <View style={styles.heroCopy}>
            <ThemedText style={[styles.heroLabel, { color: palette.heroAccent }]}>Today at a glance</ThemedText>
            <ThemedText style={styles.heroTitle}>Keep classes on time, attendance complete, and families informed.</ThemedText>
          </View>
          <View style={[styles.heroBadge, { backgroundColor: palette.badgeBackground }]}>
            <ThemedText style={[styles.heroBadgeText, { color: palette.heroAccent }]}>08:30 AM</ThemedText>
            <ThemedText style={[styles.heroBadgeSubtext, { color: palette.muted }]}>First bell</ThemedText>
          </View>
        </View>
      </TeacherCard>

      <View style={styles.statsGrid}>
        {dashboardStats.map((stat) => (
          <TeacherCard key={stat.label} style={styles.statCard}>
            <ThemedText style={[styles.statValue, { color: palette.accentStrong }]}>{stat.value}</ThemedText>
            <ThemedText type="defaultSemiBold">{stat.label}</ThemedText>
            <ThemedText style={[styles.helperText, { color: palette.muted }]}>{stat.helper}</ThemedText>
          </TeacherCard>
        ))}
      </View>

      <TeacherCard
        footer={<ThemedText style={[styles.footerHint, { color: palette.accentStrong }]}>Attendance, substitution, and room details should all come from timetable APIs.</ThemedText>}>
        <ThemedText type="subtitle">Next classes</ThemedText>
        {todaysSchedule.slice(0, 3).map((item) => (
          <View key={item.id} style={styles.listRow}>
            <View style={styles.listCopy}>
              <ThemedText type="defaultSemiBold">
                {item.subject} · {item.classLabel}
              </ThemedText>
              <ThemedText style={[styles.helperText, { color: palette.muted }]}>
                {item.time} · {item.room}
              </ThemedText>
            </View>
            <View
              style={[
                styles.pill,
                {
                  backgroundColor:
                    item.status === 'up-next'
                      ? palette.badgeBackground
                      : item.status === 'substitute'
                        ? palette.warningSoft
                        : palette.successSoft,
                },
              ]}>
              <ThemedText style={[styles.pillText, { color: palette.accentStrong }]}>
                {item.status === 'up-next'
                  ? 'Up next'
                  : item.status === 'substitute'
                    ? 'Substitution'
                    : 'Done'}
              </ThemedText>
            </View>
          </View>
        ))}
      </TeacherCard>

      <TeacherCard>
        <ThemedText type="subtitle">Assignments queue</ThemedText>
        {assignments.map((item) => (
          <View key={item.id} style={styles.listRow}>
            <View style={styles.listCopy}>
              <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
              <ThemedText style={[styles.helperText, { color: palette.muted }]}>
                {item.classLabel} · {item.dueLabel}
              </ThemedText>
              <ThemedText style={[styles.helperText, { color: palette.muted }]}>{item.submissions}</ThemedText>
            </View>
            <ThemedText style={[styles.assignmentStatus, { color: palette.accentStrong }]}>
              {item.status}
            </ThemedText>
          </View>
        ))}
      </TeacherCard>

      <View style={styles.dualColumn}>
        <TeacherCard style={styles.columnCard}>
          <ThemedText type="subtitle">Student support</ThemedText>
          {studentSupportItems.map((item) => (
            <View key={item.id} style={styles.compactBlock}>
              <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
              <ThemedText style={[styles.helperText, { color: palette.muted }]}>{item.detail}</ThemedText>
            </View>
          ))}
        </TeacherCard>

        <TeacherCard style={styles.columnCard}>
          <ThemedText type="subtitle">School notices</ThemedText>
          {notices.map((item) => (
            <View key={item.id} style={styles.compactBlock}>
              <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
              <ThemedText style={[styles.helperText, { color: palette.muted }]}>{item.detail}</ThemedText>
            </View>
          ))}
        </TeacherCard>
      </View>
    </TeacherScreen>
  );
}

const styles = StyleSheet.create({
  headerStack: {
    gap: 6,
  },
  eyebrow: {
    fontSize: 13,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 34,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  heroCard: {
    paddingVertical: 20,
  },
  heroRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  heroCopy: {
    flex: 1,
    gap: 8,
  },
  heroLabel: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '700',
  },
  heroBadge: {
    minWidth: 96,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 4,
  },
  heroBadgeText: {
    fontSize: 18,
    fontWeight: '700',
  },
  heroBadgeSubtext: {
    fontSize: 13,
  },
  statsGrid: {
    gap: 12,
  },
  statCard: {
    gap: 6,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
  },
  helperText: {
    fontSize: 14,
    lineHeight: 20,
  },
  footerHint: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '600',
  },
  listRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  listCopy: {
    flex: 1,
    gap: 3,
  },
  pill: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  assignmentStatus: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  dualColumn: {
    gap: 12,
  },
  columnCard: {
    flex: 1,
  },
  compactBlock: {
    gap: 5,
  },
});
