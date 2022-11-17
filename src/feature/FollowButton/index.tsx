import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { COLOR, TEXT_STYLE } from '@/constants/styles';

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    backgroundColor: COLOR.mono.gray7,
    borderRadius: 5,
    height: 18,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  followingButton: {
    backgroundColor: COLOR.mono.white,
    borderColor: COLOR.mono.gray4,
    borderWidth: 1,
  },
});

interface FollowButtonProps {
  isFollowing: boolean;
  onPress?: () => void;
}

const FollowButton = ({ isFollowing, onPress }: FollowButtonProps) => {
  const buttonStyle = isFollowing
    ? {
        ...styles.button,
        ...styles.followingButton,
      }
    : styles.button;

  return (
    <Pressable
      style={buttonStyle}
      onPress={() => {
        onPress?.();
      }}
    >
      <Text
        style={[
          TEXT_STYLE.body12M,
          { color: isFollowing ? COLOR.mono.gray4 : COLOR.mono.white },
        ]}
      >
        {isFollowing ? '팔로잉' : '맞팔로우'}
      </Text>
    </Pressable>
  );
};

export default FollowButton;
