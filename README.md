# SkoolEasy Teacher App

Teacher-facing mobile app built with Expo Router. This repo is intentionally scoped to teacher workflows only and assumes backend APIs are available from a separate Go service.

## Current foundation

The app now starts with a teacher-oriented shell instead of the Expo starter screens:

- `Dashboard`: daily snapshot, next classes, assignments queue, support follow-ups
- `Schedule`: weekly timetable framing with substitution and attendance hooks
- `Classes`: class teacher and subject teacher workspace
- `Profile`: role scope and API domain summary

All data is currently mocked in [`data/teacher-app.ts`](/Users/rko27/Desktop/skooleasy/skooleasy-teacher/data/teacher-app.ts) so we can shape the frontend before wiring real endpoints.

## Product direction

The intended scope for this app includes:

- teacher timetable and substitutions
- attendance for subject teachers and class teachers
- assignments and submission review
- student and parent-facing follow-up context
- marks, notices, and leave workflows

The planning document lives at [`docs/teacher-app-plan.md`](/Users/rko27/Desktop/skooleasy/skooleasy-teacher/docs/teacher-app-plan.md).

## Run locally

```bash
npm install
npm run start
```

Then open the app on iOS, Android, or web from the Expo prompt.
