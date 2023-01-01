import React, { useCallback, useState } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  Image,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FloorStyleIcon from '@/assets/icons/FloorStyle';
import {
  FormInput,
  FormInputStatus,
  Header,
  SettingItem,
  UserInputLayout,
} from '@/components';
import { CREATE_FLOOR_CONFIG } from '@/constants/common';
import { IMAGE } from '@/constants/images';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import { validateFloorName } from '@/services/validation/createFloor';
import { FLOOR_BACKGROUND_COLORS, FormInfo } from '@/states/createFloorStore';
import { FloorInfo } from '@/types/floor';

const styles = StyleSheet.create({
  floorIconWrap: {
    position: 'relative',
  },
  floorNameLengthText: {
    color: COLOR.mono.gray5,
  },
  icon: {
    marginTop: 6,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  safeAreaView: {
    backgroundColor: COLOR.mono.white,
    flex: 1,
  },
  shadow: {
    height: 95,
    left: -5,
    position: 'absolute',
    top: 1,
    width: 70,
    zIndex: -1,
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

interface FloorIconProps {
  color: string;
  flip: boolean;
  isSelected?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const FloorIcon = ({
  color,
  flip,
  style,
  isSelected,
  onPress,
}: FloorIconProps) => (
  <Pressable style={styles.floorIconWrap} onPress={onPress}>
    <FloorStyleIcon
      color={color}
      style={[
        style,
        {
          transform: flip ? undefined : [{ rotateY: '180deg' }],
        },
      ]}
    />
    {isSelected && (
      <Image
        source={IMAGE.floorStyleShadow}
        style={[
          styles.shadow,
          {
            transform: flip ? undefined : [{ rotateY: '180deg' }],
          },
        ]}
      />
    )}
  </Pressable>
);

interface FloorInfoFormProps extends FloorInfo {
  title: string;
  confirmText: string;
  onGoBack?: () => void;
  onConfirm?: (floorInfo: FloorInfo) => void;
}

const FloorInfoForm = ({
  title,
  confirmText,
  onGoBack,
  onConfirm,
  ...defaultValues
}: FloorInfoFormProps) => {
  const [name, setName] = useState<FormInfo<string>>({
    status: FormInputStatus.Initial,
    value: defaultValues.name,
    error: undefined,
    isRequired: true,
  });
  const [color, setColor] = useState<string>(defaultValues.color);
  const [isPublic, setIsPublic] = useState<boolean>(defaultValues.isPublic);
  const [isCommentAvailable, setIsCommentAvailable] = useState<boolean>(
    defaultValues.isCommentAvailable,
  );

  const FloorNameLength = useCallback(
    () => (
      <Text style={[TEXT_STYLE.body14R, styles.floorNameLengthText]}>
        {CREATE_FLOOR_CONFIG.floorName.limit[1] - name.value.length}
      </Text>
    ),
    [name],
  );

  const disabled = name.status !== FormInputStatus.Valid;

  const ConfirmButton = useCallback(
    () => (
      <Pressable
        disabled={disabled}
        onPress={() =>
          onConfirm?.({ color, isPublic, isCommentAvailable, name: name.value })
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
      color,
      confirmText,
      disabled,
      isCommentAvailable,
      isPublic,
      name.value,
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
        infoMessage={`멋진 사진이네요!\n플로어를 소개해 주세요`}
        gap={28}
        style={styles.userInputLayout}
      >
        <FormInput
          label="플로어 이름"
          placeholder="플로어의 이름을 입력해 주세요. (총 1-10자)"
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
        <View>
          <Text style={[styles.subtitle, TEXT_STYLE.body14B]}>
            플로어 배경색 설정
          </Text>
          <View>
            {FLOOR_BACKGROUND_COLORS.map((row, index) => (
              /* eslint-disable-next-line react/no-array-index-key */
              <View key={index} style={styles.iconsContainer}>
                {row.map((backgroundColor) => (
                  <FloorIcon
                    key={backgroundColor}
                    color={backgroundColor}
                    flip={index % 2 === 0}
                    style={styles.icon}
                    isSelected={color === backgroundColor}
                    onPress={() => {
                      setColor(backgroundColor);
                    }}
                  />
                ))}
              </View>
            ))}
          </View>
        </View>
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
