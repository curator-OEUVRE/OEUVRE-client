import { getAssetsAsync, usePermissions, Asset } from 'expo-media-library';
import { useCallback, useEffect, useState } from 'react';
import { Image, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ImageTile from './ImageTile';

interface ImageBrowserProps {
  selectedImages: Asset[];
  selectImage: (imageUri: Asset) => void;
}

const styles = StyleSheet.create({
  thumbImage: {
    height: 282,
    width: 282,
  },
  thumbWrapper: {
    alignItems: 'center',
    marginBottom: 56,
  },
});

const ImageBrowser = ({ selectImage, selectedImages }: ImageBrowserProps) => {
  const [permissionResponse, requestPermission] = usePermissions();
  const [imageUris, setimageUris] = useState<Asset[]>([]);
  const [after, setAfter] = useState<string>('');
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const getPermission = useCallback(async () => {
    if (!permissionResponse || permissionResponse.accessPrivileges === 'none') {
      await requestPermission();
    }
  }, [permissionResponse, requestPermission]);

  const getAssets = useCallback(async () => {
    const data = await getAssetsAsync();
    if (data.totalCount) {
      setimageUris(data.assets);
      setAfter(data.endCursor);
      setHasNextPage(data.hasNextPage);
    }
  }, []);

  const onEndReached = useCallback(async () => {
    if (!hasNextPage) return;
    const data = await getAssetsAsync(after ? { after } : undefined);
    if (data.totalCount) {
      if (after === data.endCursor) return;
      setimageUris((prev) => [...prev, ...data.assets]);
      setAfter(data.endCursor);
      setHasNextPage(data.hasNextPage);
    }
  }, [after, hasNextPage]);

  useEffect(() => {
    getPermission();
    getAssets();
  }, [getPermission, getAssets]);

  const onPressTile = useCallback(
    (image: Asset) => {
      selectImage(image);
    },
    [selectImage],
  );

  const keyExtractor = useCallback(
    (item: Asset, index: number): string => `imgTile_${index}_${item.uri}`,
    [],
  );

  const renderImageTile = ({ item }: ListRenderItemInfo<Asset>) => {
    const selectedItemIdx = selectedImages.findIndex(
      (image) => image.uri === item.uri,
    );
    return (
      <ImageTile
        image={item}
        selectedItemIdx={selectedItemIdx}
        selected={selectedItemIdx >= 0}
        onPress={onPressTile}
      />
    );
  };

  const renderImageThumbnail = useCallback(() => {
    let uri;
    if (selectedImages.length > 0) {
      uri = selectedImages[selectedImages.length - 1].uri;
    } else if (imageUris.length > 0) {
      [{ uri }] = imageUris;
    }
    return (
      <View style={styles.thumbWrapper}>
        <Image source={{ uri }} style={styles.thumbImage} />
      </View>
    );
  }, [imageUris, selectedImages]);

  return (
    <View>
      {renderImageThumbnail()}
      <FlatList
        data={imageUris}
        renderItem={renderImageTile}
        numColumns={3}
        onEndReached={onEndReached}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

export default ImageBrowser;
