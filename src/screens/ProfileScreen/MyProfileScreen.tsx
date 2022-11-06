import {
  useNavigation,
  type CompositeNavigationProp,
} from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useState } from 'react';
import shallow from 'zustand/shallow';
import ProfileTemplate from './ProfileTemplate';
import WrappedFloorList from './WrappedFloorList';
import { editFloorsOrder } from '@/apis/floor';
import { getCollection } from '@/apis/user';
import { Screen, Navigator } from '@/constants/screens';
import Collection from '@/feature/Collection';
import type { RootStackParamsList } from '@/feature/Routes';
import type { MainTabParamsList } from '@/feature/Routes/MainTabNavigator';
import { ProfileStackParamsList } from '@/feature/Routes/ProfileStack';
import useAuth from '@/hooks/useAuth';
import { useUserStore } from '@/states/userStore';
import type { FloorMini } from '@/types/floor';
import type { UserProfile } from '@/types/user';

export type MyProfileScreenParams = undefined;

export type MyProfileScreenNP = CompositeNavigationProp<
  StackNavigationProp<ProfileStackParamsList, Screen.MyProfileScreen>,
  CompositeNavigationProp<
    StackNavigationProp<MainTabParamsList, Navigator.ProfileStack>,
    StackNavigationProp<RootStackParamsList>
  >
>;

const MyFloorList = () => {
  const { floors, setFloors, userNo } = useUserStore();
  const { fetchWithToken } = useAuth();

  const editFloors = useCallback(
    async (newFloors: FloorMini[]) => {
      const response = await fetchWithToken(
        editFloorsOrder,
        newFloors.map((floor) => ({
          floorNo: floor.floorNo,
          queue: floor.queue,
        })),
      );
      if (response.isSuccess) {
        setFloors(newFloors);
      }
    },
    [fetchWithToken, setFloors],
  );

  return (
    <WrappedFloorList
      floors={floors}
      userNo={userNo}
      setFloors={setFloors}
      onDragEnd={editFloors}
    />
  );
};

const MyCollection = () => {
  const { collection, setCollection } = useUserStore();
  const { fetchWithToken } = useAuth();

  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const loadMorePictures = useCallback(async () => {
    const response = await fetchWithToken(getCollection, { page, size: 10 });
    if (response.isSuccess) {
      setCollection([...collection, ...response.result.result.contents]);
      setPage((prev) => prev + 1);
    } else {
      console.error(response.result);
    }
  }, [fetchWithToken, page, setCollection, collection]);

  const refreshCollection = useCallback(async () => {
    setRefreshing(true);

    const response = await fetchWithToken(getCollection, { page: 1, size: 10 });
    if (response.isSuccess) {
      setPage(1);
      setCollection(response.result.result.contents);
    } else {
      console.error(response.result);
    }

    setRefreshing(false);
  }, [fetchWithToken, setCollection]);

  // TODO: `onPicturePress` 구현
  return (
    <Collection
      pictures={collection}
      refreshing={refreshing}
      onEndReached={loadMorePictures}
      onRefresh={refreshCollection}
    />
  );
};

const MyProfileScreen = () => {
  const navigation = useNavigation<MyProfileScreenNP>();

  const profile = useUserStore<UserProfile>(
    (state) => ({
      backgroundImageUrl: state.backgroundImageUrl,
      exhibitionName: state.exhibitionName,
      followerCount: state.followerCount,
      followingCount: state.followingCount,
      id: state.id,
      introduceMessage: state.introduceMessage,
      name: state.name,
      profileImageUrl: state.profileImageUrl,
    }),
    shallow,
  );

  return (
    <ProfileTemplate
      profile={profile}
      renderFloorList={MyFloorList}
      renderCollection={MyCollection}
      onEditPress={() => {
        navigation.navigate(Screen.EditProfileScreen);
      }}
      onSettingPress={() => {
        navigation.navigate(Screen.SettingScreen);
      }}
      // TODO: `onAddFloorPress` 구현
    />
  );
};

export default MyProfileScreen;
