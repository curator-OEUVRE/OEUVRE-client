import create from 'zustand';
import { ApiResult } from '@/apis/common';
import { createFloor } from '@/apis/floor';
import { FormInputStatus } from '@/components';
import { COLOR } from '@/constants/styles';
import { PictureInfo, CreateFloorResponseDto, FloorInfo } from '@/types/floor';

interface FormInfo<T> {
  status: FormInputStatus;
  value: T;
  error?: string;
  isRequired: boolean;
}

interface CreateFloorStore {
  isEditMode: boolean;
  pictures: PictureInfo[];
  name: FormInfo<string>;
  color: string;
  isCommentAvailable: boolean;
  isPublic: boolean;
  // TODO: enum으로 대체
  texture: number;
  setIsEditMode: (isEditMode: boolean) => void;
  createPictures: (
    images: { imageUrl: string; width: number; height: number }[],
  ) => void;
  setPictures: (pictures: PictureInfo[]) => void;
  onChangeDescriptionByIdx: (idx: number) => (description: string) => void;
  setHashtag: (imageIndex: number, hashtags: string[]) => void;
  setName: (data: Partial<FormInfo<string>>) => void;
  setColor: (color: string) => void;
  setIsCommentAvailable: (isCommentAvailable: boolean) => void;
  setIsPublic: (isPublic: boolean) => void;
  setTexture: (texture: number) => void;
  createFloor: () => ApiResult<CreateFloorResponseDto>;
  setFloor: (floor: FloorInfo) => void;
}

const createDefaultPictureInfo = (info: Partial<PictureInfo>): PictureInfo => ({
  imageUrl: '',
  description: '',
  hashtags: [],
  width: 0.5,
  height: 0.5,
  location: 0,
  queue: 1,
  ...info,
});

export const FLOOR_BACKGROUND_COLORS = [
  [COLOR.mono.white, COLOR.mono.gray1, COLOR.mono.gray5, COLOR.mono.gray7],
  [COLOR.floor.blue, COLOR.oeuvre.blue1, COLOR.floor.yellow, COLOR.floor.red],
];

export const FLOOR_TEXTURES = [[0]];

export const useCreateFloorStore = create<CreateFloorStore>()((set, get) => ({
  isEditMode: false,
  pictures: [],
  name: {
    status: FormInputStatus.Initial,
    value: '',
    error: undefined,
    isRequired: true,
  },
  color: FLOOR_BACKGROUND_COLORS[0][0],
  isCommentAvailable: true,
  isPublic: true,
  texture: FLOOR_TEXTURES[0][0],
  setIsEditMode: (isEditMode) => {
    set((state) => ({ ...state, isEditMode }));
  },
  createPictures: (images) => {
    set((state) => ({
      ...state,
      pictures: images.map((info) => createDefaultPictureInfo(info)),
    }));
  },
  setPictures: (pictures) => set((state) => ({ ...state, pictures })),
  onChangeDescriptionByIdx: (idx: number) => (description: string) => {
    set((state) => ({
      ...state,
      pictures: [
        ...state.pictures.slice(0, idx),
        { ...state.pictures[idx], description },
        ...state.pictures.slice(idx + 1),
      ],
    }));
  },
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
  setName: (data) =>
    set((state) => ({ ...state, name: { ...state.name, ...data } })),
  setColor: (color) => set((state) => ({ ...state, color })),
  setIsCommentAvailable: (isCommentAvailable) =>
    set((state) => ({ ...state, isCommentAvailable })),
  setIsPublic: (isPublic) => set((state) => ({ ...state, isPublic })),
  setTexture: (texture) => set((state) => ({ ...state, texture })),
  createFloor: async () => {
    const { color, isCommentAvailable, isPublic, name, pictures, texture } =
      get();
    const result = await createFloor({
      color,
      isCommentAvailable,
      isPublic,
      name: name.value,
      pictures,
      texture,
    });
    return result;
  },
  setFloor: (floor) => {
    set((state) => ({
      ...state,
      ...floor,
      name: {
        ...state.name,
        status: FormInputStatus.Valid,
        value: floor.name,
      },
    }));
  },
}));
