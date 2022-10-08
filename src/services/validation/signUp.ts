import { ERROR_MESSAGE, SIGNUP_CONFIG } from '@/constants/common';

const regEx = {
  name: /^[a-zA-Z가-힣]{2,10}$/,
  userId: /^[0-9a-zA-Z-_]{4,15}$/,
  exhibitionName: /^[a-zA-Z가-힣]{2,10}$/,
};

export const validateUserId = (
  value: string,
): [boolean, undefined | string] => {
  const config = SIGNUP_CONFIG.userId;
  if (regEx.userId.test(value)) {
    return [true, undefined];
  }
  if (value.length === 0) {
    return [false, ERROR_MESSAGE.EMPTY_ID];
  }
  if (value.length < config.limit[0]) {
    return [false, ERROR_MESSAGE.TOO_SHORT_ID];
  }
  if (value.length > config.limit[1]) {
    return [false, ERROR_MESSAGE.TOO_LONG_ID];
  }
  return [false, ERROR_MESSAGE.INVALID_ID];
};

export const validateName = (value: string): [boolean, undefined | string] => {
  const config = SIGNUP_CONFIG.name;
  if (regEx.name.test(value)) {
    return [true, undefined];
  }
  if (value.length === 0) {
    return [false, ERROR_MESSAGE.EMPTY_NAME];
  }
  if (value.length < config.limit[0]) {
    return [false, ERROR_MESSAGE.TOO_SHORT_NAME];
  }
  if (value.length > config.limit[1]) {
    return [false, ERROR_MESSAGE.TOO_LONG_NAME];
  }
  return [false, ERROR_MESSAGE.INVALID_NAME];
};

export const validateExhibitionName = (
  value: string,
): [boolean, undefined | string] => {
  const config = SIGNUP_CONFIG.exhibitionName;
  if (value.length === 0) {
    return [false, ERROR_MESSAGE.EMPTY_EXHIBITION_NAME];
  }
  if (value.length < config.limit[0]) {
    return [false, ERROR_MESSAGE.TOO_SHORT_EXHIBITION_NAME];
  }
  if (value.length > config.limit[1]) {
    return [false, ERROR_MESSAGE.TOO_LONG_EXHIBITION_NAME];
  }
  return [true, undefined];
};

export const validateIntroduceMessage = (
  value: string,
): [boolean, undefined | string] => {
  const config = SIGNUP_CONFIG.introduceMessage;
  if (value.length === 0) {
    return [false, ERROR_MESSAGE.EMPTY_INTRODUCE_MESSAGE];
  }
  if (value.length > config.limit[1]) {
    return [false, ERROR_MESSAGE.TOO_LONG_INTRODUCE_MESSAGE];
  }
  return [true, undefined];
};
