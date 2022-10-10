import { useState } from 'react';
import { firebase } from '@/services/firebase';

interface useUploadImageProps {
  image: string | undefined;
}

const useUploadImage = ({ image }: useUploadImageProps) => {
  const [uploading, setUploading] = useState<boolean>(false);

  const uploadImage = async (
    path: string,
    fileName: string,
    onComplete?: (url: string) => void,
  ) => {
    if (!image) return;
    const blob: Blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = () => {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image, true);
      xhr.send(null);
    });
    const ref = firebase.storage().ref().child(`${path}/${fileName}`);
    const snapshot = ref.put(blob as Blob);
    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        setUploading(false);
        console.log(error);
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false);
          onComplete?.(url);
          return url;
        });
      },
    );
  };
  return { uploading, uploadImage };
};

export default useUploadImage;
