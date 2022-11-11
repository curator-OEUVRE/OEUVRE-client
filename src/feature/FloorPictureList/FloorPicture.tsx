import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import FastImage from 'react-native-fast-image';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeOut,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import AddCircleIcon from '@/assets/icons/AddCircle';
import PencilIcon from '@/assets/icons/Pencil';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import useDimensions from '@/hooks/useDimensions';
import { FloorMode, useCreateFloorStore } from '@/states/createFloorStore';
import type { PictureInfo } from '@/types/picture';

// @ts-ignore
const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

const LINE_BUTTON_SIZE = 40;

const styles = StyleSheet.create({
  editLayer: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  item: {
    alignSelf: 'center',
  },
  line: {
    alignItems: 'center',
    backgroundColor: COLOR.mono.gray3,
    justifyContent: 'center',
  },
  lineContainer: {
    alignSelf: 'center',
  },
  // eslint-disable-next-line react-native/no-color-literals
  shadow: {
    elevation: 20,
    overflow: 'visible',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  text: {
    marginTop: 5,
    textAlign: 'center',
  },
});

interface FloorPictureProps extends RenderItemParams<PictureInfo> {
  isDragging: SharedValue<boolean>;
  editable?: boolean;
  activeLine: number;
  activeIndexAnim?: SharedValue<number>;
  setActiveLine: (line: number) => void;
  addPictures?: () => void;
  onPressPicture?: (pictureNo: number) => void;
  color?: string;
}

const FloorPicture = ({
  item,
  drag,
  isDragging,
  getIndex,
  editable = false,
  activeLine,
  setActiveLine,
  activeIndexAnim,
  addPictures,
  onPressPicture,
  color = COLOR.mono.gray7,
}: FloorPictureProps) => {
  const { height, width } = useDimensions();
  const { mode } = useCreateFloorStore();
  const BASE_SIZE = height > width ? width : height;
  const imageWidth = useMemo(
    () => BASE_SIZE * item.width,
    [item.width, BASE_SIZE],
  );
  const imageHeight = useMemo(
    () => BASE_SIZE * item.height,
    [item.height, BASE_SIZE],
  );
  const scale = useSharedValue(1);
  const tmpScale = useSharedValue(1);

  const index = getIndex();
  const isLineActive = useMemo(() => activeLine === index, [activeLine, index]);
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

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      if (editable) {
        tmpScale.value = e.scale;
      }
    })
    .onEnd((e) => {
      if (editable) {
        scale.value *= e.scale;
        tmpScale.value = 1;
      }
    });

  const imageAnimStyle = useAnimatedStyle(() => ({
    width: imageWidth * scale.value * tmpScale.value,
    height: imageHeight * scale.value * tmpScale.value,
    opacity: isDragging.value && activeIndexAnim?.value === index ? 0.5 : 1,
  }));

  const line = (
    <Pressable
      onPress={() => {
        if (index !== undefined) {
          setActiveLine(isLineActive ? 0 : index);
        }
      }}
      style={styles.item}
      hitSlop={32}
    >
      <Animated.View
        style={[
          styles.lineContainer,
          containerAnimStyle,
          { height: BASE_SIZE * 0.5 },
        ]}
      >
        <Animated.View
          style={[styles.line, animStyle, { height: BASE_SIZE * 0.5 }]}
        >
          {isLineActive && (
            <Pressable onPress={() => addPictures?.()}>
              <Animated.View entering={FadeIn} exiting={FadeOut}>
                <AddCircleIcon
                  width={LINE_BUTTON_SIZE}
                  height={LINE_BUTTON_SIZE}
                  color={COLOR.mono.gray7}
                />
              </Animated.View>
            </Pressable>
          )}
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
  const description =
    item.description.length > 10
      ? `${item.description.substring(0, 10)}...`
      : item.description;
  const renderEditLayer = () => (
    <LinearGradient
      style={styles.editLayer}
      colors={['rgba(34, 41, 46, 0.2)', 'rgba(34, 41, 46, 0.2)']}
    >
      <PencilIcon color={COLOR.mono.white} width={40} height={40} />
    </LinearGradient>
  );
  return (
    <GestureDetector gesture={pinchGesture}>
      <ScaleDecorator>
        {editable && index !== 0 && line}
        <Pressable
          style={[
            /* eslint-disable-next-line react-native/no-inline-styles */
            {
              marginHorizontal: editable ? 24 : 16,
              transform: [
                {
                  translateY: item.location * BASE_SIZE,
                },
              ],
            },
            styles.item,
          ]}
          onLongPress={editable ? drag : undefined}
          onPress={() => {
            onPressPicture?.(item.pictureNo);
          }}
        >
          <View style={styles.shadow}>
            <AnimatedFastImage
              source={{ uri: item.imageUrl }}
              style={imageAnimStyle}
            />
            {mode === FloorMode.EDIT && renderEditLayer()}
          </View>
          <Text style={[styles.text, TEXT_STYLE.body12R, { color }]}>
            {description}
          </Text>
        </Pressable>
      </ScaleDecorator>
    </GestureDetector>
  );
};

export default FloorPicture;
