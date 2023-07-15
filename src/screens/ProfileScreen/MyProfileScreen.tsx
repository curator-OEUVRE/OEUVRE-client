import {
  useNavigation,
  type CompositeNavigationProp,
} from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { MediaTypeOptions } from 'expo-image-picker';
import { Asset } from 'expo-media-library';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import shallow from 'zustand/shallow';
import ProfileTemplate from './ProfileTemplate';
import WrappedFloorList from './WrappedFloorList';
import { editFloorsOrder } from '@/apis/floor';
import { getCollection } from '@/apis/user';
import { Screen, Navigator } from '@/constants/screens';
import { COLOR } from '@/constants/styles';
import Collection from '@/feature/Collection';
import ImagePickerModal from '@/feature/ImagePickerModal';
import type { RootStackParamsList } from '@/feature/Routes';
import type { MainTabParamsList } from '@/feature/Routes/MainTabNavigator';
import { ProfileStackParamsList } from '@/feature/Routes/ProfileStack';
import useAuth from '@/hooks/useAuth';
import { getImagesFromLibrary } from '@/services/common/image';
import { useCreateFloorStore } from '@/states/createFloorStore';
import { useFloorStore } from '@/states/floorStore';
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
  const navigation = useNavigation<MyProfileScreenNP>();

  const { floors, setFloors, userNo } = useUserStore();
  const { fetchWithToken } = useAuth();
  const editFloors = useCallback(
    async (newFloors: FloorMini[]) => {
      setFloors(newFloors);
      await fetchWithToken(
        editFloorsOrder,
        newFloors.map((floor) => ({
          floorNo: floor.floorNo,
          queue: floor.queue,
        })),
      );
    },
    [fetchWithToken, setFloors],
  );

  const goToFloor = useCallback(
    (floorNo: number) => {
      navigation.navigate(Navigator.FloorStack, {
        screen: Screen.FloorViewerScreen,
        params: { floorNo },
      });
    },
    [navigation],
  );

  return (
    <WrappedFloorList
      floors={floors}
      userNo={userNo}
      setFloors={setFloors}
      onDragEnd={editFloors}
      onFloorPress={goToFloor}
    />
  );
};

const MyCollection = () => {
  const navigation = useNavigation<MyProfileScreenNP>();

  const { collection, setCollection } = useUserStore();
  const { fetchWithToken } = useAuth();
  const { fetchPicture } = useFloorStore();

  const [page, setPage] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  const loadMorePictures = useCallback(async () => {
    if (isLastPage) return;

    const response = await fetchWithToken(getCollection, {
      page: page + 1,
      size: 10,
    });
    if (response.isSuccess) {
      setCollection([...collection, ...response.result.result.contents]);
      setPage((prev) => prev + 1);
      setIsLastPage(response.result.result.isLastPage);
    } else {
      console.error(response.result);
    }
  }, [fetchWithToken, page, setCollection, collection, isLastPage]);

  const refreshCollection = useCallback(async () => {
    setRefreshing(true);

    const response = await fetchWithToken(getCollection, { page: 0, size: 10 });
    if (response.isSuccess) {
      setPage(0);
      setCollection(response.result.result.contents);
      setIsLastPage(false);
    } else {
      console.error(response.result);
    }

    setRefreshing(false);
  }, [fetchWithToken, setCollection]);

  const goToPicture = useCallback(
    async (pictureNo: number) => {
      await fetchPicture(pictureNo);
      navigation.navigate(Navigator.FloorStack, {
        screen: Screen.ImageDetailScreen,
      });
    },
    [navigation, fetchPicture],
  );

  useEffect(() => {
    if (collection.length === 0) refreshCollection();
  }, [collection.length, refreshCollection]);

  return (
    <Collection
      pictures={collection}
      refreshing={refreshing}
      onEndReached={loadMorePictures}
      onRefresh={refreshCollection}
      onPicturePress={goToPicture}
    />
  );
};

const MyProfileScreen = () => {
  const navigation = useNavigation<MyProfileScreenNP>();
  const { createPictures } = useCreateFloorStore();
  const [modalVisible, setModalVisible] = useState(false);
  const { floors } = useUserStore();
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

  const onPickImagesComplete = useCallback(
    (images: Asset[]) => {
      const imageUrls = images.map((image) => ({
        imageUrl: image.uri,
        width: (image.width * 0.5) / image.height,
        height: 0.5,
      }));
      console.log(imageUrls);
      createPictures(imageUrls);
      navigation.navigate(Navigator.CreateFloorStack, {
        screen: Screen.EditFloorScreen,
      });
    },
    [createPictures, navigation],
  );

  const onAddFloorPress = useCallback(async () => {
    if (floors.length >= 10) {
      Alert.alert('플로어는 최대 10개까지 생성할 수 있습니다.');
      return;
    }
    setModalVisible(true);
  }, [floors]);

  return (
    <>
      <ImagePickerModal
        visible={modalVisible}
        setVisible={setModalVisible}
        headerRightText="다음"
        headerTitle="플로어 추가"
        onComplete={onPickImagesComplete}
      />
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
        onAddFloorPress={onAddFloorPress}
      />
    </>
  );
};

export default MyProfileScreen;
