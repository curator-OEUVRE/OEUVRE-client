import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
  disabled?: boolean;
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
}: ButtonProps) => (
  <Pressable
    style={[
      styles.container,
      {
        backgroundColor: disabled
          ? disabledBackgroundColor
          : backgroundColor ?? defaultBackgroundColor,
      },
    ]}
    onPress={onPress}
  >
    {icon && <View style={styles.icon}>{icon}</View>}
    {children}
  </Pressable>
);

export { Button };
