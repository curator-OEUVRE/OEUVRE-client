import {
  useNavigation,
  type CompositeNavigationProp,
} from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ICarouselInstance } from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import { useHomeStore } from '@/states/homeStore';
import { useUserStore } from '@/states/userStore';
import { HomeFloorFilter } from '@/types/home';

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
  { label: '최신순', value: HomeFloorFilter.LATEST },
  {
    label: '팔로잉',
    value: HomeFloorFilter.FOLLOWING,
  },
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

  const { floors, fetchFloors, initHomeStore, filter, setFilter } =
    useHomeStore();
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

  const refresh = () => {
    initHomeStore();
  };

  const loadMoreFloors = async () => {
    fetchFloors();
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
      {floors.length > 0 ? (
        <TicketCarousel
          ref={carouselRef}
          filter={filter}
          data={floors}
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
