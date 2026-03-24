import {
  assignments,
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
import type {
  AssignmentEntry,
  AttendanceDetail,
  AttendanceEntry,
  AttendanceStudent,
  ClassOverview,
  DashboardStat,
  InsightItem,
  ScheduleEntry,
  TeacherProfile,
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

export const teacherService = {
  async getProfile(): Promise<TeacherProfile> {
    await wait();
    return teacherProfile;
  },

  async getDashboardStats(): Promise<DashboardStat[]> {
    await wait();
    return dashboardStats;
  },

  async getTodaysSchedule(): Promise<ScheduleEntry[]> {
    await wait();
    return todaysSchedule;
  },

  async getAssignments(): Promise<AssignmentEntry[]> {
    await wait();
    return assignments;
  },

  async getAttendance(): Promise<AttendanceEntry[]> {
    await wait();
    return attendanceListStore.map((entry) => ({ ...entry }));
  },

  async getAttendanceDetail(id: string): Promise<AttendanceDetail | null> {
    await wait();
    const detail = attendanceDetailStore.find((entry) => entry.id === id);

    return detail
      ? {
          ...detail,
          students: detail.students.map((student) => ({ ...student })),
        }
      : null;
  },

  async saveAttendance(id: string, students: AttendanceStudent[]): Promise<AttendanceDetail> {
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

  async getClasses(): Promise<ClassOverview[]> {
    await wait();
    return classOverviews;
  },

  async getNotices(): Promise<InsightItem[]> {
    await wait();
    return notices;
  },

  async getStudentSupportItems(): Promise<InsightItem[]> {
    await wait();
    return studentSupportItems;
  },

  async getAttendanceInsights(): Promise<InsightItem[]> {
    await wait();
    return attendanceInsights;
  },
};
