import create from 'zustand';
import { ApiResult } from '@/apis/common';
import * as FloorAPI from '@/apis/floor';
import type {
  FloorMini,
  PictureMini,
  DeleteFloorResponseDto,
} from '@/types/floor';
import type { MyProfile } from '@/types/user';

interface UserStore extends MyProfile {
  floors: FloorMini[];
  collection: PictureMini[];
  setUser: (user: Partial<MyProfile>) => void;
  setFloors: (floors: FloorMini[]) => void;
  setCollection: (collection: PictureMini[]) => void;
  deleteFloor: (floorNo: number) => ApiResult<DeleteFloorResponseDto>;
}

export const useUserStore = create<UserStore>()((set, get) => ({
  backgroundImageUrl: '',
  exhibitionName: '',
  followerCount: 0,
  followingCount: 0,
  id: '',
  introduceMessage: '',
  name: '',
  profileImageUrl: '',
  isCommentAlarmOn: false,
  isGroupExhibitionAlarmOn: false,
  isLikeAlarmOn: false,
  isFollowAlarmOn: false,
  isMessageAlarmOn: false,
  floors: [],
  userNo: -1,
  collection: [],
  setUser: (user) => set((state) => ({ ...state, ...user })),
  setFloors: (floors) => set((state) => ({ ...state, floors })),
  setCollection: (collection) => set((state) => ({ ...state, collection })),
  deleteFloor: async (floorNo: number) => {
    const response = await FloorAPI.deleteFloor({ floorNo });
    const { floors, setFloors } = get();
    setFloors(floors.filter((floor) => floor.floorNo !== floorNo));
    return response;
  },
}));
