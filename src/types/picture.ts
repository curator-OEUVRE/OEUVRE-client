import { ResponseDto } from './common';

export interface Picture {
  description: string;
  height: number;
  width: number;
  pictureNo: number;
  imageUrl: string;
}

export interface PictureDetail extends Picture {
  floorNo: number;
  isLiked: boolean;
  isMine: boolean;
  isScraped: boolean;
  userNo: number;
  userId: string;
  hashtags: string[];
}

export interface PictureInfo extends Picture {
  hashtags: string[];
  location: number;
  queue: number;
  userNo?: number;
  id?: string;
  title: string;
  productionYear: string;
  materials: string;
  size: string;
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

export type GetPictureDetailResponseDto = ResponseDto<PictureDetail>;
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
