import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SignUpScreenRouteProp, SignUpStep } from '../../feature/Routes/types';
import { Header } from '@/components/Header';
import PersonalDataForm from '@/feature/PersonalDataForm';
import TermsForm from '@/feature/TermsForm';
import UserProfileForm from '@/feature/UserProfileForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const formComponentByStep = {
  [SignUpStep.Terms]: <TermsForm />,
  [SignUpStep.PersonalData]: <PersonalDataForm />,
  [SignUpStep.UserProfile]: <UserProfileForm />,
};

const SignUpScreen = () => {
  const {
    params: { process },
  } = useRoute<SignUpScreenRouteProp>();
  return (
    <SafeAreaView style={styles.container}>
      <Header headerTitle="회원 가입" />
      {formComponentByStep[process]}
    </SafeAreaView>
  );
};

export default SignUpScreen;
