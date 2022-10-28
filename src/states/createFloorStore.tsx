import create from 'zustand';
import { FormInputStatus } from '@/components';
import { COLOR } from '@/constants/styles';

export interface PictureInfo {
  imageUri: string;
  description: string;
  hashtags: string[];
  width: number;
  height: number;
  location: number;
}

interface FormInfo<T> {
  status: FormInputStatus;
  value: T;
  error?: string;
  isRequired: boolean;
}

interface CreateFloorStore {
  pictures: PictureInfo[];
  name: FormInfo<string>;
  color: string;
  isCommentAvailable: boolean;
  isPublic: boolean;
  // TODO: enum으로 대체
  texture: number;
  createPictures: (
    images: { imageUri: string; width: number; height: number }[],
  ) => void;
  setPictures: (pictures: PictureInfo[]) => void;
  onChangeDescriptionByIdx: (idx: number) => (description: string) => void;
  setHashtag: (imageIndex: number, hashtags: string[]) => void;
  setName: (data: Partial<FormInfo<string>>) => void;
  setColor: (color: string) => void;
  setIsCommentAvailable: (isCommentAvailable: boolean) => void;
  setIsPublic: (isPublic: boolean) => void;
  setTexture: (texture: number) => void;
}

const createDefaultPictureInfo = (info: Partial<PictureInfo>): PictureInfo => ({
  imageUri: '',
  description: '',
  hashtags: [],
  width: 0.5,
  height: 0.5,
  location: 0,
  ...info,
});

export const FLOOR_BACKGROUND_COLORS = [
  [COLOR.mono.white, COLOR.mono.gray1, COLOR.mono.gray5, COLOR.mono.gray7],
  [COLOR.floor.blue, COLOR.oeuvre.blue1, COLOR.floor.yellow, COLOR.floor.red],
];

export const FLOOR_TEXTURES = [[0]];

export const useCreateFloorStore = create<CreateFloorStore>()((set) => ({
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
}));
