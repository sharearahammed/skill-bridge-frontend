import { fetcher } from './fetcher';

export type UserRole = 'STUDENT' | 'TUTOR' | 'ADMIN';

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    const data = await fetcher('/api/auth/me');
    return data.data;
  } catch {
    return null;
  }
}