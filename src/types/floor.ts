import { ResponseDto } from './common';
import { Picture } from '@/types/picture';
import { FLOOR_BACKGROUND_COLORS } from '@/constants/styles/colors';

export enum FloorAlignment {
  CENTER = 'CENTER',
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
}

export enum FloorGradient {
  FULL = 'FULL',
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
}
export type FloorBackgroundColor = typeof FLOOR_BACKGROUND_COLORS[number];

export interface FloorSetting {
  isFramed: boolean;
  alignment: FloorAlignment;
  gradient: FloorGradient;
  color: FloorBackgroundColor;
}

export interface FloorInfo {
  name: string;
  color: FloorBackgroundColor;
  isPublic: boolean;
  isCommentAvailable: boolean;
  alignment: FloorAlignment;
  gradient: FloorGradient;
  isFramed?: boolean;
  description?: string;
}

export interface Floor extends FloorInfo {
  pictures: Picture[];
  texture: number;
  userId?: string;
  userNo?: number;
  hasNewComment?: boolean;
  floorNo?: number;
  isMine?: boolean;
}

export interface CreateFloorResponse {
  floorNo: number;
}

export interface GetFloorResponse extends Floor {}

export type CreateFloorResponseDto = ResponseDto<CreateFloorResponse>;
export type GetFloorResponseDto = ResponseDto<GetFloorResponse>;
export type EditFloorResponseDto = ResponseDto<string>;
export type DeleteFloorResponseDto = ResponseDto<string>;

export interface FloorMini {
  color: string;
  floorNo: number;
  thumbnails: {
    height: number;
    imageUrl: string;
    width: number;
  }[];
  name: string;
  queue: number;
}

export interface PictureMini {
  imageUrl: string;
  pictureNo: number;
  width: number;
  height: number;
}
