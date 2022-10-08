import { StackScreenProps } from '@react-navigation/stack';

export enum SignUpStep {
  PersonalData = 'PersonalData',
  UserProfile = 'UserProfile',
}

export type RootStackParamList = {
  SignUp: { process: SignUpStep };
  Welcome: undefined;
};

type SignUpScreenProps = StackScreenProps<RootStackParamList, 'SignUp'>;
export type SignUpScreenRouteProp = SignUpScreenProps['route'];
export type SignUpScreenNavigationProp = SignUpScreenProps['navigation'];

type WelcomeScreenProps = StackScreenProps<RootStackParamList, 'Welcome'>;
export type WelcomeScreenNavigationProps = WelcomeScreenProps['navigation'];
