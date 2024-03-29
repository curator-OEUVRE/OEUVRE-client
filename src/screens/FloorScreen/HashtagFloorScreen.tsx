import {
  CompositeNavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { lockAsync, OrientationLock } from 'expo-screen-orientation';
import { useCallback, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getPicturesByHashtag } from '@/apis/picture';
import ArrowBackIcon from '@/assets/icons/ArrowBack';
import { Header, Profile, Radio, Spinner } from '@/components';
import { Navigator, Screen } from '@/constants/screens';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import FloorPictureList from '@/feature/FloorPictureList';
import RotateButton from '@/feature/RotateButton';
import { RootStackParamsList } from '@/feature/Routes';
import { FloorStackParamsList } from '@/feature/Routes/FloorStack';
import {
  getBackgroundColorsByGradient,
  getFooterColorsByBackgroundColor,
} from '@/services/common/color';
import { useFloorStore } from '@/states/floorStore';
import { useUserStore } from '@/states/userStore';
import { FloorGradient } from '@/types/floor';
import { HashtagPicture, Picture } from '@/types/picture';

const styles = StyleSheet.create({
  arrowLeft: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 26,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 8,
    width: '100%',
  },
  // left: {
  //   marginRight: 33,
  // },
  /* eslint-disable-next-line react-native/no-color-literals */
  loadingContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
  },
  sharpText: {
    color: COLOR.mono.gray3,
    marginRight: 2,
  },
  titleWrap: {
    flexDirection: 'row',
  },
  userId: {
    color: COLOR.mono.gray7,
    marginLeft: 4,
    textAlign: 'center',
  },
  // wrapButtons: {
  //   alignItems: 'center',
  //   alignSelf: 'center',
  //   flexDirection: 'row',
  // },
  wrapList: {
    flex: 1,
    justifyContent: 'center',
  },
  wrapProfile: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
  },
  wrapRadio: {
    marginBottom: 60,
    marginTop: 40,
  },
});

export interface HashtagFloorScreenParams {
  hashtagNo: number;
  hashtag: string;
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

const FilterOptions = [
  {
    label: '인기순',
    value: SortBy.POPULAR,
  },
  { label: '최신순', value: SortBy.RECENT },
];

const color = COLOR.mono.gray1;

const HashtagFloorScreen = () => {
  const { params } = useRoute<HashtagFloorScreenRP>();
  const navigation = useNavigation<HashtagFloorScreenNP>();
  const { hashtagNo, hashtag } = params;
  const [pictures, setPictures] = useState<HashtagPicture[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.POPULAR);
  const [page, setPage] = useState<number>(0);
  const [viewingMode, setViewingMode] = useState<boolean>(false);
  const { userNo: myUserNo } = useUserStore();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const footerHeight = isLandscape ? 69 : 100;
  const {
    fetchFloor,
    setSwiperIndex,
    setPictures: setFloorPictures,
  } = useFloorStore();

  useFocusEffect(
    useCallback(() => () => lockAsync(OrientationLock.PORTRAIT_UP), []),
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
        onPress={async () => {
          // await lockAsync(OrientationLock.PORTRAIT_UP);
          navigation.goBack();
        }}
        hitSlop={10}
      >
        <ArrowBackIcon color={COLOR.mono.black} />
      </Pressable>
    ),
    [navigation],
  );

  const headerTitle = useCallback(
    () => (
      <View style={styles.titleWrap}>
        <Text style={[TEXT_STYLE.body16M, styles.sharpText]}>#</Text>
        <Text style={TEXT_STYLE.body16M}>
          {hashtag.length > 0 && hashtag[0] === '#'
            ? hashtag.slice(1)
            : hashtag}
        </Text>
      </View>
    ),
    [hashtag],
  );

  // const ButtonArea = useCallback(
  //   () => (
  //     <View style={styles.wrapButtons}>
  //       <Pressable
  //         style={styles.left}
  //         onPress={() => {
  //           setSortBy(SortBy.POPULAR);
  //           setPage(0);
  //         }}
  //       >
  //         <Text
  //           style={[
  //             TEXT_STYLE.body16M,
  //             {
  //               color:
  //                 sortBy === SortBy.POPULAR
  //                   ? COLOR.mono.black
  //                   : COLOR.mono.gray3,
  //             },
  //           ]}
  //         >
  //           인기순
  //         </Text>
  //       </Pressable>
  //       <Pressable
  //         onPress={() => {
  //           setSortBy(SortBy.RECENT);
  //           setPage(0);
  //         }}
  //       >
  //         <Text
  //           style={[
  //             TEXT_STYLE.body16M,
  //             {
  //               color:
  //                 sortBy === SortBy.RECENT
  //                   ? COLOR.mono.black
  //                   : COLOR.mono.gray3,
  //             },
  //           ]}
  //         >
  //           최신순
  //         </Text>
  //       </Pressable>
  //     </View>
  //   ),
  //   [sortBy],
  // );

  const onPressPicture = useCallback(
    (picture: Picture) => {
      const idx = pictures.findIndex(
        ({ pictureNo }) => picture.pictureNo === pictureNo,
      );

      if (idx === -1) return;
      setFloorPictures(pictures);
      setSwiperIndex(idx);
      navigation.navigate(Screen.ImageDetailScreen);
    },
    [navigation, pictures, setSwiperIndex, setFloorPictures],
  );

  const onPressProfile = useCallback(
    (userNo: number) => {
      if (myUserNo === userNo) {
        navigation.navigate(Navigator.MainTab, {
          screen: Navigator.ProfileStack,
          params: {
            screen: Screen.MyProfileScreen,
          },
        });
      } else {
        navigation.navigate(Screen.ProfileScreen, { userNo });
      }
    },
    [navigation, myUserNo],
  );

  const renderDescription = useCallback(
    ({ id, profileImageUrl, userNo }: Picture) => (
      <Pressable
        style={styles.wrapProfile}
        onPress={async () => {
          if (!userNo) return;
          onPressProfile(userNo);
        }}
      >
        <Profile imageUrl={profileImageUrl || ''} size={20} />
        <Text style={[styles.userId, TEXT_STYLE.body12R]}>{id}</Text>
      </Pressable>
    ),
    [onPressProfile],
  );

  const data = pictures.map((p, idx) => ({
    ...p,
    hashtags: [],
    location: 0,
    queue: idx,
    description: '',
    title: '',
    material: '',
    productionYear: '',
    size: '',
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

  const onScrollBeginDrag = useCallback(() => {
    setViewingMode(true);
  }, []);

  const onPressBackground = useCallback(() => {
    setViewingMode(false);
  }, []);

  const footer = (
    <LinearGradient
      style={[styles.footer, { height: footerHeight }]}
      colors={getFooterColorsByBackgroundColor({ color: COLOR.floor.white })}
    >
      {!viewingMode && <RotateButton />}
    </LinearGradient>
  );

  return (
    <Pressable onPress={onPressBackground} style={styles.container}>
      <LinearGradient
        style={styles.container}
        colors={getBackgroundColorsByGradient({
          color: COLOR.floor.white,
          gradient: FloorGradient.FULL,
        })}
      >
        <SafeAreaView style={styles.container} edges={['top']}>
          <Header
            headerTitle={headerTitle}
            backgroundColor="transparent"
            headerLeft={headerLeft}
          />
          {/* <ButtonArea /> */}
          <View style={styles.wrapRadio}>
            <Radio
              value={sortBy}
              onChange={(value) => {
                setSortBy(value);
                setPage(0);
              }}
              data={FilterOptions}
            />
          </View>
          <View style={styles.wrapList}>
            <FloorPictureList
              pictures={data}
              editable={false}
              onPressPicture={onPressPicture}
              renderDescription={renderDescription}
              onEndReached={fetchMore}
              onScrollBeginDrag={onScrollBeginDrag}
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
      {loading && (
        <View style={styles.loadingContainer}>
          <Spinner />
        </View>
      )}
      {footer}
    </Pressable>
  );
};

export default HashtagFloorScreen;
