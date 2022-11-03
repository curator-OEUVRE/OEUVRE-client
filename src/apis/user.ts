import { deleteAsync, getAsync, postAsync } from './common';
import type { PictureMini } from '@/types/floor';
import type { MyProfile, OtherUserProfile } from '@/types/user';

interface SignUpRequestDto {
  /** @example 2000-06-21 */
  birthday: string;
  email: string;
  exhibitionName: string;
  id: string;
  introduceMessage: string;
  isAlarmOn: boolean;
  name: string;
  profileImageUrl: string;
  type: 'APPLE' | 'GOOGLE' | 'KAKAO';
}

interface SignUpResponseDto {
  code: string;
  isSuccess: boolean;
  message: string;
  result: {
    accessToken: string;
    refreshToken: string;
    userNo: number;
  };
  timestamp: string;
}

export async function signUp(info: SignUpRequestDto) {
  const response = await postAsync<SignUpResponseDto, SignUpRequestDto>(
    '/users',
    info,
  );

  return response;
}

interface MyProfileResponseDto {
  code: string;
  isSuccess: boolean;
  message: string;
  result: MyProfile;
  timestamp: string;
}

export async function getMyProfile(accessToken: string) {
  const response = await getAsync<MyProfileResponseDto, undefined>(
    '/users/my-profile',
    { headers: { 'X-AUTH-TOKEN': accessToken } },
  );

  return response;
}

interface GetProfileResponseDto {
  code: string;
  isSuccess: boolean;
  message: string;
  result: OtherUserProfile;
}

export async function getProfile(accessToken: string, userNo: number) {
  const response = await getAsync<GetProfileResponseDto, undefined>(
    `/users/${userNo}/profile`,
    { headers: { 'X-AUTH-TOKEN': accessToken } },
  );

  return response;
}

interface GetCollectionRequestDto {
  page: number;
  size: number;
}

interface GetCollectionResponseDto {
  code: string;
  isSuccess: boolean;
  message: string;
  result: PictureMini[];
  timestamp: string;
}

export async function getCollection(
  accessToken: string,
  { page, size }: GetCollectionRequestDto,
) {
  const response = await getAsync<
    GetCollectionResponseDto,
    GetCollectionRequestDto
  >('/users/collection', {
    headers: { 'X-AUTH-TOKEN': accessToken },
    params: { page, size },
  });

  return response;
}

interface FollowUserResponseDto {
  code: string;
  isSuccess: boolean;
  message: string;
  result: string;
  timestamp: string;
}

export async function followUser(accessToken: string, userNo: number) {
  const response = await postAsync<FollowUserResponseDto, undefined>(
    `/users/${userNo}/follow`,
    undefined,
    { headers: { 'X-AUTH-TOKEN': accessToken } },
  );

  return response;
}

export async function unfollowUser(accessToken: string, userNo: number) {
  const response = await deleteAsync<FollowUserResponseDto, undefined>(
    `/users/${userNo}/follow`,
    { headers: { 'X-AUTH-TOKEN': accessToken } },
  );

  return response;
}
