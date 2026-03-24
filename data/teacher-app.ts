export type ScheduleEntry = {
  id: string;
  subject: string;
  classLabel: string;
  time: string;
  room: string;
  status: 'up-next' | 'completed' | 'substitute';
};

export type AssignmentEntry = {
  id: string;
  title: string;
  classLabel: string;
  dueLabel: string;
  submissions: string;
  status: 'draft' | 'review' | 'scheduled';
};

export type AttendanceEntry = {
  id: string;
  classLabel: string;
  mode: 'Daily' | 'Period';
  status: 'pending' | 'completed';
  summary: string;
  cutoffLabel: string;
};

export type ClassOverview = {
  id: string;
  classLabel: string;
  role: 'Class Teacher' | 'Subject Teacher';
  strength: number;
  attendance: string;
  pendingFlags: string[];
};

export const teacherProfile = {
  name: 'Ananya Mehta',
  role: 'Class Teacher',
  department: 'Mathematics',
  school: 'SkoolEasy Public School',
  homeroom: 'Grade 7 - B',
};

export const dashboardStats = [
  { label: 'Classes today', value: '6', helper: '1 substitution added' },
  { label: 'Attendance pending', value: '2', helper: '7-B and 8-A' },
  { label: 'Assignments to review', value: '14', helper: 'Across 3 sections' },
  { label: 'Parent follow-ups', value: '4', helper: 'Leave and behaviour notes' },
];

export const todaysSchedule: ScheduleEntry[] = [
  {
    id: 's1',
    subject: 'Mathematics',
    classLabel: 'Grade 7-B',
    time: '08:30 - 09:15',
    room: 'Room 204',
    status: 'completed',
  },
  {
    id: 's2',
    subject: 'Mathematics',
    classLabel: 'Grade 8-A',
    time: '09:20 - 10:05',
    room: 'Room 207',
    status: 'up-next',
  },
  {
    id: 's3',
    subject: 'Mentor Hour',
    classLabel: 'Grade 7-B',
    time: '10:25 - 11:00',
    room: 'Room 204',
    status: 'up-next',
  },
  {
    id: 's4',
    subject: 'Science',
    classLabel: 'Grade 6-C',
    time: '11:05 - 11:50',
    room: 'Lab 1',
    status: 'substitute',
  },
];

export const assignments: AssignmentEntry[] = [
  {
    id: 'a1',
    title: 'Fractions practice sheet',
    classLabel: 'Grade 7-B',
    dueLabel: 'Due today, 4:00 PM',
    submissions: '23 of 31 submitted',
    status: 'review',
  },
  {
    id: 'a2',
    title: 'Linear equations quiz prep',
    classLabel: 'Grade 8-A',
    dueLabel: 'Schedule for tomorrow',
    submissions: 'Draft ready',
    status: 'draft',
  },
  {
    id: 'a3',
    title: 'Weekend enrichment task',
    classLabel: 'Grade 7-B',
    dueLabel: 'Publishes Friday',
    submissions: 'Attachment added',
    status: 'scheduled',
  },
];

export const attendanceEntries: AttendanceEntry[] = [
  {
    id: 'at1',
    classLabel: 'Grade 7-B',
    mode: 'Daily',
    status: 'pending',
    summary: 'Class teacher attendance not submitted yet.',
    cutoffLabel: 'Submit by 10:15 AM',
  },
  {
    id: 'at2',
    classLabel: 'Grade 8-A',
    mode: 'Period',
    status: 'pending',
    summary: 'Second period roster open for Mathematics.',
    cutoffLabel: 'Submit by 09:30 AM',
  },
  {
    id: 'at3',
    classLabel: 'Grade 6-C',
    mode: 'Period',
    status: 'completed',
    summary: 'Marked during substitution with 27 present.',
    cutoffLabel: 'Saved at 11:14 AM',
  },
];

export const attendanceInsights = [
  {
    id: 'ai1',
    title: 'Below-threshold attendance',
    detail: '3 students in Grade 7-B have dropped below 75% this month.',
  },
  {
    id: 'ai2',
    title: 'Leave approvals waiting',
    detail: '2 parent leave notes are awaiting class teacher review before noon.',
  },
];

export const classOverviews: ClassOverview[] = [
  {
    id: 'c1',
    classLabel: 'Grade 7-B',
    role: 'Class Teacher',
    strength: 31,
    attendance: '29 present',
    pendingFlags: ['2 leave requests', '1 parent callback'],
  },
  {
    id: 'c2',
    classLabel: 'Grade 8-A',
    role: 'Subject Teacher',
    strength: 34,
    attendance: 'Attendance pending',
    pendingFlags: ['3 missing submissions'],
  },
  {
    id: 'c3',
    classLabel: 'Grade 6-C',
    role: 'Subject Teacher',
    strength: 28,
    attendance: 'Substitution assigned',
    pendingFlags: ['Lab worksheet pending'],
  },
];

export const notices = [
  {
    id: 'n1',
    title: 'PTM scheduling opens this Friday',
    detail: 'Class teachers should publish 5 available slots before 2:00 PM.',
  },
  {
    id: 'n2',
    title: 'Mid-term marks freeze on 28 March',
    detail: 'Subject teachers must finalize marks and remarks before the cut-off.',
  },
];

export const studentSupportItems = [
  {
    id: 'ss1',
    title: 'Low attendance watchlist',
    detail: 'Riya S., Aarav P., and Kabir V. are below 75% attendance this month.',
  },
  {
    id: 'ss2',
    title: 'Parents awaiting updates',
    detail: 'Two guardians are waiting on behaviour and leave follow-up notes.',
  },
];

export const apiDomains = [
  'Auth and role context',
  'Timetable and substitutions',
  'Attendance and leave',
  'Assignments and submissions',
  'Students, parents, and communication',
  'Marks, exams, and reports',
];
