import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useEffect } from 'react';
import { BackHandler, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Screen } from '@/constants/screens';
import FloorInfoForm from '@/feature/FloorInfoForm';
import { RootStackParamsList } from '@/feature/Routes';
import { FloorStackParamsList } from '@/feature/Routes/FloorStack';
import { useFloorStore } from '@/states/floorStore';
import { FloorInfo } from '@/types/floor';

export type FloorInfoFormScreenParams = undefined;
export type FloorInfoFormScreenNP = CompositeNavigationProp<
  StackNavigationProp<FloorStackParamsList, Screen.FloorInfoFormScreen>,
  StackNavigationProp<RootStackParamsList>
>;

const FloorInfoFormScreen = () => {
  const { floor, setFloorInfo } = useFloorStore();
  const { color, description, name, isCommentAvailable, isPublic } = floor;
  const navigation = useNavigation<FloorInfoFormScreenNP>();
  // for edit mode
  const onConfirm = useCallback(
    (floorInfo: Partial<FloorInfo>) => {
      setFloorInfo(floorInfo);
      navigation.navigate(Screen.EditFloorScreen);
    },
    [setFloorInfo, navigation],
  );

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <FloorInfoForm
        {...{
          name,
          description,
          color,
          isCommentAvailable,
          isPublic,
          onConfirm,
          title: '플로어 편집',
          confirmText: '완료',
        }}
      />
    </TouchableWithoutFeedback>
  );
};

export default FloorInfoFormScreen;
