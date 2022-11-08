import { useMemo } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import PencilIcon from '@/assets/icons/Pencil';
import { COLOR, TEXT_STYLE } from '@/constants/styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 98,
    paddingHorizontal: 20,
    width: '100%',
  },
  followButton: {
    alignItems: 'center',
    backgroundColor: COLOR.mono.gray7,
    borderRadius: 5,
    height: 18,
    justifyContent: 'center',
    marginLeft: 4,
    paddingHorizontal: 8,
  },
  idText: {
    color: COLOR.mono.gray4,
  },
  introduceMessageText: {
    color: COLOR.mono.gray7,
    marginTop: 4,
  },
  nameArea: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  nameText: {
    color: COLOR.mono.gray7,
  },
  profileContent: {
    paddingTop: 25,
  },
  profileImage: {
    borderRadius: 45,
    height: 90,
    marginRight: 12,
    width: 90,
  },
  unfollowButton: {
    alignItems: 'center',
    borderColor: COLOR.mono.gray4,
    borderRadius: 5,
    borderWidth: 1,
    height: 18,
    justifyContent: 'center',
    marginLeft: 4,
    paddingHorizontal: 8,
  },
});

interface Props {
  profileImageUrl: string;
  name: string;
  id: string;
  introduceMessage?: string;
  style?: StyleProp<ViewStyle>;
  onEditPress?: () => void;
  onFollowPress?: (isFollowing: boolean) => void;
  onImagePress?: () => void;
  isFollowing?: boolean;
  isFollower?: boolean;
}

const ProfileCard = ({
  profileImageUrl,
  name,
  id,
  introduceMessage,
  style,
  onEditPress,
  onFollowPress,
  onImagePress,
  isFollowing,
  isFollower,
}: Props) => {
  const followButtonText = useMemo(() => {
    if (isFollowing) return '팔로잉';
    if (isFollower) return '맞팔로우';
    return '팔로우';
  }, [isFollowing, isFollower]);

  return (
    <View style={[styles.container, style]}>
      <Pressable onPress={onImagePress}>
        <FastImage
          style={styles.profileImage}
          source={{ uri: profileImageUrl }}
        />
      </Pressable>

      <View style={styles.profileContent}>
        <View style={styles.nameArea}>
          <Text style={[TEXT_STYLE.body14B, styles.nameText]}>{name}</Text>
          {onEditPress && (
            <Pressable onPress={onEditPress}>
              <PencilIcon color={COLOR.mono.gray3} />
            </Pressable>
          )}
          {onFollowPress && (
            <Pressable
              onPress={() => {
                onFollowPress(isFollowing ?? false);
              }}
              style={isFollowing ? styles.unfollowButton : styles.followButton}
            >
              <Text
                style={[
                  TEXT_STYLE.body12M,
                  { color: isFollowing ? COLOR.mono.gray4 : COLOR.mono.white },
                ]}
              >
                {followButtonText}
              </Text>
            </Pressable>
          )}
        </View>
        <Text style={[TEXT_STYLE.body14R, styles.idText]}>{id}</Text>
        {introduceMessage && (
          <Text style={[TEXT_STYLE.body12M, styles.introduceMessageText]}>
            {introduceMessage}
          </Text>
        )}
      </View>
    </View>
  );
};

export default ProfileCard;
