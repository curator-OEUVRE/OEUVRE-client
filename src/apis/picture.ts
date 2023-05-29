import { deleteAsync, getAsync, patchAsync, postAsync } from './common';
import { PictureInfoModalValue } from '@/feature/PictureInfoModal';
import { useAuthStore } from '@/states/authStore';
import {
  GetPictureDetailResponseDto,
  PatchPictureRequestDto,
  PatchPictureResponseDto,
  LikePictureResponseDto,
  ScrapPictureResponseDto,
  GetLikeUsersResponseDto,
  DeletePictureResponseDto,
  GetPicturesByHashtagResponseDto,
} from '@/types/picture';

interface GetPictureDetailParams {
  pictureNo: number;
}

interface GetLikeUsersParams {
  pictureNo: number;
}

interface PatchPictureParams extends PictureInfoModalValue {
  pictureNo: number;
}

interface LikePictureParams {
  pictureNo: number;
}

interface ScrapPictureParams {
  pictureNo: number;
}

interface DeletePictureParams {
  pictureNo: number;
}

interface GetPicturesByHashtagPrams {
  hashtagNo: number;
  page: number;
  size?: number;
  sortBy: string;
}

const DEFAULT_SIZE = 10;

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
  manufactureYear,
  material,
  scale,
  title,
}: PatchPictureParams) => {
  const response = await patchAsync<
    PatchPictureResponseDto,
    PatchPictureRequestDto
  >(
    `/pictures/${pictureNo}`,
    { description, hashtags, manufactureYear, material, scale, title },
    {
      headers: {
        'X-AUTH-TOKEN': useAuthStore.getState().accessToken as string,
      },
    },
  );
  return response;
};

export const likePicture = async ({ pictureNo }: LikePictureParams) => {
  const response = await postAsync<LikePictureResponseDto, undefined>(
    `/pictures/${pictureNo}/like`,
    undefined,
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
  const response = await postAsync<ScrapPictureResponseDto, undefined>(
    `/pictures/${pictureNo}/scrap`,
    undefined,
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

export const getLikeUsers = async ({ pictureNo }: GetLikeUsersParams) => {
  const response = await getAsync<GetLikeUsersResponseDto, undefined>(
    `/pictures/${pictureNo}/like`,
    {
      headers: {
        'X-AUTH-TOKEN': useAuthStore.getState().accessToken as string,
      },
    },
  );
  return response;
};

export const deletePicture = async ({ pictureNo }: DeletePictureParams) => {
  const response = await deleteAsync<DeletePictureResponseDto, undefined>(
    `/pictures/${pictureNo}`,
    {
      headers: {
        'X-AUTH-TOKEN': useAuthStore.getState().accessToken as string,
      },
    },
  );
  return response;
};

export const getPicturesByHashtag = async ({
  hashtagNo,
  page,
  size = DEFAULT_SIZE,
  sortBy,
}: GetPicturesByHashtagPrams) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sortBy,
  });
  const response = await getAsync<GetPicturesByHashtagResponseDto, undefined>(
    `/hashtags/${hashtagNo}/pictures?${params}`,
    {
      headers: {
        'X-AUTH-TOKEN': useAuthStore.getState().accessToken as string,
      },
    },
  );
  return response;
};
