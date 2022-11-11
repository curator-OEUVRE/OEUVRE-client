import { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { checkId } from '@/apis/user';
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
  padding: {
    paddingHorizontal: 20,
  },
});

interface Props {
  onNextPress?: () => void;
}

const PersonalDataForm = ({ onNextPress }: Props) => {
  const { userId, setUserId, name, setName, birthDay, setBirthDay } =
    useSignUpStore();
  const disabled =
    (userId.isRequired && userId.status !== FormInputStatus.Valid) ||
    (name.isRequired && name.status !== FormInputStatus.Valid) ||
    (birthDay.isRequired && birthDay.status !== FormInputStatus.Valid);

  const button = (
    <Button
      disabled={disabled}
      onPress={() => {
        onNextPress?.();
      }}
    >
      <Text style={styles.buttonText}>다음으로</Text>
    </Button>
  );

  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  return (
    <UserInputLayout
      infoMessage="개인정보를 입력해 주세요"
      button={button}
      gap={54}
      style={styles.padding}
    >
      <FormInput
        label="사용자 아이디"
        value={userId.value}
        placeholder="영문자, 숫자 및 밑줄만 사용할 수 있어요. (총 4-15자)"
        onChangeText={(value) => {
          if (timer) {
            clearTimeout(timer);
          }

          const [isValidated, error] = validateUserId(value);
          if (isValidated) {
            setUserId({ ...userId, value });

            const newTimer = setTimeout(async () => {
              const response = await checkId(value);
              if (response.isSuccess) {
                if (response.result.result.isPossible) {
                  setUserId({
                    ...userId,
                    value,
                    status: FormInputStatus.Valid,
                  });
                } else {
                  setUserId({
                    ...userId,
                    value,
                    status: FormInputStatus.Error,
                    error:
                      '이 사용자 아이디는 이미 다른 사람이 사용하고 있어요',
                  });
                }
              }
            }, 1000);
            setTimer(newTimer);
          } else {
            setUserId({
              ...userId,
              value,
              status: FormInputStatus.Error,
              error,
            });
          }
        }}
        status={userId.status}
        message={userId.error}
        isRequired={userId.isRequired}
      />
      <FormInput
        label="닉네임"
        value={name.value}
        placeholder="활동할 닉네임을 입력해 주세요. (총 2-10자)"
        onChangeText={(value) => {
          const [isValidated, error] = validateName(value);
          if (isValidated) {
            setName({ ...name, value, status: FormInputStatus.Valid });
          } else {
            setName({ ...name, value, status: FormInputStatus.Error, error });
          }
        }}
        status={name.status}
        message={name.error}
        isRequired={name.isRequired}
      />
      <FormInputDate
        label="생년월일"
        value={birthDay.value}
        placeholder="생년월일을 추가해 주세요"
        onChange={(value) => {
          setBirthDay({ ...birthDay, value, status: FormInputStatus.Valid });
        }}
        status={birthDay.status}
        message={birthDay.error}
        isRequired={birthDay.isRequired}
      />
    </UserInputLayout>
  );
};

export default PersonalDataForm;
