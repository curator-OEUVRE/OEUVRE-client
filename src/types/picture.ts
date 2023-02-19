import { ResponseDto } from './common';

export interface Picture {
  description: string;
  floorNo: number;
  hashtags: string[];
  height: number;
  width: number;
  imageUrl: string;
  isLiked: boolean;
  isMine: boolean;
  isScraped: boolean;
  manufactureYear: string;
  materials: string;
  scale: string;
  pictureNo: number;
  queue: number;
  title: string;
  userNo: number;
  userId: string;
  location: number;
  id?: string;
  profileImageUrl?: string;
}

export interface LikeUser {
  id: string;
  name: string;
  profileImageUrl: string;
  userNo: number;
}

export interface HashtagPicture extends Picture {
  userNo: number;
  id: string;
  profileImageUrl: string;
}

export interface GetPicturesByHashtagResponse {
  contents: HashtagPicture[];
  isLastPage: boolean;
}

export type GetPictureDetailResponseDto = ResponseDto<Picture>;
export type PatchPictureResponseDto = ResponseDto<string>;
export type PatchPictureRequestDto = {
  description: string;
  hashtags: string[];
};
export type LikePictureResponseDto = ResponseDto<string>;
export type ScrapPictureResponseDto = ResponseDto<string>;
export type GetLikeUsersResponseDto = ResponseDto<LikeUser[]>;
export type DeletePictureResponseDto = ResponseDto<string>;
export type GetPicturesByHashtagResponseDto =
  ResponseDto<GetPicturesByHashtagResponse>;
export type CheckUpdateResponseDto = ResponseDto<{ isUpdated: boolean }>;
