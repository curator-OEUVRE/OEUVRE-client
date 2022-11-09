export const SIGNUP_CONFIG = {
  userId: {
    limit: [4, 15],
  },
  name: {
    limit: [2, 10],
  },
  exhibitionName: {
    limit: [2, 10],
  },
  introduceMessage: {
    limit: [0, 20],
  },
};

export const CREATE_FLOOR_CONFIG = {
  floorName: {
    limit: [1, 10],
  },
};

export const ERROR_MESSAGE = {
  DUPLICATED_ID: '이 사용자 아이디는 이미 다른 사람이 사용하고 있어요',
  EMPTY_ID: '아이디를 입력해주세요',
  INVALID_ID: `아이디는 ${SIGNUP_CONFIG.userId.limit[0]}~${SIGNUP_CONFIG.userId.limit[1]}자 영문/숫자 입니다.`,
  TOO_SHORT_ID: `사용자 아이디는 ${SIGNUP_CONFIG.userId.limit[0]}자 이상이어야 해요`,
  TOO_LONG_ID: `사용자 아이디는 ${SIGNUP_CONFIG.userId.limit[1]}자까지 작성이 가능해요`,
  EMPTY_NAME: '아이디를 입력해주세요',
  INVALID_NAME: `이름은 ${SIGNUP_CONFIG.name.limit[0]}~${SIGNUP_CONFIG.name.limit[1]}자 한문/영문 입니다.`,
  TOO_SHORT_NAME: `이름은 ${SIGNUP_CONFIG.name.limit[0]}자 이상이어야 해요`,
  TOO_LONG_NAME: `이름은 ${SIGNUP_CONFIG.name.limit[1]}자까지 작성이 가능해요`,
  EMPTY_EXHIBITION_NAME: '전시회 이름을 입력해주세요',
  TOO_SHORT_EXHIBITION_NAME: `전시회 이름은 ${SIGNUP_CONFIG.exhibitionName.limit[0]}자 이상이어야 해요`,
  TOO_LONG_EXHIBITION_NAME: `전시회 이름은 ${SIGNUP_CONFIG.exhibitionName.limit[1]}자까지 작성이 가능해요`,
  // EMPTY_INTRODUCE_MESSAGE: '자기소개를 입력해주세요',
  TOO_LONG_INTRODUCE_MESSAGE: `자기 소개는 ${SIGNUP_CONFIG.introduceMessage.limit[1]}자까지 작성이 가능해요`,
  COMMON_TYPE: '입력이 올바르지 않습니다.',
  EMPTY_FLOOR_NAME: '플로어 이름을 입력해주세요',
  TOO_SHORT_FLOOR_NAME: `플로어 이름은 ${CREATE_FLOOR_CONFIG.floorName.limit[0]}자 이상이어야 해요`,
  TOO_LONG_FLOOR_NAME: `플로어 이름은 ${CREATE_FLOOR_CONFIG.floorName.limit[1]}자까지 작성이 가능해요`,
};
