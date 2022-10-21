import { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, Pressable, Dimensions } from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  FadeIn,
  withSpring,
  FadeOut,
  useDerivedValue,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import AddCircleIcon from '@/assets/icons/AddCircle';
import { COLOR } from '@/constants/styles';
import type { PictureInfo } from '@/states/createFloorStore';

const { width } = Dimensions.get('screen');

const LINE_BUTTON_SIZE = 40;

const styles = StyleSheet.create({
  flatList: {
    height: '100%',
  },
  item: {
    alignSelf: 'center',
  },
  line: {
    alignItems: 'center',
    backgroundColor: COLOR.mono.gray3,
    height: width * 0.5,
    justifyContent: 'center',
  },
  lineContainer: {
    alignSelf: 'center',
    height: width * 0.5,
  },
});

interface FloorPictureProps extends RenderItemParams<PictureInfo> {
  isDragging: SharedValue<boolean>;
  editable?: boolean;
}

const FloorPicture = ({
  item,
  drag,
  isDragging,
  getIndex,
  editable = false,
}: FloorPictureProps) => {
  const [isLineActive, setIsLineActive] = useState(false);
  const imageWidth = useMemo(() => width * item.width, [item.width]);
  const imageHeight = useMemo(() => width * item.height, [item.height]);
  const scale = useSharedValue(1);

  const index = getIndex();
  const [, setFlag] = useState(false);

  // 순서가 바뀌면 바뀐 컴포넌트만 리렌더링이 되므로,
  // 구분선을 제대로 렌더링하기 위해 한번 강제로 리렌더링을 트리거해야 함
  useDerivedValue(() => {
    runOnJS(setFlag)(isDragging.value);
  });

  const animStyle = useAnimatedStyle(() => ({
    width: withSpring(isDragging.value ? 0 : 1),
    opacity: withSpring(isDragging.value ? 0 : 1),
  }));

  const containerAnimStyle = useAnimatedStyle(() => ({
    paddingHorizontal: withSpring(
      isLineActive && !isDragging.value ? LINE_BUTTON_SIZE / 2 : 0,
    ),
  }));

  const pinchGeature = Gesture.Pinch().onUpdate((e) => {
    if (editable) scale.value = e.scale;
  });

  const imageAnimStyle = useAnimatedStyle(() => ({
    width: imageWidth * scale.value,
    height: imageHeight * scale.value,
  }));

  const line = (
    <Pressable
      onPress={() => {
        setIsLineActive((prev) => !prev);
      }}
      style={styles.item}
      hitSlop={32}
    >
      <Animated.View style={[styles.lineContainer, containerAnimStyle]}>
        <Animated.View style={[styles.line, animStyle]}>
          {isLineActive && (
            <Pressable>
              <Animated.View entering={FadeIn} exiting={FadeOut}>
                <AddCircleIcon
                  width={LINE_BUTTON_SIZE}
                  height={LINE_BUTTON_SIZE}
                />
              </Animated.View>
            </Pressable>
          )}
        </Animated.View>
      </Animated.View>
    </Pressable>
  );

  return (
    <GestureDetector gesture={pinchGeature}>
      <ScaleDecorator>
        {editable && index !== 0 && line}
        <Pressable
          style={[
            /* eslint-disable-next-line react-native/no-inline-styles */
            {
              transform: [
                {
                  translateY: item.location * width,
                },
              ],
              marginHorizontal: editable ? 24 : 16,
            },
            styles.item,
          ]}
          onLongPress={editable ? drag : undefined}
        >
          <Animated.Image
            source={{ uri: item.imageUri }}
            style={imageAnimStyle}
          />
        </Pressable>
      </ScaleDecorator>
    </GestureDetector>
  );
};

interface Props {
  pictures: PictureInfo[];
  editable?: boolean;
  setPictures?: (newData: PictureInfo[]) => void;
  onDragEnd?: (absoluteX: number, absoluteY: number) => void;
}

const keyExtractor = (item: PictureInfo) => item.imageUri;

const FloorPictureList = ({
  pictures,
  editable,
  setPictures,
  onDragEnd,
}: Props) => {
  const absoluteX = useRef<SharedValue<number>>();
  const absoluteY = useRef<SharedValue<number>>();
  const translateY = useRef<SharedValue<number>>();
  const activeIndexAnim = useRef<SharedValue<number>>();

  const isDragging = useDerivedValue(
    () => activeIndexAnim.current?.value !== -1,
  );

  const renderItem = useCallback(
    (props: RenderItemParams<PictureInfo>) => (
      <FloorPicture {...props} isDragging={isDragging} editable={editable} />
    ),
    [isDragging, editable],
  );

  return (
    <DraggableFlatList
      data={pictures}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal
      onDragEnd={({ data: newData, from, to }) => {
        const newPictures = newData.map((picture, index) =>
          // 순서를 바꾸지 않고 움직이기만 하면 y축 위치 변경
          index === to && from === to && translateY.current?.value !== undefined
            ? {
                ...picture,
                location: picture.location + translateY.current.value / width,
              }
            : // 순서가 바뀌면 y축 변화 무시
              picture,
        );

        setPictures?.(newPictures);
        onDragEnd?.(
          absoluteX.current?.value ?? 0,
          absoluteY.current?.value ?? 0,
        );
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
    />
  );
};

export default FloorPictureList;
