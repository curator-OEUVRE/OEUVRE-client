import create from 'zustand';
import { FormInputStatus } from '@/components';

export interface UserInput<T> {
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
  // profileImageUrl: UserInput<string>;
  // backgroundImageUrl: UserInput<string>;
  exhibitionName: UserInput<string>;
  introduceMessage: UserInput<string>;
}

interface SignUpState extends SignUpValues {
  setLoginInfo: (email: string, type: 'APPLE' | 'GOOGLE' | 'KAKAO') => void;
  setIsMarketingAgreed: (data: boolean) => void;
  setUserId: (data: UserInput<string>) => void;
  setName: (data: UserInput<string>) => void;
  setBirthDay: (data: UserInput<Date>) => void;
  // setProfileImageUrl: (data: UserInput<string>) => void;
  // setBackgroundImageUrl: (data: UserInput<string>) => void;
  setExhibitionName: (data: UserInput<string>) => void;
  setIntroduceMessage: (data: UserInput<string>) => void;
  clearSignUpStore: () => void;
}

const createInitialUserInput = <T,>(value: T, isRequired: boolean = true) => ({
  status: FormInputStatus.Initial,
  isRequired,
  value,
  error: '',
});

const initialState: SignUpValues = {
  loginInfo: {
    email: '',
    type: 'APPLE',
  },
  isMarketingAgreed: false,
  userId: createInitialUserInput(''),
  name: createInitialUserInput(''),
  birthDay: createInitialUserInput(new Date()),
  exhibitionName: createInitialUserInput(''),
  introduceMessage: createInitialUserInput(''),
};

export const useSignUpStore = create<SignUpState>()((set) => ({
  ...initialState,
  setLoginInfo: (email, type) =>
    set((state) => ({ ...state, loginInfo: { email, type } })),
  setIsMarketingAgreed: (isMarketingAgreed) =>
    set((state) => ({ ...state, isMarketingAgreed })),
  setUserId: (data: UserInput<string>) =>
    set((state) => ({ ...state, userId: data })),
  setName: (data) => set((state) => ({ ...state, name: data })),
  setBirthDay: (data) => set((state) => ({ ...state, birthDay: data })),
  setExhibitionName: (data) =>
    set((state) => ({ ...state, exhibitionName: data })),
  setIntroduceMessage: (data) =>
    set((state) => ({ ...state, introduceMessage: data })),
  clearSignUpStore: () => set((state) => ({ ...state, ...initialState })),
}));
