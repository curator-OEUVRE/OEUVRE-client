import React, { useCallback } from 'react';
import {
  FlatList,
  Text,
  ListRenderItemInfo,
  StyleSheet,
  Pressable,
  View,
} from 'react-native';
import NotificationItem from './NotificationItem';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import FollowButton from '@/feature/FollowButton';
import { Notification } from '@/types/notification';

interface NotificationListProps {
  data: Notification[];
  onPress?: (notification: Notification) => void;
  onPressProfile?: (userNo: number) => void;
  onPressFollow?: (isFollowing: boolean, userNo: number) => void;
  onEndReached?: () => void;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  notiText: {
    color: COLOR.mono.black,
    lineHeight: 18,
  },
  notiTextWrap: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  text: {
    color: COLOR.mono.gray5,
  },
});

const BasicText = ({
  id,
  text,
  userNo,
  onIdPress,
}: {
  id: string;
  text: string;
  userNo: number;
  onIdPress?: (userNo: number) => void;
}) => (
  <View style={styles.notiTextWrap}>
    <Pressable
      onPress={() => {
        onIdPress?.(userNo);
      }}
    >
      <Text style={[TEXT_STYLE.body14B, styles.notiText]}>{id}</Text>
    </Pressable>
    <Text style={[TEXT_STYLE.body14M, styles.notiText]}>{text}</Text>
  </View>
);

const keyExtractor = (item: Notification, index: number) =>
  `notification_${item.type}_${index}`;

const NotificationList = ({
  data,
  onPress,
  onPressProfile,
  onPressFollow,
  onEndReached,
}: NotificationListProps) => {
  const renderFooter = useCallback(
    (notification: Notification) => {
      const { type, comment, isFollowing, sendUserNo } = notification;
      switch (type) {
        case 'FOLLOWING':
          if (isFollowing === null) return undefined;
          return (
            <FollowButton
              isFollowing={isFollowing}
              onPress={() => {
                onPressFollow?.(isFollowing, sendUserNo);
              }}
            />
          );
        case 'LIKES':
          return undefined;
        case 'COMMENT':
          return (
            <Text style={[styles.text, TEXT_STYLE.body14M]}>{comment}</Text>
          );
        default:
          return undefined;
      }
    },
    [onPressFollow],
  );

  const getText = useCallback(
    (notification: Notification) => {
      const { type, id, sendUserNo } = notification;
      switch (type) {
        case 'FOLLOWING':
          return (
            <BasicText
              id={id ?? ''}
              text="님이 작가님을 팔로우하기 시작했어요"
              onIdPress={onPressProfile}
              userNo={sendUserNo}
            />
          );
        case 'LIKES':
          return (
            <BasicText
              id={id ?? ''}
              text="님이 작가님의 사진을 좋아해요"
              onIdPress={onPressProfile}
              userNo={sendUserNo}
            />
          );
        case 'COMMENT':
          return (
            <BasicText
              id={id ?? ''}
              text="님이 작가님의 전시에 방명록을 남겼어요"
              onIdPress={onPressProfile}
              userNo={sendUserNo}
            />
          );
        default:
          return '';
      }
    },
    [onPressProfile],
  );
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Notification>) => (
      <NotificationItem
        notification={item}
        onPress={onPress}
        onPressProfile={onPressProfile}
        footer={renderFooter(item)}
        text={getText(item)}
      />
    ),
    [onPress, onPressProfile, getText, renderFooter],
  );
  return (
    <FlatList
      style={styles.container}
      renderItem={renderItem}
      data={data}
      onEndReachedThreshold={0.2}
      onEndReached={onEndReached}
      maxToRenderPerBatch={10}
      initialNumToRender={10}
      windowSize={10}
      keyExtractor={keyExtractor}
    />
  );
};

export default NotificationList;
