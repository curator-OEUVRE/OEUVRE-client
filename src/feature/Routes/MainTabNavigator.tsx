import {
  BottomTabBar,
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import type { SvgProps } from 'react-native-svg';
import ExplorationStack, {
  type ExplorationStackParamsList,
} from './ExplorationStack';
import HomeStack, { type HomeStackParamsList } from './HomeStack';
import NotificationStack, {
  type NotificationStackParamsList,
} from './NotificationStack';
import ProfileStack, { type ProfileStackParamsList } from './ProfileStack';
import GroupIcon from '@/assets/icons/Group';
import HomeIcon from '@/assets/icons/Home';
import NotificationIcon from '@/assets/icons/Notification';
import PhotoIcon from '@/assets/icons/Photo';
import SearchIcon from '@/assets/icons/Search';
import { Navigator, Screen } from '@/constants/screens';
import { COLOR } from '@/constants/styles';
import { BOTTOM_TAB_HEIGHT } from '@/constants/styles/sizes';
import GroupFeedScreen, {
  GroupFeedScreenParams,
} from '@/screens/GroupFeedScreen';

interface TabIconProps {
  isFocused?: boolean;
  icon: (props: SvgProps) => JSX.Element;
}

const tabIconStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

const TabIcon = ({ isFocused, icon }: TabIconProps) => (
  <View style={tabIconStyles.container}>
    {icon({
      color: isFocused ? COLOR.mono.black : COLOR.mono.gray3,
      width: 30,
      height: 30,
    })}
  </View>
);

const tabBarStyles = StyleSheet.create({
  container: {
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const TabBar = (props: BottomTabBarProps) => (
  <View style={tabBarStyles.container}>
    <BottomTabBar {...props} />
  </View>
);

export type MainTabParamsList = {
  [Navigator.HomeStack]: NavigatorScreenParams<HomeStackParamsList>;
  [Navigator.ExplorationStack]: NavigatorScreenParams<ExplorationStackParamsList>;
  // [Screen.GroupFeedScreen]: GroupFeedScreenParams;
  [Navigator.NotificationStack]: NavigatorScreenParams<NotificationStackParamsList>;
  [Navigator.ProfileStack]: NavigatorScreenParams<ProfileStackParamsList>;
};

const MainTab = createBottomTabNavigator<MainTabParamsList>();

type ScreenOptions =
  | BottomTabNavigationOptions
  | ((props: {
      route: RouteProp<MainTabParamsList, keyof MainTabParamsList>;
      navigation: any;
    }) => BottomTabNavigationOptions)
  | undefined;

const screenOptions: ScreenOptions = ({ route }) => ({
  tabBarIcon: (props) => {
    switch (route.name) {
      case Navigator.HomeStack:
        return <TabIcon isFocused={props.focused} icon={HomeIcon} />;
      case Navigator.ExplorationStack:
        return <TabIcon isFocused={props.focused} icon={SearchIcon} />;
      // case Screen.GroupFeedScreen:
      //   return <TabIcon isFocused={props.focused} icon={GroupIcon} />;
      case Navigator.NotificationStack:
        return <TabIcon isFocused={props.focused} icon={NotificationIcon} />;
      case Navigator.ProfileStack:
        return <TabIcon isFocused={props.focused} icon={PhotoIcon} />;
      default:
        return <TabIcon isFocused={props.focused} icon={HomeIcon} />;
    }
  },
  headerShown: false,
  tabBarShowLabel: false,
  tabBarStyle: {
    backgroundColor: COLOR.mono.white,
    height: BOTTOM_TAB_HEIGHT,
  },
});

const MainTabNavigator = () => (
  <MainTab.Navigator
    initialRouteName={Navigator.HomeStack}
    tabBar={TabBar}
    screenOptions={screenOptions}
  >
    <MainTab.Screen name={Navigator.HomeStack} component={HomeStack} />
    <MainTab.Screen
      name={Navigator.ExplorationStack}
      component={ExplorationStack}
    />
    {/* <MainTab.Screen name={Screen.GroupFeedScreen} component={GroupFeedScreen} /> */}
    <MainTab.Screen
      name={Navigator.NotificationStack}
      component={NotificationStack}
    />
    <MainTab.Screen name={Navigator.ProfileStack} component={ProfileStack} />
  </MainTab.Navigator>
);

export default MainTabNavigator;
