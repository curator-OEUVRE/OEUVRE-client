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
  userNo: number;
  userId: string;
};

export interface PictureInfo {
  imageUrl: string;
  description: string;
  hashtags: string[];
  width: number;
  height: number;
  location: number;
  queue: number;
  pictureNo: number;
}

export interface LikeUser {
  id: string;
  name: string;
  profileImageUrl: string;
  userNo: number;
}
export type GetPictureDetailResponseDto = ResponseDto<PictureDetail>;
export type PatchPictureResponseDto = ResponseDto<string>;
export type PatchPictureRequestDto = {
  description: string;
  hashtags: string[];
};
export type LikePictureResponseDto = ResponseDto<string>;
export type ScrapPictureResponseDto = ResponseDto<string>;
export type GetLikeUsersResponseDto = ResponseDto<LikeUser[]>;
