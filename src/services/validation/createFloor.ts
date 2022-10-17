import { ERROR_MESSAGE, CREATE_FLOOR_CONFIG } from '@/constants/common';

const regEx = {
  floorName: /^[a-zA-Z가-힣]{1,10}$/,
};

export const validateFloorName = (
  value: string,
): [boolean, undefined | string] => {
  const config = CREATE_FLOOR_CONFIG.floorName;
  if (regEx.floorName.test(value)) {
    return [true, undefined];
  }
  if (value.length === 0) {
    return [false, ERROR_MESSAGE.EMPTY_FLOOR_NAME];
  }
  if (value.length < config.limit[0]) {
    return [false, ERROR_MESSAGE.TOO_SHORT_FLOOR_NAME];
  }
  if (value.length > config.limit[1]) {
    return [false, ERROR_MESSAGE.TOO_LONG_FLOOR_NAME];
  }
  return [true, undefined];
};
