import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PersonalDataForm from '@/feature/PersonalDataForm';
import UserProfileForm from '@/feature/UserProfileForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
  },
});

const SignUpScreen = () => (
  <SafeAreaView style={styles.container}>
    <UserProfileForm />
  </SafeAreaView>
);

export default SignUpScreen;
