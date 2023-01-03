import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { PictureInfo } from '@/types/picture';

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
  let pictures: ImagePicker.ImageInfo[] = [];
  let canUpload = true;
  if (!result.cancelled) {
    if (!Array.isArray(result.selected)) {
      pictures.push(result as unknown as ImagePicker.ImageInfo);
    } else {
      pictures = result.selected;
    }
    canUpload = await checkFileSize(pictures.map((info) => info.uri));

    return [pictures, canUpload] as const;
  }
  return [undefined, false] as const;
};

export const createDefaultPictureInfo = (
  info: Partial<PictureInfo>,
): PictureInfo => ({
  imageUrl: '',
  description: '',
  hashtags: [],
  width: 0.5,
  height: 0.5,
  location: 0,
  queue: 1,
  pictureNo: 0,
  ...info,
});
