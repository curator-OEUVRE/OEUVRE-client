import {
  View,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  type StyleProp,
  type ViewStyle,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Shadow } from 'react-native-shadow-2';
import DashLine from '@/assets/icons/DashLine';
import { Profile } from '@/components/Profile';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import type { HomeFloor } from '@/types/home';

const styles = StyleSheet.create({
  androidMargin: {
    marginLeft: 2,
    marginTop: 2,
  },
  badge: {
    borderRadius: 5,
    left: 8,
    paddingHorizontal: 8,
    position: 'absolute',
    top: 8,
  },
  badgeText: {
    color: COLOR.mono.white,
  },
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
      <Shadow
        distance={5}
        offset={[2, 2]}
        startColor="#00000020"
        endColor="#00000000"
        paintInside
        style={[
          styles.container,
          { height: height * 0.2 },
          Platform.OS === 'android' && styles.androidMargin,
        ]}
      >
        <View style={styles.content}>
          <View style={styles.contentInner}>
            <View>
              <Text style={TEXT_STYLE.body16M}>{floor.floorName}</Text>
              <View style={styles.exhibitionArea}>
                <Text style={[TEXT_STYLE.body12R, styles.queueText]}>
                  {floor.queue}F
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
          {(floor.isNew || floor.isUpdated) && (
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: floor.isNew
                    ? COLOR.mono.gray7
                    : COLOR.system.red,
                },
              ]}
            >
              <Text style={[TEXT_STYLE.body12M, styles.badgeText]}>
                {floor.isNew ? 'NEW' : floor.updateCount}
              </Text>
            </View>
          )}
        </View>
      </Shadow>
    </Pressable>
  );
};

export default FloorTicket;
