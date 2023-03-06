import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { IconButton } from './IconButton';

interface ButtonProps extends PressableProps {
  icon?: React.ReactNode;
  backgroundColor?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

const defaultBackgroundColor = '#22292E';
const disabledBackgroundColor = '#D3D4D5';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 10,
    height: 48,
    justifyContent: 'center',
    position: 'relative',
    width: 335,
  },
  icon: {
    height: '100%',
    justifyContent: 'center',
    left: 16,
    position: 'absolute',
    top: 0,
  },
});

const Button = ({
  children,
  icon,
  onPress,
  backgroundColor,
  disabled = false,
  style,
  ...defaultProps
}: ButtonProps) => (
  <Pressable
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...defaultProps}
    disabled={disabled}
    style={[
      style,
      styles.container,
      {
        backgroundColor: disabled
          ? disabledBackgroundColor
          : backgroundColor ?? defaultBackgroundColor,
      },
    ]}
    onPress={onPress}
  >
    <>
      {icon && <View style={styles.icon}>{icon}</View>}
      {children}
    </>
  </Pressable>
);

export { Button, IconButton };
