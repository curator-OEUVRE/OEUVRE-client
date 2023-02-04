import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { COLOR, TEXT_STYLE } from '@/constants/styles';

interface Props {
  text: string;
  style?: ViewStyle;
  onPressTag?: (tag: string) => void;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLOR.mono.gray7,
    borderRadius: 21,
    flexDirection: 'row',
    height: 26,
    paddingHorizontal: 10,
  },
  text: {
    color: COLOR.mono.white,
  },
});

export const Tag = ({ text, style, onPressTag }: Props) => (
  <Pressable
    style={[styles.container, style]}
    onPress={() => {
      onPressTag?.(text);
    }}
  >
    <Text style={[styles.text, TEXT_STYLE.body16R]}>{text}</Text>
  </Pressable>
);
