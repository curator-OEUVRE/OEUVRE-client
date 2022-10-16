import { NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Screen } from '@/constants/screens';
import {
  AddPictureScreen,
  AddPictureScreenParams,
  PictureDescriptionScreen,
  PictureDescriptionScreenParams,
} from '@/screens/CreateFloorScreen';
import FloorInfoFormScreen, {
  FloorInfoFormScreenParams,
} from '@/screens/CreateFloorScreen/FloorInfoFormScreen';

export type FloorStackParamsList = {
  [Screen.AddPictureScreen]: NavigatorScreenParams<AddPictureScreenParams>;
  [Screen.PictureDescriptionScreen]: NavigatorScreenParams<PictureDescriptionScreenParams>;
  [Screen.FloorInfoFormScreen]: FloorInfoFormScreenParams;
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
    <Stack.Screen
      name={Screen.FloorInfoFormScreen}
      component={FloorInfoFormScreen}
    />
  </Stack.Navigator>
);

export default FloorStack;
