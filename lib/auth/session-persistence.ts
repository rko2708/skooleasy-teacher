import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import type { AuthSession } from '@/types/auth';

const SESSION_KEY = 'skooleasy.teacher.session';

async function getStoredValue() {
  if (Platform.OS === 'web') {
    return window.localStorage.getItem(SESSION_KEY);
  }

  return SecureStore.getItemAsync(SESSION_KEY);
}

async function setStoredValue(value: string) {
  if (Platform.OS === 'web') {
    window.localStorage.setItem(SESSION_KEY, value);
    return;
  }

  await SecureStore.setItemAsync(SESSION_KEY, value);
}

async function removeStoredValue() {
  if (Platform.OS === 'web') {
    window.localStorage.removeItem(SESSION_KEY);
    return;
  }

  await SecureStore.deleteItemAsync(SESSION_KEY);
}

export async function loadPersistedSession(): Promise<AuthSession | null> {
  const raw = await getStoredValue();

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    await removeStoredValue();
    return null;
  }
}

export async function persistSession(session: AuthSession) {
  await setStoredValue(JSON.stringify(session));
}

export async function clearPersistedSession() {
  await removeStoredValue();
}
