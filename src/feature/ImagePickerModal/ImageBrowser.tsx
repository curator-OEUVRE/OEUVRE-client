import {
  getAssetsAsync,
  usePermissions,
  Asset,
  SortBy,
  AssetsOptions,
  getAlbumsAsync,
  Album,
} from 'expo-media-library';
import { useCallback, useEffect, useState } from 'react';
import {
  Image,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AlbumPickerModal from './AlbumPickerModal';
import ImageTile from './ImageTile';
import ArrowDownIcon from '@/assets/icons/ArrowDownSmall';
import { COLOR, TEXT_STYLE } from '@/constants/styles';

interface ImageBrowserProps {
  selectedImages: Asset[];
  selectImage: (imageUri: Asset) => void;
  resetSelectedImages: () => void;
}

const styles = StyleSheet.create({
  thumbImage: {
    height: 282,
    width: '100%',
  },
  thumbWrapper: {
    alignItems: 'center',
    backgroundColor: COLOR.mono.gray1,
  },
  wrapSelect: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 26,
    marginVertical: 12,
    paddingLeft: 20,
  },
});

const defaultOptions: AssetsOptions = {
  sortBy: [[SortBy.creationTime, false]],
};

const ImageBrowser = ({
  selectImage,
  selectedImages,
  resetSelectedImages,
}: ImageBrowserProps) => {
  const [permissionResponse, requestPermission] = usePermissions();
  const [imageUris, setimageUris] = useState<Asset[]>([]);
  const [after, setAfter] = useState<string>('');
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album>();
  const [albumPickerVisible, setAlbumPickerVisible] = useState<boolean>(false);

  const getPermission = useCallback(async () => {
    if (!permissionResponse || permissionResponse.accessPrivileges === 'none') {
      await requestPermission();
    }
  }, [permissionResponse, requestPermission]);

  const getAlbums = useCallback(async () => {
    const data = await getAlbumsAsync({ includeSmartAlbums: true });
    setAlbums(data);
  }, []);

  const getAssets = useCallback(async () => {
    const data = await getAssetsAsync({
      ...defaultOptions,
      album: selectedAlbum,
    });

    if (data.totalCount >= 0) {
      setimageUris(data.assets);
      setAfter(data.endCursor);
      setHasNextPage(data.hasNextPage);
    } else {
      setimageUris([]);
    }
  }, [selectedAlbum]);

  const onEndReached = useCallback(async () => {
    if (!hasNextPage) return;
    const data = await getAssetsAsync({
      ...defaultOptions,
      after: after || undefined,
      album: selectedAlbum,
    });
    if (data.totalCount) {
      if (after === data.endCursor) return;
      setimageUris((prev) => [...prev, ...data.assets]);
      setAfter(data.endCursor);
      setHasNextPage(data.hasNextPage);
    }
  }, [after, hasNextPage, selectedAlbum]);

  useEffect(() => {
    getAlbums();
  }, [getAlbums]);

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
        <Image
          source={{ uri }}
          style={styles.thumbImage}
          resizeMode="contain"
        />
      </View>
    );
  }, [imageUris, selectedImages]);

  const renderSelect = useCallback(
    () => (
      <Pressable
        style={styles.wrapSelect}
        onPress={() => setAlbumPickerVisible(true)}
      >
        <Text style={TEXT_STYLE.body14M}>{selectedAlbum?.title || 'All'}</Text>
        <ArrowDownIcon color={COLOR.mono.black} />
      </Pressable>
    ),
    [selectedAlbum],
  );

  const onSelectAlbum = useCallback(
    (album?: Album) => {
      resetSelectedImages();
      setSelectedAlbum(album);
    },
    [resetSelectedImages],
  );

  return (
    <View>
      {renderImageThumbnail()}
      {renderSelect()}
      <FlatList
        data={imageUris}
        renderItem={renderImageTile}
        numColumns={3}
        onEndReached={onEndReached}
        keyExtractor={keyExtractor}
      />
      <AlbumPickerModal
        visible={albumPickerVisible}
        setVisible={setAlbumPickerVisible}
        albums={albums}
        onComplete={onSelectAlbum}
      />
    </View>
  );
};

export default ImageBrowser;
