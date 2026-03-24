import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import { TeacherCard } from '@/components/teacher/card';
import { TeacherScreen } from '@/components/teacher/screen';
import { ThemedText } from '@/components/themed-text';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { teacherService } from '@/services/teacher-service';
import type { AssignmentDetail, SubmissionReviewStatus } from '@/types/teacher';

const reviewOptions: SubmissionReviewStatus[] = [
  'Pending Review',
  'Reviewed',
  'Needs Resubmission',
];

export default function AssignmentDetailScreen() {
  const { assignmentId } = useLocalSearchParams<{ assignmentId: string }>();
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const [detail, setDetail] = useState<AssignmentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadDetail() {
      const result = await teacherService.getAssignmentDetail(assignmentId);

      if (!active) {
        return;
      }

      setDetail(result);
      setLoading(false);
    }

    loadDetail();

    return () => {
      active = false;
    };
  }, [assignmentId]);

  async function updateReviewStatus(submissionId: string, reviewStatus: SubmissionReviewStatus) {
    if (!detail) {
      return;
    }

    setUpdatingId(submissionId);
    const updated = await teacherService.updateSubmissionReview(
      detail.id,
      submissionId,
      reviewStatus,
    );
    setDetail(updated);
    setUpdatingId(null);
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Assignment Detail', headerBackTitle: 'Assignments' }} />
      <TeacherScreen
        header={
          <View style={styles.header}>
            <ThemedText style={[styles.eyebrow, { color: palette.muted }]}>Assignment Detail</ThemedText>
            <ThemedText type="title" style={[styles.title, { fontFamily: Fonts.serif }]}>
              {detail?.title ?? 'Loading assignment'}
            </ThemedText>
            <ThemedText style={[styles.description, { color: palette.muted }]}>
              {detail
                ? `${detail.classLabel} · ${detail.subject} · ${detail.dueLabel}`
                : 'Fetching assignment instructions and submission status.'}
            </ThemedText>
          </View>
        }>
        {loading ? (
          <TeacherCard>
            <ActivityIndicator color={palette.accentStrong} />
            <ThemedText style={[styles.description, { color: palette.muted }]}>
              Loading assignment detail...
            </ThemedText>
          </TeacherCard>
        ) : !detail ? (
          <TeacherCard>
            <ThemedText type="subtitle">Assignment not found</ThemedText>
            <ThemedText style={[styles.description, { color: palette.muted }]}>
              This assignment detail could not be loaded.
            </ThemedText>
          </TeacherCard>
        ) : (
          <>
            <TeacherCard>
              <ThemedText type="subtitle">Overview</ThemedText>
              <ThemedText style={styles.bodyText}>{detail.instructions}</ThemedText>
              <View style={styles.metaRow}>
                <ThemedText type="defaultSemiBold">Attachment</ThemedText>
                <ThemedText>{detail.attachmentLabel}</ThemedText>
              </View>
              <View style={styles.metaRow}>
                <ThemedText type="defaultSemiBold">Queue status</ThemedText>
                <ThemedText>{detail.status}</ThemedText>
              </View>
              <View style={styles.metaRow}>
                <ThemedText type="defaultSemiBold">Review progress</ThemedText>
                <ThemedText>{detail.submissionsSummary}</ThemedText>
              </View>
            </TeacherCard>

            <TeacherCard>
              <ThemedText type="subtitle">Submissions</ThemedText>
              {detail.submissions.length === 0 ? (
                <ThemedText style={[styles.description, { color: palette.muted }]}>
                  No student submissions yet. This is expected for drafts and scheduled assignments.
                </ThemedText>
              ) : (
                detail.submissions.map((submission) => (
                  <View
                    key={submission.id}
                    style={[styles.submissionRow, { borderBottomColor: palette.border }]}>
                    <View style={styles.submissionCopy}>
                      <ThemedText type="defaultSemiBold">{submission.studentName}</ThemedText>
                      <ThemedText style={[styles.description, { color: palette.muted }]}>
                        {submission.submittedAt}
                      </ThemedText>
                      <ThemedText style={[styles.description, { color: palette.muted }]}>
                        {submission.attachmentLabel} · {submission.scoreLabel}
                      </ThemedText>
                    </View>
                    <View style={styles.optionWrap}>
                      {reviewOptions.map((option) => {
                        const isSelected = submission.reviewStatus === option;
                        const isLoading = updatingId === submission.id;

                        return (
                          <Pressable
                            key={option}
                            disabled={isLoading}
                            onPress={() => updateReviewStatus(submission.id, option)}
                            style={[
                              styles.optionButton,
                              {
                                backgroundColor: isSelected ? palette.badgeBackground : palette.surfaceMuted,
                                borderColor: isSelected ? palette.accentStrong : palette.border,
                                opacity: isLoading ? 0.7 : 1,
                              },
                            ]}>
                            <ThemedText
                              style={[
                                styles.optionText,
                                { color: isSelected ? palette.accentStrong : palette.muted },
                              ]}>
                              {option}
                            </ThemedText>
                          </Pressable>
                        );
                      })}
                    </View>
                  </View>
                ))
              )}
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
  bodyText: {
    fontSize: 15,
    lineHeight: 22,
  },
  metaRow: {
    gap: 4,
  },
  submissionRow: {
    gap: 12,
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
  },
  submissionCopy: {
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
