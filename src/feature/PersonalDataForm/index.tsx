import { Text, StyleSheet } from 'react-native';
import {
  Button,
  FormInput,
  FormInputStatus,
  FormInputDate,
  UserInputLayout,
} from '@/components';
import { COLOR } from '@/constants/styles';
import { validateName, validateUserId } from '@/services/validation/signUp';
import { useSignUpStore } from '@/states/signUpStore';

const styles = StyleSheet.create({
  buttonText: {
    color: COLOR.mono.white,
  },
});

const PersonalDataForm = () => {
  const { userId, setUserId, name, setName, birthDay, setBirthDay } =
    useSignUpStore();
  const disabled =
    (userId.isRequired && userId.status !== FormInputStatus.Valid) ||
    (name.isRequired && name.status !== FormInputStatus.Valid) ||
    (birthDay.isRequired && birthDay.status !== FormInputStatus.Valid);
  const button = (
    <Button disabled={disabled}>
      <Text style={styles.buttonText}>다음으로</Text>
    </Button>
  );

  return (
    <UserInputLayout
      infoMessage="개인정보를 입력해 주세요"
      title="회원가입"
      button={button}
      gap={54}
    >
      <FormInput
        label="사용자 아이디"
        value={userId.value}
        placeholder="영문자, 숫자 및 밑줄만 사용할 수 있어요. (총 4-15자)"
        onChangeText={(value) => setUserId({ ...userId, value })}
        status={userId.status}
        message={userId.error}
        onBlur={() => {
          const [isValidated, error] = validateUserId(userId.value);
          if (isValidated) {
            setUserId({ ...userId, status: FormInputStatus.Valid });
          } else {
            setUserId({ ...userId, status: FormInputStatus.Error, error });
          }
        }}
      />
      <FormInput
        label="이름"
        value={name.value}
        placeholder="본인의 이름을 입력해 주세요. (총 2-10자)"
        onChangeText={(value) => setName({ ...name, value })}
        status={name.status}
        message={name.error}
        onBlur={() => {
          const [isValidated, error] = validateName(name.value);
          if (isValidated) {
            setName({ ...name, status: FormInputStatus.Valid });
          } else {
            setName({ ...name, status: FormInputStatus.Error, error });
          }
        }}
      />
      <FormInputDate
        label="생년원일"
        value={birthDay.value}
        placeholder="생년월일을 추가해 주세요"
        onChange={(value) => {
          setBirthDay({ ...birthDay, value, status: FormInputStatus.Valid });
        }}
        status={birthDay.status}
        message={birthDay.error}
      />
    </UserInputLayout>
  );
};

export default PersonalDataForm;
