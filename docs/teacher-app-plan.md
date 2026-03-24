# Teacher App Plan

## Product boundary

This repository owns the teacher app only.

It should support two user modes within the same app:

- `Teacher`
- `Class Teacher`

The class teacher is a teacher with extra permissions, not a separate product.

This app should consume backend APIs but should not own admin setup flows such as:

- school master data management
- class and section creation
- timetable generation
- fee operations
- admission workflows

## Primary user journeys

### 1. Start of day

The teacher opens the app and immediately sees:

- today’s classes
- attendance still pending
- substitutions
- assignments to review
- school notices

### 2. During class

From a timetable entry, the teacher should be able to:

- open the class roster
- mark attendance
- view lesson notes
- create homework or assignment
- add quick remarks

### 3. Class teacher oversight

The class teacher should be able to:

- take full-class attendance
- review student leave requests
- see attendance risk and behaviour flags
- send class notices
- access parent contact context

### 4. Assessment flow

The teacher should be able to:

- create assignments
- review submissions
- enter marks
- publish remarks

## Frontend modules

- `auth`
- `dashboard`
- `schedule`
- `attendance`
- `assignments`
- `students`
- `class-teacher`
- `marks`
- `notices`
- `leave`
- `profile`

## Suggested API contract groups

### Auth and role context

- `GET /me`
- `GET /me/permissions`
- `GET /me/classes`

### Timetable

- `GET /teachers/{teacherId}/timetable?date=`
- `GET /teachers/{teacherId}/substitutions?date=`

### Attendance

- `GET /classes/{classId}/attendance?date=`
- `POST /classes/{classId}/attendance`
- `PUT /attendance/{attendanceId}`

### Assignments

- `GET /teachers/{teacherId}/assignments`
- `POST /assignments`
- `GET /assignments/{assignmentId}`
- `GET /assignments/{assignmentId}/submissions`
- `POST /assignments/{assignmentId}/publish`

### Students and parent context

- `GET /classes/{classId}/students`
- `GET /students/{studentId}`
- `GET /students/{studentId}/guardians`

### Marks and exams

- `GET /teachers/{teacherId}/exams`
- `POST /exams/{examId}/marks`
- `PUT /marks/{markId}`

### Notices and leave

- `GET /notices`
- `POST /notices`
- `GET /leave-requests`
- `POST /leave-requests/{leaveRequestId}/action`

## MVP implementation order

1. Authentication and role hydration
2. Timetable and dashboard integration
3. Attendance flows
4. Assignment create and review flows
5. Student list and class teacher overview
6. Marks entry
7. Notices and leave

## Immediate engineering next steps

1. Replace mock data with typed API service layers.
2. Add a shared domain model for teachers, classes, timetable entries, assignments, and attendance.
3. Introduce query and mutation handling for API calls.
4. Add route groups for authenticated flows.
5. Build attendance detail and assignment detail screens next.

## Current frontend baseline

The current repo now includes:

- a teacher-focused tab shell
- shared mock domain data
- a lightweight async service layer that mirrors future backend integration
- dedicated attendance and assignments screens
