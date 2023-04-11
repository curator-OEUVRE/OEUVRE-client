import { Orientation } from 'expo-screen-orientation';
import create from 'zustand';

interface DeviceStore {
  orientation: Orientation;
  setOrientation: (
    newOrientation: Orientation | ((prev: Orientation) => Orientation),
  ) => void;
}

export const useDeviceStore = create<DeviceStore>()((set) => ({
  orientation: Orientation.PORTRAIT_UP,
  setOrientation: (newOrientation) => {
    set((state) => ({
      ...state,
      orientation:
        typeof newOrientation === 'function'
          ? newOrientation(state.orientation)
          : newOrientation,
    }));
  },
}));
