import { getAsync, patchAsync, postAsync } from './common';
import { useAuthStore } from '@/states/authStore';
import {
  CreateFloorResponseDto,
  FloorInfo,
  GetPictureDetailResponseDto,
  GetFloorResponseDto,
  EditFloorResponseDto,
} from '@/types/floor';

interface GetPictureDetailParams {
  pictureNo: number;
}

interface GetFloorParams {
  floorNo: number;
}

interface EditFloorParams {
  floorNo: number;
  floor: FloorInfo;
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

export const getFloor = async ({ floorNo }: GetFloorParams) => {
  const response = await getAsync<GetFloorResponseDto, undefined>(
    `/floors/${floorNo}`,
    {
      headers: {
        'X-AUTH-TOKEN': useAuthStore.getState().accessToken as string,
      },
    },
  );
  return response;
};

export const editFloor = async ({ floor, floorNo }: EditFloorParams) => {
  const response = await patchAsync<EditFloorResponseDto, FloorInfo>(
    `/floors/${floorNo}`,
    floor,
    {
      headers: {
        'X-AUTH-TOKEN': useAuthStore.getState().accessToken as string,
      },
    },
  );
  console.log(response);
  return response;
};
