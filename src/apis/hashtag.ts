import { getAsync } from './common';

export interface PictureByHashtag {
  pictureNo: number;
  imageUrl: string;
  height: number;
  width: number;
  userNo: number;
  id: string;
  profileImageUrl: string;
}

export interface HashtagInfo {
  hashtagNo: number;
  hashtag: string;
  pictures: PictureByHashtag[];
}

interface GetPopularHashtagsResponseDto {
  timestamp: string;
  code: string;
  isSuccess: boolean;
  message: string;
  result: HashtagInfo[];
}

export async function getPopularHashtags(accessToken: string) {
  const response = await getAsync<GetPopularHashtagsResponseDto, undefined>(
    '/hashtags/popular',
    { headers: { 'X-AUTH-TOKEN': accessToken } },
  );

  return response;
}
