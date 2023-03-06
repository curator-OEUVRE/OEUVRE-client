import create from 'zustand';
import { ApiResult } from '@/apis/common';
import * as FloorAPI from '@/apis/floor';
import * as PictureAPI from '@/apis/picture';
import { COLOR } from '@/constants/styles/colors';
import {
  EditFloorResponseDto,
  Floor,
  FloorAlignment,
  FloorGradient,
  FloorInfo,
} from '@/types/floor';
import { Picture } from '@/types/picture';

interface FloorStore {
  floor: Floor;
  swiperIndex: number;
  setFloor: (floor: Floor) => void;
  changeDescriptionByIdx: (idx: number, description: string) => void;
  changeDescription: (pictureNo: number, description: string) => void;
  setHashtag: (pictureNo: number, hashtags: string[]) => void;
  setFloorInfo: (floorInfo: Partial<FloorInfo>) => void;
  setPictures: (pictures: Picture[]) => void;
  editFloor: (floorNo: number) => ApiResult<EditFloorResponseDto>;
  fetchFloor: (floorNo: number) => void;
  setSwiperIndex: (idx: number) => void;
}

const defaultFloor = {
  color: COLOR.mono.white,
  isCommentAvailable: true,
  isPublic: true,
  name: '',
  pictures: [],
  texture: 0,
  gradient: FloorGradient.FULL,
  alignment: FloorAlignment.TOP,
};

export const useFloorStore = create<FloorStore>()((set, get) => ({
  floor: defaultFloor,
  swiperIndex: 0,
  setFloor: (floor) =>
    set((state) => ({
      ...state,
      floor: { ...defaultFloor, ...floor },
    })),
  changeDescriptionByIdx: (idx, description) =>
    set((state) => ({
      ...state,
      floor: {
        ...state.floor,
        pictures: [
          ...state.floor.pictures.slice(0, idx),
          { ...state.floor.pictures[idx], description },
          ...state.floor.pictures.slice(idx + 1),
        ],
      },
    })),
  changeDescription: (pictureNo, description) =>
    set((state) => ({
      ...state,
      floor: {
        ...state.floor,
        pictures: state.floor.pictures.map((picture) => {
          if (picture.pictureNo === pictureNo) {
            return { ...picture, description };
          }
          return picture;
        }),
      },
    })),
  setHashtag: (pictureNo, hashtags) =>
    set((state) => ({
      ...state,
      floor: {
        ...state.floor,
        pictures: state.floor.pictures.map((p) => {
          if (p.pictureNo === pictureNo) {
            return {
              ...p,
              hashtags,
            };
          }
          return p;
        }),
      },
    })),
  setFloorInfo: (floorInfo) => {
    set((state) => ({
      ...state,
      floor: {
        ...state.floor,
        ...floorInfo,
      },
    }));
  },
  setPictures: (pictures) => {
    set((state) => ({
      ...state,
      floor: {
        ...state.floor,
        pictures,
      },
    }));
  },
  editFloor: async (floorNo: number) => {
    const { floor } = get();
    const result = await FloorAPI.editFloor({
      floor,
      floorNo,
    });
    return result;
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
  setSwiperIndex: (idx) => {
    console.log(idx);
    set((state) => ({
      ...state,
      swiperIndex: idx,
    }));
  },
}));
