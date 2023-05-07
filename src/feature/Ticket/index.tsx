/* eslint-disable global-require */
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback } from 'react';
import {
  ImageBackground,
  View,
  Image,
  StyleSheet,
  Pressable,
  Text,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { HomeFloor } from '@/apis/floor';
import FlipIcon from '@/assets/icons/Flip';
import FlipBackIcon from '@/assets/icons/FlipBack';
import { Profile } from '@/components';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import { formatDate } from '@/services/date/format';

const styles = StyleSheet.create({
  back: {
    backfaceVisibility: 'hidden',
    flex: 1,
  },
  badge: {
    borderRadius: 5,
    paddingHorizontal: 8,
    position: 'absolute',
    right: 20,
    top: 36,
  },
  badge_text: {
    color: COLOR.mono.white,
  },
  bottom: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    height: 420,
    width: 210,
  },
  exhibition_name: {
    color: COLOR.mono.white,
  },
  flip: {
    bottom: 30,
    position: 'absolute',
    right: 20,
  },
  floor_name: {
    color: COLOR.mono.gray4,
  },
  front: {
    backfaceVisibility: 'hidden',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  img: {
    flex: 1,
  },
  key: {
    color: COLOR.mono.gray1,
    opacity: 0.3,
  },
  user_id: {
    color: COLOR.mono.white,
    lineHeight: 16,
    marginLeft: 5,
  },
  value: {
    color: COLOR.mono.white,
    marginBottom: 12,
  },
  wrap_back: {
    bottom: 0,
    left: 0,
    paddingHorizontal: 20,
    paddingTop: 36,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  wrap_front: {
    bottom: 0,
    height: 100,
    left: 0,
    paddingHorizontal: 10,
    position: 'absolute',
    right: 0,
  },
  wrap_profile: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
});

export interface TicketProps extends HomeFloor {
  onPress?: (floorNo: number) => void;
  onProfilePress?: (userNo: number) => void;
}

const Ticket = ({ onPress, onProfilePress, ...floor }: TicketProps) => {
  const spin = useSharedValue<number>(0);
  const handleFloorPress = () => {
    onPress?.(floor.floorNo);
  };

  const handleProfilePress = () => {
    onProfilePress?.(floor.userNo);
  };

  const toggle = useCallback(() => {
    spin.value = spin.value ? 0 : 1;
  }, [spin]);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
      zIndex: spin.value === 0 ? 50 : 0,
    };
  }, []);
  const backAnimatedStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
      zIndex: spin.value === 0 ? 0 : 50,
    };
  }, []);

  const renderFront = () => (
    <Animated.View style={[styles.front, frontAnimatedStyle]}>
      <View style={styles.container}>
        <FastImage
          source={{
            uri: floor.thumbnailUrl,
          }}
          style={styles.wrap_back}
        />
        <LinearGradient
          style={styles.wrap_back}
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']}
          start={{ x: 0.5, y: 0.65 }}
        />
        <Image
          source={require('@/assets/images/ticket.png')}
          style={styles.img}
        />
        <View style={styles.wrap_front}>
          <Text style={[TEXT_STYLE.body16M, styles.exhibition_name]}>
            {floor.floorName}
          </Text>
          <Text style={[TEXT_STYLE.body12R, styles.floor_name]}>
            {floor.exhibitionName}
          </Text>
          <View style={styles.bottom}>
            <Pressable style={styles.wrap_profile} onPress={handleProfilePress}>
              <Profile imageUrl={floor.profileImageUrl} size={20} />
              <Text style={[TEXT_STYLE.body16M, styles.user_id]}>
                {floor.id}
              </Text>
            </Pressable>
          </View>
        </View>
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
            <Text style={[TEXT_STYLE.body12M, styles.badge_text]}>
              {floor.isNew ? 'NEW' : floor.updateCount}
            </Text>
          </View>
        )}
      </View>
      <Pressable style={styles.flip} onPress={toggle}>
        <FlipIcon />
      </Pressable>
    </Animated.View>
  );

  const renderBack = () => (
    <Animated.View style={[styles.back, backAnimatedStyle]}>
      <ImageBackground
        source={{
          uri: floor.thumbnailUrl,
        }}
        style={styles.container}
      >
        <LinearGradient
          style={styles.wrap_back}
          colors={['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.8)']}
        />
        <LinearGradient
          style={styles.wrap_back}
          colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.3)']}
        />
        <Image
          source={require('@/assets/images/ticket.png')}
          style={styles.img}
        />
        <View style={styles.wrap_back}>
          <Text style={[TEXT_STYLE.body12R, styles.key]}>Floor</Text>
          <Text style={[TEXT_STYLE.body16M, styles.value]}>
            {floor.floorName}
          </Text>
          <Text style={[TEXT_STYLE.body12R, styles.key]}>Exhibition</Text>
          <Text style={[TEXT_STYLE.body12R, styles.value]}>
            {floor.exhibitionName}
          </Text>
          <Text style={[TEXT_STYLE.body12R, styles.key]}>Artist</Text>
          <Text style={[TEXT_STYLE.body12R, styles.value]}>{floor.id}</Text>
          <Text style={[TEXT_STYLE.body12R, styles.key]}>About</Text>
          <Text style={[TEXT_STYLE.body12R, styles.value]}>
            {floor.floorDescription}
          </Text>
          <Text style={[TEXT_STYLE.body12R, styles.key]}>Updated</Text>
          <Text style={[TEXT_STYLE.body12R, styles.value]}>
            {formatDate(new Date(floor.updatedAt), '.')}
          </Text>
        </View>
      </ImageBackground>
      <Pressable style={styles.flip} onPress={toggle}>
        <FlipBackIcon />
      </Pressable>
    </Animated.View>
  );

  return (
    <Pressable style={styles.container} onPress={handleFloorPress}>
      <Animated.View style={styles.container}>
        {renderFront()}
        {renderBack()}
      </Animated.View>
    </Pressable>
  );
};

export default Ticket;
