import create from 'zustand';

interface AuthStoreValues {
  accessToken?: string;
  refreshToken?: string;
}

interface AuthStore extends AuthStoreValues {
  setToken: (accessToken: string, refreshToken: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: undefined,
  refreshToken: undefined,
  setToken: (accessToken: string, refreshToken: string) =>
    set((state) => ({
      ...state,
      accessToken,
      refreshToken,
    })),
}));
