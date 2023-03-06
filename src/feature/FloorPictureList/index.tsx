/* eslint-disable no-param-reassign */
import { useCallback, useRef, useState, ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { Shadow } from 'react-native-shadow-2';
import FloorPicture from './FloorPicture';
import TrashIcon from '@/assets/icons/Trash';
import { COLOR } from '@/constants/styles';
import useDimensions from '@/hooks/useDimensions';
import type { Picture } from '@/types/picture';

const styles = StyleSheet.create({
  flatList: {
    height: '100%',
  },
});

interface Props {
  pictures: Picture[];
  editable?: boolean;
  setPictures?: (newData: Picture[]) => void;
  addPictures?: (index: number) => void;
  onPressPicture?: (picture: Picture) => void;
  color?: string;
  onEndReached?: () => void;
  renderDescription?: (picture: Picture) => ReactNode;
  pictureAddable?: boolean;
}

interface Layout {
  width: number;
  height: number;
  pageX: number;
  pageY: number;
}

const keyExtractor = (item: Picture, index: number): string =>
  `item_${index}_${item.pictureNo}`;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const FloorPictureList = ({
  pictures,
  editable,
  setPictures,
  addPictures,
  onPressPicture,
  color,
  onEndReached,
  renderDescription,
  pictureAddable,
}: Props) => {
  const { height: windowHeight } = useDimensions();
  const translateY = useRef<SharedValue<number>>();
  const absoluteX = useRef<SharedValue<number>>();
  const absoluteY = useRef<SharedValue<number>>();
  const activeIndexAnim = useRef<SharedValue<number>>();
  const layoutRef = useSharedValue<Layout | undefined>(undefined);
  const pressableRef = useRef<View>(null);
  const isDragging = useDerivedValue(
    () =>
      activeIndexAnim.current?.value !== undefined &&
      activeIndexAnim.current.value !== -1,
  );
  const draggingPictureUrl = useDerivedValue(() => {
    if (!activeIndexAnim.current || activeIndexAnim.current.value < 0)
      return '';
    return pictures[activeIndexAnim.current.value].imageUrl;
  });

  const [activeLine, setActiveLine] = useState(-1);

  const onEnter = useDerivedValue(() => {
    const cx = absoluteX.current?.value;
    const cy = absoluteY.current?.value;
    if (!cx || !cy || !layoutRef.value || !isDragging.value) return false;
    const { pageX, pageY, width, height } = layoutRef.value;
    return (
      pageX <= cx && cx <= pageX + width && pageY <= cy && cy <= pageY + height
    );
  });
  const renderItem = useCallback(
    (props: RenderItemParams<Picture>) => (
      <FloorPicture
        {...props}
        addPictures={addPictures}
        isDragging={isDragging}
        editable={editable}
        activeLine={activeLine}
        setActiveLine={setActiveLine}
        activeIndexAnim={activeIndexAnim.current}
        onPressPicture={onPressPicture}
        color={color}
        renderDescription={renderDescription}
        pictureAddable={pictureAddable}
      />
    ),
    [
      isDragging,
      editable,
      activeLine,
      setActiveLine,
      activeIndexAnim,
      addPictures,
      onPressPicture,
      color,
      renderDescription,
      pictureAddable,
    ],
  );

  const animatedPressableStyles = useAnimatedStyle(() => ({
    transform: [{ scale: onEnter.value ? 1.5 : 1 }],
  }));

  const onDragEnd = (newData: Picture[]) => {
    if (onEnter.value && activeIndexAnim.current) {
      setPictures?.(
        newData.filter(
          (picture) => picture.imageUrl !== draggingPictureUrl.value,
        ),
      );
    } else {
      setPictures?.(newData);
    }
  };
  const measureLayout = () => {
    setTimeout(() => {
      if (!pressableRef.current) return;
      pressableRef.current.measure((x, y, width, height, pageX, pageY) => {
        layoutRef.value = { pageX, pageY, width, height };
      });
    }, 1000);
  };

  return (
    <View>
      <DraggableFlatList
        data={pictures}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        onDragEnd={({ data: newData, from, to }) => {
          const newPictures = newData.map((picture, index) =>
            // 순서를 바꾸지 않고 움직이기만 하면 y축 위치 변경
            index === to &&
            from === to &&
            translateY.current?.value !== undefined
              ? {
                  ...picture,
                  location:
                    picture.location + translateY.current.value / windowHeight,
                }
              : // 순서가 바뀌면 y축 변화 무시
                picture,
          );
          onDragEnd(newData);
        }}
        onAnimValInit={(animVals) => {
          absoluteX.current = animVals.absoluteX;
          absoluteY.current = animVals.absoluteY;
          translateY.current = animVals.translateY;
          activeIndexAnim.current = animVals.activeIndexAnim;
        }}
        style={styles.flatList}
        /* eslint-disable-next-line react-native/no-inline-styles */
        contentContainerStyle={{ paddingHorizontal: editable ? 36 : 44 }}
        allowAnotherDirection
        maxToRenderPerBatch={7}
        initialNumToRender={7}
        windowSize={7}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default FloorPictureList;
