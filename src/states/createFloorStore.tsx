import create from 'zustand';
import { ApiResult } from '@/apis/common';
import * as FloorAPI from '@/apis/floor';
import { FormInputStatus } from '@/components';
import { COLOR } from '@/constants/styles';
import { createDefaultPictureInfo } from '@/services/common/image';
import {
  CreateFloorResponseDto,
  Floor,
  FloorAlignment,
  FloorInfo,
} from '@/types/floor';
import { Picture } from '@/types/picture';

export interface FormInfo<T> {
  status: FormInputStatus;
  value: T;
  error?: string;
  isRequired: boolean;
}

interface CreateFloorStore {
  pictures: Picture[];
  description: string;
  alignment: FloorAlignment;
  isFramed: boolean;
  tempPictures: Picture[];
  name: string;
  color: string;
  isCommentAvailable: boolean;
  isPublic: boolean;
  // TODO: enum으로 대체
  texture: number;
  isMine: boolean;
  userId: string;
  userNo: number;
  floorNo?: number;
  startIndex: number;
  hasNewComment?: boolean;
  setFloorInfo: (floorInfo: Partial<FloorInfo>) => void;
  createPictures: (
    images: { imageUrl: string; width: number; height: number }[],
  ) => void;
  setPictures: (pictures: Picture[]) => void;
  clearTempPictures: () => void;
  changeDescriptionByIdx: (idx: number, description: string) => void;
  setHashtag: (imageIndex: number, hashtags: string[]) => void;
  setName: (name: string) => void;
  setColor: (color: string) => void;
  setIsCommentAvailable: (isCommentAvailable: boolean) => void;
  setIsPublic: (isPublic: boolean) => void;
  setTexture: (texture: number) => void;
  createFloor: () => ApiResult<CreateFloorResponseDto>;
  setFloor: (floor: Floor) => void;
  clearCreateFloorStore: () => void;
}

export const FLOOR_BACKGROUND_COLORS = [
  [COLOR.mono.white, COLOR.mono.gray1, COLOR.mono.gray5, COLOR.mono.gray7],
  [COLOR.floor.blue, COLOR.oeuvre.blue1, COLOR.floor.yellow, COLOR.floor.red],
];

export const FLOOR_TEXTURES = [[0]];

const defaultValues = {
  pictures: [],
  tempPictures: [],
  name: '',
  color: FLOOR_BACKGROUND_COLORS[0][0],
  isCommentAvailable: true,
  isPublic: true,
  texture: FLOOR_TEXTURES[0][0],
  isMine: true,
  userNo: 0,
  userId: '',
  startIndex: -1,
  alignment: FloorAlignment.CENTER,
  isFramed: false,
  description: '',
};

export const useCreateFloorStore = create<CreateFloorStore>()((set, get) => ({
  ...defaultValues,
  setFloorInfo: (floorInfo) => {
    set((state) => ({
      ...state,
      ...floorInfo,
    }));
  },
  createPictures: (images) => {
    set((state) => ({
      ...state,
      pictures: images.map((info) => createDefaultPictureInfo(info)),
    }));
  },
  clearTempPictures: () => {
    set((state) => ({
      ...state,
      tempPictures: [],
    }));
  },
  setPictures: (pictures) => set((state) => ({ ...state, pictures })),
  changeDescriptionByIdx: (idx, description) =>
    set((state) => ({
      ...state,
      pictures: [
        ...state.pictures.slice(0, idx),
        { ...state.pictures[idx], description },
        ...state.pictures.slice(idx + 1),
      ],
    })),
  setHashtag: (imageIndex, hashtags) => {
    set((state) => ({
      ...state,
      pictures: state.pictures.map((picture, index) => {
        if (index === imageIndex) {
          return { ...picture, hashtags };
        }
        return picture;
      }),
    }));
  },
  setName: (name) => set((state) => ({ ...state, name })),
  setColor: (color) => set((state) => ({ ...state, color })),
  setIsCommentAvailable: (isCommentAvailable) =>
    set((state) => ({ ...state, isCommentAvailable })),
  setIsPublic: (isPublic) => set((state) => ({ ...state, isPublic })),
  setTexture: (texture) => set((state) => ({ ...state, texture })),
  createFloor: async () => {
    const {
      color,
      isCommentAvailable,
      isPublic,
      name,
      pictures,
      texture,
      isFramed,
      alignment,
      description,
    } = get();
    const result = await FloorAPI.createFloor({
      color,
      isCommentAvailable,
      isPublic,
      name,
      pictures,
      texture,
      isFramed,
      alignment,
      description,
    });
    const { clearCreateFloorStore } = get();
    clearCreateFloorStore();
    return result;
  },
  setFloor: (floor) => {
    set((state) => ({
      ...state,
      ...floor,
    }));
  },
  clearCreateFloorStore: () => {
    const state = get();
    set({ ...state, ...defaultValues });
  },
}));
