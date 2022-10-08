import { KakaoOAuthToken, login } from '@react-native-seoul/kakao-login';
import { Text, StyleSheet } from 'react-native';
import KakaoIcon from '@/assets/icons/KakaoIcon';
import { Button } from '@/components/Button';
import { COLOR, TEXT_STYLE } from '@/constants/styles';

const styles = StyleSheet.create({
  text: {
    color: COLOR.mono.black,
  },
});

interface Props {
  disabled?: boolean;
  onSuccess?: (token: string) => void;
}

const KakaoLogin = ({ disabled, onSuccess }: Props) => {
  const loginWithKakao = async () => {
    // `KakaoOAuthWebToken` 타입은 web 환경(react-native-web)일 때만 나오는 것이므로 as로 타입 단언
    const token = (await login()) as KakaoOAuthToken;
    onSuccess?.(token.accessToken);
  };

  return (
    <Button
      icon={<KakaoIcon />}
      disabled={disabled}
      onPress={loginWithKakao}
      backgroundColor="#FBE520"
    >
      <Text style={[TEXT_STYLE.button16M, styles.text]}>Kakao로 시작하기</Text>
    </Button>
  );
};

export default KakaoLogin;
