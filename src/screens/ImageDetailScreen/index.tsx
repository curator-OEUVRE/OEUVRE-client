import Sheet from '@gorhom/bottom-sheet';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Share,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  Gesture,
  GestureDetector,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import * as PictureAPI from '@/apis/picture';
import { getLikeUsers } from '@/apis/picture';
import AlertIcon from '@/assets/icons/Alert';
import BookmarkIcon from '@/assets/icons/Bookmark';
import BookmarkFilledIcon from '@/assets/icons/BookmarkFilled';
import DeleteIcon from '@/assets/icons/Delete';
import EditIcon from '@/assets/icons/Edit';
import FavoriteIcon from '@/assets/icons/Favorite';
import FavoriteOutlineIcon from '@/assets/icons/FavoriteOutline';
import MoreIcon from '@/assets/icons/More';
import PersonIcon from '@/assets/icons/Person';
import PhotoIcon from '@/assets/icons/Photo';
import ShareIcon from '@/assets/icons/Share';
import { Header } from '@/components/Header';
import {
  BottomSheet,
  BottomSheetItem,
  BottomSheetItemGroup,
  Spinner,
} from '@/components/index';
import { DynamicLinkType } from '@/constants/dynamicLinks';
import { IMAGE } from '@/constants/images';
import { Screen } from '@/constants/screens';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import PictureInfoSheet from '@/feature/PictureInfoSheet';
import { RootStackParamsList } from '@/feature/Routes';
import { FloorStackParamsList } from '@/feature/Routes/FloorStack';
import UserProfileList from '@/feature/UserProfileList';
import { getColorByBackgroundColor } from '@/services/common/color';
import throttle from '@/services/common/throttle';
import { buildDynamicLink } from '@/services/firebase/dynamicLinks';
import { useFloorStore } from '@/states/floorStore';
import { LikeUser } from '@/types/picture';

enum OrientationType {
  portrait,
  landscape,
}

export interface ImageDetailScreenParams {
  color?: string;
}

export type ImageDetailScreenNP = CompositeNavigationProp<
  StackNavigationProp<FloorStackParamsList, Screen.ImageDetailScreen>,
  StackNavigationProp<RootStackParamsList>
>;

export type ImageDetailScreenRP = RouteProp<
  FloorStackParamsList,
  Screen.ImageDetailScreen
>;

// @ts-ignore
const AnimatedImage = Animated.createAnimatedComponent(FastImage);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    alignSelf: 'center',
    position: 'absolute',
    top: '50%',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  item: {
    flex: 1,
  },
  likeTitle: {
    color: COLOR.mono.black,
    height: 56,
    textAlign: 'center',
    width: '100%',
  },
  // eslint-disable-next-line react-native/no-color-literals
  shadow: {
    elevation: 20,
    overflow: 'visible',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  wrapButton: {
    marginRight: 9,
  },
  wrapHeaderPortrait: {
    marginBottom: 26,
  },
  wrapHeaderRight: {
    flexDirection: 'row',
  },
  wrapImage: {
    flex: 1,
  },
});

const ImageDetailScreen = () => {
  const navigation = useNavigation<ImageDetailScreenNP>();

  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const { params } = useRoute<ImageDetailScreenRP>();
  const color = params.color || COLOR.mono.white;
  const iconColorByBackground = getColorByBackgroundColor(color);
  const textColorByBackground = getColorByBackgroundColor(color, {
    dark: COLOR.mono.gray5,
  });
  const {
    swiperIndex,
    floor: { pictures },
    setPictures,
    setSwiperIndex,
  } = useFloorStore();
  const [likeUsers, setLikeUser] = useState<LikeUser[]>([]);
  const [isEditMode, setEditMode] = useState<boolean>(true);
  const [bottomSheetIndex, setBottomSheetIndex] = useState<number>(-1);
  const [likeUserSheetIndex, setLikeUserSheetIndex] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);

  const bottomSheetRef = useRef<Sheet>(null);
  const likePeoplesRef = useRef<Sheet>(null);
  // useFocusEffect(
  //   useCallback(() => {
  //     const lockOrientation = async () => {
  //       await lockAsync(OrientationLock.LANDSCAPE_RIGHT);
  //     };
  //     lockOrientation();
  //   }, []),
  // );

  const {
    description,
    isLiked,
    isScraped,
    isMine,
    floorNo,
    userId,
    userNo,
    title,
    manufactureYear,
    scale: pictureScale,
    materials,
    pictureNo,
  } = pictures[swiperIndex];
  const scale = useSharedValue(0);

  const imageScale = useSharedValue(1);
  const imageTranslationX = useSharedValue(0);
  const imageTranslationY = useSharedValue(0);
  const initialFocalX = useSharedValue(0);
  const initialFocalY = useSharedValue(0);

  const isLikeAnimation = useSharedValue(true);
  const onAnimation = useSharedValue(false);
  const onSingleTap = useCallback(() => {
    setEditMode((prev) => !prev);
  }, []);

  const { width } = Dimensions.get('window');

  const scaleImage = useCallback(() => {
    onAnimation.value = true;
    scale.value = withSpring(1, { restSpeedThreshold: 5 }, (isFinished) => {
      if (isFinished) {
        scale.value = withDelay(
          100,
          withSpring(0, { restSpeedThreshold: 5 }, (done) => {
            if (done) {
              onAnimation.value = false;
            }
          }),
        );
      }
    });
  }, [scale, onAnimation]);

  const doubleTapRef = useRef();
  const imageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: Math.max(scale.value, 0) }],
    zIndex: onAnimation.value ? 1 : -1,
  }));

  const toggleLike = useCallback(async () => {
    if (!isEditMode) return;
    const API = isLiked ? PictureAPI.unlikePicture : PictureAPI.likePicture;
    if (!isLiked) {
      isLikeAnimation.value = true;
      scaleImage();
    }
    await API({ pictureNo });
    const newPictures = pictures.map((picture) => {
      if (picture.pictureNo === pictureNo) {
        return { ...picture, isLiked: !picture.isLiked };
      }
      return picture;
    });
    setPictures(newPictures);
  }, [
    isEditMode,
    isLikeAnimation,
    isLiked,
    pictureNo,
    scaleImage,
    setPictures,
    pictures,
  ]);

  const visitFloor = useCallback(() => {
    navigation.navigate(Screen.FloorViewerScreen, { floorNo });
  }, [floorNo, navigation]);

  const visitProfile = useCallback(async () => {
    // await lockAsync(OrientationLock.PORTRAIT_UP);
    navigation.navigate(Screen.ProfileScreen, { userNo });
  }, [userNo, navigation]);

  const toggleScrap = useCallback(async () => {
    const API = isScraped ? PictureAPI.unscrapPicture : PictureAPI.scrapPicture;
    if (!isScraped) {
      isLikeAnimation.value = false;
      scaleImage();
    }
    bottomSheetRef.current?.close();
    await API({ pictureNo });
    const newPictures = pictures.map((picture) => {
      if (picture.pictureNo === pictureNo) {
        return { ...picture, isScraped: !picture.isScraped };
      }
      return picture;
    });
    setPictures(newPictures);
  }, [
    isScraped,
    scaleImage,
    pictureNo,
    isLikeAnimation,
    pictures,
    setPictures,
  ]);

  const deletePicture = useCallback(async () => {
    bottomSheetRef.current?.close();
    await PictureAPI.deletePicture({ pictureNo });
    navigation.goBack();
  }, [pictureNo, navigation]);

  const editDescription = useCallback(async () => {
    // await lockAsync(OrientationLock.PORTRAIT_UP);
    navigation.navigate(Screen.EditDescriptionScreen, { pictureNo });
  }, [navigation, pictureNo]);

  const orientation =
    windowWidth >= windowHeight
      ? OrientationType.landscape
      : OrientationType.portrait;
  const SIZE = 150;
  const Favorite = isLiked ? FavoriteIcon : FavoriteOutlineIcon;
  const Bookmark = isScraped ? BookmarkFilledIcon : BookmarkIcon;

  const showLikesPeople = async () => {
    const response = await getLikeUsers({ pictureNo });
    if (response.isSuccess) {
      const { result } = response.result;
      setLikeUser(result);
      setLikeUserSheetIndex(0);
    } else {
      // eslint-disable-next-line no-console
      console.log(response.result.info);
    }
  };

  const headerRight = () => (
    <View style={styles.wrapHeaderRight}>
      <Pressable
        style={styles.wrapButton}
        onPress={throttle(toggleLike)}
        onLongPress={showLikesPeople}
      >
        <Favorite color={iconColorByBackground} />
      </Pressable>
      <Pressable onPress={throttle(toggleScrap)} style={styles.wrapButton}>
        <Bookmark color={iconColorByBackground} width={26} height={26} />
      </Pressable>
      <Pressable onPress={() => setBottomSheetIndex(isMine ? 1 : 0)}>
        <MoreIcon color={iconColorByBackground} />
      </Pressable>
    </View>
  );
  const renderHeader = () => (
    <View
      style={[
        orientation === OrientationType.portrait && styles.wrapHeaderPortrait,
        { paddingTop: insets.top },
      ]}
    >
      {isEditMode && (
        <Header
          iconColor={iconColorByBackground}
          backgroundColor="transparent"
          headerRight={headerRight}
        />
      )}
    </View>
  );
  const renderFooter = () =>
    isEditMode && (
      <PictureInfoSheet
        {...{
          description,
          title,
          manufactureYear,
          materials,
          userId,
          scale: pictureScale,
        }}
      />
    );

  const share = useCallback(async () => {
    const link = await buildDynamicLink({
      type: DynamicLinkType.IMAGE,
      id: pictureNo,
    });
    Share.share({ url: link });
  }, [pictureNo]);

  const bottomSheetForEditor = useMemo(
    () => (
      <BottomSheet
        ref={bottomSheetRef}
        index={bottomSheetIndex}
        onChange={(index) => setBottomSheetIndex(index)}
        snapPoints={[125, 250]}
      >
        <BottomSheetItemGroup>
          <BottomSheetItem
            label="플로어 방문하기"
            icon={<PhotoIcon color={COLOR.mono.black} width={26} height={26} />}
            onPress={visitFloor}
          />
          <BottomSheetItem
            label="사진 공유하기"
            icon={<ShareIcon />}
            onPress={share}
          />
        </BottomSheetItemGroup>
        <BottomSheetItemGroup>
          <BottomSheetItem
            label="설명 수정하기"
            icon={<EditIcon />}
            onPress={editDescription}
          />
          <BottomSheetItem
            label="사진 삭제하기"
            icon={<DeleteIcon />}
            color={COLOR.system.red}
            onPress={() => {
              Alert.alert(`사진을\n삭제하시겠어요?`, undefined, [
                {
                  text: '사진 삭제하기',
                  onPress: deletePicture,
                  style: 'destructive',
                },
                { text: '취소하기', style: 'cancel' },
              ]);
            }}
          />
        </BottomSheetItemGroup>
      </BottomSheet>
    ),
    [bottomSheetIndex, visitFloor, deletePicture, editDescription, share],
  );

  const bottomSheetForVisiter = useMemo(
    () => (
      <BottomSheet
        ref={bottomSheetRef}
        index={bottomSheetIndex}
        onChange={(index) => setBottomSheetIndex(index)}
        snapPoints={[286]}
      >
        <BottomSheetItemGroup>
          <BottomSheetItem
            label={`${userId} 프로필 보기`}
            icon={<PersonIcon color={COLOR.mono.black} />}
            onPress={visitProfile}
          />
          <BottomSheetItem
            label="플로어 방문하기"
            icon={<PhotoIcon color={COLOR.mono.black} width={26} height={26} />}
            onPress={visitFloor}
          />
          <BottomSheetItem
            label="사진 공유하기"
            icon={<ShareIcon />}
            onPress={share}
          />
          <BottomSheetItem
            label="사진 신고하기"
            icon={<AlertIcon color={COLOR.system.red} />}
            color={COLOR.system.red}
            onPress={() => {
              Alert.alert('신고되었습니다.');
            }}
          />
        </BottomSheetItemGroup>
      </BottomSheet>
    ),
    [bottomSheetIndex, visitFloor, userId, visitProfile, share],
  );

  const renderBottomSheet = () =>
    isMine ? bottomSheetForEditor : bottomSheetForVisiter;

  const mainImageStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: imageTranslationX.value },
      { translateY: imageTranslationY.value },
      { scale: imageScale.value },
    ],
  }));

  const pinchGesture = Gesture.Pinch()
    .onBegin((e) => {
      imageScale.value = e.scale;
      initialFocalX.value = e.focalX;
      initialFocalY.value = e.focalY;
    })
    .onUpdate((e) => {
      imageScale.value = e.scale;
      imageTranslationX.value = e.focalX - initialFocalX.value;
      imageTranslationY.value = e.focalY - initialFocalY.value;
    })
    .onEnd(() => {
      imageScale.value = withTiming(1);
      imageTranslationX.value = withTiming(0);
      imageTranslationY.value = withTiming(0);
    });

  if (loading) return <Spinner />;

  const renderLikeUsersSheet = () => (
    <BottomSheet
      ref={likePeoplesRef}
      index={likeUserSheetIndex}
      onChange={setLikeUserSheetIndex}
      snapPoints={['50%']}
      backdropOpacity={0.1}
    >
      <>
        <Text style={[styles.likeTitle, TEXT_STYLE.body16M]}>
          좋아요 {likeUsers.length}
        </Text>
        <UserProfileList data={likeUsers} />
      </>
    </BottomSheet>
  );

  return (
    <GestureDetector gesture={pinchGesture}>
      <View
        style={[
          styles.container,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            paddingLeft: insets.left,
            paddingRight: insets.right,
            backgroundColor: color,
            paddingBottom: orientation === OrientationType.landscape ? 55 : 120,
          },
        ]}
      >
        {renderHeader()}

        <TapGestureHandler waitFor={doubleTapRef} onActivated={onSingleTap}>
          <TapGestureHandler
            maxDelayMs={250}
            ref={doubleTapRef}
            numberOfTaps={2}
            onActivated={toggleLike}
          >
            <Animated.View style={[styles.wrapImage, mainImageStyle]}>
              <SwiperFlatList
                data={pictures}
                index={swiperIndex}
                renderItem={({ item }) => (
                  <View style={[styles.item, { width }]}>
                    <FastImage
                      source={{ uri: item.imageUrl }}
                      style={[
                        styles.imageBackground,
                        isEditMode && styles.shadow,
                      ]}
                      resizeMode="contain"
                    />
                  </View>
                )}
                onChangeIndex={({ index }) => setSwiperIndex(index)}
              />
            </Animated.View>
          </TapGestureHandler>
        </TapGestureHandler>

        {renderFooter()}
        {renderBottomSheet()}
        {renderLikeUsersSheet()}
        <AnimatedImage
          source={isLikeAnimation.value ? IMAGE.heart : IMAGE.bookmark}
          style={[
            styles.image,
            imageStyle,
            {
              height: SIZE,
              width: SIZE,
              marginTop: (SIZE / 2) * -1,
            },
          ]}
        />
      </View>
    </GestureDetector>
  );
};

export default ImageDetailScreen;
