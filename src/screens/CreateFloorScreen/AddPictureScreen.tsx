import {
  CompositeNavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
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
  const { createPicturesByImageUris } = useCreateFloorStore();
  useFocusEffect(() => {
    const pickImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: true,
        quality: 1,
      });
      if (!result.cancelled) {
        const { selected } = result;
        const imageUris = selected?.map((imageInfo) => imageInfo.uri);
        createPicturesByImageUris(imageUris);
        navigation.navigate(Screen.PictureDescriptionScreen);
      } else {
        navigation.goBack();
      }
    };
    pickImage();
  });
  return <View style={styles.container} />;
};

export default AddPictureScreen;
