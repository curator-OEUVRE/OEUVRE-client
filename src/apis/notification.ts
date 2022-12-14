import { getAsync } from './common';
import { useAuthStore } from '@/states/authStore';
import { GetNotificationResponseDto } from '@/types/notification';
import { CheckUpdateResponseDto } from '@/types/picture';

const DEFAULT_SIZE = 21;

interface GetNotificationParams {
  page: number;
  size?: number;
}

export const getNotification = async ({
  page,
  size = DEFAULT_SIZE,
}: GetNotificationParams) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  const response = await getAsync<GetNotificationResponseDto, undefined>(
    `/pictures?${params}`,
    {
      headers: {
        'X-AUTH-TOKEN': useAuthStore.getState().accessToken as string,
      },
    },
  );
  return response;
};

export const checkUpdate = async () => {
  const response = await getAsync<CheckUpdateResponseDto, undefined>(
    `/pictures/update-check`,
    {
      headers: {
        'X-AUTH-TOKEN': useAuthStore.getState().accessToken as string,
      },
    },
  );
  return response;
};
