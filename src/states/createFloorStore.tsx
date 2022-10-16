import create from 'zustand';
import { FormInputStatus } from '@/components';
import { COLOR } from '@/constants/styles';

export interface PictureInfo {
  imageUri: string;
  description: string;
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
  createPicturesByImageUris: (imageUrls: string[]) => void;
  onChangeDescriptionByIdx: (idx: number) => (description: string) => void;
  setName: (data: Partial<FormInfo<string>>) => void;
  setColor: (color: string) => void;
  setIsCommentAvailable: (isCommentAvailable: boolean) => void;
  setIsPublic: (isPublic: boolean) => void;
  setTexture: (texture: number) => void;
}

const createDefaultPictureInfo = (imageUri: string): PictureInfo => ({
  imageUri,
  description: '',
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
  createPicturesByImageUris: (imageUrls: string[]) => {
    set((state) => ({
      ...state,
      pictures: imageUrls.map((uri) => createDefaultPictureInfo(uri)),
    }));
  },
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
  setName: (data) =>
    set((state) => ({ ...state, name: { ...state.name, ...data } })),
  setColor: (color) => set((state) => ({ ...state, color })),
  setIsCommentAvailable: (isCommentAvailable) =>
    set((state) => ({ ...state, isCommentAvailable })),
  setIsPublic: (isPublic) => set((state) => ({ ...state, isPublic })),
  setTexture: (texture) => set((state) => ({ ...state, texture })),
}));
