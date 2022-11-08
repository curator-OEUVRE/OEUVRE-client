import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { firebase } from '@/services/firebase';

const makeBlob = async (imageUri: string): Promise<Blob> => {
  const response = await fetch(imageUri);
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
    const downloadURL = await Promise.all(
      images.map((image) => upload(image, path, uuidv4())),
    );
    setUploading(false);
    return downloadURL;
  };
  return { uploading, uploadImage, uploadImages };
};

export default useUploadImage;
