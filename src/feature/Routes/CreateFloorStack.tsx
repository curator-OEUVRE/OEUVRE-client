import { createStackNavigator } from '@react-navigation/stack';
import { Screen } from '@/constants/screens';
import {
  AddHashtagScreen,
  AddHashtagScreenParams,
  FloorInfoFormScreen,
  FloorInfoFormScreenParams,
  EditFloorScreen,
  EditFloorScreenParams,
} from '@/screens/CreateFloorScreen';

export type CreateFloorStackParamsList = {
  [Screen.AddHashtagScreen]: AddHashtagScreenParams;
  [Screen.FloorInfoFormScreen]: FloorInfoFormScreenParams;
  [Screen.EditFloorScreen]: EditFloorScreenParams;
};

const Stack = createStackNavigator<CreateFloorStackParamsList>();

const CreateFloorStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name={Screen.AddHashtagScreen} component={AddHashtagScreen} />
    <Stack.Screen
      name={Screen.FloorInfoFormScreen}
      component={FloorInfoFormScreen}
    />
    <Stack.Screen name={Screen.EditFloorScreen} component={EditFloorScreen} />
  </Stack.Navigator>
);

export default CreateFloorStack;
