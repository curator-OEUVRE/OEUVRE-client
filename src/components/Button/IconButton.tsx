import React from 'react';
import { Pressable, PressableProps, ViewStyle, StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { COLOR } from '@/constants/styles';

interface IconButtonProps extends PressableProps {
  icon?: React.ReactNode;
  style?: ViewStyle;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLOR.mono.white,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
});

const IconButton = ({ icon, style, ...defaultProps }: IconButtonProps) => (
  <Shadow distance={2} startColor="#00000020" endColor="#00000000">
    <Pressable {...defaultProps} style={[styles.container, style]}>
      {icon}
    </Pressable>
  </Shadow>
);

export { IconButton };
