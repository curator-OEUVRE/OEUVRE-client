import { getAsync } from './common';
import { PictureDetail } from '@/types/floor';

interface GetPictureDetailParams {
  pictureNo: number;
}

interface GetPictureDetailResponseDto {
  code: number;
  isSuccess: boolean;
  message: string;
  result: PictureDetail;
  timestamp: string;
}

export const getPictureDetail = async ({
  pictureNo,
}: GetPictureDetailParams) => {
  const response = await getAsync<GetPictureDetailResponseDto, undefined>(
    `/pictures/${pictureNo}`,
    {
      headers: {
        'X-AUTH-TOKEN':
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJvZXV2cmUiLCJpYXQiOjE2NjY1MjUxOTIsInN1YiI6IjMiLCJleHAiOjE2ODIwNzcxOTIsIm5vIjozLCJyb2xlcyI6IlVTRVIifQ.0EPOtDHNEVw--Ob3SaCrf8VVfyTaV3ogy-PAfBfHxTA',
      },
    },
  );

  return response;
};
