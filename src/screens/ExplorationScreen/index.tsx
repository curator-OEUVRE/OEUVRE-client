import {
  type CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  ListRenderItemInfo,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HashtagListItem from './HashtagListItem';
import { getPopularHashtags, type HashtagInfo } from '@/apis/hashtag';
import { Header } from '@/components/Header';
import { Screen, Navigator } from '@/constants/screens';
import { COLOR } from '@/constants/styles';
import type { RootStackParamsList } from '@/feature/Routes';
import type { ExplorationStackParamsList } from '@/feature/Routes/ExplorationStack';
import type { MainTabParamsList } from '@/feature/Routes/MainTabNavigator';
import SearchInput from '@/feature/SearchInput';
import useAuth from '@/hooks/useAuth';
import { useFloorStore } from '@/states/floorStore';
import { useUserStore } from '@/states/userStore';

export type ExplorationScreenParams = undefined;

export type ExplorationScreenNP = CompositeNavigationProp<
  StackNavigationProp<ExplorationStackParamsList, Screen.ExplorationScreen>,
  CompositeNavigationProp<
    StackNavigationProp<MainTabParamsList, Navigator.ExplorationStack>,
    StackNavigationProp<RootStackParamsList>
  >
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 12,
  },
  contentContainer: {
    paddingBottom: 40,
    paddingTop: 16,
  },
  listContainer: {
    flex: 1,
    marginTop: 16,
  },
  padding: {
    paddingHorizontal: 20,
  },
  safeAreaView: {
    flex: 1,
  },
});

const ExplorationScreen = () => {
  const navigation = useNavigation<ExplorationScreenNP>();
  const { fetchPicture } = useFloorStore();
  const { fetchWithToken } = useAuth();
  const { userNo: myUserNo } = useUserStore();

  const [data, setData] = useState<HashtagInfo[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAndSetData = useCallback(async () => {
    setRefreshing(true);
    const response = await fetchWithToken(getPopularHashtags);
    if (response.isSuccess) {
      setData(response.result.result);
    } else {
      console.error(response.result);
    }
    setRefreshing(false);
  }, [fetchWithToken]);

  useEffect(() => {
    if (data.length === 0) fetchAndSetData();
  }, [data.length, fetchAndSetData]);

  const goToSearchScreen = useCallback(
    (text: string) => {
      if (text !== '') {
        navigation.navigate(Screen.SearchScreen, { text });
      }
    },
    [navigation],
  );

  const renderItem = useCallback(
    (props: ListRenderItemInfo<HashtagInfo>) => (
      <HashtagListItem
        {...props.item}
        index={props.index}
        // TODO: `onPress` (해시태그 플로어 뷰) 구현
        onPicturePress={async (pictureNo) => {
          await fetchPicture(pictureNo);
          navigation.navigate(Navigator.FloorStack, {
            screen: Screen.ImageDetailScreen,
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
        onPress={(hashtagNo, hashtag) => {
          navigation.navigate(Navigator.FloorStack, {
            screen: Screen.HashtagFloorScreen,
            params: { hashtag, hashtagNo },
          });
        }}
      />
    ),
    [navigation, myUserNo, fetchPicture],
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={styles.safeAreaView}
        edges={['top', 'left', 'right']}
      >
        <Header headerTitle="탐색" hideBackButton />
        <View style={styles.container}>
          <View style={styles.padding}>
            <SearchInput onEnd={goToSearchScreen} />
          </View>
          <View style={styles.listContainer}>
            <FlatList
              data={data}
              renderItem={renderItem}
              maxToRenderPerBatch={3}
              initialNumToRender={3}
              windowSize={3}
              refreshing={refreshing}
              onRefresh={fetchAndSetData}
              contentContainerStyle={styles.contentContainer}
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ExplorationScreen;
