import { postAsync } from './common';

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
