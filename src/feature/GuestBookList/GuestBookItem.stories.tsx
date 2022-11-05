import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import GuestBookItem from './GuestBookItem';

const comment = {
  comment:
    '사진 느낌이 너무 좋네요, 잘봤어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구',
  commentNo: 0,
  createdAt: '2022-11-03T10:12:57.633314',
  isMine: true,
  profileImageUrl:
    'https://firebasestorage.googleapis.com/v0/b/oeuvre-b2a8f.appspot.com/o/Profile%2Fyuda1124?alt=media&token=9288d018-8714-4917-9d0c-3b577ed8402c',
  userId: 'yuda1124',
  userNo: 4,
};

storiesOf('GuestBookItem', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <GuestBookItem data={comment} deleteItem={() => {}} reportItem={() => {}} />
  ));
