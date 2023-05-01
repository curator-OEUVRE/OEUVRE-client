import { useCallback } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { COLOR, TEXT_STYLE } from '@/constants/styles';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pressable: {
    alignItems: 'center',
    width: 64,
  },
  selected: {
    backgroundColor: COLOR.mono.black,
    borderRadius: 50,
  },
});

interface RadioProps<T> {
  value: T;
  onChange: (value: T) => void;
  data: { label: string; value: T }[];
}

const Radio = <T,>({ value, onChange, data }: RadioProps<T>) => {
  const renderOptions = useCallback(
    () =>
      data.map((option) => (
        <Pressable
          key={`option_${option.value}`}
          onPress={() => onChange(option.value)}
          style={[styles.pressable, value === option.value && styles.selected]}
        >
          <Text
            style={[
              TEXT_STYLE.body16M,
              {
                color:
                  value === option.value ? COLOR.mono.white : COLOR.mono.gray3,
              },
            ]}
          >
            {option.label}
          </Text>
        </Pressable>
      )),
    [data, onChange, value],
  );
  return <View style={styles.container}>{renderOptions()}</View>;
};

export { Radio };
