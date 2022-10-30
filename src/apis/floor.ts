import { getAsync, postAsync } from './common';
import { useAuthStore } from '@/states/authStore';
import {
  CreateFloorResponseDto,
  FloorInfo,
  GetPictureDetailResponseDto,
} from '@/types/floor';

interface GetPictureDetailParams {
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

export const createFloor = async (floor: FloorInfo) => {
  const response = await postAsync<CreateFloorResponseDto, FloorInfo>(
    `/floors`,
    floor,
    {
      headers: {
        'X-AUTH-TOKEN': useAuthStore.getState().accessToken as string,
      },
    },
  );
  return response;
};
