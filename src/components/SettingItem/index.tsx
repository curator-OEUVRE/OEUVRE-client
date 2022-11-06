import { ReactNode, useState } from 'react';
import {
  View,
  StyleSheet,
  Switch,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { COLOR, TEXT_STYLE } from '@/constants/styles';

interface Props {
  left: string | ReactNode;
  right: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const Base = ({ left, right, style }: Props) => (
  <View style={[styles.container, style]}>
    {typeof left === 'string' ? (
      <Text style={TEXT_STYLE.body14R}>{left}</Text>
    ) : (
      left
    )}
    {right}
  </View>
);

interface ToggleProps {
  left: string | ReactNode;
  isSelected: boolean;
  style?: StyleProp<ViewStyle>;
  onToggle?: () => void;
  disabled?: boolean;
}

const Toggle = ({
  left,
  isSelected,
  style,
  onToggle,
  disabled,
}: ToggleProps) => (
  <Base
    left={left}
    right={
      <Switch
        trackColor={{ false: COLOR.mono.gray2, true: COLOR.system.blue }}
        value={isSelected}
        onValueChange={onToggle}
        disabled={disabled}
      />
    }
    style={style}
  />
);

export const SettingItem = { Base, Toggle };
