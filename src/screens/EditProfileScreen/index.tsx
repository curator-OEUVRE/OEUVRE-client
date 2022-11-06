import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { patchMyProfile } from '@/apis/user';
import AddPictureIcon from '@/assets/icons/AddPicture';
import { FormInput, FormInputStatus } from '@/components/FormInput';
import { Header } from '@/components/Header';
import { WithKeyboardAvoidingView } from '@/components/WithKeyboardAvoidingView';
import { Screen, Navigator } from '@/constants/screens';
import { TEXT_STYLE, COLOR } from '@/constants/styles';
import ProfileCard from '@/feature/ProfileCard';
import type { RootStackParamsList } from '@/feature/Routes';
import type { MainTabParamsList } from '@/feature/Routes/MainTabNavigator';
import type { ProfileStackParamsList } from '@/feature/Routes/ProfileStack';
import useAuth from '@/hooks/useAuth';
import useUploadImage from '@/hooks/useUploadImage';
import {
  validateExhibitionName,
  validateIntroduceMessage,
  validateName,
} from '@/services/validation/signUp';
import type { UserInput } from '@/states/signUpStore';
import { useUserStore } from '@/states/userStore';

export type EditProfileScreenParams = undefined;

export type EditProfileScreenNP = CompositeNavigationProp<
  StackNavigationProp<ProfileStackParamsList, Screen.EditProfileScreen>,
  CompositeNavigationProp<
    StackNavigationProp<MainTabParamsList, Navigator.ProfileStack>,
    StackNavigationProp<RootStackParamsList>
  >
>;

const styles = StyleSheet.create({
  backgroundImage: {
    height: 160,
    position: 'absolute',
    width: '100%',
  },
  backgroundImageArea: {
    alignItems: 'center',
    height: 160,
    justifyContent: 'center',
    position: 'relative',
  },
  confirmText: {
    color: COLOR.system.blue,
  },
  container: {
    flex: 1,
  },
  /* eslint-disable-next-line react-native/no-color-literals */
  filter: {
    backgroundColor: 'rgba(20, 23, 24, 0.4)',
    height: 160,
    position: 'absolute',
    width: '100%',
  },
  formInput: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  label: {
    color: COLOR.mono.black,
    marginBottom: 12,
    marginLeft: 20,
    marginTop: 24,
  },
  /* eslint-disable-next-line react-native/no-color-literals */
  loading: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  profileCard: {
    marginTop: -20,
  },
});

const pickImage = async (callback: (url: string) => void) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (!result.cancelled) {
    callback(result.uri);
  }
};

const ConfirmButton = ({ onPress }: { onPress?: () => void }) => (
  <Pressable onPress={onPress}>
    <Text style={[TEXT_STYLE.button16M, styles.confirmText]}>완료</Text>
  </Pressable>
);

const EditProfileScreen = () => {
  const navigation = useNavigation<EditProfileScreenNP>();

  const {
    backgroundImageUrl,
    profileImageUrl,
    name,
    id,
    introduceMessage,
    exhibitionName,
    setUser,
  } = useUserStore();
  const { fetchWithToken } = useAuth();

  const [loading, setLoading] = useState(false);

  const [tmpName, setTmpName] = useState<UserInput<string>>({
    status: FormInputStatus.Initial,
    value: name,
    error: undefined,
    isRequired: true,
  });
  const [tmpExhibitionName, setTmpExhibitionName] = useState<UserInput<string>>(
    {
      status: FormInputStatus.Initial,
      value: exhibitionName,
      error: undefined,
      isRequired: true,
    },
  );
  const [tmpIntroduceMessage, setTmpIntroduceMessage] = useState<
    UserInput<string>
  >({
    status: FormInputStatus.Initial,
    value: introduceMessage,
    error: undefined,
    isRequired: true,
  });
  const [tmpBackgroundImageUrl, setTmpBackgroundImageUrl] = useState(
    backgroundImageUrl ?? '',
  );
  const [tmpProfileImageUrl, setTmpProfileImageUrl] = useState(
    profileImageUrl ?? '',
  );

  const { uploadImage } = useUploadImage();

  const upload = async (prevUri: string, newUri: string, path: string) => {
    if (prevUri === newUri) return prevUri;

    const result = await uploadImage(newUri, path, id);
    return result;
  };

  const editProfile = async () => {
    setLoading(true);

    const images = await Promise.all([
      upload(
        backgroundImageUrl ?? '',
        tmpBackgroundImageUrl,
        'BackgroundImage',
      ),
      upload(profileImageUrl ?? '', tmpProfileImageUrl, 'Profile'),
    ]);

    const response = await fetchWithToken(patchMyProfile, {
      name: tmpName.value,
      exhibitionName: tmpExhibitionName.value,
      introduceMessage: tmpIntroduceMessage.value,
      backgroundImageUrl: images[0],
      profileImageUrl: images[1],
    });

    setLoading(false);

    if (response.isSuccess) {
      setUser({
        name: tmpName.value,
        exhibitionName: tmpExhibitionName.value,
        introduceMessage: tmpIntroduceMessage.value,
        backgroundImageUrl: images[0],
        profileImageUrl: images[0],
      });
      navigation.goBack();
    } else {
      console.error(response.result);
    }
  };

  const renderHeaderRight = () => <ConfirmButton onPress={editProfile} />;

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <WithKeyboardAvoidingView>
          <SafeAreaView style={styles.container}>
            <Header headerTitle="프로필 편집" headerRight={renderHeaderRight} />
            <ScrollView style={styles.container}>
              <View>
                <Text style={[TEXT_STYLE.body14B, styles.label]}>프로필</Text>
                <View>
                  <Pressable
                    style={styles.backgroundImageArea}
                    onPress={async () => {
                      await pickImage(setTmpBackgroundImageUrl);
                    }}
                  >
                    <Image
                      style={styles.backgroundImage}
                      source={{ uri: tmpBackgroundImageUrl }}
                    />
                    <View style={styles.filter} />
                    <AddPictureIcon
                      width={70}
                      height={70}
                      color={COLOR.mono.white}
                    />
                  </Pressable>
                  <ProfileCard
                    profileImageUrl={tmpProfileImageUrl}
                    name={tmpName.value}
                    id={id}
                    introduceMessage={tmpIntroduceMessage.value}
                    style={styles.profileCard}
                    onImagePress={async () => {
                      await pickImage(setTmpProfileImageUrl);
                    }}
                  />
                </View>
              </View>
              <FormInput
                label="이름"
                value={tmpName.value}
                placeholder="본인의 이름을 입력해 주세요. (총 2-10자)"
                onChangeText={(value) => setTmpName({ ...tmpName, value })}
                status={tmpName.status}
                message={tmpName.error}
                onBlur={() => {
                  const [isValidated, error] = validateName(tmpName.value);
                  if (isValidated) {
                    setTmpName({ ...tmpName, status: FormInputStatus.Valid });
                  } else {
                    setTmpName({
                      ...tmpName,
                      status: FormInputStatus.Error,
                      error,
                    });
                  }
                }}
                containerStyle={styles.formInput}
              />
              <FormInput
                label="전시회 이름"
                value={tmpExhibitionName.value}
                placeholder="본인 전시회의 이름을 입력해 주세요. (총 2-10자)"
                onChangeText={(value) =>
                  setTmpExhibitionName({ ...tmpExhibitionName, value })
                }
                status={tmpExhibitionName.status}
                message={tmpExhibitionName.error}
                onBlur={() => {
                  const [isValidated, error] = validateExhibitionName(
                    tmpExhibitionName.value,
                  );
                  if (isValidated) {
                    setTmpExhibitionName({
                      ...tmpExhibitionName,
                      status: FormInputStatus.Valid,
                    });
                  } else {
                    setTmpExhibitionName({
                      ...tmpExhibitionName,
                      status: FormInputStatus.Error,
                      error,
                    });
                  }
                }}
                containerStyle={styles.formInput}
              />
              <FormInput
                label="자기 소개"
                value={tmpIntroduceMessage.value}
                placeholder="본인을 가볍게 소개해 주세요. (총 150자)"
                onChangeText={(value) =>
                  setTmpIntroduceMessage({ ...tmpIntroduceMessage, value })
                }
                status={tmpIntroduceMessage.status}
                message={tmpIntroduceMessage.error}
                onBlur={() => {
                  const [isValidated, error] = validateIntroduceMessage(
                    tmpIntroduceMessage.value,
                  );
                  if (isValidated) {
                    setTmpIntroduceMessage({
                      ...tmpIntroduceMessage,
                      status: FormInputStatus.Valid,
                    });
                  } else {
                    setTmpIntroduceMessage({
                      ...tmpIntroduceMessage,
                      status: FormInputStatus.Error,
                      error,
                    });
                  }
                }}
                containerStyle={styles.formInput}
              />
            </ScrollView>
          </SafeAreaView>
        </WithKeyboardAvoidingView>
      </TouchableWithoutFeedback>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={COLOR.mono.black} />
        </View>
      )}
    </>
  );
};

export default EditProfileScreen;
