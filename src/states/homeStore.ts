import create from 'zustand';
import * as FloorAPI from '@/apis/floor';
import { HomeFloor, HomeFloorFilter } from '@/types/home';

const SIZE = 10;

interface HomeStore {
  floors: HomeFloor[];
  page: number;
  filter: HomeFloorFilter;
  isLastPage: boolean;
  setFloors: (floors: HomeFloor[]) => void;
  fetchFloors: () => void;
  setPage: (page: number) => void;
  setFilter: (filter: HomeFloorFilter) => void;
  setIsLastPage: (isLastPage: boolean) => void;
  initHomeStore: () => void;
}

const initialState = {
  floors: [],
  page: 0,
  filter: HomeFloorFilter.LATEST,
  isLastPage: false,
};

export const useHomeStore = create<HomeStore>()((set, get) => ({
  ...initialState,
  setFloors: (floors) => set((state) => ({ ...state, floors })),
  fetchFloors: async () => {
    const {
      page,
      setPage,
      filter,
      floors,
      setFloors,
      isLastPage,
      setIsLastPage,
    } = get();
    if (isLastPage) return;
    const response = await FloorAPI.getHomeFeed({
      page,
      size: SIZE,
      view: filter,
    });
    if (response.isSuccess) {
      const { result } = response.result;
      setFloors([...floors, ...result.contents]);
      setIsLastPage(result.isLastPage);
      setPage(page + 1);
    }
  },
  setPage: (page) => set((state) => ({ ...state, page })),
  setFilter: (filter) => set((state) => ({ ...state, filter })),
  setIsLastPage: (isLastPage) =>
    set((state) => ({
      ...state,
      isLastPage,
    })),
  initHomeStore: () => {
    const { fetchFloors, filter } = get();
    set((state) => ({ ...state, ...initialState, filter }));
    fetchFloors();
  },
}));
