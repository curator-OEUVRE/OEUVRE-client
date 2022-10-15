import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import SignUpTemplate from './SignUpTemplate';
import { Screen } from '@/constants/screens';
import PersonalDataForm from '@/feature/PersonalDataForm';
import { RootStackParamsList } from '@/feature/Routes';
import { AuthStackParamsList } from '@/feature/Routes/AuthStack';

export type PersonalDataFormScreenParams = undefined;
export type PersonalDataFormScreenNP = CompositeNavigationProp<
  StackNavigationProp<AuthStackParamsList, Screen.PersonalDataFormScreen>,
  StackNavigationProp<RootStackParamsList>
>;

const PersonalDataFormScreen = () => {
  const navigation = useNavigation<PersonalDataFormScreenNP>();

  return (
    <SignUpTemplate>
      <PersonalDataForm
        onNextPress={() => {
          navigation.navigate(Screen.UserProfileFormScreen);
        }}
      />
    </SignUpTemplate>
  );
};

export default PersonalDataFormScreen;
