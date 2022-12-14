import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { Screen } from '@/constants/screens';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import PictureDescriptionForm from '@/feature/PictureDescriptionForm';
import { RootStackParamsList } from '@/feature/Routes';
import { CreateFloorStackParamsList } from '@/feature/Routes/CreateFloorStack';
import { useCreateFloorStore } from '@/states/createFloorStore';

const styles = StyleSheet.create({
  buttonText: {
    color: COLOR.system.blue,
  },
  container: {
    backgroundColor: COLOR.mono.white,
    flex: 1,
  },
});

export type PictureDescriptionScreenParams = undefined;
export type PictureDescriptionScreenNP = CompositeNavigationProp<
  StackNavigationProp<
    CreateFloorStackParamsList,
    Screen.PictureDescriptionScreen
  >,
  StackNavigationProp<RootStackParamsList>
>;

const PictureDescriptionScreen = () => {
  const navigation = useNavigation<PictureDescriptionScreenNP>();
  const { pictures, changeDescriptionByIdx } = useCreateFloorStore();
  const headerRight = () => (
    <Pressable
      onPress={() => {
        navigation.navigate(Screen.FloorInfoFormScreen);
      }}
    >
      <Text style={[styles.buttonText, TEXT_STYLE.body16M]}>다음</Text>
    </Pressable>
  );
  const onHashtagPress = useCallback(
    (idx: number) => {
      navigation.navigate(Screen.AddHashtagScreen, { idx });
    },
    [navigation],
  );
  const changeDescription = useCallback(
    (idx: number, description: string) => {
      changeDescriptionByIdx(idx, description);
    },
    [changeDescriptionByIdx],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header headerTitle="플로어 추가" headerRight={headerRight} />
      <PictureDescriptionForm
        data={pictures}
        onHashtagPress={onHashtagPress}
        changeDescriptionByIdx={changeDescription}
      />
    </SafeAreaView>
  );
};

export default PictureDescriptionScreen;
