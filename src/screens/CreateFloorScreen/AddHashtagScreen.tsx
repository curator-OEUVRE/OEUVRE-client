import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import shallow from 'zustand/shallow';
import { Header, FormInput } from '@/components';
import { Tag } from '@/components/Tag';
import { Screen } from '@/constants/screens';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import { RootStackParamsList } from '@/feature/Routes';
import { FloorStackParamsList } from '@/feature/Routes/FloorStack';
import { FloorMode, useCreateFloorStore } from '@/states/createFloorStore';

export type AddHashtagScreenParams = {
  id: number;
};
export type AddHashtagScreenNP = CompositeNavigationProp<
  StackNavigationProp<FloorStackParamsList, Screen.AddHashtagScreen>,
  StackNavigationProp<RootStackParamsList>
>;
export type AddHashtagScreenRP = RouteProp<
  FloorStackParamsList,
  Screen.AddHashtagScreen
>;

const styles = StyleSheet.create({
  confirmText: {
    color: COLOR.system.blue,
  },
  container: {
    flex: 1,
    marginTop: 24,
    paddingHorizontal: 20,
  },
  prefix: {
    marginRight: 4,
  },
  safeAreaView: {
    backgroundColor: COLOR.mono.white,
    flex: 1,
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

const Prefix = () => <Text style={[styles.prefix, TEXT_STYLE.body16R]}>#</Text>;

const AddHashtagScreen = () => {
  const route = useRoute<AddHashtagScreenRP>();
  const navigation = useNavigation<AddHashtagScreenNP>();

  const [inputText, setInputText] = useState('');
  const { hashtags, setHashtag } = useCreateFloorStore((state) => {
    const key =
      state.mode === FloorMode.ADD_PICTURES ? 'tempPictures' : 'pictures';
    if (route.params.id === -1) {
      return {
        hashtags: state.pictureDetail.hashtags,
        setHashtag: (tags: string[]) => {
          state.setPictureDetail({ ...state.pictureDetail, hashtags: tags });
        },
      };
    }
    return {
      hashtags: state[key][route.params.id].hashtags,
      setHashtag: (tags: string[]) => {
        state.setHashtag(route.params.id, tags);
      },
    };
  }, shallow);

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

  const deleteHashtag = useCallback(
    (index: number) => {
      setHashtag(hashtags.slice(0, index).concat(hashtags.slice(index + 1)));
    },
    [hashtags, setHashtag],
  );

  const ConfirmButton = useCallback(
    () => (
      <Pressable onPress={navigation.goBack}>
        <Text style={[styles.confirmText, TEXT_STYLE.body16M]}>완료</Text>
      </Pressable>
    ),
    [navigation.goBack],
  );
  const maxCount = hashtags.length >= 5;
  const disabled = maxCount || inputText.length === 0;
  const AddButton = useCallback(
    () => (
      <Pressable
        disabled={disabled}
        onPress={() => {
          setInputText((prev) => {
            addHashtag(prev);
            return '';
          });
        }}
      >
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
    [addHashtag, disabled],
  );

  const placeholder = maxCount
    ? '태그를 더는 입력할 수 없어요. (최대 5개)'
    : '태그를 입력해 주세요. (최대 5개)';

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header headerTitle="사진 태그 추가" headerRight={ConfirmButton} />

      <View style={styles.container}>
        <FormInput
          editable={!maxCount}
          leftElement={<Prefix />}
          rightElement={<AddButton />}
          placeholder={placeholder}
          value={inputText}
          onChangeText={(text) => setInputText(text.replace(/\s/g, ''))}
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
    </SafeAreaView>
  );
};

export default AddHashtagScreen;
