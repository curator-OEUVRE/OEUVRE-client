import { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ListRenderItemInfo,
  FlatList,
} from 'react-native';
import { Profile } from '@/components/Profile';
import { TEXT_STYLE, COLOR } from '@/constants/styles';
import type { UserMini } from '@/types/user';

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLOR.mono.gray7,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    marginBottom: 24,
    width: '100%',
  },
  content: {
    flexDirection: 'row',
  },
  flatListContentContainer: {
    marginHorizontal: 20,
    marginTop: 24,
  },
  followingButton: {
    backgroundColor: COLOR.mono.white,
    borderColor: COLOR.mono.gray4,
    borderWidth: 1,
  },
  idText: {
    marginBottom: 4,
  },
  textArea: {
    justifyContent: 'center',
    marginLeft: 12,
  },
});

interface FollowerListItemProps extends UserMini {
  onFollowPress?: (isFollowing: boolean, userNo: number) => void;
  onPress?: (userNo: number) => void;
}

const FollowerListItem = ({
  onFollowPress,
  onPress,
  ...user
}: FollowerListItemProps) => {
  const buttonStyle = user.isFollowing
    ? {
        ...styles.button,
        ...styles.followingButton,
      }
    : styles.button;

  const text = useMemo(() => {
    if (user.isFollowing) return '팔로잉';
    if (user.isFollower) return '맞팔로우';
    return '팔로우';
  }, [user.isFollowing, user.isFollower]);

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        onPress?.(user.userNo);
      }}
    >
      <View style={styles.content}>
        <Profile imageUrl={user.profileImageUrl} size={50} />
        <View style={styles.textArea}>
          <Text style={[TEXT_STYLE.body14B, styles.idText]}>{user.id}</Text>
          <Text style={TEXT_STYLE.body14M}>{user.name}</Text>
        </View>
      </View>
      {!user.isMe && (
        <Pressable
          style={buttonStyle}
          onPress={() => {
            onFollowPress?.(user.isFollowing, user.userNo);
          }}
        >
          <Text
            style={[
              TEXT_STYLE.body12M,
              { color: user.isFollowing ? COLOR.mono.gray4 : COLOR.mono.white },
            ]}
          >
            {text}
          </Text>
        </Pressable>
      )}
    </Pressable>
  );
};

interface Props {
  users: UserMini[];
  refreshing?: boolean;
  onRefresh?: () => void;
  onEndReached?: () => void;
  onFollowPress?: (isFollowing: boolean, userNo: number) => void;
  onPress?: (userNo: number) => void;
}

const keyExtractor = (item: UserMini) => `${item.id}`;

const FollowerList = ({
  users,
  onFollowPress,
  refreshing,
  onRefresh,
  onEndReached,
  onPress,
}: Props) => {
  const renderItem = useCallback(
    (props: ListRenderItemInfo<UserMini>) => (
      <FollowerListItem
        {...props.item}
        onFollowPress={onFollowPress}
        onPress={onPress}
      />
    ),
    [onFollowPress, onPress],
  );

  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      contentContainerStyle={styles.flatListContentContainer}
      keyExtractor={keyExtractor}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

export default FollowerList;
