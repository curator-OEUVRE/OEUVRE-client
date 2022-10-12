import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Text, StyleSheet, Pressable, View } from 'react-native';
import AddCircleIcon from '@/assets/icons/AddCircle';
import AddProfileIcon from '@/assets/icons/AddProfile';
import {
  Button,
  FormInput,
  FormInputStatus,
  Profile,
  UserInputLayout,
} from '@/components';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import useUploadImage from '@/hooks/useUploadImage';
import {
  validateExhibitionName,
  validateIntroduceMessage,
} from '@/services/validation/signUp';
import { useSignUpStore } from '@/states/signUpStore';

const styles = StyleSheet.create({
  addIcon: {
    bottom: 5,
    position: 'absolute',
    right: -15,
  },
  buttonText: {
    color: COLOR.mono.white,
  },
  label: { color: COLOR.mono.black, marginBottom: 8 },
  pressable: {
    height: 125,
    position: 'relative',
    width: 125,
  },
  wrapProfile: {
    alignItems: 'center',
  },
});

interface Props {
  onNextPress?: () => void;
}

const UserProfileForm = ({ onNextPress }: Props) => {
  const {
    exhibitionName,
    setExhibitionName,
    profileImageUrl,
    setProfileImageUrl,
    introduceMessage,
    setIntroduceMessage,
    userId,
  } = useSignUpStore();
  const [image, setImage] = useState<string | undefined>(undefined);
  const { uploading, uploadImage } = useUploadImage({ image });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const onCompleteUpload = (url: string) => {
    setProfileImageUrl({
      ...profileImageUrl,
      value: url,
    });
  };

  const button = (
    <Button
      onPress={async () => {
        await uploadImage('Profile', userId.value, onCompleteUpload);
        onNextPress?.();
      }}
    >
      <Text style={styles.buttonText}>설정 완료하기</Text>
    </Button>
  );

  return (
    <UserInputLayout
      infoMessage="OEUVRE 프로필을 완성해주세요"
      button={button}
      gap={54}
    >
      <View>
        <Text style={[TEXT_STYLE.body14B, styles.label]}>프로필 사진</Text>
        <View style={styles.wrapProfile}>
          <Pressable style={styles.pressable} onPress={pickImage}>
            {image ? <Profile imageUrl={image} /> : <AddProfileIcon />}
            <AddCircleIcon style={styles.addIcon} />
          </Pressable>
        </View>
      </View>
      <FormInput
        label="전시회 이름"
        value={exhibitionName.value}
        placeholder="본인 전시회의 이름을 입력해 주세요. (총 2-10자)"
        onChangeText={(value) =>
          setExhibitionName({ ...exhibitionName, value })
        }
        status={exhibitionName.status}
        message={exhibitionName.error}
        onBlur={() => {
          const [isValidated, error] = validateExhibitionName(
            exhibitionName.value,
          );
          if (isValidated) {
            setExhibitionName({
              ...exhibitionName,
              status: FormInputStatus.Valid,
            });
          } else {
            setExhibitionName({
              ...exhibitionName,
              status: FormInputStatus.Error,
              error,
            });
          }
        }}
      />
      <FormInput
        label="자기 소개"
        value={introduceMessage.value}
        placeholder="본인을 가볍게 소개해 주세요. (총 150자)"
        onChangeText={(value) =>
          setIntroduceMessage({ ...introduceMessage, value })
        }
        status={introduceMessage.status}
        message={introduceMessage.error}
        onBlur={() => {
          const [isValidated, error] = validateIntroduceMessage(
            introduceMessage.value,
          );
          if (isValidated) {
            setIntroduceMessage({
              ...introduceMessage,
              status: FormInputStatus.Valid,
            });
          } else {
            setIntroduceMessage({
              ...introduceMessage,
              status: FormInputStatus.Error,
              error,
            });
          }
        }}
      />
    </UserInputLayout>
  );
};

export default UserProfileForm;
