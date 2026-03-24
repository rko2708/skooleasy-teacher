import {
  assignments,
  assignmentDetails,
  attendanceEntries,
  attendanceDetails,
  attendanceInsights,
  classOverviews,
  dashboardStats,
  notices,
  studentSupportItems,
  teacherProfile,
  todaysSchedule,
} from '@/data/teacher-app';
import type { TeacherService } from '@/services/teacher-service.types';
import type {
  AssignmentDetail,
  AssignmentEntry,
  AssignmentSubmission,
  AttendanceDetail,
  AttendanceStudent,
} from '@/types/teacher';

const wait = async (delay = 120) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, delay);
  });

let attendanceListStore = attendanceEntries.map((entry) => ({ ...entry }));
let attendanceDetailStore = attendanceDetails.map((detail) => ({
  ...detail,
  students: detail.students.map((student) => ({ ...student })),
}));
let assignmentListStore = assignments.map((entry) => ({ ...entry }));
let assignmentDetailStore = assignmentDetails.map((detail) => ({
  ...detail,
  submissions: detail.submissions.map((submission) => ({ ...submission })),
}));

function buildAttendanceSummary(students: AttendanceStudent[]) {
  const presentCount = students.filter((student) => student.status === 'Present').length;
  const totalCount = students.length;
  const lateCount = students.filter((student) => student.status === 'Late').length;
  const absentCount = students.filter((student) => student.status === 'Absent').length;
  const leaveCount = students.filter((student) => student.status === 'Leave').length;

  if (absentCount === 0 && lateCount === 0 && leaveCount === 0) {
    return `All ${totalCount} students marked present.`;
  }

  return `${presentCount} present, ${absentCount} absent, ${lateCount} late, ${leaveCount} on leave.`;
}

function buildAssignmentStatus(submissions: AssignmentSubmission[]): AssignmentEntry['status'] {
  if (submissions.length === 0) {
    return 'draft';
  }

  const hasPending = submissions.some((submission) => submission.reviewStatus === 'Pending Review');
  return hasPending ? 'review' : 'scheduled';
}

function buildSubmissionSummary(submissions: AssignmentSubmission[]) {
  if (submissions.length === 0) {
    return 'Draft ready';
  }

  const reviewedCount = submissions.filter(
    (submission) => submission.reviewStatus === 'Reviewed',
  ).length;

  return `${reviewedCount} of ${submissions.length} reviewed`;
}

export const mockTeacherService: TeacherService = {
  async getProfile() {
    await wait();
    return teacherProfile;
  },

  async getDashboardStats() {
    await wait();
    return dashboardStats;
  },

  async getTodaysSchedule() {
    await wait();
    return todaysSchedule;
  },

  async getAssignments() {
    await wait();
    return assignmentListStore.map((entry) => ({ ...entry }));
  },

  async getAssignmentDetail(id: string) {
    await wait();
    const detail = assignmentDetailStore.find((entry) => entry.id === id);

    return detail
      ? {
          ...detail,
          submissions: detail.submissions.map((submission) => ({ ...submission })),
        }
      : null;
  },

  async createAssignment(input) {
    await wait(220);

    const id = `a${assignmentDetailStore.length + 1}`;
    const detail: AssignmentDetail = {
      id,
      title: input.title,
      classLabel: input.classLabel,
      subject: input.subject,
      dueLabel: input.dueLabel,
      instructions: input.instructions,
      attachmentLabel: input.attachmentLabel || 'No attachment yet',
      status: 'draft',
      submissionsSummary: 'Draft ready',
      submissions: [],
    };

    assignmentDetailStore = [detail, ...assignmentDetailStore];
    assignmentListStore = [
      {
        id,
        title: detail.title,
        classLabel: detail.classLabel,
        dueLabel: detail.dueLabel,
        submissions: detail.submissionsSummary,
        status: detail.status,
      },
      ...assignmentListStore,
    ];

    return detail;
  },

  async updateSubmissionReview(assignmentId, submissionId, reviewStatus) {
    await wait(180);

    assignmentDetailStore = assignmentDetailStore.map((detail) => {
      if (detail.id !== assignmentId) {
        return detail;
      }

      const submissions = detail.submissions.map((submission) =>
        submission.id === submissionId ? { ...submission, reviewStatus } : submission,
      );

      return {
        ...detail,
        submissions,
        submissionsSummary: buildSubmissionSummary(submissions),
        status: buildAssignmentStatus(submissions),
      };
    });

    const updated = assignmentDetailStore.find((detail) => detail.id === assignmentId);

    if (!updated) {
      throw new Error(`Assignment detail not found for ${assignmentId}`);
    }

    assignmentListStore = assignmentListStore.map((entry) =>
      entry.id === assignmentId
        ? {
            ...entry,
            submissions: updated.submissionsSummary,
            status: updated.status,
          }
        : entry,
    );

    return {
      ...updated,
      submissions: updated.submissions.map((submission) => ({ ...submission })),
    };
  },

  async getAttendance() {
    await wait();
    return attendanceListStore.map((entry) => ({ ...entry }));
  },

  async getAttendanceDetail(id: string) {
    await wait();
    const detail = attendanceDetailStore.find((entry) => entry.id === id);

    return detail
      ? {
          ...detail,
          students: detail.students.map((student) => ({ ...student })),
        }
      : null;
  },

  async saveAttendance(id, students) {
    await wait(280);

    const savedAt = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    attendanceDetailStore = attendanceDetailStore.map((detail) =>
      detail.id === id
        ? {
            ...detail,
            cutoffLabel: `Saved at ${savedAt}`,
            students: students.map((student) => ({ ...student })),
          }
        : detail,
    );

    attendanceListStore = attendanceListStore.map((entry) =>
      entry.id === id
        ? {
            ...entry,
            status: 'completed',
            summary: buildAttendanceSummary(students),
            cutoffLabel: `Saved at ${savedAt}`,
          }
        : entry,
    );

    const updated = attendanceDetailStore.find((detail) => detail.id === id);

    if (!updated) {
      throw new Error(`Attendance detail not found for ${id}`);
    }

    return {
      ...updated,
      students: updated.students.map((student) => ({ ...student })),
    };
  },

  async getClasses() {
    await wait();
    return classOverviews;
  },

  async getNotices() {
    await wait();
    return notices;
  },

  async getStudentSupportItems() {
    await wait();
    return studentSupportItems;
  },

  async getAttendanceInsights() {
    await wait();
    return attendanceInsights;
  },
};
