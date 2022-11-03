import { createStackNavigator } from '@react-navigation/stack';
import { Screen } from '@/constants/screens';
import MyProfileScreen, {
  type MyProfileScreenParams,
} from '@/screens/ProfileScreen/MyProfileScreen';

export type ProfileStackParamsList = {
  [Screen.MyProfileScreen]: MyProfileScreenParams;
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
  </Stack.Navigator>
);

export default ProfileStack;
