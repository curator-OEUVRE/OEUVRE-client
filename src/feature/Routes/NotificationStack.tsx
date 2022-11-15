import { createStackNavigator } from '@react-navigation/stack';
import { Screen } from '@/constants/screens';
import FollowListScreen, {
  FollowListScreenParams,
} from '@/screens/FollowListScreen';
import NotificationScreen, {
  type NotificationScreenParams,
} from '@/screens/NotificationScreen';
import ProfileScreen, {
  type ProfileScreenParams,
} from '@/screens/ProfileScreen';

export type NotificationStackParamsList = {
  [Screen.NotificationScreen]: NotificationScreenParams;
  [Screen.ProfileScreen]: ProfileScreenParams;
  [Screen.FollowListScreen]: FollowListScreenParams;
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
    <Stack.Screen name={Screen.FollowListScreen} component={FollowListScreen} />
  </Stack.Navigator>
);

export default NotificationStack;
