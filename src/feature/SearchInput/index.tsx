import { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import CloseIcon from '@/assets/icons/Close';
import SearchIcon from '@/assets/icons/Search';
import { COLOR, TEXT_STYLE } from '@/constants/styles';

interface Props {
  initialValue?: string;
  onEnd?: (text: string) => void;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLOR.mono.gray1,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  textInput: {
    ...TEXT_STYLE.body16R,
    flex: 1,
    marginLeft: 4,
  },
});

const SearchInput = ({ initialValue, onEnd }: Props) => {
  const [value, setValue] = useState(initialValue);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();

  return (
    <View style={styles.container}>
      <SearchIcon width={26} height={26} color={COLOR.mono.black} />
      <TextInput
        value={value}
        onChangeText={(text) => {
          setValue(text);

          // debounce
          if (timer) {
            clearTimeout(timer);
          }
          const newTimer = setTimeout(() => {
            onEnd?.(text);
          }, 800);
          setTimer(newTimer);
        }}
        placeholder="검색어를 입력해 주세요."
        placeholderTextColor={COLOR.mono.gray4}
        style={styles.textInput}
      />
      <Pressable
        onPress={() => {
          if (timer) clearTimeout(timer);
          setValue('');
        }}
      >
        <CloseIcon width={26} height={26} color={COLOR.mono.gray3} />
      </Pressable>
    </View>
  );
};

export default SearchInput;
