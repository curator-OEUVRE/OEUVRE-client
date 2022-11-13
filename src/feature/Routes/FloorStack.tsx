import type { NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileStack, { type ProfileStackParamsList } from './ProfileStack';
import { Navigator, Screen } from '@/constants/screens';
import {
  AddPictureScreen,
  AddPictureScreenParams,
  PictureDescriptionScreen,
  PictureDescriptionScreenParams,
  AddHashtagScreen,
  AddHashtagScreenParams,
} from '@/screens/CreateFloorScreen';
import FloorInfoFormScreen, {
  FloorInfoFormScreenParams,
} from '@/screens/CreateFloorScreen/FloorInfoFormScreen';
import {
  EditFloorScreen,
  EditFloorScreenParams,
  FloorViewerScreen,
  FloorViewerScreenParams,
  EditDescriptionScreen,
  EditDescriptionScreenParams,
  HashtagFloorScreen,
  HashtagFloorScreenParams,
} from '@/screens/FloorScreen';
import GuestBookScreen, {
  GuestBookScreenParams,
} from '@/screens/GuestBookScreen';
import ImageDetailScreen, {
  ImageDetailScreenParams,
} from '@/screens/ImageDetailScreen';

export type FloorStackParamsList = {
  [Screen.AddPictureScreen]: AddPictureScreenParams;
  [Screen.PictureDescriptionScreen]: PictureDescriptionScreenParams;
  [Screen.AddHashtagScreen]: AddHashtagScreenParams;
  [Screen.FloorInfoFormScreen]: FloorInfoFormScreenParams;
  [Screen.FloorViewerScreen]: FloorViewerScreenParams;
  [Screen.ImageDetailScreen]: ImageDetailScreenParams;
  [Screen.EditFloorScreen]: EditFloorScreenParams;
  [Screen.ImageDetailScreen]: ImageDetailScreenParams;
  [Screen.GuestBookScreen]: GuestBookScreenParams;
  [Navigator.ProfileStack]: NavigatorScreenParams<ProfileStackParamsList>;
  [Screen.EditDescriptionScreen]: EditDescriptionScreenParams;
  [Screen.HashtagFloorScreen]: HashtagFloorScreenParams;
};

const Stack = createStackNavigator<FloorStackParamsList>();

const FloorStack = () => (
  <Stack.Navigator
    initialRouteName={Screen.AddPictureScreen}
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name={Screen.AddPictureScreen} component={AddPictureScreen} />
    <Stack.Screen
      name={Screen.PictureDescriptionScreen}
      component={PictureDescriptionScreen}
    />
    <Stack.Screen name={Screen.AddHashtagScreen} component={AddHashtagScreen} />
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
      getId={({ params }) => `${params.pictureNo}`}
    />
    <Stack.Screen name={Screen.EditFloorScreen} component={EditFloorScreen} />
    <Stack.Screen
      name={Screen.GuestBookScreen}
      component={GuestBookScreen}
      getId={({ params }) => `${params.floorNo}`}
    />
    <Stack.Screen name={Navigator.ProfileStack} component={ProfileStack} />
    <Stack.Screen
      name={Screen.EditDescriptionScreen}
      component={EditDescriptionScreen}
    />
    <Stack.Screen
      name={Screen.HashtagFloorScreen}
      component={HashtagFloorScreen}
    />
  </Stack.Navigator>
);

export default FloorStack;
