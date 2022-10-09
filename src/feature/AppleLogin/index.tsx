import {
  signInAsync,
  AppleAuthenticationScope,
} from 'expo-apple-authentication';
import { Text, StyleSheet } from 'react-native';
import AppleIcon from '@/assets/icons/AppleIcon';
import { Button } from '@/components/Button';
import { COLOR, TEXT_STYLE } from '@/constants/styles';

const styles = StyleSheet.create({
  text: {
    color: COLOR.mono.white,
  },
});

interface Props {
  disabled?: boolean;
  onSuccess?: (token: string) => void;
}

const AppleLogin = ({ disabled, onSuccess }: Props) => {
  const loginWithApple = async () => {
    try {
      const credential = await signInAsync({
        requestedScopes: [AppleAuthenticationScope.EMAIL],
      });

      if (credential.identityToken) {
        onSuccess?.(credential.identityToken);
      }
    } catch (err) {
      /* eslint-disable-next-line no-console */
      console.log(err);
    }
  };

  return (
    <Button
      icon={<AppleIcon />}
      disabled={disabled}
      onPress={loginWithApple}
      backgroundColor={COLOR.mono.black}
    >
      <Text style={[TEXT_STYLE.button16M, styles.text]}>Apple로 시작하기</Text>
    </Button>
  );
};

export default AppleLogin;
