import {
  type CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useEffect, useState, useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  type ListRenderItemInfo,
  View,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getHomeFeed, type HomeFloor } from '@/apis/floor';
import PhotoIcon from '@/assets/icons/Photo';
import { Header } from '@/components/Header';
import { Navigator, Screen } from '@/constants/screens';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
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
  emptyText: {
    color: COLOR.mono.gray4,
    marginTop: 8,
  },
  ticket: {
    marginBottom: 32,
  },
});

const ListEmptyComponent = () => (
  <View>
    <PhotoIcon width={72} height={72} color={COLOR.mono.gray3} />
    <Text style={[TEXT_STYLE.body16M, styles.emptyText]}>
      아직 새로운 전시가 없어요
    </Text>
  </View>
);

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
      setPage(0);
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
        ListEmptyComponent={ListEmptyComponent}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
