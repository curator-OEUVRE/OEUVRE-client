import {
  View,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import type { HomeFloor } from '@/apis/floor';
import DashLine from '@/assets/icons/DashLine';
import { Profile } from '@/components/Profile';
import { COLOR, TEXT_STYLE } from '@/constants/styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  content: {
    backgroundColor: COLOR.mono.white,
    width: 190,
  },
  contentInner: {
    flex: 1,
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingVertical: 8,
    width: '100%',
  },
  dash: {
    position: 'absolute',
  },
  exhibitionArea: {
    flexDirection: 'row',
  },
  exhibitionText: {
    color: COLOR.mono.gray3,
    marginLeft: 4,
  },
  profile: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  profileText: {
    marginLeft: 8,
  },
  queueText: {
    color: COLOR.mono.gray3,
  },
  /* eslint-disable-next-line react-native/no-color-literals */
  shadow: {
    elevation: 6,
    overflow: 'visible',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  thumbnail: {
    zIndex: -1,
  },
});

interface Props extends HomeFloor {
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: (floorNo: number) => void;
  onProfilePress?: (userNo: number) => void;
}

const FloorTicket = ({
  containerStyle,
  onPress,
  onProfilePress,
  ...floor
}: Props) => {
  const { height } = useWindowDimensions();

  const handleFloorPress = () => {
    onPress?.(floor.floorNo);
  };

  const handleProfilePress = () => {
    onProfilePress?.(floor.userNo);
  };

  return (
    <Pressable onPress={handleFloorPress} style={containerStyle}>
      <View style={[styles.container, styles.shadow, { height: height * 0.2 }]}>
        <View style={styles.content}>
          <View style={styles.contentInner}>
            <View>
              <Text style={TEXT_STYLE.body16M}>{floor.floorName}</Text>
              <View style={styles.exhibitionArea}>
                <Text style={[TEXT_STYLE.body12R, styles.queueText]}>
                  {floor.queue}
                </Text>
                <Text style={[TEXT_STYLE.body12R, styles.exhibitionText]}>
                  {floor.exhibitionName}
                </Text>
              </View>
            </View>
            <Pressable onPress={handleProfilePress} style={styles.profile}>
              <Profile imageUrl={floor.profileImageUrl} size={25} />
              <Text style={[TEXT_STYLE.body12M, styles.profileText]}>
                {floor.id}
              </Text>
            </Pressable>
          </View>
        </View>
        <View
          style={{
            width: (floor.width / floor.height) * height * 0.2,
            height: height * 0.2,
          }}
        >
          <DashLine
            style={styles.dash}
            color={COLOR.mono.white}
            height={height * 0.2}
          />
          <FastImage
            source={{ uri: floor.thumbnailUrl }}
            style={[
              styles.thumbnail,
              {
                width: (floor.width / floor.height) * height * 0.2,
                height: height * 0.2,
              },
            ]}
            resizeMode="contain"
          />
        </View>
      </View>
    </Pressable>
  );
};

export default FloorTicket;
