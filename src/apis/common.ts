import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const apiUrl = process.env.API_URL ?? 'https://0euvre.click';

/*
[[ API 타입 & 유틸 함수 ]]
*/

/**
 * API 호출 함수에서 발생하는 에러 타입
 * @param T info의 타입
 */
export interface ApiError {
  statusCode: number;
  errorMessage: string;
  info?: any;
}

/**
 * API 호출 함수의 반환 타입
 * @param T 호출에 성공하면 가져오는 데이터의 타입
 */
export type ApiResult<T> = Promise<
  | {
      isSuccess: true;
      result: T;
    }
  | {
      isSuccess: false;
      result: ApiError;
    }
>;

/**
 * API 호출 함수의 에러를 받아 클라이언트의 에러 형식으로 가공하는 함수
 * @param error 처리할 에러
 * @param getErrorMessage status code에 따라 에러 메시지를 결정하는 함수
 */
function processError(
  error: unknown,
  errorMessages?: Record<number, string>,
): ApiError {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // 요청 전송 성공, 서버 응답 성공, 그러나 상태 코드가 2xx 이외
      return {
        statusCode: error.response.status,
        errorMessage:
          errorMessages?.[error.response.status] ??
          '문제가 발생했어요. 다시 시도하거나 문의해 주세요.',
        info: error.response.data,
      };
    }

    if (error.request) {
      // 요청 전송 성공, 그러나 서버 응답 없음
      return {
        statusCode: -1,
        errorMessage:
          '서버와 연결하지 못했어요. 인터넷 연결 상태를 확인하고 다시 시도해 주세요.',
        info: error.request,
      };
    }
  }

  // 케이스 분류 실패
  return {
    statusCode: -1,
    errorMessage: '문제가 발생했어요. 다시 시도하거나 문의해 주세요.',
    info: error,
  };
}

/*
[[ API 호출 함수 ]]
*/

/**
 * GET 요청을 보내는 API 호출 함수
 * @param T 서버 응답 타입
 * @param D parameter 또는 body로 전달할 데이터의 타입
 *
 * @param path API Endpoint
 * @param config `AxiosRequestConfig`
 * @param errorMessages status code에 따른 에러 메시지
 */
export async function getAsync<T, D>(
  path: string,
  config?: AxiosRequestConfig<D>,
  errorMessages?: Record<number, string>,
): ApiResult<T> {
  try {
    const response = await axios.get<T, AxiosResponse<T, D>, D>(path, {
      baseURL: apiUrl,
      responseType: 'json',
      ...config,
    });

    return { isSuccess: true, result: response.data };
  } catch (error) {
    return { isSuccess: false, result: processError(error, errorMessages) };
  }
}

/**
 * POST 요청을 보내는 API 호출 함수
 * @param T 서버 응답 타입
 * @param D parameter 또는 body로 전달할 데이터의 타입
 *
 * @param path API Endpoint
 * @param data body로 전달할 데이터
 * @param config `AxiosRequestConfig`
 * @param errorMessages status code에 따른 에러 메시지
 */
export async function postAsync<T, D>(
  path: string,
  data?: D,
  config?: AxiosRequestConfig,
  errorMessages?: Record<number, string>,
): ApiResult<T> {
  try {
    const response = await axios.post<T, AxiosResponse<T, D>, D>(path, data, {
      baseURL: apiUrl,
      responseType: 'json',
      ...config,
    });

    return { isSuccess: true, result: response.data };
  } catch (error) {
    return { isSuccess: false, result: processError(error, errorMessages) };
  }
}

/**
 * DELETE 요청을 보내는 API 호출 함수
 * @param T 서버 응답 타입
 * @param D parameter 또는 body로 전달할 데이터의 타입
 *
 * @param path API Endpoint
 * @param config `AxiosRequestConfig`
 * @param errorMessages status code에 따른 에러 메시지
 */
export async function deleteAsync<T, D>(
  path: string,
  config?: AxiosRequestConfig,
  errorMessages?: Record<number, string>,
): ApiResult<T> {
  try {
    const response = await axios.delete<T, AxiosResponse<T, D>, D>(path, {
      baseURL: apiUrl,
      responseType: 'json',
      ...config,
    });

    return { isSuccess: true, result: response.data };
  } catch (error) {
    return { isSuccess: false, result: processError(error, errorMessages) };
  }
}

/**
 * PATCH 요청을 보내는 API 호출 함수
 * @param T 서버 응답 타입
 * @param D parameter 또는 body로 전달할 데이터의 타입
 *
 * @param path API Endpoint
 * @param config `AxiosRequestConfig`
 * @param errorMessages status code에 따른 에러 메시지
 */
export async function patchAsync<T, D>(
  path: string,
  data?: D,
  config?: AxiosRequestConfig,
  errorMessages?: Record<number, string>,
): ApiResult<T> {
  try {
    const response = await axios.patch<T, AxiosResponse<T, D>, D>(path, data, {
      baseURL: apiUrl,
      responseType: 'json',
      ...config,
    });

    return { isSuccess: true, result: response.data };
  } catch (error) {
    return { isSuccess: false, result: processError(error, errorMessages) };
  }
}
