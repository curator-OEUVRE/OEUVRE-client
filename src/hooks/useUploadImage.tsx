import { copyAsync } from 'expo-file-system';
import { useState } from 'react';
import { Platform } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { firebase } from '@/services/firebase';

const makeBlob = async (imageUri: string): Promise<Blob> => {
  let realUri = imageUri;

  // https://github.com/facebook/react-native/issues/27099#issuecomment-907069335
  if (Platform.OS === 'ios') {
    const prevPath = imageUri;
    const realPath = `${prevPath}.toUpload`;
    await copyAsync({ from: prevPath, to: realPath });
    realUri = realPath;
  }
  const response = await fetch(realUri);
  const image = await response.blob();
  return image;
};

const useUploadImage = () => {
  const [uploading, setUploading] = useState<boolean>(false);

  const upload = async (image: string, path: string, fileName: string) => {
    const ref = firebase.storage().ref().child(`${path}/${fileName}`);
    const blob = await makeBlob(image);
    const snapshot = await ref.put(blob);
    const downloadURL = await snapshot.ref.getDownloadURL();
    return downloadURL;
  };

  const uploadImage = async (image: string, path: string, fileName: string) => {
    setUploading(true);
    const downloadURL = await upload(image, path, fileName);
    setUploading(false);
    return downloadURL;
  };

  const uploadImages = async (images: string[], path: string) => {
    setUploading(true);
    let downloadURL: string[] = [];
    try {
      downloadURL = await Promise.all(
        images.map((image) => upload(image, path, uuidv4())),
      );
    } catch (e: any) {
      console.log(e.message);
    }
    setUploading(false);
    return downloadURL;
  };
  return { uploading, uploadImage, uploadImages };
};

export default useUploadImage;
