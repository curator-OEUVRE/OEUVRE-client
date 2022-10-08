import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import SignUpTemplate from './SignUpTemplate';
import { Screen } from '@/constants/screens';
import { RootStackParamsList } from '@/feature/Routes';
import { AuthStackParamsList } from '@/feature/Routes/AuthStack';
import TermsForm from '@/feature/TermsForm';

export type TermsFormScreenParams = undefined;
export type TermsFormScreenNP = CompositeNavigationProp<
  StackNavigationProp<AuthStackParamsList, Screen.TermsFormScreen>,
  StackNavigationProp<RootStackParamsList>
>;

const TermsFormScreen = () => {
  const navigation = useNavigation<TermsFormScreenNP>();

  return (
    <SignUpTemplate>
      <TermsForm
        onNextPress={() => {
          navigation.navigate(Screen.PersonalDataFormScreen);
        }}
      />
    </SignUpTemplate>
  );
};

export default TermsFormScreen;
