/* eslint-disable react-native/no-raw-text */
import {
  CompositeNavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MediaTypeOptions } from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { lockAsync, OrientationLock } from 'expo-screen-orientation';
import { useCallback, useEffect, useState } from 'react';
import { BackHandler, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PencilIcon from '@/assets/icons/Pencil';
import { Header } from '@/components/Header';
import { Spinner } from '@/components/Spinner';
import { Screen } from '@/constants/screens';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import FloorPictureList from '@/feature/FloorPictureList';
import FloorSettingButtonList from '@/feature/FloorSettingButtonList';
import PictureInfoModal, {
  PictureInfoModalValue,
} from '@/feature/PictureInfoModal';
import RotateButton from '@/feature/RotateButton';
import { RootStackParamsList } from '@/feature/Routes';
import { FloorStackParamsList } from '@/feature/Routes/FloorStack';
import useUploadImage from '@/hooks/useUploadImage';
import {
  getBackgroundColorsByGradient,
  getColorByBackgroundColor,
} from '@/services/common/color';
import {
  createDefaultPictureInfo,
  getImagesFromLibrary,
} from '@/services/common/image';
import { useFloorStore } from '@/states/floorStore';
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
    height: 100,
    marginBottom: 21,
    paddingTop: 8,
    width: '100%',
  },
  title: {
    marginRight: 17,
  },
  wrapList: {
    flex: 1,
    justifyContent: 'center',
  },
  wrapTitle: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export type EditFloorScreenParams = undefined;
export type EditFloorScreenNP = CompositeNavigationProp<
  StackNavigationProp<FloorStackParamsList, Screen.EditFloorScreen>,
  StackNavigationProp<RootStackParamsList>
>;

export type EditFloorScreenRP = RouteProp<
  FloorStackParamsList,
  Screen.EditFloorScreen
>;

const EditFloorScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPicture, selectPicture] = useState<Picture>();
  const [pictureInfoModalVisible, setPictureInfoModalVisible] =
    useState<boolean>(false);
  const navigation = useNavigation<EditFloorScreenNP>();
  const { uploadImages } = useUploadImage();
  const { floor, setPictures, editFloor, setFloor } = useFloorStore();
  const { pictures, color, name, floorNo, alignment, gradient } = floor;

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

  useFocusEffect(
    useCallback(() => () => lockAsync(OrientationLock.PORTRAIT_UP), []),
  );

  const onConfirm = useCallback(async () => {
    if (!floorNo) return;
    const newImages = pictures.filter((picture) => picture.pictureNo === 0);
    const images = newImages.map((picture) => picture.imageUrl);
    setLoading(true);
    const urls = await uploadImages(images, name);
    let idx = 0;
    const newPictures = pictures.map((picture, i) => {
      if (picture.pictureNo > 0)
        return {
          ...picture,
          queue: i + 1,
        };
      return {
        ...picture,
        // eslint-disable-next-line no-plusplus
        imageUrl: urls[idx++],
        queue: i + 1,
      };
    });
    setPictures(newPictures);
    await editFloor(floorNo);
    setLoading(false);
    // eslint-disable-next-line no-console
    navigation.navigate(Screen.FloorViewerScreen, {
      floorNo,
    });
  }, [
    name,
    pictures,
    setPictures,
    uploadImages,
    editFloor,
    navigation,
    floorNo,
  ]);
  const iconColorByBackground = getColorByBackgroundColor(color);
  const textColorByBackground = getColorByBackgroundColor(color, {
    dark: COLOR.mono.gray5,
  });
  const ConfirmButton = useCallback(
    () => (
      <Pressable onPress={onConfirm}>
        <Text style={[styles.confirmText, TEXT_STYLE.body16M]}>완료</Text>
      </Pressable>
    ),
    [onConfirm],
  );
  const headerTitle = () => (
    <Pressable
      style={styles.wrapTitle}
      onPress={async () => {
        navigation.navigate(Screen.FloorInfoFormScreen);
      }}
    >
      <Text
        style={[
          styles.title,
          TEXT_STYLE.body16M,
          { color: iconColorByBackground },
        ]}
      >
        {name}
      </Text>
      <PencilIcon color={iconColorByBackground} />
    </Pressable>
  );
  const addPictures = useCallback(
    async (index: number) => {
      const [result, canUpload] = await getImagesFromLibrary({
        mediaTypes: MediaTypeOptions.Images,
      });
      if (result && canUpload) {
        const imageUrls = result?.map((imageInfo) => ({
          imageUrl: imageInfo.uri,
          width: (imageInfo.width * 0.5) / imageInfo.height,
          height: 0.5,
        }));
        setPictures([
          ...pictures.slice(0, index),
          ...imageUrls.map((info) => createDefaultPictureInfo(info)),
          ...pictures.slice(index),
        ]);
      }
    },
    [pictures, setPictures],
  );

  const onPressPicture = useCallback((picture: Picture) => {
    selectPicture(picture);
    setPictureInfoModalVisible(true);
  }, []);

  const onPressDelete = useCallback(
    (picture: Picture) => {
      setPictures(pictures.filter((p) => picture.pictureNo !== p.pictureNo));
    },
    [setPictures, pictures],
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

  const onPinchEnd = useCallback(
    (index: number, scale: number) => {
      setPictures((prev) =>
        prev.map((picture, idx) =>
          index === idx
            ? {
                ...picture,
                width: picture.width * scale,
                height: picture.height * scale,
              }
            : picture,
        ),
      );
    },
    [setPictures],
  );

  return (
    <LinearGradient
      style={styles.container}
      colors={getBackgroundColorsByGradient({
        backgroundColor: color,
        gradient,
      })}
    >
      <SafeAreaView style={styles.container} edges={['top']}>
        <Header
          headerTitle={headerTitle}
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
            onPressPicture={onPressPicture}
            color={textColorByBackground}
            onPressDelete={onPressDelete}
            pictureAddable
            onPinchEnd={onPinchEnd}
            alignment={alignment}
          />
        </View>
        <View style={styles.footer}>
          <FloorSettingButtonList
            color={color}
            isFramed={false}
            gradient={gradient}
            alignment={alignment}
            onChange={(setting) => {
              setFloor({ ...floor, ...setting });
            }}
          />
          <RotateButton />
        </View>
        {loading && <Spinner />}
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
