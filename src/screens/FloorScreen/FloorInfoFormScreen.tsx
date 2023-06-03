import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useEffect, useState } from 'react';
import {
  BackHandler,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';
import { Screen } from '@/constants/screens';
import FloorInfoForm from '@/feature/FloorInfoForm';
import MainImageSelectModal from '@/feature/MainImageSelectModal';
import { RootStackParamsList } from '@/feature/Routes';
import { FloorStackParamsList } from '@/feature/Routes/FloorStack';
import { useFloorStore } from '@/states/floorStore';
import { FloorInfo } from '@/types/floor';
import { Picture } from '@/types/picture';

export type FloorInfoFormScreenParams = undefined;
export type FloorInfoFormScreenNP = CompositeNavigationProp<
  StackNavigationProp<FloorStackParamsList, Screen.FloorInfoFormScreen>,
  StackNavigationProp<RootStackParamsList>
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const FloorInfoFormScreen = () => {
  const { floor, setFloorInfo, setThumbnailNo } = useFloorStore();
  const {
    color,
    description,
    name,
    isCommentAvailable,
    isPublic,
    pictures,
    gradient,
    alignment,
    thumbnailNo,
  } = floor;
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [info, setInfo] = useState<Partial<FloorInfo>>();
  const navigation = useNavigation<FloorInfoFormScreenNP>();

  const onComplete = useCallback(
    (picture: Picture) => {
      if (info) setFloorInfo(info);
      setThumbnailNo(picture.pictureNo);
      navigation.navigate(Screen.EditFloorScreen);
    },
    [setFloorInfo, navigation, info, setThumbnailNo],
  );

  const thumbnail = pictures.find((p) => p.pictureNo === thumbnailNo);

  // for edit mode
  const onPressNext = useCallback((floorInfo: Partial<FloorInfo>) => {
    setModalVisible(true);
    setInfo(floorInfo);
  }, []);

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
      <View style={styles.container}>
        <FloorInfoForm
          {...{
            name,
            description,
            color,
            isCommentAvailable,
            isPublic,
            gradient,
            alignment,
            onConfirm: onPressNext,
            title: '플로어 편집',
            confirmText: '다음',
          }}
        />
        <MainImageSelectModal
          visible={modalVisible}
          setVisible={setModalVisible}
          pictures={pictures}
          onComplete={onComplete}
          headerTitle="대표 작품 선택"
          headerRightText="완료"
          initialPicture={thumbnail}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FloorInfoFormScreen;
