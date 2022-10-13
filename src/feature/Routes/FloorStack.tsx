import { NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Screen } from '@/constants/screens';
import {
  AddPictureScreen,
  AddPictureScreenParams,
  PictureDescriptionScreen,
  PictureDescriptionScreenParams,
} from '@/screens/CreateFloorScreen';

export type FloorStackParamsList = {
  [Screen.AddPictureScreen]: NavigatorScreenParams<AddPictureScreenParams>;
  [Screen.PictureDescriptionScreen]: NavigatorScreenParams<PictureDescriptionScreenParams>;
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
  </Stack.Navigator>
);

export default FloorStack;
