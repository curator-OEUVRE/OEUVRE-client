/* eslint-disable react-native/no-raw-text */
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MediaTypeOptions } from 'expo-image-picker';
import { useCallback, useEffect, useState } from 'react';
import { BackHandler, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PencilIcon from '@/assets/icons/Pencil';
import { Header } from '@/components/Header';
import { Spinner } from '@/components/Spinner';
import { Screen } from '@/constants/screens';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import FloorPictureList from '@/feature/FloorPictureList';
import { RootStackParamsList } from '@/feature/Routes';
import { FloorStackParamsList } from '@/feature/Routes/FloorStack';
import useUploadImage from '@/hooks/useUploadImage';
import { getColorByBackgroundColor } from '@/services/common/color';
import {
  createDefaultPictureInfo,
  getImagesFromLibrary,
} from '@/services/common/image';
import { useFloorStore } from '@/states/floorStore';

const styles = StyleSheet.create({
  confirmText: {
    color: COLOR.system.blue,
  },
  container: {
    backgroundColor: COLOR.mono.white,
    flex: 1,
  },
  title: {
    marginRight: 17,
  },
  wrapList: {
    flex: 1,
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
  const navigation = useNavigation<EditFloorScreenNP>();
  const { uploadImages } = useUploadImage();
  const { floor, setPictures, editFloor, fetchPictureDetail } = useFloorStore();
  const { pictures, color, name, floorNo } = floor;

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
        <Text style={[styles.confirmText, TEXT_STYLE.body16M]}>??????</Text>
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
        navigation.navigate(Screen.PictureDescriptionScreen);
      }
    },
    [navigation, pictures, setPictures],
  );

  const onPressPicture = async (pictureNo: number) => {
    const picture = pictures.find((p) => p.pictureNo === pictureNo);
    if (!picture) return;
    await fetchPictureDetail(pictureNo);
    navigation.navigate(Screen.EditDescriptionScreen, { pictureNo });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: color }]}>
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
          pictureAddable
        />
      </View>
      {loading && <Spinner />}
    </SafeAreaView>
  );
};

export default EditFloorScreen;
