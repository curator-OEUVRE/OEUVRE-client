import create from 'zustand';
import { FormInputStatus } from '@/components';

interface UserInput<T> {
  status: FormInputStatus;
  value: T;
  error: string | undefined;
  isRequired: boolean;
}

export interface SignUpValues {
  loginInfo: {
    email: string;
    type: 'APPLE' | 'GOOGLE' | 'KAKAO';
  };
  isMarketingAgreed: boolean;
  userId: UserInput<string>;
  name: UserInput<string>;
  birthDay: UserInput<Date>;
  profileImageUrl: UserInput<string>;
  exhibitionName: UserInput<string>;
  introduceMessage: UserInput<string>;
}

interface SignUpState extends SignUpValues {
  setLoginInfo: (email: string, type: 'APPLE' | 'GOOGLE' | 'KAKAO') => void;
  setIsMarketingAgreed: (data: boolean) => void;
  setUserId: (data: UserInput<string>) => void;
  setName: (data: UserInput<string>) => void;
  setBirthDay: (data: UserInput<Date>) => void;
  setProfileImageUrl: (data: UserInput<string>) => void;
  setExhibitionName: (data: UserInput<string>) => void;
  setIntroduceMessage: (data: UserInput<string>) => void;
}

const createInitialUserInput = <T,>(value: T, isRequired: boolean = true) => ({
  status: FormInputStatus.Initial,
  isRequired,
  value,
  error: '',
});

export const useSignUpStore = create<SignUpState>()((set) => ({
  loginInfo: {
    email: '',
    type: 'APPLE',
  },
  setLoginInfo: (email, type) =>
    set((state) => ({ ...state, loginInfo: { email, type } })),
  isMarketingAgreed: false,
  setIsMarketingAgreed: (isMarketingAgreed) =>
    set((state) => ({ ...state, isMarketingAgreed })),
  userId: createInitialUserInput(''),
  setUserId: (data: UserInput<string>) =>
    set((state) => ({ ...state, userId: data })),
  name: createInitialUserInput(''),
  setName: (data) => set((state) => ({ ...state, name: data })),
  birthDay: createInitialUserInput(new Date()),
  setBirthDay: (data) => set((state) => ({ ...state, birthDay: data })),
  profileImageUrl: createInitialUserInput(''),
  setProfileImageUrl: (data) =>
    set((state) => ({ ...state, profileImageUrl: data })),
  exhibitionName: createInitialUserInput(''),
  setExhibitionName: (data) =>
    set((state) => ({ ...state, exhibitionName: data })),
  introduceMessage: createInitialUserInput(''),
  setIntroduceMessage: (data) =>
    set((state) => ({ ...state, introduceMessage: data })),
}));
