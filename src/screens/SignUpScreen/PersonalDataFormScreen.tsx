import SignUpTemplate from './SignUpTemplate';
import PersonalDataForm from '@/feature/PersonalDataForm';

export type PersonalDataFormScreenParams = undefined;

const PersonalDataFormScreen = () => (
  <SignUpTemplate>
    <PersonalDataForm />
  </SignUpTemplate>
);

export default PersonalDataFormScreen;
