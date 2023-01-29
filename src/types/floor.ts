import { ResponseDto } from './common';
import { PictureInfo } from './picture';

export enum FloorAlignment {
  CENTER = 'CENTER',
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
}

export interface FloorInfo {
  name: string;
  color: string;
  isPublic: boolean;
  isCommentAvailable: boolean;
  alignment?: FloorAlignment;
  isFramed?: boolean;
}

export interface Floor extends FloorInfo {
  pictures: PictureInfo[];
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
