import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import SignUpTemplate from './SignUpTemplate';
import { Screen } from '@/constants/screens';
import { COLOR } from '@/constants/styles';
import { RootStackParamsList } from '@/feature/Routes';
import { AuthStackParamsList } from '@/feature/Routes/AuthStack';
import UserProfileForm from '@/feature/UserProfileForm';

export type UserProfileFormScreenParams = undefined;
export type UserProfileFormScreenNP = CompositeNavigationProp<
  StackNavigationProp<AuthStackParamsList, Screen.UserProfileFormScreen>,
  StackNavigationProp<RootStackParamsList>
>;

const styles = StyleSheet.create({
  /* eslint-disable-next-line react-native/no-color-literals */
  loading: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

const UserProfileFormScreen = () => {
  const navigation = useNavigation<UserProfileFormScreenNP>();

  const [loading, setLoading] = useState(false);

  return (
    <>
      <SignUpTemplate>
        <UserProfileForm
          onNextPress={() => {
            navigation.navigate(Screen.WelcomeScreen, {
              name: '',
            });
          }}
          setLoading={setLoading}
        />
      </SignUpTemplate>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={COLOR.mono.black} />
        </View>
      )}
    </>
  );
};

export default UserProfileFormScreen;
