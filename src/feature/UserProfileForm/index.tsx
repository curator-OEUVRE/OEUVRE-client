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
        '???????????? ??? ????????? ??????????????????. ?????? ??????????????? ????????? ?????????.',
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
            '???????????? ????????? ??? ????????? ??????????????????. ?????? ????????? ????????? ????????? ?????????.',
          );
        }
        setLoading?.(false);
      }}
    >
      <Text style={styles.buttonText}>?????? ????????????</Text>
    </Button>
  );

  return (
    <UserInputLayout
      infoMessage="OEUVRE ???????????? ??????????????????"
      button={button}
      gap={32}
    >
      <View>
        <Text style={[TEXT_STYLE.body14B, styles.label, styles.padding]}>
          ?????????
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
        label="????????? ??????"
        value={exhibitionName.value}
        placeholder="?????? ???????????? ????????? ????????? ?????????. (??? 2-10???)"
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
        maxLength={10}
      />
      <FormInput
        label="?????? ??????"
        value={introduceMessage.value}
        placeholder="????????? ????????? ????????? ?????????. (??? 20???)"
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
        maxLength={20}
      />
    </UserInputLayout>
  );
};

export default UserProfileForm;
