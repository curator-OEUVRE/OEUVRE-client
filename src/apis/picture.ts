import { deleteAsync, getAsync, patchAsync } from './common';
import { useAuthStore } from '@/states/authStore';
import {
  GetPictureDetailResponseDto,
  PatchPictureRequestDto,
  PatchPictureResponseDto,
  LikePictureResponseDto,
  ScrapPictureResponseDto,
} from '@/types/picture';

interface GetPictureDetailParams {
  pictureNo: number;
}

interface PatchPictureParams {
  description: string;
  hashtags: string[];
  pictureNo: number;
}

interface LikePictureParams {
  pictureNo: number;
}

interface ScrapPictureParams {
  pictureNo: number;
}

export const getPictureDetail = async ({
  pictureNo,
}: GetPictureDetailParams) => {
  const response = await getAsync<GetPictureDetailResponseDto, undefined>(
    `/pictures/${pictureNo}`,
    {
      headers: {
        'X-AUTH-TOKEN': useAuthStore.getState().accessToken as string,
      },
    },
  );
  return response;
};

export const patchPicture = async ({
  description,
  hashtags,
  pictureNo,
}: PatchPictureParams) => {
  const response = await patchAsync<
    PatchPictureResponseDto,
    PatchPictureRequestDto
  >(
    `/pictures/${pictureNo}`,
    { description, hashtags },
    {
      headers: {
        'X-AUTH-TOKEN': useAuthStore.getState().accessToken as string,
      },
    },
  );
  return response;
};

export const likePicture = async ({ pictureNo }: LikePictureParams) => {
  const response = await getAsync<LikePictureResponseDto, undefined>(
    `/pictures/${pictureNo}/like`,
    {
      headers: {
        'X-AUTH-TOKEN': useAuthStore.getState().accessToken as string,
      },
    },
  );
  return response;
};

export const unlikePicture = async ({ pictureNo }: LikePictureParams) => {
  const response = await deleteAsync<LikePictureResponseDto, undefined>(
    `/pictures/${pictureNo}/like`,
    {
      headers: {
        'X-AUTH-TOKEN': useAuthStore.getState().accessToken as string,
      },
    },
  );
  return response;
};

export const scrapPicture = async ({ pictureNo }: ScrapPictureParams) => {
  const response = await getAsync<ScrapPictureResponseDto, undefined>(
    `/pictures/${pictureNo}/scrap`,
    {
      headers: {
        'X-AUTH-TOKEN': useAuthStore.getState().accessToken as string,
      },
    },
  );
  return response;
};

export const unscrapPicture = async ({ pictureNo }: ScrapPictureParams) => {
  const response = await deleteAsync<ScrapPictureResponseDto, undefined>(
    `/pictures/${pictureNo}/scrap`,
    {
      headers: {
        'X-AUTH-TOKEN': useAuthStore.getState().accessToken as string,
      },
    },
  );
  return response;
};
