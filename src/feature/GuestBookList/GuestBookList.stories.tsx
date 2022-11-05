import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { useState } from 'react';
import GuestBookList from '.';

const comments = [
  {
    comment:
      '사진 느낌이 너무 좋네요, 잘봤어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구',
    commentNo: 0,
    createdAt: '2022-11-03T10:12:57.633314',
    isMine: true,
    profileImageUrl:
      'https://firebasestorage.googleapis.com/v0/b/oeuvre-b2a8f.appspot.com/o/Profile%2Fyuda1124?alt=media&token=9288d018-8714-4917-9d0c-3b577ed8402c',
    userId: 'yuda1124',
    userNo: 4,
  },
  {
    comment: '사진 느낌이 너무 좋네요',
    commentNo: 2,
    createdAt: '2022-11-03T10:12:57.633314',
    isMine: false,
    profileImageUrl:
      'https://firebasestorage.googleapis.com/v0/b/oeuvre-b2a8f.appspot.com/o/Profile%2Fyuda1124?alt=media&token=9288d018-8714-4917-9d0c-3b577ed8402c',
    userId: 'yuda1124',
    userNo: 4,
  },
  {
    comment:
      '사진 느낌이 너무 좋네요, 잘봤어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구',
    commentNo: 1,
    createdAt: '2022-11-03T10:12:57.633314',
    isMine: false,
    profileImageUrl:
      'https://firebasestorage.googleapis.com/v0/b/oeuvre-b2a8f.appspot.com/o/Profile%2Fyuda1124?alt=media&token=9288d018-8714-4917-9d0c-3b577ed8402c',
    userId: 'yuda1124',
    userNo: 4,
  },
];

const Component = () => {
  const [data, setData] = useState(comments);

  return (
    <GuestBookList
      data={data}
      onDelete={(i) => {
        setData((prev) => [...prev.slice(0, i), ...prev.slice(i + 1)]);
      }}
      onReport={() => {}}
      fetchMore={() => {}}
      isLoading={false}
    />
  );
};

storiesOf('GuestBookList', module)
  .addDecorator(withKnobs)
  .add('default', () => <Component />);
