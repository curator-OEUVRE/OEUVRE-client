import { useCallback, useState } from 'react';
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import { Picture } from '@/types/picture';

interface MainImageSelectModalProps {
  visible: boolean;
  headerTitle?: string;
  headerRightText?: string;
  setVisible: (visible: boolean) => void;
  onComplete?: (picture: Picture) => void;
  pictures: Picture[];
  onGoBack?: () => void;
  initialPicture?: Picture;
}

const LIST_ITEM_HEIGHT = 74;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    height: 195,
    paddingLeft: 20,
    paddingTop: 16,
    width: '100%',
  },
  list: {
    marginTop: 16,
  },
  listImage: {
    height: LIST_ITEM_HEIGHT,
  },
  main: {
    backgroundColor: COLOR.mono.gray1,
    flex: 1,
  },
  pressable: {
    height: LIST_ITEM_HEIGHT + 4,
    justifyContent: 'center',
    marginRight: 16,
  },
  selected: {
    borderColor: COLOR.system.blue,
    borderWidth: 2,
  },
  thumbImage: {
    flex: 1,
  },
  wrapSelector: {
    marginTop: 74,
  },
});

const MainImageSelectModal = ({
  visible,
  headerTitle,
  headerRightText,
  setVisible,
  onComplete,
  pictures,
  onGoBack,
  initialPicture,
}: MainImageSelectModalProps) => {
  const { width: size } = useWindowDimensions();

  const [selectedPicture, setSelectedPicture] = useState<Picture>(
    initialPicture ?? pictures[0],
  );

  const hideModal = useCallback(() => {
    setVisible(false);
    onGoBack?.();
  }, [setVisible, onGoBack]);

  const onPressComplete = useCallback(
    async (picture: Picture) => {
      hideModal();
      onComplete?.(picture);
    },
    [onComplete, hideModal],
  );

  const headerRight = useCallback(
    () => (
      <Pressable onPress={() => onPressComplete?.(selectedPicture)}>
        <Text style={[TEXT_STYLE.body16M, { color: COLOR.system.blue }]}>
          {headerRightText}
        </Text>
      </Pressable>
    ),
    [onPressComplete, headerRightText, selectedPicture],
  );

  const keyExtractor = (item: Picture, index: number) =>
    `picture_${item.pictureNo}_${index}`;

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Picture>) => (
      <Pressable
        onPress={() => setSelectedPicture(item)}
        style={[
          styles.pressable,
          selectedPicture.imageUrl === item.imageUrl && styles.selected,
        ]}
      >
        <Image
          source={{ uri: item.imageUrl }}
          style={[
            styles.listImage,
            {
              width: (item.width / item.height) * LIST_ITEM_HEIGHT,
            },
          ]}
          resizeMode="contain"
        />
      </Pressable>
    ),
    [selectedPicture],
  );

  const footer = (
    <View style={styles.footer}>
      <Text style={TEXT_STYLE.body14M}>대표 작품 선택</Text>
      <FlatList
        renderItem={renderItem}
        data={pictures}
        maxToRenderPerBatch={10}
        initialNumToRender={10}
        windowSize={10}
        keyExtractor={keyExtractor}
        horizontal
        style={styles.list}
      />
    </View>
  );
  return (
    <Modal
      animationType="slide"
      visible={visible}
      supportedOrientations={['portrait', 'landscape']}
    >
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Header
            backgroundColor="transparent"
            headerTitle={headerTitle}
            onGoBack={hideModal}
            headerRight={headerRight}
            defaultBackAction={false}
          />
          <View style={styles.main}>
            <View style={[styles.wrapSelector, { width: size, height: size }]}>
              <Image
                source={{ uri: selectedPicture.imageUrl }}
                style={styles.thumbImage}
                resizeMode="cover"
              />
            </View>
          </View>
          {footer}
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};

export default MainImageSelectModal;
