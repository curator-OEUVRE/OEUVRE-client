import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { type ReactNode, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Alert,
  ViewStyle,
  StyleProp,
  ScrollView,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { deactiveUser } from '@/apis/user';
import ArrowBackIcon from '@/assets/icons/ArrowBack';
import { Header } from '@/components/Header';
import { SettingItem } from '@/components/SettingItem';
import { Screen } from '@/constants/screens';
import { TEXT_STYLE, COLOR } from '@/constants/styles';
import { RootStackParamsList } from '@/feature/Routes';
import { ProfileStackParamsList } from '@/feature/Routes/ProfileStack';
import useAuth from '@/hooks/useAuth';
import { useAuthStore } from '@/states/authStore';
import { useUserStore } from '@/states/userStore';

export type SettingScreenParams = undefined;

export type SettingScreenNP = CompositeNavigationProp<
  StackNavigationProp<ProfileStackParamsList, Screen.ProfileScreen>,
  StackNavigationProp<RootStackParamsList>
>;

const styles = StyleSheet.create({
  areaContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  areaTitle: {
    marginBottom: 24,
  },
  arrow: {
    transform: [{ rotate: '180deg' }],
  },
  container: {
    flex: 1,
  },
  divider: {
    backgroundColor: COLOR.mono.gray2,
    height: 1,
    marginHorizontal: 20,
    marginTop: 24,
  },
  followInfo: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  followInfoArea: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  settingItem: {
    marginBottom: 12,
  },
  subLabel: {
    paddingLeft: 20,
  },
  textSettingItem: {
    marginBottom: 18,
  },
});

interface SettingItemLabelProps {
  label: string;
  isSub?: boolean;
  style?: StyleProp<ViewStyle>;
}

const SettingItemLabel = ({ label, isSub, style }: SettingItemLabelProps) => (
  <Text
    style={[
      isSub ? [TEXT_STYLE.body14M, styles.subLabel] : TEXT_STYLE.body16R,
      style,
    ]}
  >
    {label}
  </Text>
);

interface AreaProps {
  children: ReactNode;
  title: string;
}

const Area = ({ children, title }: AreaProps) => (
  <View style={styles.areaContainer}>
    <Text style={[TEXT_STYLE.body16B, styles.areaTitle]}>{title}</Text>
    {children}
  </View>
);

const Divider = () => <View style={styles.divider} />;

const Arrow = () => (
  <ArrowBackIcon
    width={26}
    height={26}
    color={COLOR.mono.gray3}
    style={styles.arrow}
  />
);

const SettingScreen = () => {
  const navigation = useNavigation<SettingScreenNP>();

  const {
    followerCount,
    followingCount,
    name,
    userNo,
    exhibitionName,
    clearUserStore,
  } = useUserStore();
  const { clear } = useAuthStore();
  const { fetchWithToken } = useAuth();

  const [pushNotiSettings, setPushNotiSettings] = useState({
    message: false,
    heart: false,
    comment: false,
    newFollower: false,
    requestOfGroupExhibition: false,
  });

  const [pushNotiDisabled, setPushNotiDisabled] = useState(false);

  const [etcNotiSettings, setEtcNotiSettings] = useState({
    sms: false,
    email: false,
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Header headerTitle="설정" />
      <ScrollView style={styles.container}>
        <Area title="팔로잉 / 팔로워">
          <Pressable
            style={styles.followInfoArea}
            onPress={() => {
              navigation.navigate(Screen.FollowListScreen, {
                userNo,
                exhibitionName,
              });
            }}
          >
            <View style={styles.followInfo}>
              <Text style={TEXT_STYLE.button16M}>팔로잉</Text>
              <Text style={TEXT_STYLE.title20M}>{followingCount}</Text>
            </View>
            <View style={styles.followInfo}>
              <Text style={TEXT_STYLE.button16M}>팔로워</Text>
              <Text style={TEXT_STYLE.title20M}>{followerCount}</Text>
            </View>
          </Pressable>
        </Area>
        <Area title="푸시 알림">
          <SettingItem.Toggle
            left={<SettingItemLabel label="전체 비활성화" />}
            isSelected={pushNotiDisabled}
            onToggle={() => {
              setPushNotiDisabled((prev) => !prev);
            }}
            style={styles.settingItem}
          />
          <SettingItem.Toggle
            left={<SettingItemLabel label="메시지" isSub />}
            isSelected={pushNotiSettings.message}
            disabled={pushNotiDisabled}
            onToggle={() => {
              setPushNotiSettings((prev) => ({
                ...prev,
                message: !prev.message,
              }));
            }}
            style={styles.settingItem}
          />
          <SettingItem.Toggle
            left={<SettingItemLabel label="하트" isSub />}
            isSelected={pushNotiSettings.heart}
            disabled={pushNotiDisabled}
            onToggle={() => {
              setPushNotiSettings((prev) => ({ ...prev, heart: !prev.heart }));
            }}
            style={styles.settingItem}
          />
          <SettingItem.Toggle
            left={<SettingItemLabel label="방명록" isSub />}
            isSelected={pushNotiSettings.comment}
            disabled={pushNotiDisabled}
            onToggle={() => {
              setPushNotiSettings((prev) => ({
                ...prev,
                comment: !prev.comment,
              }));
            }}
            style={styles.settingItem}
          />
          <SettingItem.Toggle
            left={<SettingItemLabel label="새 팔로워" isSub />}
            isSelected={pushNotiSettings.newFollower}
            disabled={pushNotiDisabled}
            onToggle={() => {
              setPushNotiSettings((prev) => ({
                ...prev,
                newFollower: !prev.newFollower,
              }));
            }}
            style={styles.settingItem}
          />
          <SettingItem.Toggle
            left={<SettingItemLabel label="그룹전시 요청" isSub />}
            isSelected={pushNotiSettings.requestOfGroupExhibition}
            disabled={pushNotiDisabled}
            onToggle={() => {
              setPushNotiSettings((prev) => ({
                ...prev,
                requestOfGroupExhibition: !prev.requestOfGroupExhibition,
              }));
            }}
            style={styles.settingItem}
          />
        </Area>
        <Divider />
        <Area title="기타 알림">
          <SettingItem.Toggle
            left={<SettingItemLabel label="SMS 알림" />}
            isSelected={etcNotiSettings.sms}
            onToggle={() => {
              setEtcNotiSettings((prev) => ({ ...prev, sms: !prev.sms }));
            }}
            style={styles.settingItem}
          />
          <SettingItem.Toggle
            left={<SettingItemLabel label="이메일 알림" />}
            isSelected={etcNotiSettings.email}
            onToggle={() => {
              setEtcNotiSettings((prev) => ({ ...prev, email: !prev.email }));
            }}
            style={styles.settingItem}
          />
        </Area>
        <Divider />
        <Area title="계정 관리">
          <Pressable
            onPress={() => {
              Alert.alert(
                `${name} 님,\nOEUVRE에서 로그아웃하시겠어요?`,
                undefined,
                [
                  {
                    text: '로그아웃',
                    onPress: () => {
                      clear();
                      clearUserStore();
                    },
                    style: 'destructive',
                  },
                  { text: '취소하기', style: 'cancel' },
                ],
              );
            }}
          >
            <SettingItemLabel label="로그아웃" style={styles.textSettingItem} />
          </Pressable>
          <Pressable
            onPress={() => {
              Alert.alert(
                `${name} 님,\n정말로 계정을\n삭제하시겠어요?`,
                undefined,
                [
                  {
                    text: '계정 삭제하기',
                    onPress: async () => {
                      const response = await fetchWithToken(deactiveUser);
                      if (response.isSuccess) {
                        clear();
                      } else {
                        console.error(response.result);
                        Alert.alert(
                          '문제가 발생했습니다. 다시 시도하거나 문의해 주세요.',
                        );
                      }
                    },
                    style: 'destructive',
                  },
                  { text: '취소하기', style: 'cancel' },
                ],
              );
            }}
          >
            <SettingItemLabel
              label="계정 삭제"
              style={styles.textSettingItem}
            />
          </Pressable>
        </Area>
        <Divider />
        <Area title="정책">
          <Pressable
            onPress={() => {
              Linking.openURL(
                'https://makeus-challenge.notion.site/9dfb41a1e9284a6cae315db1cf7d9c5b',
              );
            }}
          >
            <SettingItem.Base
              left={<SettingItemLabel label="서비스 약관" />}
              right={<Arrow />}
              style={styles.settingItem}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              Linking.openURL(
                'https://makeus-challenge.notion.site/c97ed10160a74e9d87dcfadb01fea89b',
              );
            }}
          >
            <SettingItem.Base
              left={<SettingItemLabel label="개인정보 처리방침" />}
              right={<Arrow />}
              style={styles.settingItem}
            />
          </Pressable>
        </Area>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingScreen;
