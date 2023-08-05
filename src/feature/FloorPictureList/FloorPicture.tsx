import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode, useMemo } from 'react';
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
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Shadow } from 'react-native-shadow-2';
import { SharedElement } from 'react-navigation-shared-element';
import AddCircleIcon from '@/assets/icons/AddCircle';
import CloseFilledIcon from '@/assets/icons/CloseFilled';
import PencilIcon from '@/assets/icons/Pencil';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import useDimensions from '@/hooks/useDimensions';
import { FloorAlignment } from '@/types/floor';
import type { Picture } from '@/types/picture';

// @ts-ignore
const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

const LINE_BUTTON_SIZE = 40;

const styles = StyleSheet.create({
  delete: {
    position: 'absolute',
    right: -13,
    top: -13,
    zIndex: 100,
  },
  editLayer: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    overflow: 'visible',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  item: {
    marginHorizontal: 36,
    paddingTop: 13,
  },

  line: {
    alignItems: 'center',
    backgroundColor: COLOR.mono.gray3,
    height: '100%',
    justifyContent: 'center',
  },
  lineContainer: {
    alignSelf: 'center',
    flex: 1,
  },
  shadow: {
    elevation: 20,
    overflow: 'visible',
    shadowColor: COLOR.mono.black,
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

interface FloorPictureProps extends RenderItemParams<Picture> {
  isDragging: SharedValue<boolean>;
  editable?: boolean;
  activeLine: number;
  activeIndexAnim?: SharedValue<number>;
  setActiveLine: (line: number) => void;
  addPictures?: (index: number) => void;
  onPressPicture?: (picture: Picture) => void;
  onPressDelete?: (picture: Picture) => void;
  color?: string;
  renderDescription?: (picture: Picture) => ReactNode;
  pictureAddable?: boolean;
  onPinchEnd?: (index: number, scale: number) => void;
  alignment?: FloorAlignment;
  isPinching?: SharedValue<boolean>;
}

const ALIGNMENT = {
  [FloorAlignment.TOP]: 'flex-start',
  [FloorAlignment.CENTER]: 'center',
  [FloorAlignment.BOTTOM]: 'flex-end',
} as const;

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
  renderDescription,
  onPressDelete,
  pictureAddable = true,
  onPinchEnd,
  alignment,
  isPinching,
}: FloorPictureProps) => {
  const { width, height } = useDimensions();
  const BASE_SIZE = width < height ? width : height - 160;
  const imageWidth = useMemo(
    () => BASE_SIZE * item.width,
    [item.width, BASE_SIZE],
  );
  const imageHeight = useMemo(
    () => BASE_SIZE * item.height,
    [item.height, BASE_SIZE],
  );

  const scale = useSharedValue(1);

  const index = getIndex();
  const isLineActive = useMemo(() => activeLine === index, [activeLine, index]);

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
        if (isPinching !== undefined) {
          // eslint-disable-next-line no-param-reassign
          isPinching.value = true;
        }
        if (e.scale * imageHeight <= BASE_SIZE) {
          scale.value = e.scale;
        }
      }
    })
    .onEnd(() => {
      if (editable) {
        if (isPinching !== undefined) {
          // eslint-disable-next-line no-param-reassign
          isPinching.value = false;
        }
        if (onPinchEnd && index !== undefined) {
          runOnJS(onPinchEnd)(index, scale.value);
          scale.value = 1;
        }
      }
    });

  const imageAnimStyle = useAnimatedStyle(() => ({
    width: imageWidth * scale.value,
    height: imageHeight * scale.value,
    opacity: isDragging.value && activeIndexAnim?.value === index ? 0.5 : 1,
  }));

  const line = (
    <Pressable
      onPress={() => {
        if (index !== undefined && pictureAddable) {
          setActiveLine(isLineActive ? -1 : index);
        }
      }}
      style={styles.item}
      hitSlop={32}
    >
      <Animated.View style={[styles.lineContainer, containerAnimStyle]}>
        <Animated.View style={[styles.line, animStyle]}>
          {isLineActive && (
            <Pressable onPress={() => addPictures?.(index ?? -1)}>
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
  const renderEditLayer = () => (
    <LinearGradient
      style={styles.editLayer}
      colors={['rgba(34, 41, 46, 0.2)', 'rgba(34, 41, 46, 0.2)']}
    >
      {onPressDelete && (
        <Pressable style={styles.delete} onPress={() => onPressDelete?.(item)}>
          <CloseFilledIcon width={26} height={26} color={COLOR.mono.white} />
        </Pressable>
      )}
      <PencilIcon color={COLOR.mono.white} width={40} height={40} />
    </LinearGradient>
  );
  return (
    <GestureDetector gesture={pinchGesture}>
      <ScaleDecorator>
        <View
          style={[
            /* eslint-disable-next-line react-native/no-inline-styles */
            {
              marginHorizontal: editable ? 24 : 16,
              transform: [
                {
                  translateY: item.location ?? 0 * BASE_SIZE,
                },
              ],
              alignSelf: alignment ? ALIGNMENT[alignment] : 'center',
            },
            styles.item,
          ]}
        >
          <Pressable
            onLongPress={editable ? drag : undefined}
            onPress={() => {
              onPressPicture?.(item);
            }}
            style={styles.shadow}
          >
            <SharedElement id={`picture.${index}`}>
              <AnimatedFastImage
                source={{ uri: item.imageUrl }}
                style={imageAnimStyle}
              />
            </SharedElement>
            {onPressPicture && editable && renderEditLayer()}
          </Pressable>
          {renderDescription ? (
            renderDescription(item)
          ) : (
            <Text style={[styles.text, TEXT_STYLE.body12R, { color }]}>
              {item.title}
            </Text>
          )}
        </View>
        {editable && line}
      </ScaleDecorator>
    </GestureDetector>
  );
};

export default FloorPicture;
