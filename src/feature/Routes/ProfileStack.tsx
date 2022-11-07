import { createStackNavigator } from '@react-navigation/stack';
import { Screen } from '@/constants/screens';
import EditProfileScreen, {
  type EditProfileScreenParams,
} from '@/screens/EditProfileScreen';
import MyProfileScreen, {
  type MyProfileScreenParams,
} from '@/screens/ProfileScreen/MyProfileScreen';
import SettingScreen, {
  type SettingScreenParams,
} from '@/screens/SettingScreen';

export type ProfileStackParamsList = {
  [Screen.MyProfileScreen]: MyProfileScreenParams;
  [Screen.EditProfileScreen]: EditProfileScreenParams;
  [Screen.SettingScreen]: SettingScreenParams;
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
    <Stack.Screen name={Screen.SettingScreen} component={SettingScreen} />
  </Stack.Navigator>
);

export default ProfileStack;
