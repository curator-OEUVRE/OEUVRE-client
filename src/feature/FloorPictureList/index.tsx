/* eslint-disable no-param-reassign */
import { useCallback, useRef, useState, ReactNode } from 'react';
import { ScrollViewProps, View, StyleSheet } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import FloorPicture from './FloorPicture';
import { COLOR } from '@/constants/styles';
import useDimensions from '@/hooks/useDimensions';
import { FloorAlignment } from '@/types/floor';
import type { Picture } from '@/types/picture';

interface Props extends ScrollViewProps {
  pictures: Picture[];
  editable?: boolean;
  setPictures?: (newData: Picture[]) => void;
  addPictures?: (index: number) => void;
  onPressPicture?: (picture: Picture) => void;
  color?: string;
  onEndReached?: () => void;
  renderDescription?: (picture: Picture) => ReactNode;
  pictureAddable?: boolean;
  onPressDelete?: (picture: Picture) => void;
  onPinchEnd?: (index: number, scale: number) => void;
  alignment?: FloorAlignment;
}

interface Layout {
  width: number;
  height: number;
  pageX: number;
  pageY: number;
}

const keyExtractor = (item: Picture, index: number): string =>
  `item_${index}_${item.pictureNo}`;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
  },
  guideline: {
    alignSelf: 'center',
    borderBottomColor: COLOR.system.blue,
    borderBottomWidth: 1,
    borderTopColor: COLOR.system.blue,
    borderTopWidth: 1,
    position: 'absolute',
    transform: [{ translateY: -2.5 }],
    width: '100%',
  },
});

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
  onPressDelete,
  onPinchEnd,
  alignment,
  ...scrollViewProps
}: Props) => {
  const translateY = useRef<SharedValue<number>>();
  const absoluteX = useRef<SharedValue<number>>();
  const absoluteY = useRef<SharedValue<number>>();
  const activeIndexAnim = useRef<SharedValue<number>>();
  const layoutRef = useSharedValue<Layout | undefined>(undefined);
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

  const { width, height } = useDimensions();
  const BASE_SIZE = width < height ? width : height - 160;
  const isPinching = useSharedValue(false);

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
        onPressDelete={onPressDelete}
        color={color}
        renderDescription={renderDescription}
        pictureAddable={pictureAddable}
        onPinchEnd={onPinchEnd}
        alignment={alignment}
        isPinching={isPinching}
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
      onPressDelete,
      onPinchEnd,
      alignment,
      isPinching,
    ],
  );

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

  const guidelineStyle = useAnimatedStyle(() => ({
    opacity: isPinching.value ? withTiming(1) : withTiming(0),
  }));

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.guideline,
          {
            height: BASE_SIZE,
          },
          guidelineStyle,
        ]}
      />
      <DraggableFlatList
        data={pictures}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        onDragEnd={({ data: newData }) => {
          onDragEnd(newData);
        }}
        onAnimValInit={(animVals) => {
          activeIndexAnim.current = animVals.activeIndexAnim;
        }}
        /* eslint-disable-next-line react-native/no-inline-styles */
        contentContainerStyle={{
          paddingHorizontal: editable ? 36 : 44,
        }}
        maxToRenderPerBatch={7}
        initialNumToRender={7}
        windowSize={7}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        showsHorizontalScrollIndicator={false}
        {...scrollViewProps}
      />
    </View>
  );
};

export default FloorPictureList;
