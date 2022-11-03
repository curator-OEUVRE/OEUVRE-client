import create from 'zustand';
import type { FloorMini, PictureMini } from '@/types/floor';
import type { MyProfile } from '@/types/user';

interface UserStore extends MyProfile {
  floors: FloorMini[];
  collection: PictureMini[];
  setUser: (user: Partial<MyProfile>) => void;
  setFloors: (floors: FloorMini[]) => void;
  setCollection: (collection: PictureMini[]) => void;
}

export const useUserStore = create<UserStore>()((set) => ({
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
}));
