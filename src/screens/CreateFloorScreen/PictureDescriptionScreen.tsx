import { Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WithKeyboardAvoidingView } from '@/components';
import { Header } from '@/components/Header';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import PictureDescriptionList from '@/feature/PictureDescriptionList';

const styles = StyleSheet.create({
  buttonText: {
    color: COLOR.oeuvre.blue4,
  },
  container: {
    backgroundColor: COLOR.mono.white,
    flex: 1,
    paddingHorizontal: 20,
  },
});

export type PictureDescriptionScreenParams = undefined;

const PictureDescriptionScreen = () => {
  const headerRight = () => (
    <Pressable>
      <Text style={[styles.buttonText, TEXT_STYLE.body16M]}>다음</Text>
    </Pressable>
  );
  return (
    <SafeAreaView style={styles.container}>
      <Header headerTitle="플로어 추가" headerRight={headerRight} />
      <WithKeyboardAvoidingView>
        <PictureDescriptionList />
      </WithKeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PictureDescriptionScreen;
