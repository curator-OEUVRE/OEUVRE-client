import { Asset } from 'expo-media-library';
import { lockAsync, OrientationLock } from 'expo-screen-orientation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import RNFS from 'react-native-fs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ImageBrowser from './ImageBrowser';
import { Header } from '@/components/Header';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import { checkFileSize } from '@/services/common/image';

interface ImagePickerModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onComplete?: (selectedImages: Asset[]) => void;
  headerTitle?: string;
  headerRightText?: string;
  count?: number;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const ImagePickerModal = ({
  visible,
  setVisible,
  onComplete,
  headerTitle,
  headerRightText,
  count = 0,
}: ImagePickerModalProps) => {
  const [selectedImages, setSelectedImages] = useState<Asset[]>([]);

  const phPathToFilePath = useCallback(async (uri: string) => {
    let fileURI = encodeURI(uri);

    if (uri.startsWith('ph://')) {
      const copyPath = `${
        RNFS.DocumentDirectoryPath
      }/${new Date().toISOString()}.jpg`.replace(/:/g, '-');

      fileURI = await RNFS.copyAssetsFileIOS(uri, copyPath, 360, 360);
    }

    return fileURI;
  }, []);

  const selectImage = useCallback(
    async (image: Asset) => {
      if (Platform.OS === 'ios') {
        // eslint-disable-next-line no-param-reassign
        image.uri = await phPathToFilePath(image.uri);
      }
      const selectedItemIdx = selectedImages.findIndex(
        (img) => img.uri === image.uri,
      );
      if (selectedItemIdx >= 0) {
        setSelectedImages((prev) =>
          prev.filter((img) => img.uri !== image.uri),
        );
      } else {
        if (selectedImages.length + count >= 20) {
          Alert.alert('한 플로어 당 사진은 \n20장까지 가능합니다.');
          return;
        }
        setSelectedImages((prev) => [...prev, image]);
      }
    },
    [selectedImages, phPathToFilePath, count],
  );

  const resetSelectedImages = useCallback(() => {
    setSelectedImages([]);
  }, []);

  const hideModal = useCallback(() => {
    setSelectedImages([]);
    setVisible(false);
  }, [setVisible]);

  const onPressComplete = useCallback(async () => {
    const canUpload = await checkFileSize(selectedImages.map((img) => img.uri));
    if (canUpload) onComplete?.(selectedImages);
    hideModal();
  }, [onComplete, hideModal, selectedImages]);

  const disabled = useMemo(() => selectedImages.length === 0, [selectedImages]);

  const headerRight = useCallback(
    () => (
      <Pressable onPress={onPressComplete} disabled={disabled}>
        <Text
          style={[
            TEXT_STYLE.body16M,
            { color: disabled ? COLOR.mono.gray3 : COLOR.system.blue },
          ]}
        >
          {headerRightText}
        </Text>
      </Pressable>
    ),
    [onPressComplete, headerRightText, disabled],
  );

  return (
    <Modal animationType="slide" visible={visible}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Header
            backgroundColor="transparent"
            headerTitle={headerTitle}
            onGoBack={hideModal}
            defaultBackAction={false}
            headerRight={headerRight}
          />
          <ImageBrowser
            selectedImages={selectedImages}
            selectImage={selectImage}
            resetSelectedImages={resetSelectedImages}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};

export default ImagePickerModal;
