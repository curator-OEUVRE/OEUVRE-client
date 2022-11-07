import { useCallback } from 'react';
import { ApiResult } from '@/apis/common';
import { refresh } from '@/apis/login';
import { useAuthStore } from '@/states/authStore';

const useAuth = () => {
  const { accessToken, refreshToken, setToken, clear } = useAuthStore();

  const fetchWithToken = useCallback(
    async <T, U>(
      api: (token: string, ...args: T[]) => ApiResult<U>,
      ...args: T[]
    ): ApiResult<U> => {
      const response = await api(accessToken ?? '', ...args);

      if (!response.isSuccess && response.result.statusCode === 401) {
        const refreshResponse = await refresh(refreshToken ?? '');

        if (refreshResponse.isSuccess) {
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            refreshResponse.result.result;
          setToken(newAccessToken, newRefreshToken);
          const retryResponse = await api(newAccessToken, ...args);
          return retryResponse;
        }

        clear();

        return {
          isSuccess: false,
          result: { errorMessage: '', statusCode: 401 },
        };
      }

      return response;
    },
    [accessToken, refreshToken, clear, setToken],
  );

  return { fetchWithToken, accessToken, refreshToken };
};

export default useAuth;
