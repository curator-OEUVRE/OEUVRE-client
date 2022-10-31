import {
  CompositeNavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { StyleSheet, View } from 'react-native';
import { Screen } from '@/constants/screens';
import { RootStackParamsList } from '@/feature/Routes';
import { FloorStackParamsList } from '@/feature/Routes/FloorStack';
import { useCreateFloorStore } from '@/states/createFloorStore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export type AddPictureScreenParams = undefined;
export type AddPictureScreenScreenNP = CompositeNavigationProp<
  StackNavigationProp<FloorStackParamsList, Screen.AddPictureScreen>,
  StackNavigationProp<RootStackParamsList>
>;

const AddPictureScreen = () => {
  const navigation = useNavigation<AddPictureScreenScreenNP>();
  const { createPictures, isEditMode, clearTempPictures } =
    useCreateFloorStore();

  useFocusEffect(() => {
    const pickImage = async () => {
      const result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.All,
        allowsMultipleSelection: true,
        quality: 1,
      });
      if (!result.cancelled) {
        const { selected } = result;
        const imageUrls = selected?.map((imageInfo) => ({
          imageUrl: imageInfo.uri,
          width: (imageInfo.width * 0.5) / imageInfo.height,
          height: 0.5,
        }));
        createPictures(imageUrls);
        navigation.navigate(Screen.PictureDescriptionScreen);
      } else {
        if (isEditMode) clearTempPictures();
        navigation.goBack();
      }
    };
    pickImage();
  });
  return <View style={styles.container} />;
};

export default AddPictureScreen;
