# SkoolEasy Teacher App

Teacher-facing mobile app built with Expo Router. This repo is intentionally scoped to teacher workflows only and assumes backend APIs are available from a separate Go service.

## Current foundation

The app now starts with a teacher-oriented shell instead of the Expo starter screens:

- `Dashboard`: daily snapshot, next classes, assignments queue, support follow-ups
- `Schedule`: weekly timetable framing with substitution and attendance hooks
- `Attendance`: daily and period attendance desk for teachers and class teachers
- `Assignments`: homework and review queue
- `Classes`: class teacher and subject teacher workspace

Data is currently mocked in [`data/teacher-app.ts`](/Users/rko27/Desktop/skooleasy/skooleasy-teacher/data/teacher-app.ts), and the async service shape lives in [`services/teacher-service.ts`](/Users/rko27/Desktop/skooleasy/skooleasy-teacher/services/teacher-service.ts) so we can swap in real APIs cleanly.

## API mode

By default, the app uses mock data so the frontend works without a backend.

To point the app at a real API, set:

```bash
EXPO_PUBLIC_USE_MOCK_API=false
EXPO_PUBLIC_API_BASE_URL=http://localhost:8080
EXPO_PUBLIC_SCHOOL_ID=school-skool-easy
```

The selector lives in [`services/teacher-service.ts`](/Users/rko27/Desktop/skooleasy/skooleasy-teacher/services/teacher-service.ts), mock behavior lives in [`services/teacher-service.mock.ts`](/Users/rko27/Desktop/skooleasy/skooleasy-teacher/services/teacher-service.mock.ts), and the HTTP-backed implementation lives in [`services/teacher-service.api.ts`](/Users/rko27/Desktop/skooleasy/skooleasy-teacher/services/teacher-service.api.ts).

## Authentication

The app now includes a teacher sign-in screen at [`app/sign-in.tsx`](/Users/rko27/Desktop/skooleasy/skooleasy-teacher/app/sign-in.tsx), an auth provider at [`providers/auth-provider.tsx`](/Users/rko27/Desktop/skooleasy/skooleasy-teacher/providers/auth-provider.tsx), and automatic API headers through [`lib/api/client.ts`](/Users/rko27/Desktop/skooleasy/skooleasy-teacher/lib/api/client.ts).

In remote API mode, requests automatically attach:

- `Authorization: Bearer <token>`
- `X-Teacher-Id`
- `X-Teacher-Role`
- `X-School-Id`

Sessions are now persisted with [`expo-secure-store`](https://docs.expo.dev/versions/latest/sdk/securestore/) on device and `localStorage` on web through [`lib/auth/session-persistence.ts`](/Users/rko27/Desktop/skooleasy/skooleasy-teacher/lib/auth/session-persistence.ts). If a backend request returns `401` and a refresh token exists, the API client attempts `/auth/refresh` once before failing.

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
