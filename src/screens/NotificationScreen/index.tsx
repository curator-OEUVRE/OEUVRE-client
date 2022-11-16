import {
  CompositeNavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getNotification } from '@/apis/notification';
import { followUser, unfollowUser } from '@/apis/user';
import { Header } from '@/components';
import { Screen, Navigator } from '@/constants/screens';
import NotificationList from '@/feature/NotificationList';
import { RootStackParamsList } from '@/feature/Routes';
import { MainTabParamsList } from '@/feature/Routes/MainTabNavigator';
import useAuth from '@/hooks/useAuth';
import { Notification } from '@/types/notification';

export type NotificationScreenParams = undefined;
export type NotificationScreenNP = CompositeNavigationProp<
  StackNavigationProp<MainTabParamsList, Navigator.NotificationStack>,
  StackNavigationProp<RootStackParamsList>
>;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const NotificationScreen = () => {
  const navigation = useNavigation<NotificationScreenNP>();
  const [data, setData] = useState<Notification[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const { fetchWithToken } = useAuth();
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const response = await getNotification({ page: 0 });
        if (response.isSuccess) {
          const { result } = response.result;
          setData(result.contents);
          setIsLastPage(result.isLastPage);
        } else {
          // eslint-disable-next-line no-console
          console.log(response.result.errorMessage);
        }
      };
      fetchData();
    }, []),
  );

  const fetchMore = useCallback(async () => {
    if (isLastPage) return;
    const response = await getNotification({ page });
    if (response.isSuccess) {
      const { result } = response.result;
      setData((prev) => [...prev, ...result.contents]);
      setIsLastPage(result.isLastPage);
      setPage((prev) => prev + 1);
    } else {
      // eslint-disable-next-line no-console
      console.log(response.result.errorMessage);
    }
  }, [page, isLastPage]);

  const toggleFollowUser = useCallback(
    async (isFollowing: boolean, userNo: number) => {
      const followFunction = isFollowing ? unfollowUser : followUser;

      const response = await fetchWithToken(followFunction, userNo);
      if (response.isSuccess) {
        setData((prev) =>
          prev.map((notification) => {
            if (
              notification.type === 'FOLLOWING' &&
              notification.sendUserNo === userNo
            ) {
              return {
                ...notification,
                isFollowing: !notification.isFollowing,
              };
            }
            return notification;
          }),
        );
      } else {
        // eslint-disable-next-line no-console
        console.error(response.result);
      }
    },
    [fetchWithToken],
  );

  const onPressProfile = useCallback(
    (userNo: number) => {
      navigation.navigate(Navigator.NotificationStack, {
        screen: Screen.ProfileScreen,
        params: { userNo },
      });
    },
    [navigation],
  );

  const onPressNotification = useCallback(
    (notification: Notification) => {
      const { type, floorNo, sendUserNo, pictureNo } = notification;
      switch (type) {
        case 'COMMENT':
          if (!floorNo) return;
          navigation.navigate(Navigator.FloorStack, {
            screen: Screen.GuestBookScreen,
            params: { floorNo },
          });
          break;
        case 'FOLLOWING':
          onPressProfile(sendUserNo);
          break;
        case 'LIKES':
          if (!pictureNo) return;
          navigation.navigate(Navigator.FloorStack, {
            screen: Screen.ImageDetailScreen,
            params: { pictureNo },
          });
          break;
        default:
          break;
      }
    },
    [navigation, onPressProfile],
  );

  return (
    <View style={styles.container}>
      <Header headerTitle="알림" hideBackButton />
      <NotificationList
        data={data}
        onPressFollow={toggleFollowUser}
        onEndReached={fetchMore}
        onPressProfile={onPressProfile}
        onPress={onPressNotification}
      />
    </View>
  );
};

export default NotificationScreen;
