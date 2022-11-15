import create from 'zustand';

interface GlobalStore {
  isUpdated: boolean;
  setIsUpdated: (isUpdated: boolean) => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  isUpdated: false,
  setIsUpdated: (isUpdated) => set((state) => ({ ...state, isUpdated })),
}));
