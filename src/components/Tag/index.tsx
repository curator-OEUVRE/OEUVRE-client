import { View, Text, Pressable, StyleSheet, ViewStyle } from 'react-native';
import CloseIcon from '@/assets/icons/Close';
import { COLOR, TEXT_STYLE } from '@/constants/styles';

interface Props {
  text: string;
  style?: ViewStyle;
  onDeletePress?: () => void;
}

const styles = StyleSheet.create({
  closeButton: {
    height: 26,
    marginLeft: 4,
    width: 26,
  },
  container: {
    alignItems: 'center',
    backgroundColor: COLOR.mono.gray7,
    borderRadius: 21,
    flexDirection: 'row',
    height: 26,
  },
  text: {
    color: COLOR.mono.white,
  },
});

export const Tag = ({ text, style, onDeletePress }: Props) => (
  <View style={[styles.container, style]}>
    <Text style={[styles.text, TEXT_STYLE.body16R]}>
      {'  '}#{text}
    </Text>
    <Pressable style={styles.closeButton} onPress={onDeletePress}>
      <CloseIcon width={26} height={26} color={COLOR.mono.white} />
    </Pressable>
  </View>
);
