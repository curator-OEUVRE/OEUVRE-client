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
<<<<<<< HEAD
import { getPicturesByHashtag } from '@/apis/picture';
=======
import { getFloor } from '@/apis/floor';
>>>>>>> ee7e03d (feat: implement hashtag floor screen)
import ArrowBackIcon from '@/assets/icons/ArrowBack';
import { Header, Profile, Spinner } from '@/components';
import { Navigator, Screen } from '@/constants/screens';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import FloorPictureList from '@/feature/FloorPictureList';
import { RootStackParamsList } from '@/feature/Routes';
import { FloorStackParamsList } from '@/feature/Routes/FloorStack';
<<<<<<< HEAD
import { HashtagPicture, PictureInfo } from '@/types/picture';
=======
import { GetFloorResponse } from '@/types/floor';
import { PictureInfo } from '@/types/picture';
>>>>>>> ee7e03d (feat: implement hashtag floor screen)

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
<<<<<<< HEAD
  hashtagNo: number;
  hashtag: string;
=======
  floorNo: number;
>>>>>>> ee7e03d (feat: implement hashtag floor screen)
}

export type HashtagFloorScreenRP = RouteProp<
  FloorStackParamsList,
  Screen.HashtagFloorScreen
>;

export type HashtagFloorScreenNP = CompositeNavigationProp<
  StackNavigationProp<FloorStackParamsList, Screen.FloorViewerScreen>,
  StackNavigationProp<RootStackParamsList>
>;

<<<<<<< HEAD
enum SortBy {
  POPULAR = 'popular',
  RECENT = 'recent',
=======
enum OrderBy {
  POPULARITY,
  LATEST,
>>>>>>> ee7e03d (feat: implement hashtag floor screen)
}
const color = COLOR.mono.gray1;

const HashtagFloorScreen = () => {
  const { params } = useRoute<HashtagFloorScreenRP>();
  const navigation = useNavigation<HashtagFloorScreenNP>();
<<<<<<< HEAD
  const { hashtagNo, hashtag } = params;
  const [pictures, setPictures] = useState<HashtagPicture[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.POPULAR);
  const [page, setPage] = useState<number>(0);
=======
  const { floorNo } = params;
  const [floorInfo, setFloorInfo] = useState<GetFloorResponse>();
  const [loading, setLoading] = useState<boolean>(false);
  const [orderBy, setOrderBy] = useState<OrderBy>(OrderBy.POPULARITY);

>>>>>>> ee7e03d (feat: implement hashtag floor screen)
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
<<<<<<< HEAD
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

=======
        const response = await getFloor({ floorNo });
        if (response.isSuccess) {
          const { result } = response.result;
          setFloorInfo(result);
        }
        setLoading(false);
      };
      fetchData();
    }, [floorNo]),
  );

  const visitProfile = useCallback(() => {
    navigation.navigate(Navigator.ProfileStack, {
      screen: Screen.ProfileScreen,
      params: { userNo: 0 },
    });
  }, [navigation]);

>>>>>>> ee7e03d (feat: implement hashtag floor screen)
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
<<<<<<< HEAD
        <Text style={{ color: COLOR.mono.black }}>{hashtag}</Text>
      </Pressable>
    ),
    [navigation, hashtag],
=======
        <Text>#태그태그태그태그</Text>
      </Pressable>
    ),
    [navigation],
>>>>>>> ee7e03d (feat: implement hashtag floor screen)
  );

  const headertitle = useCallback(
    () => (
      <View style={styles.wrapButtons}>
        <Pressable
          style={styles.left}
<<<<<<< HEAD
          onPress={() => {
            setSortBy(SortBy.POPULAR);
            setPage(0);
          }}
=======
          onPress={() => setOrderBy(OrderBy.POPULARITY)}
>>>>>>> ee7e03d (feat: implement hashtag floor screen)
        >
          <Text
            style={[
              TEXT_STYLE.body16M,
              {
                color:
<<<<<<< HEAD
                  sortBy === SortBy.POPULAR
=======
                  orderBy === OrderBy.POPULARITY
>>>>>>> ee7e03d (feat: implement hashtag floor screen)
                    ? COLOR.mono.black
                    : COLOR.mono.gray3,
              },
            ]}
          >
            인기순
          </Text>
        </Pressable>
<<<<<<< HEAD
        <Pressable
          onPress={() => {
            setSortBy(SortBy.RECENT);
            setPage(0);
          }}
        >
=======
        <Pressable onPress={() => setOrderBy(OrderBy.LATEST)}>
>>>>>>> ee7e03d (feat: implement hashtag floor screen)
          <Text
            style={[
              TEXT_STYLE.body16M,
              {
                color:
<<<<<<< HEAD
                  sortBy === SortBy.RECENT
=======
                  orderBy === OrderBy.LATEST
>>>>>>> ee7e03d (feat: implement hashtag floor screen)
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
<<<<<<< HEAD
    [sortBy],
=======
    [orderBy],
>>>>>>> ee7e03d (feat: implement hashtag floor screen)
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
<<<<<<< HEAD
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

=======
    ({ description }: PictureInfo) => (
      <Pressable style={styles.wrapProfile}>
        <Profile
          imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
          size={20}
        />
        <Text style={[styles.userId, TEXT_STYLE.body12R]}>{description}</Text>
      </Pressable>
    ),
    [],
  );

  if (loading) return <Spinner />;
>>>>>>> ee7e03d (feat: implement hashtag floor screen)
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
<<<<<<< HEAD
          pictures={data}
          editable={false}
          onPressPicture={onPressPicture}
          renderDescription={renderDescription}
          onEndReached={fetchMore}
=======
          pictures={floorInfo?.pictures || []}
          editable={false}
          onPressPicture={onPressPicture}
          renderDescription={renderDescription}
>>>>>>> ee7e03d (feat: implement hashtag floor screen)
        />
      </View>
    </SafeAreaView>
  );
};

export default HashtagFloorScreen;
