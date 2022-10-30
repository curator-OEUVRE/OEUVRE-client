import { ResponseDto } from './common';

export type PictureDetail = {
  description: string;
  floorNo: number;
  height: number;
  imageUrl: string;
  isLiked: boolean;
  isMine: boolean;
  isScraped: boolean;
  pictureNo: number;
  width: number;
};

export interface PictureInfo {
  imageUrl: string;
  description: string;
  hashtags: string[];
  width: number;
  height: number;
  location: number;
  queue: number;
}

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
export type GetPictureDetailResponseDto = ResponseDto<PictureDetail>;
export type GetFloorResponseDto = ResponseDto<GetFloorResponse>;
