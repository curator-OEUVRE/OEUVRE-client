import { deleteAsync, getAsync, postAsync } from './common';
import { useAuthStore } from '@/states/authStore';
import {
  CreateCommentRequestDto,
  CreateCommentResponseDto,
  DeleteCommentResponseDto,
  GetCommentsResponseDto,
  GetOtherFloorsResponseDto,
} from '@/types/guestbook';

interface CreateCommentParams {
  floorNo: number;
  comment: string;
}

interface DeleteCommentParams {
  commentNo: number;
}

interface GetCommentsParams {
  floorNo: number;
  page: number;
  size?: number;
}

interface GetOtherFloorsParams {
  floorNo: number;
}

const DEFAULT_SIZE = 10;

export const createComment = async ({
  floorNo,
  comment,
}: CreateCommentParams) => {
  const response = await postAsync<
    CreateCommentResponseDto,
    CreateCommentRequestDto
  >(
    `/comments/${floorNo}`,
    { comment },
    {
      headers: {
        'X-AUTH-TOKEN': useAuthStore.getState().accessToken as string,
      },
    },
  );
  return response;
};

export const deleteComment = async ({ commentNo }: DeleteCommentParams) => {
  const response = await deleteAsync<DeleteCommentResponseDto, undefined>(
    `/comments/${commentNo}`,
    {
      headers: {
        'X-AUTH-TOKEN': useAuthStore.getState().accessToken as string,
      },
    },
  );
  return response;
};

export const getComments = async ({
  floorNo,
  page,
  size = DEFAULT_SIZE,
}: GetCommentsParams) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  const response = await getAsync<GetCommentsResponseDto, undefined>(
    `/comments/${floorNo}?${params}`,
    {
      headers: {
        'X-AUTH-TOKEN': useAuthStore.getState().accessToken as string,
      },
    },
  );
  return response;
};

export const getOtherFloors = async ({ floorNo }: GetOtherFloorsParams) => {
  const response = await getAsync<GetOtherFloorsResponseDto, undefined>(
    `/comments/${floorNo}/other-floors`,
    {
      headers: {
        'X-AUTH-TOKEN': useAuthStore.getState().accessToken as string,
      },
    },
  );

  return response;
};
