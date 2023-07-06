import { ResponseDto } from './common';

export interface GuestBookInfo {
  comment: string;
  commentNo: number;
  createdAt: string;
  isMine: boolean;
  profileImageUrl: string;
  userId: string;
  userNo: number;
}
export interface CreateCommentRequestDto {
  comment: string;
}

export interface OtherFloor {
  floorNo: number;
  queue: number;
  name: string;
}

export interface GetCommentsResponse {
  contents: GuestBookInfo[];
  floorName: string;
  isLastPage: boolean;
}

export type CreateCommentResponseDto = ResponseDto<GuestBookInfo>;
export type DeleteCommentResponseDto = ResponseDto<string>;
export type GetCommentsResponseDto = ResponseDto<GetCommentsResponse>;
export type GetOtherFloorsResponseDto = ResponseDto<OtherFloor[]>;
