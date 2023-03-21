import { Album } from 'expo-media-library';
import { useCallback } from 'react';
import {
  ListRenderItemInfo,
  Modal,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components';
import { COLOR } from '@/constants/styles';

interface AlbumPickerModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onComplete?: (selectedAlbum?: Album) => void;
  albums: Album[];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
  },
  pressed: {
    backgroundColor: COLOR.mono.gray3,
  },
});

const AlbumPickerModal = ({
  visible,
  setVisible,
  onComplete,
  albums,
}: AlbumPickerModalProps) => {
  const hideModal = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onPressItem = useCallback(
    (album?: Album) => {
      onComplete?.(album);
      hideModal();
    },
    [onComplete, hideModal],
  );

  const renderAlbumItem = ({ item, index }: ListRenderItemInfo<Album>) => (
    <>
      {index === 0 && (
        <Pressable
          style={({ pressed }) =>
            pressed ? [styles.item, styles.pressed] : styles.item
          }
          onPress={() => onPressItem()}
        >
          <Text>All</Text>
        </Pressable>
      )}
      <Pressable
        style={({ pressed }) =>
          pressed ? [styles.item, styles.pressed] : styles.item
        }
        onPress={() => onPressItem(item)}
      >
        <Text>{item.title}</Text>
      </Pressable>
    </>
  );

  const keyExtractor = useCallback(
    (item: Album, index: number): string => `album_${index}_${item.id}`,
    [],
  );

  return (
    <Modal animationType="slide" visible={visible}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Header
            backgroundColor="transparent"
            onGoBack={hideModal}
            defaultBackAction={false}
          />
          <FlatList
            data={albums}
            renderItem={renderAlbumItem}
            numColumns={1}
            keyExtractor={keyExtractor}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};

export default AlbumPickerModal;
