import { forwardRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import CheckCircleIcon from '@/assets/icons/CheckCircle';
import ErrorIcon from '@/assets/icons/Error';
import { COLOR } from '@/constants/styles/colors';
import { TEXT_STYLE } from '@/constants/styles/textStyles';

export enum FormInputStatus {
  Initial = 0,
  Error = 1,
  Valid = 2,
}

interface Props extends TextInputProps {
  label?: string;
  containerStyle?: ViewStyle;
  status?: FormInputStatus;
  message?: string;
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    // 기본 스타일 초기화
    // https://github.com/facebook/react-native/issues/7823#issuecomment-222627621
    paddingBottom: 0,
    paddingTop: 0,
  },
  inputContainer: {
    alignItems: 'center',
    borderBottomColor: COLOR.mono.gray2,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 4,
  },
  label: {
    color: COLOR.mono.black,
    marginBottom: 8,
  },
  message: {
    color: COLOR.system.red,
    marginTop: 4,
  },
  statusIcon: {
    marginLeft: 5,
    marginRight: 6,
  },
});

const STATUS_ICON = {
  [FormInputStatus.Error]: (
    <ErrorIcon
      style={styles.statusIcon}
      width={16}
      height={16}
      color={COLOR.system.red}
    />
  ),
  [FormInputStatus.Valid]: (
    <CheckCircleIcon
      style={styles.statusIcon}
      width={16}
      height={16}
      color={COLOR.system.blue}
    />
  ),
};

export const FormInput = forwardRef<TextInput, Props>(
  (
    {
      status = FormInputStatus.Initial,
      message,
      label,
      style,
      containerStyle,
      ...textInputProps
    }: Props,
    ref,
  ) => (
    <View style={containerStyle}>
      {label && <Text style={[TEXT_STYLE.body14B, styles.label]}>{label}</Text>}

      <View style={styles.inputContainer}>
        <TextInput
          placeholderTextColor={COLOR.mono.gray4}
          // spreading이 문제가 될 상황이 아니라고 판단
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...textInputProps}
          ref={ref}
          style={[TEXT_STYLE.body16R, styles.input, style]}
        />
        {status !== FormInputStatus.Initial && STATUS_ICON[status]}
      </View>

      {status === FormInputStatus.Error && message && (
        <Text style={[TEXT_STYLE.body14R, styles.message]}>{message}</Text>
      )}
    </View>
  ),
);
