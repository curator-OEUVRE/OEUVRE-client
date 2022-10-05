import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
  PressableProps,
  ViewStyle,
} from 'react-native';

interface ButtonProps extends PressableProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
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
    style={[
      styles.container,
      {
        backgroundColor: disabled
          ? disabledBackgroundColor
          : backgroundColor ?? defaultBackgroundColor,
      },
      style,
    ]}
    onPress={onPress}
  >
    {icon && <View style={styles.icon}>{icon}</View>}
    {children}
  </Pressable>
);

export { Button };
