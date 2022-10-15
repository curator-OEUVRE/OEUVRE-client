import { patchAsync, postAsync } from './common';

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
