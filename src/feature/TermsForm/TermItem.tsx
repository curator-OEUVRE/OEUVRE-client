import type { ReactElement } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import ArrowBack from '@/assets/icons/ArrowBack';
import { Checkbox } from '@/components/Checkbox';
import { COLOR, TEXT_STYLE } from '@/constants/styles';

const styles = StyleSheet.create({
  arrow: {
    transform: [
      {
        rotate: '180deg',
      },
      {
        translateX: 7,
      },
    ],
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 11,
  },
  contentContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingLeft: 16,
  },
  textContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

interface Props {
  label: string;
  isChecked: boolean;
  prefix?: ReactElement;
  isBold?: boolean;
  onCheckboxPress?: () => void;
  onLabelPress?: () => void;
}

const TermItem = ({
  label,
  isChecked,
  prefix,
  isBold = false,
  onCheckboxPress,
  onLabelPress,
}: Props) => (
  <View style={styles.container}>
    <Checkbox isChecked={isChecked} onPress={onCheckboxPress} />
    <Pressable
      style={styles.contentContainer}
      // `onLabelPress`가 따로 정의되어 있지 않으면 어느 영역을 누르든 `onCheckboxPress`가 동작해서
      // 사용자가 좀 더 쉽게 누를 수 있도록 유도
      onPress={onLabelPress ?? onCheckboxPress}
    >
      <View style={styles.textContainer}>
        {prefix}
        <Text style={isBold ? TEXT_STYLE.button16B : TEXT_STYLE.button16M}>
          {label}
        </Text>
      </View>
      {onLabelPress && (
        <ArrowBack style={styles.arrow} color={COLOR.mono.gray3} />
      )}
    </Pressable>
  </View>
);

export default TermItem;
