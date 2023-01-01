/* eslint-disable react-native/no-raw-text */
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BlurView } from 'expo-blur';
import { MediaTypeOptions } from 'expo-image-picker';
import { useCallback, useEffect, useState } from 'react';
import {
  BackHandler,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { Spinner } from '@/components/Spinner';
import { IMAGE } from '@/constants/images';
import { Navigator, Screen } from '@/constants/screens';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import FloorPictureList from '@/feature/FloorPictureList';
import { RootStackParamsList } from '@/feature/Routes';
import { CreateFloorStackParamsList } from '@/feature/Routes/CreateFloorStack';
import useUploadImage from '@/hooks/useUploadImage';
import { getColorByBackgroundColor } from '@/services/common/color';
import {
  createDefaultPictureInfo,
  getImagesFromLibrary,
} from '@/services/common/image';
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
  wrapList: {
    flex: 1,
  },
  wrapModal: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
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

interface SuccessModalProps {
  onPress: () => void;
}

const SuccessModal = ({ onPress }: SuccessModalProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onPress();
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [onPress]);
  return (
    <Modal transparent animationType="fade">
      <Pressable onPress={() => onPress()} style={styles.pressable}>
        <BlurView intensity={100} tint="light" style={styles.wrapModal}>
          <Image source={IMAGE.check} style={styles.check} />
          <Text style={[styles.text, TEXT_STYLE.title20M]}>
            축하드려요, {'\n'}
            <Text style={TEXT_STYLE.title20B}>새로운 플로어가</Text> 오픈됐어요!
          </Text>
        </BlurView>
      </Pressable>
    </Modal>
  );
};

const EditFloorScreen = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newFloorNo, setNewFloorNo] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<EditFloorScreenNP>();
  const { uploadImages } = useUploadImage();
  const { pictures, setPictures, color, name, createFloor } =
    useCreateFloorStore();

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
  }, [createFloor, name, pictures, setPictures, uploadImages]);

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
      {modalVisible && (
        <SuccessModal
          onPress={() => {
            if (!newFloorNo) return;
            navigation.navigate(Navigator.FloorStack, {
              screen: Screen.FloorViewerScreen,
              params: {
                floorNo: newFloorNo,
              },
            });
          }}
        />
      )}
      {loading && <Spinner />}
    </SafeAreaView>
  );
};

export default EditFloorScreen;
