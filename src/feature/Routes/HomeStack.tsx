import { createStackNavigator } from '@react-navigation/stack';
import { Screen } from '@/constants/screens';
import HomeScreen, { type HomeScreenParams } from '@/screens/HomeScreen';
import ProfileScreen, {
  type ProfileScreenParams,
} from '@/screens/ProfileScreen';

export type HomeStackParamsList = {
  [Screen.HomeScreen]: HomeScreenParams;
  [Screen.ProfileScreen]: ProfileScreenParams;
};

const Stack = createStackNavigator<HomeStackParamsList>();

const HomeStack = () => (
  <Stack.Navigator
    initialRouteName={Screen.HomeScreen}
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name={Screen.HomeScreen} component={HomeScreen} />
    <Stack.Screen name={Screen.ProfileScreen} component={ProfileScreen} />
  </Stack.Navigator>
);

export default HomeStack;
