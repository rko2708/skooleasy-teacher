import { StyleSheet, View } from 'react-native';

import { TeacherCard } from '@/components/teacher/card';
import { TeacherScreen } from '@/components/teacher/screen';
import { ThemedText } from '@/components/themed-text';
import { Colors, Fonts } from '@/constants/theme';
import { classOverviews } from '@/data/teacher-app';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ClassesScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];

  return (
    <TeacherScreen
      header={
        <View style={styles.header}>
          <ThemedText style={[styles.eyebrow, { color: palette.muted }]}>Classes</ThemedText>
          <ThemedText type="title" style={[styles.title, { fontFamily: Fonts.serif }]}>
            Class Teacher Workspace
          </ThemedText>
          <ThemedText style={[styles.description, { color: palette.muted }]}>
            Student overviews, attendance health, parent touchpoints, and section-level follow-up belong here.
          </ThemedText>
        </View>
      }>
      {classOverviews.map((item) => (
        <TeacherCard key={item.id}>
          <View style={styles.topRow}>
            <View style={styles.copy}>
              <ThemedText type="subtitle">{item.classLabel}</ThemedText>
              <ThemedText style={[styles.meta, { color: palette.muted }]}>
                {item.role} · {item.strength} students
              </ThemedText>
            </View>
            <View
              style={[
                styles.roleBadge,
                {
                  backgroundColor:
                    item.role === 'Class Teacher' ? palette.badgeBackground : palette.surfaceMuted,
                },
              ]}>
              <ThemedText style={[styles.roleText, { color: palette.accentStrong }]}>{item.role}</ThemedText>
            </View>
          </View>

          <View style={[styles.attendanceStrip, { backgroundColor: palette.surfaceMuted }]}>
            <ThemedText style={[styles.attendanceText, { color: palette.accentStrong }]}>
              {item.attendance}
            </ThemedText>
          </View>

          {item.pendingFlags.map((flag) => (
            <View key={flag} style={styles.flagRow}>
              <View style={[styles.dot, { backgroundColor: palette.warning }]} />
              <ThemedText style={styles.flagText}>{flag}</ThemedText>
            </View>
          ))}
        </TeacherCard>
      ))}
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
    gap: 4,
  },
  meta: {
    fontSize: 14,
    lineHeight: 20,
  },
  roleBadge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  roleText: {
    fontSize: 12,
    fontWeight: '700',
  },
  attendanceStrip: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  attendanceText: {
    fontSize: 14,
    fontWeight: '700',
  },
  flagRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },
  flagText: {
    fontSize: 15,
    lineHeight: 21,
  },
});
