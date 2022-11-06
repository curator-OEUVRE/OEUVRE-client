import { ResponseDto } from './common';
import { PictureInfo } from './picture';

export interface FloorInfo {
  color: string;
  isCommentAvailable: boolean;
  isPublic: boolean;
  name: string;
  pictures: PictureInfo[];
  texture: number;
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
