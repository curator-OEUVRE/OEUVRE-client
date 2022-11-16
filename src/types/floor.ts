import { ResponseDto } from './common';
import { PictureInfo } from './picture';

export interface FloorInfo {
  color: string;
  isCommentAvailable: boolean;
  isPublic: boolean;
  name: string;
  pictures: PictureInfo[];
  texture: number;
  userId?: string;
  userNo?: number;
  hasNewComment?: boolean;
}

export interface CreateFloorResponse {
  floorNo: number;
}

export interface GetFloorResponse extends FloorInfo {
  floorNo: number;
  isMine: boolean;
  userNo: number;
}

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
