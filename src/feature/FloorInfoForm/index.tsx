import React, { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  FormInput,
  FormInputStatus,
  Header,
  SettingItem,
  UserInputLayout,
} from '@/components';
import { CREATE_FLOOR_CONFIG } from '@/constants/common';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import { validateFloorName } from '@/services/validation/createFloor';
import { FormInfo } from '@/states/createFloorStore';
import { FloorInfo } from '@/types/floor';

const styles = StyleSheet.create({
  lengthText: {
    color: COLOR.mono.gray5,
  },
  safeAreaView: {
    backgroundColor: COLOR.mono.white,
    flex: 1,
  },
  subtitle: {
    marginBottom: 14,
  },
  toggleItem: {
    marginBottom: 8,
  },
  userInputLayout: {
    paddingHorizontal: 20,
  },
});

interface FloorInfoFormProps extends FloorInfo {
  title: string;
  confirmText: string;
  onGoBack?: () => void;
  onConfirm?: (floorInfo: Partial<FloorInfo>) => void;
}

const FloorInfoForm = ({
  title,
  confirmText,
  onGoBack,
  onConfirm,
  ...defaultValues
}: FloorInfoFormProps) => {
  const getInitialName = () => {
    if (defaultValues.name.length === 0) {
      return {
        status: FormInputStatus.Initial,
        value: defaultValues.name,
        error: undefined,
        isRequired: true,
      };
    }
    const [isValidated, error] = validateFloorName(defaultValues.name);
    if (isValidated) {
      return {
        status: FormInputStatus.Valid,
        value: defaultValues.name,
        error: undefined,
        isRequired: true,
      };
    }
    return {
      status: FormInputStatus.Error,
      value: defaultValues.name,
      error,
      isRequired: true,
    };
  };
  const [name, setName] = useState<FormInfo<string>>(getInitialName);
  const [description, setDescription] = useState<FormInfo<string>>({
    status: FormInputStatus.Initial,
    value: defaultValues.description || '',
    error: undefined,
    isRequired: false,
  });
  const [isPublic, setIsPublic] = useState<boolean>(defaultValues.isPublic);
  const [isCommentAvailable, setIsCommentAvailable] = useState<boolean>(
    defaultValues.isCommentAvailable,
  );

  const FloorNameLength = useCallback(
    () => (
      <Text style={[TEXT_STYLE.body14R, styles.lengthText]}>
        {CREATE_FLOOR_CONFIG.floorName.limit[1] - name.value.length}
      </Text>
    ),
    [name],
  );

  const FloorDescriptionLength = useCallback(
    () => (
      <Text style={[TEXT_STYLE.body14R, styles.lengthText]}>
        {CREATE_FLOOR_CONFIG.floorDescription.limit[1] -
          description.value.length}
      </Text>
    ),
    [description],
  );

  const disabled = name.status !== FormInputStatus.Valid;

  const ConfirmButton = useCallback(
    () => (
      <Pressable
        disabled={disabled}
        onPress={() =>
          onConfirm?.({
            isPublic,
            isCommentAvailable,
            name: name.value,
            description: description.value,
          })
        }
      >
        <Text
          style={[
            TEXT_STYLE.button16M,
            { color: disabled ? COLOR.mono.gray3 : COLOR.system.blue },
          ]}
        >
          {confirmText}
        </Text>
      </Pressable>
    ),
    [
      confirmText,
      disabled,
      isCommentAvailable,
      isPublic,
      name.value,
      description.value,
      onConfirm,
    ],
  );

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header
        headerTitle={title}
        headerRight={ConfirmButton}
        onGoBack={onGoBack}
      />
      <UserInputLayout
        infoMessage="새로운 플로어를 소개해 주세요"
        gap={28}
        style={styles.userInputLayout}
      >
        <FormInput
          label="플로어 이름"
          placeholder="플로어의 이름을 입력해 주세요."
          isRequired
          value={name.value}
          status={name.status}
          message={name.error}
          onChangeText={(text) => {
            setName({ ...name, value: text });
          }}
          onBlur={() => {
            const [isValidated, error] = validateFloorName(name.value);
            if (isValidated) {
              setName({ ...name, status: FormInputStatus.Valid });
            } else {
              setName({ ...name, status: FormInputStatus.Error, error });
            }
          }}
          rightElement={<FloorNameLength />}
        />
        <FormInput
          label="플로어 소개"
          placeholder="플로어를 소개해 주세요."
          value={description.value}
          status={description.status}
          onChangeText={(text) => {
            setDescription({ ...description, value: text });
          }}
          rightElement={<FloorDescriptionLength />}
        />
        <View>
          <Text style={[styles.subtitle, TEXT_STYLE.body14B]}>
            플로어 권한 설정
          </Text>
          <View>
            <SettingItem.Toggle
              left="플로어 비공개"
              isSelected={!isPublic}
              onToggle={() => {
                setIsPublic(!isPublic);
              }}
              style={styles.toggleItem}
            />
            <SettingItem.Toggle
              left="방명록 기능 해제"
              isSelected={!isCommentAvailable}
              onToggle={() => {
                setIsCommentAvailable(!isCommentAvailable);
              }}
              style={styles.toggleItem}
            />
          </View>
        </View>
      </UserInputLayout>
    </SafeAreaView>
  );
};

export default FloorInfoForm;
