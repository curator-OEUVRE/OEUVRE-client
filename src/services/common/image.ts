import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

const checkFileSize = async (uris: string[]) => {
  const fileSizes = await Promise.all(
    uris.map((uri) => FileSystem.getInfoAsync(uri)),
  );
  let result = true;
  fileSizes.forEach((info) => {
    if (info.size && info.size > 1048576) {
      result = false;
    }
  });

  if (!result) {
    Alert.alert('크기가 더 작은 사진을 올려 주세요.');
  }

  return result;
};

export const getSingleImageFromLibrary = async <
  T extends ImagePicker.ImagePickerOptions,
>(
  options?: T,
) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    quality: 0.2,
    ...options,
    allowsMultipleSelection: false,
  });
  if (!result.cancelled) {
    const canUpload = await checkFileSize([result.uri]);
    return [result, canUpload] as const;
  }
  return [undefined, false] as const;
};

export const getImagesFromLibrary = async <
  T extends ImagePicker.ImagePickerOptions,
>(
  options?: T,
) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    quality: 0.2,
    ...options,
    allowsMultipleSelection: true,
  });
  if (!result.cancelled) {
    const canUpload = await checkFileSize(
      result.selected.map((info) => info.uri),
    );
    return [result, canUpload] as const;
  }
  return [undefined, false] as const;
};
