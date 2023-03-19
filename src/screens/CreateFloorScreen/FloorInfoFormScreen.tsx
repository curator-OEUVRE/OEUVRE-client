import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useEffect, useState } from 'react';
import { BackHandler, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Spinner } from '@/components/Spinner';
import { Navigator, Screen } from '@/constants/screens';
import FloorInfoForm from '@/feature/FloorInfoForm';
import { RootStackParamsList } from '@/feature/Routes';
import { CreateFloorStackParamsList } from '@/feature/Routes/CreateFloorStack';
import SuccessModal from '@/feature/SuccessModal';
import useUploadImage from '@/hooks/useUploadImage';
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
    description,
    // texture,
    // setTexture,
    isPublic,
    isCommentAvailable,
    setFloorInfo,
    setPictures,
    createFloor,
    pictures,
    gradient,
    alignment,
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

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newFloorNo, setNewFloorNo] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const { uploadImages } = useUploadImage();

  const onConfirm = useCallback(
    async (floorInfo: Partial<FloorInfo>) => {
      setFloorInfo(floorInfo);
      const images = pictures.map((picture) => picture.imageUrl);
      setLoading(true);
      const urls = await uploadImages(images, name);
      const newPictures = pictures.map((picture, idx) => ({
        ...picture,
        imageUrl: urls[idx],
        queue: idx + 1,
      }));
      setPictures(newPictures);
      const result = await createFloor();
      setLoading(false);
      if (result.isSuccess) {
        setNewFloorNo(result.result.result.floorNo);
        setModalVisible(true);
      }
    },
    [createFloor, name, pictures, setPictures, uploadImages, setFloorInfo],
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
        <FloorInfoForm
          {...{
            name,
            color,
            description,
            isCommentAvailable,
            isPublic,
            onConfirm,
            gradient,
            alignment,
            title: '플로어 추가',
            confirmText: '완료',
          }}
        />
        {modalVisible && (
          <SuccessModal
            onPress={() => {
              setModalVisible(false);
              if (!newFloorNo) return;
              navigation.replace(Navigator.FloorStack, {
                screen: Screen.FloorViewerScreen,
                params: {
                  floorNo: newFloorNo,
                },
              });
            }}
          />
        )}
        {loading && <Spinner />}
      </>
    </TouchableWithoutFeedback>
  );
};

export default FloorInfoFormScreen;
