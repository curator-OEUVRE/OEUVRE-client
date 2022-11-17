import { getAsync, patchAsync, postAsync } from './common';

interface LoginRequestDto {
  token: string;
}

interface LoginResponseDto {
  code: string;
  isSuccess: boolean;
  message: string;
  result: {
    accessToken: string;
    refreshToken: string;
  };
  timestamp: string;
}

export async function login(token: string, type: 'apple' | 'google' | 'kakao') {
  const response = await postAsync<LoginResponseDto, LoginRequestDto>(
    `/login/${type}`,
    {
      token,
    },
  );

  return response;
}

export async function refresh(refreshToken: string) {
  const response = await patchAsync<LoginResponseDto, undefined>(
    '/login/refresh',
    undefined,
    {
      headers: {
        'X-AUTH-TOKEN': refreshToken,
      },
    },
  );

  return response;
}

interface GuestLoginResponseDto {
  code: string;
  isSuccess: boolean;
  message: string;
  result: {
    accessToken: string;
    refreshToken: string;
  };
  timestamp: string;
}

export async function loginAsGuest() {
  const response = await postAsync<GuestLoginResponseDto, undefined>(
    '/login/guest',
  );

  return response;
}

interface CheckGuestLoginResponseDto {
  code: string;
  isSuccess: boolean;
  message: string;
  result: boolean;
  timestamp: string;
}

export async function checkGuestLogin() {
  const response = await getAsync<CheckGuestLoginResponseDto, undefined>(
    '/login/check/guest',
  );

  return response;
}
