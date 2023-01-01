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
import { FloorStackParamsList } from '@/feature/Routes/FloorStack';
import { useFloorStore } from '@/states/floorStore';

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
  StackNavigationProp<FloorStackParamsList, Screen.PictureDescriptionScreen>,
  StackNavigationProp<RootStackParamsList>
>;

const PictureDescriptionScreen = () => {
  const navigation = useNavigation<PictureDescriptionScreenNP>();
  const { floor, changeDescriptionByIdx } = useFloorStore();
  const pictures = floor?.pictures ?? [];
  const onPressComplete = useCallback(() => {
    navigation.navigate(Screen.EditFloorScreen);
  }, [navigation]);
  const headerRight = useCallback(
    () => (
      <Pressable onPress={onPressComplete}>
        <Text style={[styles.buttonText, TEXT_STYLE.body16M]}>완료</Text>
      </Pressable>
    ),
    [onPressComplete],
  );
  const onHashtagPress = useCallback(
    (pictureNo: number) => {
      navigation.navigate(Screen.AddHashtagScreen, { pictureNo });
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
