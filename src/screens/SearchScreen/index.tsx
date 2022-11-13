import {
  createMaterialTopTabNavigator,
  type MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import {
  type CompositeNavigationProp,
  useNavigation,
  type RouteProp,
  useRoute,
  type ParamListBase,
} from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useState } from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FloorSearchResult from './FloorSearchResult';
import HashtagSearchResult from './HashtagSearchResult';
import UserSearchResult from './UserSearchResult';
import { Header } from '@/components/Header';
import { Navigator, Screen } from '@/constants/screens';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import type { RootStackParamsList } from '@/feature/Routes';
import type { ExplorationStackParamsList } from '@/feature/Routes/ExplorationStack';
import { MainTabParamsList } from '@/feature/Routes/MainTabNavigator';
import SearchInput from '@/feature/SearchInput';
import { useUserStore } from '@/states/userStore';

export type SearchScreenParams = {
  text: string;
};

export type SearchScreenNP = CompositeNavigationProp<
  StackNavigationProp<ExplorationStackParamsList, Screen.SearchScreen>,
  CompositeNavigationProp<
    StackNavigationProp<MainTabParamsList, Navigator.ExplorationStack>,
    StackNavigationProp<RootStackParamsList>
  >
>;

export type SearchScreenRP = RouteProp<
  ExplorationStackParamsList,
  Screen.SearchScreen
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 12,
  },
  listContainer: {
    flex: 1,
    marginTop: 8,
  },
  padding: {
    paddingHorizontal: 20,
  },
  safeAreaView: {
    flex: 1,
  },
});

const Tab = createMaterialTopTabNavigator();

type ScreenOptions =
  | ((props: {
      route: RouteProp<ParamListBase, string>;
      navigation: any;
    }) => MaterialTopTabNavigationOptions)
  | undefined;

const screenOptions: ScreenOptions = () => ({
  tabBarShowLabel: true,
  tabBarActiveTintColor: COLOR.mono.black,
  tabBarInactiveTintColor: COLOR.mono.gray3,
  tabBarIndicatorStyle: {
    backgroundColor: COLOR.mono.black,
  },
  tabBarLabelStyle: TEXT_STYLE.body14M,
});

const SearchScreen = () => {
  const navigation = useNavigation<SearchScreenNP>();
  const { params } = useRoute<SearchScreenRP>();
  const { userNo: myUserNo } = useUserStore();
  const [keyword, setKeyword] = useState(params.text);

  const renderUserSearchResult = useCallback(
    () => (
      <UserSearchResult
        keyword={keyword}
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
    [keyword, myUserNo, navigation],
  );
  const onHashtagPress = useCallback(
    (hashtagNo: number, hashtag: string) => {
      navigation.navigate(Navigator.FloorStack, {
        screen: Screen.HashtagFloorScreen,
        params: { hashtag, hashtagNo },
      });
    },
    [navigation],
  );

  const renderHashtagSearchResult = useCallback(
    () => (
      <HashtagSearchResult keyword={keyword} onHashtagPress={onHashtagPress} />
    ),
    [keyword, onHashtagPress],
  );

  const renderFloorSearchResult = useCallback(
    () => (
      <FloorSearchResult
        keyword={keyword}
        onFloorPress={(floorNo) => {
          navigation.navigate(Navigator.FloorStack, {
            screen: Screen.FloorViewerScreen,
            params: { floorNo },
          });
        }}
      />
    ),
    [keyword, navigation],
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        edges={['top', 'left', 'right']}
        style={styles.safeAreaView}
      >
        <Header headerTitle="검색결과" />
        <View style={styles.container}>
          <View style={styles.padding}>
            <SearchInput onEnd={setKeyword} initialValue={params.text} />
          </View>
          <View style={styles.listContainer}>
            <Tab.Navigator screenOptions={screenOptions}>
              <Tab.Screen name="계정" component={renderUserSearchResult} />
              <Tab.Screen
                name="해시태그"
                component={renderHashtagSearchResult}
              />
              <Tab.Screen name="플로어" component={renderFloorSearchResult} />
            </Tab.Navigator>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SearchScreen;
