import {
  type CompositeNavigationProp,
  type RouteProp,
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useState, useCallback, useEffect } from 'react';
import { FollowListScreenType } from '../FollowListScreen';
import ProfileTemplate from './ProfileTemplate';
import WrappedFloorList from './WrappedFloorList';
import { followUser, getProfile, unfollowUser } from '@/apis/user';
import { Navigator, Screen } from '@/constants/screens';
import type { RootStackParamsList } from '@/feature/Routes';
import type { ProfileStackParamsList } from '@/feature/Routes/ProfileStack';
import useAuth from '@/hooks/useAuth';
import type { FloorMini } from '@/types/floor';
import type { OtherUserProfile } from '@/types/user';

export type ProfileScreenParams = {
  userNo: number;
};

export type ProfileScreenNP = CompositeNavigationProp<
  StackNavigationProp<ProfileStackParamsList, Screen.ProfileScreen>,
  StackNavigationProp<RootStackParamsList>
>;

export type ProfileScreenRP = RouteProp<
  ProfileStackParamsList,
  Screen.ProfileScreen
>;

interface BasicFloorListProps {
  userNo: number;
}

const BasicFloorList = ({ userNo }: BasicFloorListProps) => {
  const navigation = useNavigation<ProfileScreenNP>();

  const [floors, setFloors] = useState<FloorMini[]>([]);

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
      onFloorPress={goToFloor}
    />
  );
};

const ProfileScreen = () => {
  const route = useRoute<ProfileScreenRP>();
  const navigation = useNavigation<ProfileScreenNP>();
  const { fetchWithToken } = useAuth();

  const [profile, setProfile] = useState<OtherUserProfile>({
    backgroundImageUrl: '',
    exhibitionName: '',
    followerCount: 0,
    followingCount: 0,
    id: '',
    introduceMessage: '',
    name: '',
    profileImageUrl: '',
    isFollower: false,
    isFollowing: false,
  });

  const renderFloorList = useCallback(
    () => <BasicFloorList userNo={route.params.userNo} />,
    [route.params.userNo],
  );

  useEffect(() => {
    async function updateProfile() {
      const response = await fetchWithToken(getProfile, route.params.userNo);
      if (response.isSuccess) {
        setProfile(response.result.result);
      } else {
        console.error(response.result);
      }
    }

    updateProfile();
  }, [fetchWithToken, route.params.userNo]);

  const toggleFollowUser = useCallback(async () => {
    const followFunction = profile.isFollowing ? unfollowUser : followUser;

    const response = await fetchWithToken(followFunction, route.params.userNo);
    if (response.isSuccess) {
      setProfile((prev) => ({ ...prev, isFollowing: !prev.isFollowing }));
    } else {
      console.error(response.result);
    }
  }, [fetchWithToken, profile.isFollowing, route.params.userNo]);

  return (
    <ProfileTemplate
      profile={profile}
      renderFloorList={renderFloorList}
      isFollower={profile.isFollower}
      isFollowing={profile.isFollowing}
      onFollowPress={toggleFollowUser}
      onFollowAreaPress={(type: FollowListScreenType) => {
        navigation.navigate(Screen.FollowListScreen, {
          userNo: route.params.userNo,
          exhibitionName: profile.exhibitionName,
          type,
        });
      }}
    />
  );
};

export default ProfileScreen;
