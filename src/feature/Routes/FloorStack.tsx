import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { Screen } from '@/constants/screens';
import {
  EditFloorScreen,
  EditFloorScreenParams,
  FloorViewerScreen,
  FloorViewerScreenParams,
  HashtagFloorScreen,
  HashtagFloorScreenParams,
  AddHashtagScreen,
  AddHashtagScreenParams,
  FloorInfoFormScreen,
  FloorInfoFormScreenParams,
} from '@/screens/FloorScreen';
import FollowListScreen, {
  FollowListScreenParams,
} from '@/screens/FollowListScreen';
import GuestBookScreen, {
  GuestBookScreenParams,
} from '@/screens/GuestBookScreen';
import ImageDetailScreen, {
  ImageDetailScreenParams,
} from '@/screens/ImageDetailScreen';
import ProfileScreen, {
  type ProfileScreenParams,
} from '@/screens/ProfileScreen';
import { useFloorStore } from '@/states/floorStore';

export type FloorStackParamsList = {
  [Screen.AddHashtagScreen]: AddHashtagScreenParams;
  [Screen.FloorInfoFormScreen]: FloorInfoFormScreenParams;
  [Screen.FloorViewerScreen]: FloorViewerScreenParams;
  [Screen.ImageDetailScreen]: ImageDetailScreenParams;
  [Screen.EditFloorScreen]: EditFloorScreenParams;
  [Screen.ImageDetailScreen]: ImageDetailScreenParams;
  [Screen.GuestBookScreen]: GuestBookScreenParams;
  [Screen.ProfileScreen]: ProfileScreenParams;
  [Screen.FollowListScreen]: FollowListScreenParams;
  [Screen.HashtagFloorScreen]: HashtagFloorScreenParams;
};

const Stack = createSharedElementStackNavigator<FloorStackParamsList>();

const FloorStack = () => {
  const { swiperIndex } = useFloorStore();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={Screen.AddHashtagScreen}
        component={AddHashtagScreen}
      />
      <Stack.Screen
        name={Screen.FloorInfoFormScreen}
        component={FloorInfoFormScreen}
      />
      <Stack.Screen
        name={Screen.FloorViewerScreen}
        component={FloorViewerScreen}
        getId={({ params }) => `${params.floorNo}`}
      />
      <Stack.Screen
        name={Screen.ImageDetailScreen}
        component={ImageDetailScreen}
        sharedElements={(route) => [`picture.${swiperIndex}`]}
      />
      <Stack.Screen name={Screen.EditFloorScreen} component={EditFloorScreen} />
      <Stack.Screen
        name={Screen.GuestBookScreen}
        component={GuestBookScreen}
        getId={({ params }) => `${params.floorNo}`}
      />
      <Stack.Screen name={Screen.ProfileScreen} component={ProfileScreen} />
      <Stack.Screen
        name={Screen.FollowListScreen}
        component={FollowListScreen}
      />
      <Stack.Screen
        name={Screen.HashtagFloorScreen}
        component={HashtagFloorScreen}
      />
    </Stack.Navigator>
  );
};

export default FloorStack;
