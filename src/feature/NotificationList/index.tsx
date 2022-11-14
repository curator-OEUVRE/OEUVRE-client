import React, { useCallback } from 'react';
import { FlatList, Text, ListRenderItemInfo, StyleSheet } from 'react-native';
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
  text: {
    color: COLOR.mono.black,
  },
});

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
            <Text style={[styles.text, TEXT_STYLE.body12M]}>{comment}</Text>
          );
        default:
          return undefined;
      }
    },
    [onPressFollow],
  );

  const getText = useCallback((notification: Notification) => {
    const { type, id } = notification;
    switch (type) {
      case 'FOLLOWING':
        return `${id}님이 작가님을 팔로우하기 시작했어요`;
      case 'LIKES':
        return `${id}님이 작가님의 사진을 좋아해요`;
      case 'COMMENT':
        return `${id}님이 작가님의 전시에 방명록을 남겼어요`;
      default:
        return '';
    }
  }, []);
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
