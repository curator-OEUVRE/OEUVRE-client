import {
  BottomTabBar,
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import type { SvgProps } from 'react-native-svg';
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
import HomeScreen, { HomeScreenParams } from '@/screens/HomeScreen';
import NotificationScreen, {
  NotificationScreenParams,
} from '@/screens/NotificationScreen';
import SearchScreen, { SearchScreenParams } from '@/screens/SearchScreen';

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
    {icon({ color: isFocused ? COLOR.mono.black : COLOR.mono.gray3 })}
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
  [Screen.HomeScreen]: HomeScreenParams;
  [Screen.SearchScreen]: SearchScreenParams;
  [Screen.GroupFeedScreen]: GroupFeedScreenParams;
  [Screen.NotificationScreen]: NotificationScreenParams;
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
      case Screen.HomeScreen:
        return <TabIcon isFocused={props.focused} icon={HomeIcon} />;
      case Screen.SearchScreen:
        return <TabIcon isFocused={props.focused} icon={SearchIcon} />;
      case Screen.GroupFeedScreen:
        return <TabIcon isFocused={props.focused} icon={GroupIcon} />;
      case Screen.NotificationScreen:
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
    initialRouteName={Screen.HomeScreen}
    tabBar={TabBar}
    screenOptions={screenOptions}
  >
    <MainTab.Screen name={Screen.HomeScreen} component={HomeScreen} />
    <MainTab.Screen name={Screen.SearchScreen} component={SearchScreen} />
    <MainTab.Screen name={Screen.GroupFeedScreen} component={GroupFeedScreen} />
    <MainTab.Screen
      name={Screen.NotificationScreen}
      component={NotificationScreen}
    />
    <MainTab.Screen name={Navigator.ProfileStack} component={ProfileStack} />
  </MainTab.Navigator>
);

export default MainTabNavigator;
