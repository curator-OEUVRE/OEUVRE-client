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
import { CreateFloorStackParamsList } from '@/feature/Routes/CreateFloorStack';
import { useCreateFloorStore } from '@/states/createFloorStore';
import { FloorInfo } from '@/types/floor';

export type FloorInfoFormScreenParams = undefined;
export type FloorInfoFormScreenNP = CompositeNavigationProp<
  StackNavigationProp<CreateFloorStackParamsList, Screen.FloorInfoFormScreen>,
  StackNavigationProp<RootStackParamsList>
>;

const FloorInfoFormScreen = () => {
  const {
    name,
    color,
    // texture,
    // setTexture,
    isPublic,
    isCommentAvailable,
    setFloorInfo,
  } = useCreateFloorStore();
  const navigation = useNavigation<FloorInfoFormScreenNP>();
  // for edit mode

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

  const onConfirm = useCallback(
    (floorInfo: FloorInfo) => {
      setFloorInfo(floorInfo);
      navigation.navigate(Screen.EditFloorScreen);
    },
    [setFloorInfo, navigation],
  );
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <FloorInfoForm
        {...{
          color,
          name,
          isCommentAvailable,
          isPublic,
          onConfirm,
          title: '플로어 추가',
          confirmText: '다음',
        }}
      />
    </TouchableWithoutFeedback>
  );
};

export default FloorInfoFormScreen;
