import { StyleSheet, View } from 'react-native';

import { TeacherCard } from '@/components/teacher/card';
import { TeacherScreen } from '@/components/teacher/screen';
import { ThemedText } from '@/components/themed-text';
import { Colors, Fonts } from '@/constants/theme';
import { apiDomains, teacherProfile } from '@/data/teacher-app';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];

  return (
    <TeacherScreen
      header={
        <View style={styles.header}>
          <ThemedText style={[styles.eyebrow, { color: palette.muted }]}>Profile</ThemedText>
          <ThemedText type="title" style={[styles.title, { fontFamily: Fonts.serif }]}>
            Permissions and API Scope
          </ThemedText>
          <ThemedText style={[styles.description, { color: palette.muted }]}>
            This tab helps anchor the frontend around role-aware capability instead of school-wide admin ownership.
          </ThemedText>
        </View>
      }>
      <TeacherCard>
        <ThemedText type="subtitle">{teacherProfile.name}</ThemedText>
        <ThemedText style={[styles.description, { color: palette.muted }]}>
          {teacherProfile.department} · {teacherProfile.role}
        </ThemedText>
        <View style={styles.detailRow}>
          <ThemedText type="defaultSemiBold">Assigned homeroom</ThemedText>
          <ThemedText>{teacherProfile.homeroom}</ThemedText>
        </View>
        <View style={styles.detailRow}>
          <ThemedText type="defaultSemiBold">Frontend boundary</ThemedText>
          <ThemedText>Teacher actions only</ThemedText>
        </View>
        <View style={styles.detailRow}>
          <ThemedText type="defaultSemiBold">Cross-app dependencies</ThemedText>
          <ThemedText>Student, parent, and admin apps consume the same backend data.</ThemedText>
        </View>
      </TeacherCard>

      <TeacherCard>
        <ThemedText type="subtitle">Teacher app API domains</ThemedText>
        {apiDomains.map((domain) => (
          <View key={domain} style={styles.apiRow}>
            <View style={[styles.dot, { backgroundColor: palette.accentStrong }]} />
            <ThemedText style={styles.apiText}>{domain}</ThemedText>
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
  detailRow: {
    gap: 4,
  },
  apiRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  apiText: {
    fontSize: 15,
    lineHeight: 21,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },
});
