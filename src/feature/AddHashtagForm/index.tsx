import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FormInput, Tag } from '@/components';
import { COLOR, TEXT_STYLE } from '@/constants/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
  prefix: {
    marginRight: 4,
  },
  tag: {
    marginBottom: 4,
    marginRight: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
});

interface AddHashtagFormProps {
  hashtags: string[];
  setHashtag: (tags: string[]) => void;
}

const Prefix = () => <Text style={[styles.prefix, TEXT_STYLE.body16R]}>#</Text>;
const MAX_COUNT = 5;

const AddHashtagForm = ({ hashtags, setHashtag }: AddHashtagFormProps) => {
  const [inputText, setInputText] = useState('');
  const editable = hashtags.length < MAX_COUNT;
  const placeholder = !editable
    ? '태그를 더는 입력할 수 없어요. (최대 5개)'
    : '태그를 입력해 주세요. (최대 5개)';

  const addHashtag = useCallback(
    (newTag: string) => {
      if (hashtags.findIndex((v) => v === newTag) === -1) {
        setHashtag([...hashtags, `#${newTag}`]);
      } else {
        setInputText('');
      }
    },
    [hashtags, setHashtag],
  );

  const onPressAdd = useCallback(() => {
    setInputText((prev) => {
      if (prev.length === 0) return prev;
      addHashtag(prev);
      return '';
    });
  }, [addHashtag]);

  const disabled = !editable || inputText.length === 0;
  const AddButton = useCallback(
    () => (
      <Pressable disabled={disabled} onPress={onPressAdd}>
        <Text
          style={[
            TEXT_STYLE.body16R,
            { color: !disabled ? COLOR.mono.gray7 : COLOR.mono.gray4 },
          ]}
        >
          추가
        </Text>
      </Pressable>
    ),
    [disabled, onPressAdd],
  );
  const onChangeText = useCallback(
    (text: string) => {
      const lastChar = text.slice(-1);
      if (lastChar === ' ') {
        onPressAdd();
        return;
      }
      setInputText(text);
    },
    [onPressAdd],
  );
  const deleteHashtag = useCallback(
    (index: number) => {
      setHashtag(hashtags.slice(0, index).concat(hashtags.slice(index + 1)));
    },
    [hashtags, setHashtag],
  );

  return (
    <View style={styles.container}>
      <FormInput
        editable={editable}
        label="Tag"
        placeholder={placeholder}
        value={inputText}
        onChangeText={onChangeText}
      />
      <View style={styles.tagsContainer}>
        {hashtags.map((tag, index) => (
          <Tag
            key={tag}
            text={tag}
            onDeletePress={() => {
              deleteHashtag(index);
            }}
            style={styles.tag}
          />
        ))}
      </View>
    </View>
  );
};

export default AddHashtagForm;
