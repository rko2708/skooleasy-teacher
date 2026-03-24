import {
  assignments,
  attendanceEntries,
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
  AttendanceEntry,
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
    return attendanceEntries;
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
