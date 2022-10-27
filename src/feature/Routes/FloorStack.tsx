import { createStackNavigator } from '@react-navigation/stack';
import { Screen } from '@/constants/screens';
import {
  AddPictureScreen,
  AddPictureScreenParams,
  PictureDescriptionScreen,
  PictureDescriptionScreenParams,
  AddHashtagScreen,
  AddHashtagScreenParams,
  CreateFloorScreen,
  CreateFloorScreenParams,
} from '@/screens/CreateFloorScreen';
import FloorInfoFormScreen, {
  FloorInfoFormScreenParams,
} from '@/screens/CreateFloorScreen/FloorInfoFormScreen';
import FloorScreen, { FloorScreenParams } from '@/screens/FloorScreen';
import ImageDetailScreen, {
  ImageDetailScreenParams,
} from '@/screens/ImageDetailScreen';

export type FloorStackParamsList = {
  [Screen.AddPictureScreen]: AddPictureScreenParams;
  [Screen.PictureDescriptionScreen]: PictureDescriptionScreenParams;
  [Screen.AddHashtagScreen]: AddHashtagScreenParams;
  [Screen.FloorInfoFormScreen]: FloorInfoFormScreenParams;
  [Screen.FloorScreen]: FloorScreenParams;
  [Screen.CreateFloorScreen]: CreateFloorScreenParams;
  [Screen.ImageDetailScreen]: ImageDetailScreenParams;
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
    <Stack.Screen name={Screen.FloorScreen} component={FloorScreen} />
    <Stack.Screen
      name={Screen.CreateFloorScreen}
      component={CreateFloorScreen}
    />
    <Stack.Screen
      name={Screen.ImageDetailScreen}
      component={ImageDetailScreen}
    />
  </Stack.Navigator>
);

export default FloorStack;
