import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import {
  CompositeNavigationProp,
  ParamListBase,
  RouteProp,
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  getFollowings,
  getFollowers,
  followUser,
  unfollowUser,
} from '@/apis/user';
import { Header } from '@/components/Header';
import { Screen } from '@/constants/screens';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import FollowerList from '@/feature/FollowerList';
import { RootStackParamsList } from '@/feature/Routes';
import { ProfileStackParamsList } from '@/feature/Routes/ProfileStack';
import useAuth from '@/hooks/useAuth';
import { useUserStore } from '@/states/userStore';
import type { UserMini } from '@/types/user';

export type FollowListScreenParams = {
  userNo: number;
  exhibitionName: string;
};

export type FollowListScreenRP = RouteProp<
  ProfileStackParamsList,
  Screen.FollowListScreen
>;

export type FollowListScreenNP = CompositeNavigationProp<
  StackNavigationProp<ProfileStackParamsList, Screen.FollowListScreen>,
  StackNavigationProp<RootStackParamsList>
>;

const Tab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});

type ScreenOptions =
  | ((props: {
      route: RouteProp<ParamListBase, string>;
      navigation: any;
    }) => MaterialTopTabNavigationOptions)
  | undefined;

const screenOptions: ScreenOptions = () => ({
  tabBarShowLabel: true,
  tabBarActiveTintColor: COLOR.mono.black,
  tabBarInactiveTintColor: COLOR.mono.gray3,
  tabBarIndicatorStyle: {
    backgroundColor: COLOR.mono.black,
  },
  tabBarLabelStyle: TEXT_STYLE.body14M,
});

interface WrappedFollowListProps {
  getFollowList: () => Promise<UserMini[]>;
  onFollowPress?: (
    isFollowing: boolean,
    userNo: number,
    setData: Dispatch<SetStateAction<UserMini[]>>,
  ) => void;
  onPress?: (userNo: number) => void;
}

const WrappedFollowList = ({
  getFollowList,
  onFollowPress,
  onPress,
}: WrappedFollowListProps) => {
  const [data, setData] = useState<UserMini[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    const users = await getFollowList();
    setData(users);
    setRefreshing(false);
  }, [getFollowList]);

  const handleFollowPress = useCallback(
    (isFollowing: boolean, userNo: number) => {
      onFollowPress?.(isFollowing, userNo, setData);
    },
    [onFollowPress],
  );

  useEffect(() => {
    if (data.length === 0) refresh();
  }, [data.length, refresh]);

  return (
    <FollowerList
      users={data}
      onRefresh={refresh}
      refreshing={refreshing}
      onFollowPress={handleFollowPress}
      onPress={onPress}
    />
  );
};

const FollowListScreen = () => {
  const navigation = useNavigation<FollowListScreenNP>();
  const { params } = useRoute<FollowListScreenRP>();
  const { fetchWithToken } = useAuth();
  const { userNo: myUserNo } = useUserStore();

  const toggleFollowUser = useCallback(
    async (
      isFollowing: boolean,
      userNo: number,
      setData: Dispatch<SetStateAction<UserMini[]>>,
    ) => {
      const followFunction = isFollowing ? unfollowUser : followUser;

      const response = await fetchWithToken(followFunction, userNo);
      if (response.isSuccess) {
        setData((prev) =>
          prev.map((value) => {
            if (value.userNo === userNo) {
              return { ...value, isFollowing: !value.isFollowing };
            }
            return value;
          }),
        );
      } else {
        console.error(response.result);
      }
    },
    [fetchWithToken],
  );

  const goToProfile = useCallback(
    (userNo: number) => {
      if (userNo === myUserNo) {
        navigation.navigate(Screen.MyProfileScreen);
      } else {
        navigation.navigate(Screen.ProfileScreen, { userNo });
      }
    },
    [navigation, myUserNo],
  );

  const renderFollowingList = useCallback(
    () => (
      <WrappedFollowList
        getFollowList={async () => {
          const response = await fetchWithToken(getFollowings, params.userNo);
          if (response.isSuccess) {
            return response.result.result;
          }

          console.error(response.result);
          return [];
        }}
        onFollowPress={toggleFollowUser}
        onPress={goToProfile}
      />
    ),
    [fetchWithToken, params.userNo, toggleFollowUser, goToProfile],
  );

  const renderFollowerList = useCallback(
    () => (
      <WrappedFollowList
        getFollowList={async () => {
          const response = await fetchWithToken(getFollowers, params.userNo);
          if (response.isSuccess) {
            return response.result.result;
          }

          console.error(response.result);
          return [];
        }}
        onFollowPress={toggleFollowUser}
        onPress={goToProfile}
      />
    ),
    [fetchWithToken, params.userNo, toggleFollowUser, goToProfile],
  );

  return (
    <SafeAreaView style={styles.safeAreaView} edges={['top', 'left', 'right']}>
      <Header
        headerTitle={params.exhibitionName}
        iconColor={COLOR.mono.black}
      />
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="팔로잉" component={renderFollowingList} />
        <Tab.Screen name="팔로워" component={renderFollowerList} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default FollowListScreen;
