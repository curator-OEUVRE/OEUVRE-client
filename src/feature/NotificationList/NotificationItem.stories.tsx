import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import FollowButton from '../FollowButton';
import NotificationItem from './NotificationItem';
import { Notification } from '@/types/notification';

const data: Notification[] = [
  {
    type: 'FOLLOWING',
    sendUserNo: 16,
    id: 'leolim',
    profileImageUrl:
      'https://firebasestorage.googleapis.com/v0/b/oeuvre-b2a8f.appspot.com/o/Profile%2Fleolim?alt=media&token=9e93f38a-4d01-40c5-9a64-b3bd6268e042',
    isFollowing: false,
    floorNo: null,
    pictureNo: null,
    commentNo: null,
    comment: null,
    isRead: true,
    createdAt: '2022-11-14 18:55:02.216',
  },
];

storiesOf('NotificationItem', module)
  .addDecorator(withKnobs)
  .add('following', () => (
    <NotificationItem
      notification={data[0]}
      footer={<FollowButton isFollowing={false} onPress={action('onPress')} />}
      onPress={action('onPress')}
      onPressProfile={action('onPressProfile')}
      text="열심히입력중인모습입님이 작가님을 팔로우하기 시작했어요"
    />
  ));
