/* eslint-disable react-native/no-raw-text */
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BlurView } from 'expo-blur';
import { lockAsync, OrientationLock } from 'expo-screen-orientation';
import { useCallback, useLayoutEffect, useState } from 'react';
import { Pressable, StyleSheet, View, Modal, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PencilIcon from '@/assets/icons/Pencil';
import { Header } from '@/components/Header';
import { IMAGE } from '@/constants/images';
import { Screen } from '@/constants/screens';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import FloorPictureList from '@/feature/FloorPictureList';
import { RootStackParamsList } from '@/feature/Routes';
import { FloorStackParamsList } from '@/feature/Routes/FloorStack';
import useUploadImage from '@/hooks/useUploadImage';
import { useCreateFloorStore } from '@/states/createFloorStore';

const styles = StyleSheet.create({
  check: {
    height: 100,
    width: 100,
  },
  confirmText: {
    color: COLOR.system.blue,
  },
  container: {
    backgroundColor: COLOR.mono.white,
    flex: 1,
  },
  pressable: {
    flex: 1,
  },
  text: {
    color: COLOR.mono.black,
    textAlign: 'center',
  },
  title: {
    color: COLOR.mono.black,
    marginRight: 17,
  },
  wrapList: {
    flex: 1,
  },
  wrapModal: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  wrapTitle: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export type EditFloorScreenParams =
  | {
      floorNo: number;
    }
  | undefined;
export type EditFloorScreenNP = CompositeNavigationProp<
  StackNavigationProp<FloorStackParamsList, Screen.EditFloorScreen>,
  StackNavigationProp<RootStackParamsList>
>;

interface SuccessModalProps {
  onPress: () => void;
}

const SuccessModal = ({ onPress }: SuccessModalProps) => (
  <Modal transparent animationType="fade">
    <Pressable onPress={() => onPress()} style={styles.pressable}>
      <BlurView intensity={100} tint="light" style={styles.wrapModal}>
        <Image source={IMAGE.check} style={styles.check} />
        <Text style={[styles.text, TEXT_STYLE.title20M]}>
          축하드려요, {'\n'}
          <Text style={TEXT_STYLE.title20B}>새로운 플로우가</Text>
          오픈했어요!
        </Text>
      </BlurView>
    </Pressable>
  </Modal>
);

const EditFloorScreen = () => {
  useLayoutEffect(() => {
    lockAsync(OrientationLock.LANDSCAPE);
    return () => {
      lockAsync(OrientationLock.DEFAULT);
    };
  }, []);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const navigation = useNavigation<EditFloorScreenNP>();
  const { uploadImages } = useUploadImage();
  const { pictures, setPictures, color, name, createFloor, isEditMode } =
    useCreateFloorStore();

  const onConfirm = useCallback(async () => {
    const images = pictures.map((picture) => picture.imageUrl);
    const urls = await uploadImages(images, name.value);
    const newPictures = pictures.map((picture, i) => ({
      ...picture,
      imageUrl: urls[i],
      queue: i + 1,
    }));
    setPictures(newPictures);
    const result = await createFloor();
    setModalVisible(true);
  }, [createFloor, name.value, pictures, setPictures, uploadImages]);

  const ConfirmButton = useCallback(
    () => (
      <Pressable onPress={onConfirm}>
        <Text style={[styles.confirmText, TEXT_STYLE.body16M]}>완료</Text>
      </Pressable>
    ),
    [onConfirm],
  );
  const headerTitle = isEditMode
    ? () => (
        <Pressable
          style={styles.wrapTitle}
          onPress={() => navigation.navigate(Screen.FloorInfoFormScreen)}
        >
          <Text style={[styles.title, TEXT_STYLE.body16M]}>{name.value}</Text>
          <PencilIcon color={COLOR.mono.black} />
        </Pressable>
      )
    : '플로어 추가';
  const addPictures = useCallback(() => {
    navigation.navigate(Screen.AddPictureScreen);
  }, [navigation]);
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: color }]}>
      <Header
        headerTitle={headerTitle}
        headerRight={ConfirmButton}
        backgroundColor="transparent"
      />
      <View style={styles.wrapList}>
        <FloorPictureList
          pictures={pictures}
          editable
          setPictures={setPictures}
          addPictures={addPictures}
        />
      </View>
      {modalVisible && <SuccessModal onPress={() => console.log('press!!')} />}
    </SafeAreaView>
  );
};

export default EditFloorScreen;
