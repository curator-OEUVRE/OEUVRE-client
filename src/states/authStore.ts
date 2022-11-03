import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStoreValues {
  accessToken?: string;
  refreshToken?: string;
}

interface AuthStore extends AuthStoreValues {
  setToken: (accessToken: string, refreshToken: string) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: undefined,
      refreshToken: undefined,
      setToken: (accessToken: string, refreshToken: string) =>
        set((state) => ({
          ...state,
          accessToken,
          refreshToken,
        })),
      clear: () =>
        set((state) => ({
          ...state,
          accessToken: undefined,
          refreshToken: undefined,
        })),
    }),
    {
      name: 'auth-store',
      getStorage: () => AsyncStorage,
    },
  ),
);
