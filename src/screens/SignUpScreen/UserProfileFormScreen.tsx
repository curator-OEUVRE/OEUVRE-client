import SignUpTemplate from './SignUpTemplate';
import UserProfileForm from '@/feature/UserProfileForm';

export type UserProfileFormScreenParams = undefined;

const UserProfileFormScreen = () => (
  <SignUpTemplate>
    <UserProfileForm />
  </SignUpTemplate>
);

export default UserProfileFormScreen;
