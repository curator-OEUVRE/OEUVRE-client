import { getAsync } from './common';
import { SearchRequestDto } from '@/types/common';

export interface PictureByHashtag {
  pictureNo: number;
  imageUrl: string;
  height: number;
  width: number;
  userNo: number;
  userId: string;
  profileImageUrl: string;
}

export interface HashtagInfo {
  hashtagNo: number;
  hashtag: string;
  isHead: boolean;
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

interface SearchHashtagsRequestDto extends SearchRequestDto {}

interface SearchHashtagsResponseDto {
  timestamp: string;
  code: string;
  isSuccess: boolean;
  message: string;
  result: {
    isLastPage: boolean;
    contents: {
      hashtagNo: number;
      hashtag: string;
      tagCount: number;
    }[];
  };
}

export async function searchHashtags(
  accessToken: string,
  { keyword, page, size }: SearchHashtagsRequestDto,
) {
  const hasSharpCharacter = keyword.length > 0 && keyword[0] === '#';

  const response = await getAsync<
    SearchHashtagsResponseDto,
    SearchHashtagsRequestDto
  >('/hashtags', {
    params: {
      keyword:
        keyword.length === 0 || hasSharpCharacter ? keyword : `#${keyword}`,
      page,
      size,
    },
    headers: { 'X-AUTH-TOKEN': accessToken },
  });

  return response;
}
