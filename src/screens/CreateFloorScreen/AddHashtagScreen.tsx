import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import shallow from 'zustand/shallow';
import { Header } from '@/components';
import { Screen } from '@/constants/screens';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import AddHashtagForm from '@/feature/AddHashtagForm';
import { RootStackParamsList } from '@/feature/Routes';
import { CreateFloorStackParamsList } from '@/feature/Routes/CreateFloorStack';
import { useCreateFloorStore } from '@/states/createFloorStore';

export type AddHashtagScreenParams = {
  idx: number;
};
export type AddHashtagScreenNP = CompositeNavigationProp<
  StackNavigationProp<CreateFloorStackParamsList, Screen.AddHashtagScreen>,
  StackNavigationProp<RootStackParamsList>
>;
export type AddHashtagScreenRP = RouteProp<
  CreateFloorStackParamsList,
  Screen.AddHashtagScreen
>;

const styles = StyleSheet.create({
  confirmText: {
    color: COLOR.system.blue,
  },
  safeAreaView: {
    backgroundColor: COLOR.mono.white,
    flex: 1,
  },
});

const AddHashtagScreen = () => {
  const route = useRoute<AddHashtagScreenRP>();
  const navigation = useNavigation<AddHashtagScreenNP>();

  const { hashtags, setHashtag } = useCreateFloorStore(
    (state) => ({
      hashtags: state.pictures[route.params.idx].hashtags,
      setHashtag: (tags: string[]) => {
        state.setHashtag(route.params.idx, tags);
      },
    }),
    shallow,
  );

  const ConfirmButton = useCallback(
    () => (
      <Pressable onPress={navigation.goBack}>
        <Text style={[styles.confirmText, TEXT_STYLE.body16M]}>완료</Text>
      </Pressable>
    ),
    [navigation.goBack],
  );

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header headerTitle="사진 태그 추가" headerRight={ConfirmButton} />
      <AddHashtagForm hashtags={hashtags} setHashtag={setHashtag} />
    </SafeAreaView>
  );
};

export default AddHashtagScreen;
