import type { ReactElement } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface Props {
  children: ReactElement;
}

const SignUpTemplate = ({ children }: Props) => (
  <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>
      <Header headerTitle="회원 가입" />
      {children}
    </SafeAreaView>
  </TouchableWithoutFeedback>
);

export default SignUpTemplate;
