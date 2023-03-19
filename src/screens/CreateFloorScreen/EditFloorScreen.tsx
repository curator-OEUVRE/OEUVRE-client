/* eslint-disable react-native/no-raw-text */
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Asset } from 'expo-media-library';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BackHandler, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { Screen } from '@/constants/screens';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import FloorPictureList from '@/feature/FloorPictureList';
import FloorSettingButtonList from '@/feature/FloorSettingButtonList';
import ImagePickerModal from '@/feature/ImagePickerModal';
import PictureInfoModal, {
  PictureInfoModalValue,
} from '@/feature/PictureInfoModal';
import { RootStackParamsList } from '@/feature/Routes';
import { CreateFloorStackParamsList } from '@/feature/Routes/CreateFloorStack';
import {
  getBackgroundColorsByGradient,
  getColorByBackgroundColor,
} from '@/services/common/color';
import { createDefaultPictureInfo } from '@/services/common/image';
import { useCreateFloorStore } from '@/states/createFloorStore';
import { Picture } from '@/types/picture';

const styles = StyleSheet.create({
  confirmText: {
    color: COLOR.system.blue,
  },
  container: {
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    marginBottom: 21,
    width: '100%',
  },
  wrapList: {
    flex: 1,
  },
});

export type EditFloorScreenParams = undefined;
export type EditFloorScreenNP = CompositeNavigationProp<
  StackNavigationProp<CreateFloorStackParamsList, Screen.EditFloorScreen>,
  StackNavigationProp<RootStackParamsList>
>;

export type EditFloorScreenRP = RouteProp<
  CreateFloorStackParamsList,
  Screen.EditFloorScreen
>;

const EditFloorScreen = () => {
  const navigation = useNavigation<EditFloorScreenNP>();
  const { pictures, setPictures, color, gradient, alignment, setFloorInfo } =
    useCreateFloorStore();
  const [imagePickerModalVisible, setImagePickerModalVisible] =
    useState<boolean>(false);
  const [pictureInfoModalVisible, setPictureInfoModalVisible] =
    useState<boolean>(false);
  const addPoint = useRef<number>(-1);
  const [selectedPicture, selectPicture] = useState<Picture>();

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

  const onConfirm = useCallback(() => {
    navigation.navigate(Screen.FloorInfoFormScreen);
  }, [navigation]);

  const iconColorByBackground = getColorByBackgroundColor(color);
  const textColorByBackground = getColorByBackgroundColor(color, {
    dark: COLOR.mono.gray5,
  });

  const ConfirmButton = useCallback(
    () => (
      <Pressable onPress={onConfirm}>
        <Text style={[styles.confirmText, TEXT_STYLE.body16M]}>다음</Text>
      </Pressable>
    ),
    [onConfirm],
  );

  const addPictures = useCallback((index: number) => {
    setImagePickerModalVisible(true);
    addPoint.current = index;
  }, []);

  const onPickImagesComplete = useCallback(
    (images: Asset[]) => {
      if (addPoint.current === -1) return;
      const imageUrls = images.map((image) => ({
        imageUrl: image.uri,
        width: (image.width * 0.5) / image.height,
        height: 0.5,
      }));
      setPictures([
        ...pictures.slice(0, addPoint.current + 1),
        ...imageUrls.map((info) => createDefaultPictureInfo(info)),
        ...pictures.slice(addPoint.current + 1),
      ]);
      addPoint.current = -1;
    },
    [pictures, setPictures],
  );

  const onPictureInfoComplete = useCallback(
    (value: PictureInfoModalValue) => {
      const newPictures = pictures.map((picture) => {
        if (picture.imageUrl !== selectedPicture?.imageUrl) return picture;
        return { ...picture, ...value };
      });
      setPictures(newPictures);
    },
    [pictures, selectedPicture, setPictures],
  );

  const onGoBack = useCallback(() => {
    selectPicture(undefined);
  }, []);

  const onPressPicture = useCallback((picture: Picture) => {
    selectPicture(picture);
    setPictureInfoModalVisible(true);
  }, []);

  return (
    <LinearGradient
      style={styles.container}
      colors={getBackgroundColorsByGradient({ color, gradient })}
    >
      <SafeAreaView style={styles.container}>
        <Header
          headerTitle="플로어 추가"
          headerRight={ConfirmButton}
          backgroundColor="transparent"
          iconColor={iconColorByBackground}
        />
        <View style={styles.wrapList}>
          <FloorPictureList
            pictures={pictures}
            editable
            setPictures={setPictures}
            addPictures={addPictures}
            color={textColorByBackground}
            onPressPicture={onPressPicture}
          />
        </View>
        <ImagePickerModal
          visible={imagePickerModalVisible}
          setVisible={setImagePickerModalVisible}
          headerRightText="다음"
          headerTitle="플로어 추가"
          onComplete={onPickImagesComplete}
        />
        <View style={styles.footer}>
          <FloorSettingButtonList
            color={color}
            isFramed={false}
            gradient={gradient}
            alignment={alignment}
            onChange={(setting) => {
              setFloorInfo({ ...setting });
            }}
          />
        </View>
        {selectedPicture && (
          <PictureInfoModal
            visible={pictureInfoModalVisible}
            headerTitle="작품 설명 추가"
            headerRightText="완료"
            setVisible={setPictureInfoModalVisible}
            onComplete={onPictureInfoComplete}
            onGoBack={onGoBack}
            {...selectedPicture}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default EditFloorScreen;
