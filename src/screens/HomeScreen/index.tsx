import {
  useNavigation,
  type CompositeNavigationProp,
} from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ICarouselInstance } from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getHomeFeed, HomeFloorFilter, type HomeFloor } from '@/apis/floor';
import PhotoIcon from '@/assets/icons/Photo';
import { Header, Radio } from '@/components';
import { DynamicLinkType } from '@/constants/dynamicLinks';
import { Navigator, Screen } from '@/constants/screens';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import type { RootStackParamsList } from '@/feature/Routes';
import type { HomeStackParamsList } from '@/feature/Routes/HomeStack';
import type { MainTabParamsList } from '@/feature/Routes/MainTabNavigator';
import TicketCarousel from '@/feature/TicketCarousel';
import useAuth from '@/hooks/useAuth';
import useDynamicLinks, { OnDynamicLink } from '@/hooks/useDynamicLinks';
import { useFloorStore } from '@/states/floorStore';
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
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  emptyContent: {
    alignItems: 'center',
    justiftContent: 'center',
  },
  emptyText: {
    color: COLOR.mono.gray4,
    marginTop: 8,
  },
  wrapRadio: {
    marginBottom: 60,
    marginTop: 40,
  },
});

const ListEmptyComponent = () => (
  <View style={styles.emptyContainer}>
    <View style={styles.emptyContent}>
      <PhotoIcon width={72} height={72} color={COLOR.mono.gray3} />
      <Text style={[TEXT_STYLE.body16M, styles.emptyText]}>
        아직 새로운 전시가 없어요
      </Text>
    </View>
  </View>
);

const FilterOptions = [
  {
    label: '팔로잉',
    value: HomeFloorFilter.FOLLOWING,
  },
  { label: '최신순', value: HomeFloorFilter.LATEST },
];

const HomeScreen = () => {
  const { fetchWithToken } = useAuth();
  const { userNo: myUserNo } = useUserStore();
  const navigation = useNavigation<HomeScreenNP>();
  const { fetchPicture } = useFloorStore();
  const handleDynamicLink: OnDynamicLink = useCallback(
    (params) => {
      switch (params.type) {
        case DynamicLinkType.FLOOR: {
          navigation.navigate(Navigator.FloorStack, {
            screen: Screen.FloorViewerScreen,
            params: { floorNo: Number(params.id) },
          });
          break;
        }
        case DynamicLinkType.IMAGE: {
          fetchPicture(Number(params.id));
          navigation.navigate(Navigator.FloorStack, {
            screen: Screen.ImageDetailScreen,
            params: { color: COLOR.mono.white },
          });
          break;
        }
        default: {
          break;
        }
      }
    },
    [navigation, fetchPicture],
  );
  useDynamicLinks(handleDynamicLink);

  const [data, setData] = useState<HomeFloor[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState<HomeFloorFilter>(
    HomeFloorFilter.FOLLOWING,
  );
  const carouselRef = useRef<ICarouselInstance>(null);

  const onPress = useCallback(
    (floorNo: number) => {
      navigation.navigate(Navigator.FloorStack, {
        screen: Screen.FloorViewerScreen,
        params: { floorNo },
      });
    },
    [navigation],
  );

  const onProfilePress = useCallback(
    (userNo: number) => {
      if (userNo === myUserNo) {
        navigation.navigate(Navigator.ProfileStack, {
          screen: Screen.MyProfileScreen,
        });
      } else {
        navigation.navigate(Screen.ProfileScreen, { userNo });
      }
    },
    [navigation, myUserNo],
  );

  const refresh = async () => {
    setRefreshing(true);

    const response = await fetchWithToken(getHomeFeed, {
      page: 0,
      size: 10,
      view: filter,
    });
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
      view: filter,
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
    carouselRef?.current?.scrollTo({ index: 0, animated: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Header hideBackButton headerTitle="피드" />
      <View style={styles.wrapRadio}>
        <Radio value={filter} onChange={setFilter} data={FilterOptions} />
      </View>
      {data.length > 0 ? (
        <TicketCarousel
          ref={carouselRef}
          data={data}
          onEndReached={loadMoreFloors}
          onPress={onPress}
          onProfilePress={onProfilePress}
        />
      ) : (
        <ListEmptyComponent />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
