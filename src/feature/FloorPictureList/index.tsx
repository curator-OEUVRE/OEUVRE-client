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
}

const keyExtractor = (item: PictureInfo) => item.imageUri;

const FloorPictureList = ({ pictures, editable }: Props) => {
  const x = useRef<SharedValue<number>>();
  const y = useRef<SharedValue<number>>();
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

  const [data, setData] = useState(pictures);

  return (
    <DraggableFlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal
      onDragEnd={({ data: newData }) => {
        setData(newData);
      }}
      onAnimValInit={(animVals) => {
        x.current = animVals.x;
        y.current = animVals.y;
        activeIndexAnim.current = animVals.activeIndexAnim;
      }}
      style={styles.flatList}
      /* eslint-disable-next-line react-native/no-inline-styles */
      contentContainerStyle={{ paddingHorizontal: editable ? 36 : 44 }}
    />
  );
};

export default FloorPictureList;
