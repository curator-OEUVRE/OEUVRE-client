import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import FastImage from 'react-native-fast-image';
import { Gesture } from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeOut,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Shadow } from 'react-native-shadow-2';
import AddCircleIcon from '@/assets/icons/AddCircle';
import PencilIcon from '@/assets/icons/Pencil';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import useDimensions from '@/hooks/useDimensions';
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
  addPictures?: (index: number) => void;
  onPressPicture?: (pictureNo: number) => void;
  color?: string;
  renderDescription?: (picture: PictureInfo) => ReactNode;
  pictureAddable?: boolean;
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
  renderDescription,
  pictureAddable = true,
}: FloorPictureProps) => {
  const { height, width } = useDimensions();
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
        if (index !== undefined && pictureAddable) {
          setActiveLine(isLineActive ? -1 : index);
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
  const description =
    item.description.length > 20
      ? `${item.description.substring(0, 20)}...`
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
    <ScaleDecorator>
      <View
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
      >
        <Pressable
          onLongPress={editable ? drag : undefined}
          onPress={() => {
            onPressPicture?.(item.pictureNo);
          }}
        >
          <Shadow
            distance={5}
            offset={[2, 2]}
            startColor="#00000030"
            endColor="#00000000"
            paintInside
          >
            <AnimatedFastImage
              source={{ uri: item.imageUrl }}
              style={imageAnimStyle}
            />
            {onPressPicture && editable && renderEditLayer()}
          </Shadow>
        </Pressable>
        {renderDescription ? (
          renderDescription(item)
        ) : (
          <Text style={[styles.text, TEXT_STYLE.body12R, { color }]}>
            {description}
          </Text>
        )}
      </View>
      {editable && line}
    </ScaleDecorator>
  );
};

export default FloorPicture;
