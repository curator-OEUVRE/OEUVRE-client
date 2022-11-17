import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View, Keyboard } from 'react-native';
import CheckIcon from '@/assets/icons/Check';
import { Profile } from '@/components/Profile';
import { COLOR, TEXT_STYLE } from '@/constants/styles';

interface GuestBookInputProps {
  avatarUri: string;
  onSubmit: (text: string) => void;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    borderColor: COLOR.mono.gray1,
    borderStyle: 'solid',
    borderTopWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: '100%',
  },
  textInput: {
    flex: 1,
    lineHeight: 21,
    marginRight: 5,
    margin: 0,
    minHeight: 21,
    paddingBottom: 8,
    paddingTop: 8,
    padding: 0,
  },
  wrapIcon: {
    height: 37,
    justifyContent: 'center',
  },
  wrapInput: {
    alignItems: 'flex-end',
    borderColor: COLOR.mono.gray2,
    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    marginLeft: 8,
    minHeight: 37,
    paddingLeft: 12,
    paddingRight: 5,
  },
});

const GuestBookInput = ({ avatarUri, onSubmit }: GuestBookInputProps) => {
  const [comment, setComment] = useState<string>('');
  return (
    <View style={styles.container}>
      <Profile imageUrl={avatarUri} size={40} />
      <View style={styles.wrapInput}>
        <TextInput
          placeholder="방명록을 입력하세요."
          style={[styles.textInput, TEXT_STYLE.body14R]}
          multiline
          value={comment}
          onChangeText={setComment}
        />
        <Pressable
          style={styles.wrapIcon}
          onPress={() => {
            onSubmit(comment);
            setComment('');
            Keyboard.dismiss();
          }}
          disabled={comment.length === 0}
        >
          <CheckIcon
            color={comment.length > 0 ? COLOR.system.blue : COLOR.mono.gray3}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default GuestBookInput;
