import { deleteAsync, getAsync, patchAsync, postAsync } from './common';
import { useAuthStore } from '@/states/authStore';
import { SearchRequestDto } from '@/types/common';
import {
  CreateFloorResponseDto,
  DeleteFloorResponseDto,
  EditFloorResponseDto,
  Floor,
  GetFloorResponseDto,
} from '@/types/floor';
import type { FloorMini } from '@/types/floor';
import { GetHomeFeedParams, GetHomeFeedResponseDto } from '@/types/home';

interface GetFloorParams {
  floorNo: number;
}

interface EditFloorParams {
  floorNo: number;
  floor: Floor;
}

type CreateFloorsRequestDto =
  | Floor
  | {
      thumbnailQueue: number;
    };

export const createFloor = async (floor: CreateFloorsRequestDto) => {
  const response = await postAsync<
    CreateFloorResponseDto,
    CreateFloorsRequestDto
  >(`/floors`, floor, {
    headers: {
      'X-AUTH-TOKEN': useAuthStore.getState().accessToken as string,
    },
  });
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
  const response = await patchAsync<EditFloorResponseDto, Floor>(
    `/floors/${floorNo}`,
    floor,
    {
      headers: {
        'X-AUTH-TOKEN': useAuthStore.getState().accessToken as string,
      },
    },
  );
  return response;
};

interface GetFloorsParams {
  page: number;
  size: number;
  userNo: number;
}

interface GetFloorsRequestDto {
  page: number;
  size: number;
}

interface GetFloorsResponseDto {
  code: string;
  isSuccess: boolean;
  message: string;
  result: {
    contents: FloorMini[];
    isLastPage: boolean;
  };
  timestamp: string;
}

export async function getFloors(
  accessToken: string,
  { page, size, userNo }: GetFloorsParams,
) {
  const response = await getAsync<GetFloorsResponseDto, GetFloorsRequestDto>(
    `/users/${userNo}/floors`,
    {
      headers: {
        'X-AUTH-TOKEN': accessToken,
      },
      params: { page, size },
    },
  );

  return response;
}

type EditFloorsOrderRequestDto = { floorNo: number; queue: number }[];

interface EditFloorsOrderResponseDto {
  code: number;
  isSuccess: boolean;
  message: string;
  result: string;
  timestamp: string;
}

export async function editFloorsOrder(
  accessToken: string,
  params: EditFloorsOrderRequestDto,
) {
  const response = await patchAsync<
    EditFloorsOrderResponseDto,
    EditFloorsOrderRequestDto
  >('/floors', params, {
    headers: {
      'X-AUTH-TOKEN': accessToken,
    },
  });

  return response;
}

export async function getHomeFeed({ page, size, view }: GetHomeFeedParams) {
  const response = await getAsync<GetHomeFeedResponseDto, GetHomeFeedParams>(
    '/floors/home',
    {
      headers: {
        'X-AUTH-TOKEN': useAuthStore.getState().accessToken as string,
      },
      params: { page, size, view },
    },
  );

  return response;
}

interface DeleteFloorParams {
  floorNo: number;
}

export const deleteFloor = async ({ floorNo }: DeleteFloorParams) => {
  const response = await deleteAsync<DeleteFloorResponseDto, undefined>(
    `/floors/${floorNo}`,
    {
      headers: {
        'X-AUTH-TOKEN': useAuthStore.getState().accessToken as string,
      },
    },
  );
  return response;
};

interface SearchFloorsRequestDto extends SearchRequestDto {}

interface SearchFloorsResponseDto {
  code: string;
  isSuccess: boolean;
  message: string;
  result: {
    contents: {
      exhibitionName: string;
      floorName: string;
      floorNo: number;
      height: number;
      thumbnailUrl: string;
      width: number;
    }[];
    isLastPage: boolean;
  };
  timestamp: string;
}

export async function searchFloors(
  accessToken: string,
  { keyword, page, size }: SearchFloorsRequestDto,
) {
  const response = await getAsync<
    SearchFloorsResponseDto,
    SearchFloorsRequestDto
  >('/floors', {
    params: { keyword, page, size },
    headers: { 'X-AUTH-TOKEN': accessToken },
  });

  return response;
}
