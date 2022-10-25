import { useState } from 'react';
import {
  Modal,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Text,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Hashtag from '@/assets/icons/Hashtag';
import { Header } from '@/components/Header';
import { Tag } from '@/components/Tag';
import { WithKeyboardAvoidingView } from '@/components/WithKeyboardAvoidingView';
import { COLOR, TEXT_STYLE } from '@/constants/styles';

interface Props {
  imageUri: string;
  initialText?: string;
  visible?: boolean;
  hashtags: string[];
  onHashtagPress?: () => void;
  onBackPress?: () => void;
  setDescription?: (text: string) => void;
}

const styles = StyleSheet.create({
  buttonText: {
    color: COLOR.oeuvre.blue4,
  },
  container: {
    flex: 1,
    paddingLeft: 37,
    paddingRight: 26,
  },
  contentContainer: {
    alignItems: 'flex-end',
  },
  hashtagArea: {
    flexDirection: 'row',
    paddingTop: 4,
  },
  image: {
    aspectRatio: 1,
    width: '100%',
  },
  lengthText: {
    color: COLOR.mono.gray4,
  },
  modal: {
    margin: 0,
  },
  safeAreaView: {
    flex: 1,
  },
  tag: {
    color: COLOR.mono.gray5,
    marginBottom: 4,
    marginRight: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 4,
    marginTop: 3,
  },
  textInput: {
    color: COLOR.mono.gray7,
    width: '100%',
  },
});

const PictureDescriptionModal = ({
  imageUri,
  initialText,
  visible,
  hashtags,
  onHashtagPress,
  onBackPress,
  setDescription,
}: Props) => {
  const { top } = useSafeAreaInsets();

  const [text, setText] = useState(initialText ?? '');

  const headerRight = () => (
    <Pressable
      onPress={() => {
        setDescription?.(text);
        onBackPress?.();
      }}
    >
      <Text style={[styles.buttonText, TEXT_STYLE.body16M]}>완료</Text>
    </Pressable>
  );

  return (
    <Modal animationType="slide" style={styles.modal} visible={visible}>
      <View style={[styles.safeAreaView, { marginTop: top }]}>
        <Header
          headerTitle="사진 설명 수정"
          headerRight={headerRight}
          onBackPress={onBackPress}
        />
        <WithKeyboardAvoidingView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={styles.container}>
              <Image
                style={styles.image}
                source={{ uri: imageUri }}
                resizeMode="contain"
              />
              <View style={styles.contentContainer}>
                <TextInput
                  multiline
                  value={text}
                  onChangeText={(newText) => {
                    setText(newText);
                  }}
                  onBlur={() => {
                    setDescription?.(text);
                  }}
                  placeholder="작품의 설명을 입력해 주세요. (총 50자)"
                  placeholderTextColor={COLOR.mono.gray4}
                  style={[TEXT_STYLE.body14R, styles.textInput]}
                />
                {text.length > 0 && (
                  <Text style={styles.lengthText}>{text.length}/50</Text>
                )}
              </View>
              <View style={styles.hashtagArea}>
                <Pressable onPress={onHashtagPress}>
                  <Hashtag />
                </Pressable>
                <View style={styles.tagsContainer}>
                  {hashtags.map((tag) => (
                    <Text key={tag} style={[TEXT_STYLE.body12R, styles.tag]}>
                      #{tag}
                    </Text>
                  ))}
                </View>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </WithKeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default PictureDescriptionModal;
