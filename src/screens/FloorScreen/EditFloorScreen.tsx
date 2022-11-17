/* eslint-disable react-native/no-raw-text */
import {
  CompositeNavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BlurView } from 'expo-blur';
import { lockAsync, OrientationLock } from 'expo-screen-orientation';
import { useCallback, useEffect, useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PencilIcon from '@/assets/icons/Pencil';
import { Header } from '@/components/Header';
import { Spinner } from '@/components/Spinner';
import { IMAGE } from '@/constants/images';
import { Screen } from '@/constants/screens';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import FloorPictureList from '@/feature/FloorPictureList';
import { RootStackParamsList } from '@/feature/Routes';
import { FloorStackParamsList } from '@/feature/Routes/FloorStack';
import useUploadImage from '@/hooks/useUploadImage';
import { getColorByBackgroundColor } from '@/services/common/color';
import { FloorMode, useCreateFloorStore } from '@/states/createFloorStore';

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

export type EditFloorScreenRP = RouteProp<
  FloorStackParamsList,
  Screen.EditFloorScreen
>;

interface SuccessModalProps {
  onPress: () => void;
}

const SuccessModal = ({ onPress }: SuccessModalProps) => {
  useEffect(() => {
    setTimeout(() => {
      onPress();
    }, 3000);
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
  useFocusEffect(
    useCallback(() => {
      const lockOrientation = async () => {
        await lockAsync(OrientationLock.LANDSCAPE_RIGHT);
      };
      lockOrientation();
    }, []),
  );
  const { params } = useRoute<EditFloorScreenRP>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newFloorNo, setNewFloorNo] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<EditFloorScreenNP>();
  const { uploadImages } = useUploadImage();
  const {
    pictures,
    setPictures,
    color,
    name,
    createFloor,
    mode,
    editFloor,
    setFloorMode,
  } = useCreateFloorStore();

  const onGoBack = useCallback(async () => {
    if (mode === FloorMode.CREATE) {
      await lockAsync(OrientationLock.PORTRAIT_UP);
    } else if (mode === FloorMode.EDIT) {
      setFloorMode({ mode: FloorMode.VIEWER });
    }
  }, [mode, setFloorMode]);

  useEffect(() => {
    const backAction = () => {
      onGoBack();
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [onGoBack, navigation]);

  const onConfirm = useCallback(async () => {
    const newImages = pictures.filter((picture) => picture.pictureNo === 0);
    const images = newImages.map((picture) => picture.imageUrl);
    setLoading(true);
    const urls = await uploadImages(images, name.value);
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
    if (mode === FloorMode.EDIT) {
      if (!params?.floorNo) {
        setLoading(false);
        return;
      }
      await editFloor(params.floorNo);
      setLoading(false);
      // eslint-disable-next-line no-console
      setFloorMode({ mode: FloorMode.VIEWER });
      navigation.navigate(Screen.FloorViewerScreen, {
        floorNo: params.floorNo,
      });
    } else {
      const result = await createFloor();
      setLoading(false);
      // eslint-disable-next-line no-console
      if (result.isSuccess) {
        setNewFloorNo(result.result.result.floorNo);
        setModalVisible(true);
      }
    }
  }, [
    createFloor,
    name.value,
    pictures,
    setPictures,
    uploadImages,
    setFloorMode,
    editFloor,
    mode,
    navigation,
    params,
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
  const headerTitle =
    mode === FloorMode.EDIT
      ? () => (
          <Pressable
            style={styles.wrapTitle}
            onPress={async () => {
              await lockAsync(OrientationLock.PORTRAIT_UP);
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
              {name.value}
            </Text>
            <PencilIcon color={iconColorByBackground} />
          </Pressable>
        )
      : '플로어 추가';
  const addPictures = useCallback(
    async (index: number) => {
      await lockAsync(OrientationLock.PORTRAIT_UP);
      setFloorMode({ mode: FloorMode.ADD_PICTURES, startIndex: index + 1 });
      navigation.navigate(Screen.AddPictureScreen);
    },
    [navigation, setFloorMode],
  );

  const onPressPicture = async (pictureNo: number) => {
    if (mode !== FloorMode.EDIT) return;
    const picture = pictures.find((p) => p.pictureNo === pictureNo);
    if (!picture) return;
    await lockAsync(OrientationLock.PORTRAIT_UP);
    navigation.navigate(Screen.EditDescriptionScreen, { pictureNo });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: color }]}>
      <Header
        headerTitle={headerTitle}
        headerRight={ConfirmButton}
        backgroundColor="transparent"
        iconColor={iconColorByBackground}
        onGoBack={onGoBack}
      />
      <View style={styles.wrapList}>
        <FloorPictureList
          pictures={pictures}
          editable
          setPictures={setPictures}
          addPictures={addPictures}
          onPressPicture={onPressPicture}
          color={textColorByBackground}
        />
      </View>
      {modalVisible && (
        <SuccessModal
          onPress={() => {
            if (!newFloorNo) return;
            navigation.reset({
              routes: [
                {
                  name: Screen.FloorViewerScreen,
                  params: {
                    floorNo: newFloorNo,
                  },
                },
              ],
            });
          }}
        />
      )}
      {loading && <Spinner />}
    </SafeAreaView>
  );
};

export default EditFloorScreen;
