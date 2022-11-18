import { ResponseDto } from './common';

export interface Notification {
  comment: string | null;
  commentNo: number | null;
  createdAt: string;
  floorNo: number | null;
  id: string | null;
  isFollowing: boolean | null;
  isRead: boolean;
  pictureNo: number | null;
  profileImageUrl: string;
  sendUserNo: number;
  type: 'FOLLOWING' | 'LIKES' | 'COMMENT' | 'WELCOME';
}

export interface GetNotificationResponse {
  contents: Notification[];
  isLastPage: false;
}

export type GetNotificationResponseDto = ResponseDto<GetNotificationResponse>;
