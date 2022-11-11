import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useState } from 'react';
import {
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
import shallow from 'zustand/shallow';
import Hashtag from '@/assets/icons/Hashtag';
import { Header } from '@/components/Header';
import { WithKeyboardAvoidingView } from '@/components/WithKeyboardAvoidingView';
import { Screen } from '@/constants/screens';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import { RootStackParamsList } from '@/feature/Routes';
import { FloorStackParamsList } from '@/feature/Routes/FloorStack';
import { FloorMode, useCreateFloorStore } from '@/states/createFloorStore';

export type EditDescriptionScreenParams = {
  pictureNo: number;
};

export type EditDescriptionScreenRP = RouteProp<
  FloorStackParamsList,
  Screen.EditDescriptionScreen
>;

export type EditDescriptionScreenNP = CompositeNavigationProp<
  StackNavigationProp<FloorStackParamsList, Screen.EditDescriptionScreen>,
  StackNavigationProp<RootStackParamsList>
>;

export const styles = StyleSheet.create({
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

const EditDescriptionScreen = () => {
  const { top } = useSafeAreaInsets();

  const navigation = useNavigation<EditDescriptionScreenNP>();

  const { params } = useRoute<EditDescriptionScreenRP>();
  const { pictureNo } = params;

  const {
    pictures,
    onChangeDescriptionByIdx,
    pictureDetail,
    mode,
    setPictureDetail,
  } = useCreateFloorStore();
  const idx = pictures.findIndex((p) => p.pictureNo === pictureNo);
  const picture = idx >= 0 ? pictures[idx] : undefined;
  const setDescription = idx >= 0 ? onChangeDescriptionByIdx(idx) : undefined;
  const defaultText = picture?.description || '';
  const [text, setText] = useState(defaultText);

  const onPress = useCallback(() => {
    if (mode === FloorMode.VIEWER) {
      setPictureDetail({ ...pictureDetail, description: text });
    }
    setDescription?.(text);
    navigation.goBack();
  }, [setDescription, text, navigation, mode, pictureDetail, setPictureDetail]);

  const headerRight = () => (
    <Pressable onPress={onPress}>
      <Text style={[styles.buttonText, TEXT_STYLE.body16M]}>완료</Text>
    </Pressable>
  );

  const hashtagArea = (
    <View style={styles.hashtagArea}>
      <Pressable
        onPress={() => {
          navigation.navigate(Screen.AddHashtagScreen, { id: idx });
        }}
      >
        <Hashtag />
      </Pressable>
      <View style={styles.tagsContainer}>
        {(picture?.hashtags || []).map((tag) => (
          <Text key={tag} style={[TEXT_STYLE.body12R, styles.tag]}>
            {tag}
          </Text>
        ))}
      </View>
    </View>
  );

  return (
    <View style={[styles.safeAreaView, { marginTop: top }]}>
      <Header headerTitle="사진 설명 수정" headerRight={headerRight} />
      <WithKeyboardAvoidingView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={styles.container}>
            <Image
              style={styles.image}
              source={{
                uri: picture?.imageUrl,
              }}
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
            {hashtagArea}
          </ScrollView>
        </TouchableWithoutFeedback>
      </WithKeyboardAvoidingView>
    </View>
  );
};

export default EditDescriptionScreen;
