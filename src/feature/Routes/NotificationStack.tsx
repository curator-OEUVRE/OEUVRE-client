import { createStackNavigator } from '@react-navigation/stack';
import { Screen } from '@/constants/screens';
import NotificationScreen, {
  type NotificationScreenParams,
} from '@/screens/NotificationScreen';
import ProfileScreen, {
  type ProfileScreenParams,
} from '@/screens/ProfileScreen';

export type NotificationStackParamsList = {
  [Screen.NotificationScreen]: NotificationScreenParams;
  [Screen.ProfileScreen]: ProfileScreenParams;
};

const Stack = createStackNavigator<NotificationStackParamsList>();

const NotificationStack = () => (
  <Stack.Navigator
    initialRouteName={Screen.NotificationScreen}
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name={Screen.NotificationScreen}
      component={NotificationScreen}
    />
    <Stack.Screen
      name={Screen.ProfileScreen}
      component={ProfileScreen}
      getId={({ params }) => `${params.userNo}`}
    />
  </Stack.Navigator>
);

export default NotificationStack;
