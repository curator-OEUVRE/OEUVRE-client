import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import SignUpTemplate from './SignUpTemplate';
import { Screen } from '@/constants/screens';
import { RootStackParamsList } from '@/feature/Routes';
import { AuthStackParamsList } from '@/feature/Routes/AuthStack';
import UserProfileForm from '@/feature/UserProfileForm';

export type UserProfileFormScreenParams = undefined;
export type UserProfileFormScreenNP = CompositeNavigationProp<
  StackNavigationProp<AuthStackParamsList, Screen.UserProfileFormScreen>,
  StackNavigationProp<RootStackParamsList>
>;

const UserProfileFormScreen = () => {
  const navigation = useNavigation<UserProfileFormScreenNP>();

  return (
    <SignUpTemplate>
      <UserProfileForm
        onNextPress={() => {
          navigation.navigate(Screen.WelcomeScreen, {
            name: '',
          });
        }}
      />
    </SignUpTemplate>
  );
};

export default UserProfileFormScreen;
