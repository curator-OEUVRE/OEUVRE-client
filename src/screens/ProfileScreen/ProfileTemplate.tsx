import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddFloorIcon from '@/assets/icons/AddFloor';
import AlertIcon from '@/assets/icons/Alert';
import BookmarkFilledIcon from '@/assets/icons/BookmarkFilled';
import FloorIcon from '@/assets/icons/Floor';
import MoreIcon from '@/assets/icons/More';
import PersonIcon from '@/assets/icons/Person';
import PersonOffIcon from '@/assets/icons/PersonOff';
import SettingIcon from '@/assets/icons/Setting';
import {
  BottomSheet,
  BottomSheetItem,
  BottomSheetItemGroup,
} from '@/components';
import { Header } from '@/components/Header';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import ProfileCard from '@/feature/ProfileCard';
import type { UserProfile } from '@/types/user';

const Tab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
  addFloorIcon: {
    marginRight: 16,
  },
  background: {
    height: 160,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  container: {
    flex: 1,
  },
  /* eslint-disable-next-line react-native/no-color-literals */
  filter: {
    backgroundColor: 'rgba(20, 23, 24, 0.4)',
    height: 160,
    position: 'absolute',
    width: '100%',
  },
  followInfo: {
    alignItems: 'center',
    flex: 1,
    height: 70,
    justifyContent: 'center',
  },
  followInfoContainer: {
    flexDirection: 'row',
  },
  headerRight: {
    flexDirection: 'row',
  },
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

const screenOptions: ScreenOptions = ({ route }) => ({
  tabBarShowLabel: false,
  tabBarIcon: ({ color }) => {
    switch (route.name) {
      case 'FloorList': {
        return <FloorIcon width={26} height={26} color={color} />;
      }
      default: {
        return <BookmarkFilledIcon width={26} height={26} color={color} />;
      }
    }
  },
  tabBarActiveTintColor: COLOR.mono.black,
  tabBarInactiveTintColor: COLOR.mono.gray3,
  tabBarIndicatorStyle: {
    backgroundColor: COLOR.mono.black,
  },
});

interface Props {
  profile: UserProfile;
  isFollowing?: boolean;
  isFollower?: boolean;
  renderFloorList: () => JSX.Element;
  renderCollection?: () => JSX.Element;
  onAddFloorPress?: () => void;
  onSettingPress?: () => void;
  onFollowPress?: (isFollowing: boolean) => void;
  onEditPress?: () => void;
}

const ProfileTemplate = ({
  profile,
  isFollower,
  isFollowing,
  renderFloorList,
  renderCollection,
  onAddFloorPress,
  onSettingPress,
  onFollowPress,
  onEditPress,
}: Props) => {
  const hasBackgroundImage = !!profile.backgroundImageUrl;
  const isMyProfile = !!renderCollection;

  const [bottomSheetIndex, setBottomSheetIndex] = useState(-1);

  const dynamicStyle = useMemo(
    () => ({
      profileCard: {
        marginTop: hasBackgroundImage ? 45 : 8,
      },
    }),
    [hasBackgroundImage],
  );

  const headerRight = ({ iconColor }: { iconColor?: string }) =>
    isMyProfile ? (
      <View style={styles.headerRight}>
        <Pressable onPress={onAddFloorPress}>
          <AddFloorIcon
            width={26}
            height={26}
            color={iconColor}
            style={styles.addFloorIcon}
          />
        </Pressable>
        <Pressable onPress={onSettingPress}>
          <SettingIcon width={26} height={26} color={iconColor} />
        </Pressable>
      </View>
    ) : (
      <Pressable
        onPress={() => {
          setBottomSheetIndex(0);
        }}
      >
        <MoreIcon width={26} height={26} color={iconColor} />
      </Pressable>
    );

  return (
    <>
      <View style={styles.container}>
        {hasBackgroundImage && (
          <>
            <FastImage
              style={styles.background}
              source={{ uri: profile.backgroundImageUrl }}
              resizeMode="cover"
            />
            <View style={styles.filter} />
          </>
        )}
        <SafeAreaView
          style={styles.safeAreaView}
          edges={['top', 'left', 'right']}
        >
          <Header
            headerTitle={profile.exhibitionName}
            backgroundColor="transparent"
            hideBackButton={isMyProfile}
            headerRight={headerRight}
            iconColor={hasBackgroundImage ? COLOR.mono.white : COLOR.mono.black}
          />
          <ProfileCard
            profileImageUrl={profile.profileImageUrl}
            name={profile.name}
            id={profile.id}
            introduceMessage={profile.introduceMessage}
            style={dynamicStyle.profileCard}
            isFollower={isFollower}
            isFollowing={isFollowing}
            onFollowPress={onFollowPress}
            onEditPress={onEditPress}
          />
          {isMyProfile ? (
            <Tab.Navigator screenOptions={screenOptions}>
              <Tab.Screen name="FloorList" component={renderFloorList} />
              <Tab.Screen name="Collection" component={renderCollection} />
            </Tab.Navigator>
          ) : (
            renderFloorList()
          )}
        </SafeAreaView>
      </View>
      <BottomSheet
        index={bottomSheetIndex}
        onChange={setBottomSheetIndex}
        snapPoints={[260]}
      >
        <View style={styles.followInfoContainer}>
          <View style={styles.followInfo}>
            <Text style={TEXT_STYLE.button16M}>팔로잉</Text>
            <Text style={TEXT_STYLE.title20M}>{profile.followingCount}</Text>
          </View>
          <View style={styles.followInfo}>
            <Text style={TEXT_STYLE.button16M}>팔로워</Text>
            <Text style={TEXT_STYLE.title20M}>{profile.followerCount}</Text>
          </View>
        </View>
        <BottomSheetItemGroup>
          <BottomSheetItem
            label="팔로우하기"
            icon={
              <PersonIcon width={26} height={26} color={COLOR.mono.black} />
            }
            color={COLOR.mono.black}
          />
          <BottomSheetItem
            label="차단하기"
            icon={
              <PersonOffIcon width={26} height={26} color={COLOR.system.red} />
            }
            color={COLOR.system.red}
            // TODO: 차단 추가
            onPress={() => {
              alert('차단되었습니다.');
            }}
          />
          <BottomSheetItem
            label="신고하기"
            icon={<AlertIcon width={26} height={26} color={COLOR.system.red} />}
            color={COLOR.system.red}
            // TODO: 신고 추가
            onPress={() => {
              alert('신고되었습니다.');
            }}
          />
        </BottomSheetItemGroup>
      </BottomSheet>
    </>
  );
};

export default ProfileTemplate;
