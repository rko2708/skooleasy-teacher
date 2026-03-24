export type TeacherRole = 'Teacher' | 'Class Teacher';

export type TeacherProfile = {
  name: string;
  role: TeacherRole;
  department: string;
  school: string;
  homeroom: string;
};

export type DashboardStat = {
  label: string;
  value: string;
  helper: string;
};

export type ScheduleEntry = {
  id: string;
  subject: string;
  classLabel: string;
  time: string;
  room: string;
  status: 'up-next' | 'completed' | 'substitute';
};

export type AssignmentStatus = 'draft' | 'review' | 'scheduled';

export type AssignmentEntry = {
  id: string;
  title: string;
  classLabel: string;
  dueLabel: string;
  submissions: string;
  status: AssignmentStatus;
};

export type AttendanceMode = 'Daily' | 'Period';
export type AttendanceStatus = 'pending' | 'completed';

export type AttendanceEntry = {
  id: string;
  classLabel: string;
  mode: AttendanceMode;
  status: AttendanceStatus;
  summary: string;
  cutoffLabel: string;
};

export type StudentAttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Leave';

export type AttendanceStudent = {
  id: string;
  name: string;
  rollNumber: string;
  status: StudentAttendanceStatus;
};

export type AttendanceDetail = {
  id: string;
  classLabel: string;
  mode: AttendanceMode;
  sessionLabel: string;
  subject: string;
  teacherNote: string;
  cutoffLabel: string;
  students: AttendanceStudent[];
};

export type ClassOverview = {
  id: string;
  classLabel: string;
  role: TeacherRole;
  strength: number;
  attendance: string;
  pendingFlags: string[];
};

export type InsightItem = {
  id: string;
  title: string;
  detail: string;
};
