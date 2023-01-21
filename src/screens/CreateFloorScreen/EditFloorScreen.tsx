/* eslint-disable react-native/no-raw-text */
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Asset } from 'expo-media-library';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BackHandler, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { Screen } from '@/constants/screens';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import FloorPictureList from '@/feature/FloorPictureList';
import ImagePickerModal from '@/feature/ImagePickerModal';
import { RootStackParamsList } from '@/feature/Routes';
import { CreateFloorStackParamsList } from '@/feature/Routes/CreateFloorStack';
import { getColorByBackgroundColor } from '@/services/common/color';
import { createDefaultPictureInfo } from '@/services/common/image';
import { useCreateFloorStore } from '@/states/createFloorStore';

const styles = StyleSheet.create({
  confirmText: {
    color: COLOR.system.blue,
  },
  container: {
    backgroundColor: COLOR.mono.white,
    flex: 1,
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
  const { pictures, setPictures, color } = useCreateFloorStore();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const addPoint = useRef<number>(-1);

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
    navigation.navigate(Screen.PictureDescriptionScreen);
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
    setModalVisible(true);
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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: color }]}>
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
        />
      </View>
      <ImagePickerModal
        visible={modalVisible}
        setVisible={setModalVisible}
        headerRightText="다음"
        headerTitle="플로어 추가"
        onComplete={onPickImagesComplete}
      />
    </SafeAreaView>
  );
};

export default EditFloorScreen;
