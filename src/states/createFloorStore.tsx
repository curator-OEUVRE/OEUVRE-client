import create from 'zustand';
import { ApiResult } from '@/apis/common';
import * as FloorAPI from '@/apis/floor';
import * as PictureAPI from '@/apis/picture';
import { FormInputStatus } from '@/components';
import { COLOR } from '@/constants/styles';
import {
  CreateFloorResponseDto,
  FloorInfo,
  EditFloorResponseDto,
} from '@/types/floor';
import { PictureDetail, PictureInfo } from '@/types/picture';

interface FormInfo<T> {
  status: FormInputStatus;
  value: T;
  error?: string;
  isRequired: boolean;
}

export enum FloorMode {
  VIEWER,
  CREATE,
  EDIT,
  ADD_PICTURES,
}

export type SetFloorModeParams =
  | {
      mode: FloorMode.CREATE | FloorMode.EDIT | FloorMode.VIEWER;
    }
  | {
      mode: FloorMode.ADD_PICTURES;
      startIndex: number;
    };

interface CreateFloorStore {
  mode: FloorMode;
  pictureDetail: PictureDetail;
  pictures: PictureInfo[];
  tempPictures: PictureInfo[];
  name: FormInfo<string>;
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
  setFloorMode: (params: SetFloorModeParams) => void;
  createPictures: (
    images: { imageUrl: string; width: number; height: number }[],
  ) => void;
  setPictures: (pictures: PictureInfo[]) => void;
  setPictureDetail: (picture: PictureDetail) => void;
  fetchPictureDetail: (pictureNo: number) => void;
  clearTempPictures: () => void;
  onChangeDescriptionByIdx: (idx: number) => (description: string) => void;
  setHashtag: (imageIndex: number, hashtags: string[]) => void;
  setName: (data: Partial<FormInfo<string>>) => void;
  setColor: (color: string) => void;
  setIsCommentAvailable: (isCommentAvailable: boolean) => void;
  setIsPublic: (isPublic: boolean) => void;
  setTexture: (texture: number) => void;
  createFloor: () => ApiResult<CreateFloorResponseDto>;
  editFloor: (floorNo: number) => ApiResult<EditFloorResponseDto>;
  setFloor: (floor: FloorInfo) => void;
  fetchFloor: (floorNo: number) => void;
  clearCreateFloorStore: () => void;
}

const createDefaultPictureInfo = (info: Partial<PictureInfo>): PictureInfo => ({
  imageUrl: '',
  description: '',
  hashtags: [],
  width: 0.5,
  height: 0.5,
  location: 0,
  queue: 1,
  pictureNo: 0,
  ...info,
});

export const FLOOR_BACKGROUND_COLORS = [
  [COLOR.mono.white, COLOR.mono.gray1, COLOR.mono.gray5, COLOR.mono.gray7],
  [COLOR.floor.blue, COLOR.oeuvre.blue1, COLOR.floor.yellow, COLOR.floor.red],
];

export const FLOOR_TEXTURES = [[0]];

const initialPicture = {
  description: '...',
  floorNo: 1,
  height: 0.5,
  imageUrl: '',
  isLiked: false,
  isMine: false,
  isScraped: false,
  pictureNo: 1,
  width: 0.5,
  userNo: 0,
  userId: '',
};

const defaultValues = {
  mode: FloorMode.VIEWER,
  pictures: [],
  pictureDetail: initialPicture,
  tempPictures: [],
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
  isMine: true,
  userNo: 0,
  userId: '',
  startIndex: -1,
};

export const useCreateFloorStore = create<CreateFloorStore>()((set, get) => ({
  ...defaultValues,
  setFloorMode: (mode) => {
    set((state) => ({ ...state, ...mode }));
  },
  createPictures: (images) => {
    const { mode } = get();
    const key = mode === FloorMode.ADD_PICTURES ? 'tempPictures' : 'pictures';
    set((state) => ({
      ...state,
      [key]: images.map((info) => createDefaultPictureInfo(info)),
    }));
  },
  clearTempPictures: () => {
    set((state) => ({
      ...state,
      tempPictures: [],
    }));
  },
  setPictures: (pictures) => set((state) => ({ ...state, pictures })),
  setPictureDetail: (pictureDetail) =>
    set((state) => ({ ...state, pictureDetail })),
  fetchPictureDetail: async (pictureNo) => {
    const { setPictureDetail } = get();
    const response = await PictureAPI.getPictureDetail({ pictureNo });
    if (response.isSuccess) {
      const { result } = response.result;
      setPictureDetail(result);
    } else {
      console.log(response.result.errorMessage);
    }
  },
  onChangeDescriptionByIdx: (idx: number) => (description: string) => {
    const { mode } = get();
    const key = mode === FloorMode.ADD_PICTURES ? 'tempPictures' : 'pictures';
    set((state) => ({
      ...state,
      [key]: [
        ...state[key].slice(0, idx),
        { ...state[key][idx], description },
        ...state[key].slice(idx + 1),
      ],
    }));
  },
  setHashtag: (imageIndex, hashtags) => {
    const { mode } = get();
    const key = mode === FloorMode.ADD_PICTURES ? 'tempPictures' : 'pictures';
    set((state) => ({
      ...state,
      [key]: state[key].map((picture, index) => {
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
    const result = await FloorAPI.createFloor({
      color,
      isCommentAvailable,
      isPublic,
      name: name.value,
      pictures,
      texture,
    });
    const { clearCreateFloorStore } = get();
    clearCreateFloorStore();
    return result;
  },
  editFloor: async (floorNo: number) => {
    const { color, isCommentAvailable, isPublic, name, pictures, texture } =
      get();
    const result = await FloorAPI.editFloor({
      floor: {
        color,
        isCommentAvailable,
        isPublic,
        name: name.value,
        pictures,
        texture,
      },
      floorNo,
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
  fetchFloor: async (floorNo: number) => {
    const { setFloor } = get();
    const response = await FloorAPI.getFloor({ floorNo });
    if (response.isSuccess) {
      const { result } = response.result;
      setFloor(result);
    } else {
      console.log(response.result.errorMessage);
    }
  },
  clearCreateFloorStore: () => {
    const state = get();
    set({ ...state, ...defaultValues });
  },
}));
