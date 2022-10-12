import { postAsync } from './common';

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
