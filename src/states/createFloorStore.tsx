import create from 'zustand';
import { ApiResult } from '@/apis/common';
import * as FloorAPI from '@/apis/floor';
import { FormInputStatus } from '@/components';
import { FLOOR_BACKGROUND_COLORS } from '@/constants/styles';
import { createDefaultPictureInfo } from '@/services/common/image';
import {
  FloorBackgroundColor,
  CreateFloorResponseDto,
  Floor,
  FloorAlignment,
  FloorGradient,
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
  gradient: FloorGradient;
  isFramed: boolean;
  tempPictures: Picture[];
  name: string;
  color: FloorBackgroundColor;
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
  thumbnailQueue: number;
  setFloorInfo: (floorInfo: Partial<FloorInfo>) => void;
  createPictures: (
    images: { imageUrl: string; width: number; height: number }[],
  ) => void;
  setPictures: (pictures: Picture[] | ((prev: Picture[]) => Picture[])) => void;
  clearTempPictures: () => void;
  changeDescriptionByIdx: (idx: number, description: string) => void;
  setHashtag: (imageIndex: number, hashtags: string[]) => void;
  setName: (name: string) => void;
  setColor: (color: FloorBackgroundColor) => void;
  setIsCommentAvailable: (isCommentAvailable: boolean) => void;
  setIsPublic: (isPublic: boolean) => void;
  setTexture: (texture: number) => void;
  createFloor: () => ApiResult<CreateFloorResponseDto>;
  setFloor: (floor: Floor) => void;
  clearCreateFloorStore: () => void;
  setThumbnailIndex: (index: number) => void;
}

export const FLOOR_TEXTURES = [[0]];

const defaultValues = {
  pictures: [],
  tempPictures: [],
  name: '',
  color: FLOOR_BACKGROUND_COLORS[0],
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
  gradient: FloorGradient.TOP,
  thumbnailQueue: 0,
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
  setPictures: (pictures) =>
    set((state) => ({
      ...state,
      pictures:
        typeof pictures === 'function' ? pictures(state.pictures) : pictures,
    })),
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
      gradient,
      thumbnailQueue,
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
      gradient,
      thumbnailQueue,
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
  setThumbnailIndex: (index: number) => {
    set((state) => ({
      ...state,
      thumbnailQueue: index,
    }));
  },
}));
