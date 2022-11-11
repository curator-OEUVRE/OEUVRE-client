import { deleteAsync, getAsync, patchAsync, postAsync } from './common';
import type { PictureMini } from '@/types/floor';
import type { MyProfile, OtherUserProfile, UserMini } from '@/types/user';

interface SignUpRequestDto {
  /** @example 2000-06-21 */
  birthday: string;
  email: string;
  exhibitionName: string;
  id: string;
  introduceMessage: string;
  isAlarmOn: boolean;
  name: string;
  profileImageUrl: string | null;
  type: 'APPLE' | 'GOOGLE' | 'KAKAO';
  backgroundImageUrl: string | null;
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
  result: {
    contents: PictureMini[];
    isLastPage: boolean;
  };
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

interface PatchMyProfileRequestDto {
  backgroundImageUrl: string;
  exhibitionName: string;
  introduceMessage: string;
  name: string;
  profileImageUrl: string;
}

interface PatchMyProfileResponseDto {
  code: string;
  isSuccess: boolean;
  message: string;
  result: string;
  timestamp: string;
}

export async function patchMyProfile(
  accessToken: string,
  data: PatchMyProfileRequestDto,
) {
  const response = await patchAsync<
    PatchMyProfileResponseDto,
    PatchMyProfileRequestDto
  >('/users/my-profile', data, { headers: { 'X-AUTH-TOKEN': accessToken } });

  return response;
}

interface GetFollowersResponseDto {
  code: string;
  isSuccess: boolean;
  message: string;
  result: UserMini[];
  timestamp: string;
}

export async function getFollowers(accessToken: string, userNo: number) {
  const response = await getAsync<GetFollowersResponseDto, undefined>(
    `/users/${userNo}/follower`,
    { headers: { 'X-AUTH-TOKEN': accessToken } },
  );

  return response;
}

export async function getFollowings(accessToken: string, userNo: number) {
  const response = await getAsync<GetFollowersResponseDto, undefined>(
    `/users/${userNo}/following`,
    { headers: { 'X-AUTH-TOKEN': accessToken } },
  );

  return response;
}

interface CheckIdResponseDto {
  code: string;
  isSuccess: boolean;
  message: string;
  result: {
    isPossible: boolean;
  };
  timestamp: string;
}

interface CheckIdRequestDto {
  id: string;
}

export async function checkId(id: string) {
  const response = await getAsync<CheckIdResponseDto, CheckIdRequestDto>(
    '/users/check-id',
    { params: { id } },
  );

  return response;
}

interface DeactiveUserResponseDto {
  code: string;
  isSuccess: boolean;
  message: string;
  result: string;
  timestamp: string;
}

export async function deactiveUser(accessToken: string) {
  const response = await deleteAsync<DeactiveUserResponseDto, undefined>(
    '/users',
    { headers: { 'X-AUTH-TOKEN': accessToken } },
  );

  return response;
}
