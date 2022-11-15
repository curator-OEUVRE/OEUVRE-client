import { createStackNavigator } from '@react-navigation/stack';
import { Screen } from '@/constants/screens';
import ExplorationScreen, {
  ExplorationScreenParams,
} from '@/screens/ExplorationScreen';
import FollowListScreen, {
  FollowListScreenParams,
} from '@/screens/FollowListScreen';
import ProfileScreen, {
  type ProfileScreenParams,
} from '@/screens/ProfileScreen';
import SearchScreen, { SearchScreenParams } from '@/screens/SearchScreen';

export type ExplorationStackParamsList = {
  [Screen.ExplorationScreen]: ExplorationScreenParams;
  [Screen.SearchScreen]: SearchScreenParams;
  [Screen.ProfileScreen]: ProfileScreenParams;
  [Screen.FollowListScreen]: FollowListScreenParams;
};

const Stack = createStackNavigator<ExplorationStackParamsList>();

const ExplorationStack = () => (
  <Stack.Navigator
    initialRouteName={Screen.ExplorationScreen}
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name={Screen.ExplorationScreen}
      component={ExplorationScreen}
    />
    <Stack.Screen name={Screen.SearchScreen} component={SearchScreen} />
    <Stack.Screen name={Screen.ProfileScreen} component={ProfileScreen} />
    <Stack.Screen name={Screen.FollowListScreen} component={FollowListScreen} />
  </Stack.Navigator>
);

export default ExplorationStack;
