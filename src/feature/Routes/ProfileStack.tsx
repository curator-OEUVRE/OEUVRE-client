import { createStackNavigator } from '@react-navigation/stack';
import { Screen } from '@/constants/screens';
import EditProfileScreen, {
  type EditProfileScreenParams,
} from '@/screens/EditProfileScreen';
import MyProfileScreen, {
  type MyProfileScreenParams,
} from '@/screens/ProfileScreen/MyProfileScreen';

export type ProfileStackParamsList = {
  [Screen.MyProfileScreen]: MyProfileScreenParams;
  [Screen.EditProfileScreen]: EditProfileScreenParams;
};

const Stack = createStackNavigator<ProfileStackParamsList>();

const ProfileStack = () => (
  <Stack.Navigator
    initialRouteName={Screen.MyProfileScreen}
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name={Screen.MyProfileScreen} component={MyProfileScreen} />
    <Stack.Screen
      name={Screen.EditProfileScreen}
      component={EditProfileScreen}
    />
  </Stack.Navigator>
);

export default ProfileStack;
