import React from 'react';
import { Pressable, PressableProps, ViewStyle, StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { COLOR } from '@/constants/styles';

interface IconButtonProps extends PressableProps {
  icon?: React.ReactNode;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
}

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  container: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
});

const IconButton = ({
  icon,
  style,
  containerStyle,
  ...defaultProps
}: IconButtonProps) => (
  <Shadow distance={2} startColor="#00000020" endColor="#00000000">
    <Pressable {...defaultProps} style={[styles.container, style]}>
      {icon}
    </Pressable>
  </Shadow>
);

export { IconButton };
