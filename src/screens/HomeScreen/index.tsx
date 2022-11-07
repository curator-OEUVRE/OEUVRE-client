import {
  type CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useEffect, useState, useCallback } from 'react';
import type { ListRenderItemInfo } from 'react-native';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getHomeFeed, type HomeFloor } from '@/apis/floor';
import { Header } from '@/components/Header';
import { Navigator, Screen } from '@/constants/screens';
import FloorTicket from '@/feature/FloorTicket';
import type { RootStackParamsList } from '@/feature/Routes';
import type { HomeStackParamsList } from '@/feature/Routes/HomeStack';
import type { MainTabParamsList } from '@/feature/Routes/MainTabNavigator';
import useAuth from '@/hooks/useAuth';
import { useUserStore } from '@/states/userStore';

export type HomeScreenParams = undefined;

export type HomeScreenNP = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamsList, Screen.HomeScreen>,
  CompositeNavigationProp<
    StackNavigationProp<MainTabParamsList, Navigator.HomeStack>,
    StackNavigationProp<RootStackParamsList>
  >
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    marginLeft: 20,
    marginTop: 24,
  },
  ticket: {
    marginBottom: 32,
  },
});

const keyExtractor = (item: HomeFloor) => `${item.floorNo}`;

const HomeScreen = () => {
  const { fetchWithToken } = useAuth();
  const { userNo: myUserNo } = useUserStore();
  const navigation = useNavigation<HomeScreenNP>();

  const [data, setData] = useState<HomeFloor[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<HomeFloor>) => (
      <FloorTicket
        {...item}
        containerStyle={styles.ticket}
        onPress={(floorNo) => {
          navigation.navigate(Navigator.FloorStack, {
            screen: Screen.FloorViewerScreen,
            params: { floorNo },
          });
        }}
        onProfilePress={(userNo) => {
          if (userNo === myUserNo) {
            navigation.navigate(Navigator.ProfileStack, {
              screen: Screen.MyProfileScreen,
            });
          } else {
            navigation.navigate(Screen.ProfileScreen, { userNo });
          }
        }}
      />
    ),
    [navigation, myUserNo],
  );

  const refresh = async () => {
    setRefreshing(true);

    const response = await fetchWithToken(getHomeFeed, { page: 0, size: 10 });
    if (response.isSuccess) {
      setPage(1);
      setData(response.result.result.contents);
    } else {
      console.error(response.result);
    }

    setRefreshing(false);
  };

  const loadMoreFloors = async () => {
    const response = await fetchWithToken(getHomeFeed, {
      page: page + 1,
      size: 10,
    });
    if (response.isSuccess) {
      setData((prev) => [...prev, ...response.result.result.contents]);
      setPage((prev) => prev + 1);
    } else {
      console.error(response.result);
    }
  };

  useEffect(() => {
    refresh();
    // 최초 1회만 실행해야 함
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Header hideBackButton headerTitle="피드" />
      <FlatList
        data={data}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={refresh}
        onEndReached={loadMoreFloors}
        onEndReachedThreshold={0.5}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
