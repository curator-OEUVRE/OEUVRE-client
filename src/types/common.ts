export interface ResponseDto<T> {
  code: number;
  isSuccess: boolean;
  message: string;
  result: T;
  timestamp: string;
}
