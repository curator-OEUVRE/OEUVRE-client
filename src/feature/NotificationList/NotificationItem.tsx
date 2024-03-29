import React, { ReactNode } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { Profile } from '@/components/Profile';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import { formatDateStrToKorean } from '@/services/date/format';
import { Notification } from '@/types/notification';

interface NotificationItemProps {
  notification: Notification;
  footer: React.ReactNode;
  onPress?: (notification: Notification) => void;
  onPressProfile?: (userNo: number) => void;
  text: string | ReactNode;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    paddingHorizontal: 20,
    paddingVertical: 12,
    width: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 12,
    marginRight: 4,
  },
  date: {
    color: COLOR.mono.gray5,
  },
  new: {
    backgroundColor: COLOR.notification.blue,
  },
  right: {
    flexDirection: 'row',
    flex: 1,
  },
  text: {
    color: COLOR.mono.black,
    lineHeight: 18,
    marginBottom: 2,
  },
  wrapDate: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});

const NotificationItem = ({
  notification,
  footer,
  onPress,
  onPressProfile,
  text,
}: NotificationItemProps) => {
  const { profileImageUrl, sendUserNo, createdAt, isRead } = notification;
  return (
    <View style={[styles.container, !isRead && styles.new]}>
      <Pressable onPress={() => onPressProfile?.(sendUserNo)}>
        <Profile imageUrl={profileImageUrl} size={56} />
      </Pressable>
      <Pressable style={styles.right} onPress={() => onPress?.(notification)}>
        <View style={styles.content}>
          {typeof text === 'string' ? (
            <Text style={[TEXT_STYLE.body14M, styles.text]}>{text}</Text>
          ) : (
            text
          )}
          {footer}
        </View>
        <View style={styles.wrapDate}>
          <Text style={[styles.date, TEXT_STYLE.body12M]}>
            {formatDateStrToKorean(createdAt)}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default NotificationItem;
