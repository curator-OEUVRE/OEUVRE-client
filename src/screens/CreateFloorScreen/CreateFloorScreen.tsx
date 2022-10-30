import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { lockAsync, OrientationLock } from 'expo-screen-orientation';
import { useCallback, useLayoutEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CheckIcon from '@/assets/icons/Check';
import { Header } from '@/components/Header';
import { Screen } from '@/constants/screens';
import { COLOR } from '@/constants/styles';
import FloorPictureList from '@/feature/FloorPictureList';
import { RootStackParamsList } from '@/feature/Routes';
import { FloorStackParamsList } from '@/feature/Routes/FloorStack';
import useUploadImage from '@/hooks/useUploadImage';
import { useCreateFloorStore } from '@/states/createFloorStore';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.mono.white,
    flex: 1,
  },
  wrapList: {
    flex: 1,
  },
});

export type CreateFloorScreenParams = undefined;
export type CreateFloorScreenNP = CompositeNavigationProp<
  StackNavigationProp<FloorStackParamsList, Screen.CreateFloorScreen>,
  StackNavigationProp<RootStackParamsList>
>;
const CreateFloorScreen = () => {
  useLayoutEffect(() => {
    lockAsync(OrientationLock.LANDSCAPE);
    return () => {
      lockAsync(OrientationLock.DEFAULT);
    };
  }, []);
  const navigation = useNavigation<CreateFloorScreenNP>();
  const { uploadImages } = useUploadImage();
  const { pictures, setPictures, color, name, createFloor } =
    useCreateFloorStore();

  const onConfirm = useCallback(async () => {
    const images = pictures.map((picture) => picture.imageUrl);
    const urls = await uploadImages(images, name.value);
    const newPictures = pictures.map((picture, i) => ({
      ...picture,
      imageUri: urls[i],
      queue: i + 1,
    }));
    setPictures(newPictures);
    const result = await createFloor();
    console.log(result.result);
  }, [name.value, pictures, uploadImages, setPictures, createFloor]);

  const ConfirmButton = useCallback(
    () => (
      <Pressable onPress={onConfirm}>
        <CheckIcon color={COLOR.mono.gray3} />
      </Pressable>
    ),
    [onConfirm],
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: color }]}>
      <Header headerTitle="플로어 추가" headerRight={ConfirmButton} />
      <View style={styles.wrapList}>
        <FloorPictureList
          pictures={pictures}
          editable
          setPictures={setPictures}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateFloorScreen;
