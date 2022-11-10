import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import AlertIcon from '@/assets/icons/Alert';
import TrashIcon from '@/assets/icons/Trash';
import { Profile } from '@/components';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import { useDimensions } from '@/hooks/useDimensions';
import { formatCreatedAt } from '@/services/date/format';
import { GuestBookInfo } from '@/types/guestbook';

interface GustBookItemProps {
  data: GuestBookInfo;
  deleteItem: () => void;
  reportItem: () => void;
  onPressProfile?: (userNo: number) => void;
}

const BUTTON_SIZE = 60;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  comment: {
    color: COLOR.mono.gray7,
    flexShrink: 1,
    lineHeight: 18,
  },
  container: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  date: {
    color: COLOR.mono.gray5,
  },
  left: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  right: {
    flexDirection: 'row',
  },
  wrapComment: {
    flex: 1,
    marginLeft: 4,
  },
});

const GustBookItem = ({
  data,
  deleteItem,
  reportItem,
  onPressProfile,
}: GustBookItemProps) => {
  const { comment, isMine, userId, createdAt, profileImageUrl, userNo } = data;
  const position = useSharedValue(0);
  const { width: windowWidth } = useDimensions();
  const buttonAreaWidth = isMine ? BUTTON_SIZE * 2 : BUTTON_SIZE;
  const width = windowWidth + buttonAreaWidth;
  const isOpen = useSharedValue(false);
  const flingLeftGesture = Gesture.Fling()
    .direction(Directions.LEFT)
    .onStart(() => {
      if (isOpen.value) return;
      position.value = withTiming(position.value - buttonAreaWidth, {
        duration: 100,
      });
      isOpen.value = !isOpen.value;
    });
  const flingRightGesture = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onStart(() => {
      if (!isOpen.value) return;
      position.value = withTiming(position.value + buttonAreaWidth, {
        duration: 100,
      });
      isOpen.value = !isOpen.value;
    });
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));
  const composed = Gesture.Simultaneous(flingLeftGesture, flingRightGesture);

  const reportButton = (
    <Pressable
      style={[styles.button, { backgroundColor: COLOR.mono.gray3 }]}
      onPress={reportItem}
    >
      <AlertIcon color={COLOR.mono.white} />
    </Pressable>
  );

  const deleteButton = (
    <Pressable
      style={[styles.button, { backgroundColor: COLOR.system.red }]}
      onPress={deleteItem}
    >
      <TrashIcon color={COLOR.mono.white} />
    </Pressable>
  );

  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={[styles.container, animatedStyle, { width }]}>
        <View style={[{ width: windowWidth }, styles.left]}>
          <Pressable onPress={() => onPressProfile?.(userNo)}>
            <Profile size={30} imageUrl={profileImageUrl} />
          </Pressable>
          <View style={styles.wrapComment}>
            <Text style={[styles.comment, TEXT_STYLE.body12R]}>
              <Text style={TEXT_STYLE.body12B}>{userId} </Text>
              {comment}
            </Text>
            <Text style={[styles.date, TEXT_STYLE.body12R]}>
              {formatCreatedAt(createdAt)}
            </Text>
          </View>
        </View>
        <View style={[{ width: buttonAreaWidth }, styles.right]}>
          {reportButton}
          {isMine && deleteButton}
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

export default GustBookItem;
