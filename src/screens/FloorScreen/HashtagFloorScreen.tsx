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
import { getFloor } from '@/apis/floor';
import ArrowBackIcon from '@/assets/icons/ArrowBack';
import { Header, Profile, Spinner } from '@/components';
import { Navigator, Screen } from '@/constants/screens';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import FloorPictureList from '@/feature/FloorPictureList';
import { RootStackParamsList } from '@/feature/Routes';
import { FloorStackParamsList } from '@/feature/Routes/FloorStack';
import { GetFloorResponse } from '@/types/floor';
import { PictureInfo } from '@/types/picture';

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
  floorNo: number;
}

export type HashtagFloorScreenRP = RouteProp<
  FloorStackParamsList,
  Screen.HashtagFloorScreen
>;

export type HashtagFloorScreenNP = CompositeNavigationProp<
  StackNavigationProp<FloorStackParamsList, Screen.FloorViewerScreen>,
  StackNavigationProp<RootStackParamsList>
>;

enum OrderBy {
  POPULARITY,
  LATEST,
}
const color = COLOR.mono.gray1;

const HashtagFloorScreen = () => {
  const { params } = useRoute<HashtagFloorScreenRP>();
  const navigation = useNavigation<HashtagFloorScreenNP>();
  const { floorNo } = params;
  const [floorInfo, setFloorInfo] = useState<GetFloorResponse>();
  const [loading, setLoading] = useState<boolean>(false);
  const [orderBy, setOrderBy] = useState<OrderBy>(OrderBy.POPULARITY);

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
          onPress={() => setOrderBy(OrderBy.POPULARITY)}
        >
          <Text
            style={[
              TEXT_STYLE.body16M,
              {
                color:
                  orderBy === OrderBy.POPULARITY
                    ? COLOR.mono.black
                    : COLOR.mono.gray3,
              },
            ]}
          >
            인기순
          </Text>
        </Pressable>
        <Pressable onPress={() => setOrderBy(OrderBy.LATEST)}>
          <Text
            style={[
              TEXT_STYLE.body16M,
              {
                color:
                  orderBy === OrderBy.LATEST
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
    [orderBy],
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
          pictures={floorInfo?.pictures || []}
          editable={false}
          onPressPicture={onPressPicture}
          renderDescription={renderDescription}
        />
      </View>
    </SafeAreaView>
  );
};

export default HashtagFloorScreen;
