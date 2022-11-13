export interface ResponseDto<T> {
  code: string;
  isSuccess: boolean;
  message: string;
  result: T;
  timestamp: string;
}

export interface SearchRequestDto {
  keyword: string;
  page: number;
  size: number;
}
