import { MediaTypeOptions } from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  Pressable,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ProfileCard from '../ProfileCard';
import { signUp } from '@/apis/user';
import AddPictureIcon from '@/assets/icons/AddPicture';
import {
  Button,
  FormInput,
  FormInputStatus,
  UserInputLayout,
} from '@/components';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import useUploadImage from '@/hooks/useUploadImage';
import { getSingleImageFromLibrary } from '@/services/common/image';
import { formatDate } from '@/services/date/format';
import {
  validateExhibitionName,
  validateIntroduceMessage,
} from '@/services/validation/signUp';
import { useAuthStore } from '@/states/authStore';
import { useSignUpStore } from '@/states/signUpStore';

const styles = StyleSheet.create({
  background: {
    height: 160,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  buttonText: {
    color: COLOR.mono.white,
  },
  /* eslint-disable-next-line react-native/no-color-literals */
  filter: {
    backgroundColor: 'rgba(20, 23, 24, 0.4)',
    height: 160,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  label: { color: COLOR.mono.black, marginBottom: 8 },
  padding: {
    paddingHorizontal: 20,
  },
  profile: {
    marginTop: -20,
  },
  wrapProfile: {
    alignItems: 'center',
    height: 160,
    justifyContent: 'center',
    width: '100%',
  },
});

interface Props {
  onNextPress?: () => void;
  setLoading?: (loading: boolean) => void;
}

const UserProfileForm = ({ onNextPress, setLoading }: Props) => {
  const {
    exhibitionName,
    setExhibitionName,
    introduceMessage,
    setIntroduceMessage,
    userId,
    name,
    birthDay,
    isMarketingAgreed,
    loginInfo,
    clearSignUpStore,
  } = useSignUpStore();
  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined,
  );
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>(
    undefined,
  );
  const { uploading, uploadImage } = useUploadImage();

  const { setToken } = useAuthStore();

  const pickImage = async (callback: (uri: string) => void) => {
    const [result, canUpload] = await getSingleImageFromLibrary({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (result && canUpload) {
      callback(result.uri);
    }
  };

  const onCompleteUpload = async (
    profile: string | null,
    background: string | null,
  ) => {
    const response = await signUp({
      birthday: birthDay.value ? formatDate(birthDay.value) : null,
      email: loginInfo.email,
      exhibitionName: exhibitionName.value,
      id: userId.value,
      introduceMessage: introduceMessage.value,
      isAlarmOn: isMarketingAgreed,
      name: name.value,
      profileImageUrl: profile,
      backgroundImageUrl: background,
      type: loginInfo.type,
    });

    if (response.isSuccess) {
      const { accessToken, refreshToken } = response.result.result;
      setToken(accessToken, refreshToken);
      onNextPress?.();
    } else {
      // eslint-disable-next-line no-console
      console.log(response.result.info);
      Alert.alert(
        '회원가입 중 문제가 발생했습니다. 다시 시도하거나 문의해 주세요.',
      );
    }
  };

  const disabled =
    (userId.isRequired && userId.status !== FormInputStatus.Valid) ||
    (name.isRequired && name.status !== FormInputStatus.Valid) ||
    (birthDay.isRequired && birthDay.status !== FormInputStatus.Valid) ||
    (exhibitionName.isRequired &&
      exhibitionName.status !== FormInputStatus.Valid) ||
    (introduceMessage.isRequired &&
      introduceMessage.status !== FormInputStatus.Valid);

  const button = (
    <Button
      disabled={disabled}
      onPress={async () => {
        setLoading?.(true);
        try {
          const [profile, background] = await Promise.all([
            (async () => {
              if (profileImage) {
                const url = await uploadImage(
                  profileImage,
                  'Profile',
                  userId.value,
                );
                return url;
              }
              return null;
            })(),
            (async () => {
              if (backgroundImage) {
                const url = await uploadImage(
                  backgroundImage,
                  'Background',
                  userId.value,
                );
                return url;
              }
              return null;
            })(),
          ]);
          await onCompleteUpload(profile, background);
        } catch (error) {
          console.error(error);
          Alert.alert(
            '이미지를 올리는 중 문제가 발생했습니다. 다시 시도해 보거나 문의해 주세요.',
          );
        }
        setLoading?.(false);
      }}
    >
      <Text style={styles.buttonText}>설정 완료하기</Text>
    </Button>
  );

  return (
    <UserInputLayout
      infoMessage="OEUVRE 프로필을 완성해주세요"
      button={button}
      gap={32}
    >
      <View>
        <Text style={[TEXT_STYLE.body14B, styles.label, styles.padding]}>
          프로필
        </Text>
        <View>
          <Pressable
            style={styles.wrapProfile}
            onPress={() => {
              pickImage(setBackgroundImage);
            }}
          >
            {backgroundImage ? (
              <FastImage
                style={styles.background}
                source={{ uri: backgroundImage }}
                resizeMode="cover"
              />
            ) : (
              <LinearGradient
                colors={['#A7A9AB', '#D3D4D5']}
                style={styles.background}
              />
            )}
            {backgroundImage && <View style={styles.filter} />}
            <AddPictureIcon width={70} height={70} color={COLOR.mono.white} />
          </Pressable>
          <ProfileCard
            profileImageUrl={profileImage}
            name={name.value}
            id={userId.value}
            introduceMessage={introduceMessage.value}
            style={styles.profile}
            hasAddIcon
            onImagePress={() => {
              pickImage(setProfileImage);
            }}
          />
        </View>
      </View>
      <FormInput
        label="전시회 이름"
        value={exhibitionName.value}
        placeholder="본인 전시회의 이름을 입력해 주세요. (총 2-10자)"
        onChangeText={(value) => {
          const [isValidated, error] = validateExhibitionName(value);
          if (isValidated) {
            setExhibitionName({
              ...exhibitionName,
              value,
              status: FormInputStatus.Valid,
            });
          } else {
            setExhibitionName({
              ...exhibitionName,
              value,
              status: FormInputStatus.Error,
              error,
            });
          }
        }}
        status={exhibitionName.status}
        message={exhibitionName.error}
        containerStyle={styles.padding}
        isRequired={exhibitionName.isRequired}
      />
      <FormInput
        label="자기 소개"
        value={introduceMessage.value}
        placeholder="본인을 가볍게 소개해 주세요. (총 20자)"
        onChangeText={(value) => {
          const [isValidated, error] = validateIntroduceMessage(value);
          if (isValidated) {
            setIntroduceMessage({
              ...introduceMessage,
              value,
              status: FormInputStatus.Valid,
            });
          } else {
            setIntroduceMessage({
              ...introduceMessage,
              value,
              status: FormInputStatus.Error,
              error,
            });
          }
        }}
        status={introduceMessage.status}
        message={introduceMessage.error}
        containerStyle={styles.padding}
        isRequired={introduceMessage.isRequired}
      />
    </UserInputLayout>
  );
};

export default UserProfileForm;
