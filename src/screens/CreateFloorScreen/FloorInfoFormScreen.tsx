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
import MainImageSelectModal from '@/feature/MainImageSelectModal';
import { RootStackParamsList } from '@/feature/Routes';
import { CreateFloorStackParamsList } from '@/feature/Routes/CreateFloorStack';
import SuccessModal from '@/feature/SuccessModal';
import useUploadImage from '@/hooks/useUploadImage';
import { useCreateFloorStore } from '@/states/createFloorStore';
import { useHomeStore } from '@/states/homeStore';
import { FloorInfo } from '@/types/floor';
import { Picture } from '@/types/picture';

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
    setThumbnailIndex,
  } = useCreateFloorStore();
  const { initHomeStore } = useHomeStore();
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

  const [successModalVisible, setSuccessModalVisible] =
    useState<boolean>(false);
  const [selectModalVisible, setSelectModalVisible] = useState<boolean>(false);
  const [info, setInfo] = useState<Partial<FloorInfo>>();

  const [newFloorNo, setNewFloorNo] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const { uploadImages } = useUploadImage();

  const onComplete = useCallback(
    async (thumbPicture: Picture) => {
      if (info) setFloorInfo(info);
      const selectedIndex = pictures.findIndex(
        (picture) => picture.imageUrl === thumbPicture.imageUrl,
      );
      if (selectedIndex >= 0) setThumbnailIndex(selectedIndex);
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
        setSuccessModalVisible(true);
      } else {
        console.log(result.result.errorMessage);
      }
    },
    [
      createFloor,
      name,
      pictures,
      setPictures,
      uploadImages,
      setFloorInfo,
      info,
      setThumbnailIndex,
    ],
  );

  const onPressNext = useCallback(async (floorInfo: Partial<FloorInfo>) => {
    setSelectModalVisible(true);
    setInfo(floorInfo);
  }, []);

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
            gradient,
            alignment,
            onConfirm: onPressNext,
            title: '플로어 추가',
            confirmText: '다음',
          }}
        />
        <MainImageSelectModal
          visible={selectModalVisible}
          setVisible={setSelectModalVisible}
          pictures={pictures}
          onComplete={onComplete}
          headerTitle="플로어 추가"
          headerRightText="완료"
        />
        {successModalVisible && (
          <SuccessModal
            onPress={() => {
              setSuccessModalVisible(false);
              if (!newFloorNo) return;
              initHomeStore();
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
