import {
  CompositeNavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MediaTypeOptions } from 'expo-image-picker';
import { Spinner } from '@/components/Spinner';
import { Screen } from '@/constants/screens';
import { RootStackParamsList } from '@/feature/Routes';
import { FloorStackParamsList } from '@/feature/Routes/FloorStack';
import { getImagesFromLibrary } from '@/services/common/image';
import { FloorMode, useCreateFloorStore } from '@/states/createFloorStore';

export type AddPictureScreenParams = undefined;
export type AddPictureScreenScreenNP = CompositeNavigationProp<
  StackNavigationProp<FloorStackParamsList, Screen.AddPictureScreen>,
  StackNavigationProp<RootStackParamsList>
>;

const AddPictureScreen = () => {
  const navigation = useNavigation<AddPictureScreenScreenNP>();
  const { createPictures, mode, clearTempPictures, setFloorMode } =
    useCreateFloorStore();
  useFocusEffect(() => {
    const pickImage = async () => {
      const [result, canUpload] = await getImagesFromLibrary({
        mediaTypes: MediaTypeOptions.All,
      });

      if (result && canUpload) {
        const imageUrls = result?.map((imageInfo) => ({
          imageUrl: imageInfo.uri,
          width: (imageInfo.width * 0.5) / imageInfo.height,
          height: 0.5,
        }));
        createPictures(imageUrls);
        navigation.navigate(Screen.PictureDescriptionScreen);
      } else {
        navigation.goBack();
        if (mode === FloorMode.ADD_PICTURES) {
          clearTempPictures();
          setFloorMode({ mode: FloorMode.EDIT });
        }
      }
    };
    pickImage();
  });
  return <Spinner />;
};

export default AddPictureScreen;
