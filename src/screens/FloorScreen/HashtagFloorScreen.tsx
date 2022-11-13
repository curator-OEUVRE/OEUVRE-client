/* eslint-disable react-native/no-raw-text */
import {
  CompositeNavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { lockAsync, OrientationLock } from 'expo-screen-orientation';
import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getPicturesByHashtag } from '@/apis/picture';
import ArrowBackIcon from '@/assets/icons/ArrowBack';
import { Header, Profile, Spinner } from '@/components';
import { Navigator, Screen } from '@/constants/screens';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import FloorPictureList from '@/feature/FloorPictureList';
import { RootStackParamsList } from '@/feature/Routes';
import { FloorStackParamsList } from '@/feature/Routes/FloorStack';
import { HashtagPicture, PictureInfo } from '@/types/picture';

const styles = StyleSheet.create({
  arrowLeft: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 26,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: COLOR.mono.white,
    flex: 1,
  },
  left: {
    marginRight: 33,
  },
  userId: {
    color: COLOR.mono.gray7,
    marginLeft: 4,
    textAlign: 'center',
  },
  wrapButtons: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  wrapList: {
    flex: 1,
  },
  wrapProfile: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
  },
});

export interface HashtagFloorScreenParams {
  hashtagNo: number;
}

export type HashtagFloorScreenRP = RouteProp<
  FloorStackParamsList,
  Screen.HashtagFloorScreen
>;

export type HashtagFloorScreenNP = CompositeNavigationProp<
  StackNavigationProp<FloorStackParamsList, Screen.FloorViewerScreen>,
  StackNavigationProp<RootStackParamsList>
>;

enum SortBy {
  POPULAR = 'popular',
  RECENT = 'recent',
}
const color = COLOR.mono.gray1;

const HashtagFloorScreen = () => {
  const { params } = useRoute<HashtagFloorScreenRP>();
  const navigation = useNavigation<HashtagFloorScreenNP>();
  const { hashtagNo } = params;
  const [pictures, setPictures] = useState<HashtagPicture[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.POPULAR);
  const [page, setPage] = useState<number>(0);
  console.log(hashtagNo);
  useFocusEffect(
    useCallback(() => {
      const lockOrientation = async () => {
        await lockAsync(OrientationLock.LANDSCAPE_RIGHT);
      };
      lockOrientation();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        const response = await getPicturesByHashtag({
          hashtagNo,
          page: 0,
          sortBy: sortBy as string,
        });
        if (response.isSuccess) {
          const { result } = response.result;
          setPictures(result.contents);
          setIsLastPage(result.isLastPage);
        } else {
          // eslint-disable-next-line no-console
          console.log(response.result.errorMessage);
        }
        setLoading(false);
        setPage((prev) => prev + 1);
      };
      fetchData();
    }, [hashtagNo, sortBy]),
  );

  const headerLeft = useCallback(
    () => (
      <Pressable
        style={styles.arrowLeft}
        onPress={() => {
          navigation.goBack();
        }}
        hitSlop={10}
      >
        <ArrowBackIcon color={COLOR.mono.black} />
        <Text>#태그태그태그태그</Text>
      </Pressable>
    ),
    [navigation],
  );

  const headertitle = useCallback(
    () => (
      <View style={styles.wrapButtons}>
        <Pressable
          style={styles.left}
          onPress={() => {
            setSortBy(SortBy.POPULAR);
            setPage(0);
          }}
        >
          <Text
            style={[
              TEXT_STYLE.body16M,
              {
                color:
                  sortBy === SortBy.POPULAR
                    ? COLOR.mono.black
                    : COLOR.mono.gray3,
              },
            ]}
          >
            인기순
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setSortBy(SortBy.RECENT);
            setPage(0);
          }}
        >
          <Text
            style={[
              TEXT_STYLE.body16M,
              {
                color:
                  sortBy === SortBy.RECENT
                    ? COLOR.mono.black
                    : COLOR.mono.gray3,
              },
            ]}
          >
            최신순
          </Text>
        </Pressable>
      </View>
    ),
    [sortBy],
  );

  const onPressPicture = useCallback(
    (pictureNo: number) => {
      navigation.navigate(Screen.ImageDetailScreen, {
        pictureNo,
        color,
      });
    },
    [navigation],
  );

  const onPressProfile = useCallback(
    (userNo: number) => {
      navigation.navigate(Navigator.ProfileStack, {
        screen: Screen.ProfileScreen,
        params: { userNo },
      });
    },
    [navigation],
  );

  const renderDescription = useCallback(
    ({ id, profileImageUrl, userNo }: PictureInfo) => (
      <Pressable
        style={styles.wrapProfile}
        onPress={async () => {
          if (!userNo) return;
          await lockAsync(OrientationLock.PORTRAIT_UP);
          onPressProfile(userNo);
        }}
      >
        <Profile imageUrl={profileImageUrl || ''} size={20} />
        <Text style={[styles.userId, TEXT_STYLE.body12R]}>{id}</Text>
      </Pressable>
    ),
    [onPressProfile],
  );

  if (loading) return <Spinner />;
  const data = pictures.map((p, idx) => ({
    ...p,
    hashtags: [],
    location: 0,
    queue: idx,
    description: '',
  }));

  const fetchMore = async () => {
    if (isLastPage || page >= 3) return;
    setLoading(true);
    const response = await getPicturesByHashtag({
      hashtagNo,
      page,
      sortBy: sortBy as string,
    });
    if (response.isSuccess) {
      const { result } = response.result;
      setPictures((prev) => [...prev, ...result.contents]);
      setIsLastPage(result.isLastPage);
    } else {
      // eslint-disable-next-line no-console
      console.log(response.result.errorMessage);
    }
    setLoading(false);
    setPage((prev) => prev + 1);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: color }]}>
      <Header
        headerTitle={headertitle}
        backgroundColor="transparent"
        onGoBack={async () => {
          await lockAsync(OrientationLock.PORTRAIT_UP);
        }}
        headerLeft={headerLeft}
      />
      <View style={styles.wrapList}>
        <FloorPictureList
          pictures={data}
          editable={false}
          onPressPicture={onPressPicture}
          renderDescription={renderDescription}
          onEndReached={fetchMore}
        />
      </View>
    </SafeAreaView>
  );
};

export default HashtagFloorScreen;
