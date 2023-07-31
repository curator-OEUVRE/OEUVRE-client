import Sheet from '@gorhom/bottom-sheet';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
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
  ListRenderItem,
  ListRenderItemInfo,
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
import { SharedElement } from 'react-navigation-shared-element';
import * as PictureAPI from '@/apis/picture';
import { getLikeUsers, patchPicture } from '@/apis/picture';
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
import PictureInfoModal, {
  PictureInfoModalValue,
} from '@/feature/PictureInfoModal';
import PictureInfoSheet from '@/feature/PictureInfoSheet';
import { RootStackParamsList } from '@/feature/Routes';
import { FloorStackParamsList } from '@/feature/Routes/FloorStack';
import UserProfileList from '@/feature/UserProfileList';
import {
  getBackgroundColorsByGradient,
  getColorByBackgroundColor,
} from '@/services/common/color';
import throttle from '@/services/common/throttle';
import { buildDynamicLink } from '@/services/firebase/dynamicLinks';
import { useFloorStore } from '@/states/floorStore';
import { LikeUser, Picture } from '@/types/picture';

enum OrientationType {
  portrait,
  landscape,
}

export type ImageDetailScreenParams = undefined;

export type ImageDetailScreenNP = CompositeNavigationProp<
  StackNavigationProp<FloorStackParamsList, Screen.ImageDetailScreen>,
  StackNavigationProp<RootStackParamsList>
>;

// @ts-ignore
const AnimatedImage = Animated.createAnimatedComponent(FastImage);
const AnimatedSharedElement = Animated.createAnimatedComponent(SharedElement);

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

interface ImageItemProps extends ListRenderItemInfo<Picture> {
  isEditMode: boolean;
}

const ImageItem = ({ isEditMode, item, index }: ImageItemProps) => {
  const imageItemAnimStyle = useAnimatedStyle(() => ({
    paddingHorizontal: isEditMode ? withTiming(40) : withTiming(0),
  }));
  const { width } = Dimensions.get('window');

  return (
    <AnimatedSharedElement
      id={`picture.${index}`}
      style={[styles.item, styles.shadow, { width }, imageItemAnimStyle]}
    >
      <FastImage
        source={{ uri: item.imageUrl }}
        style={styles.imageBackground}
        resizeMode="contain"
      />
    </AnimatedSharedElement>
  );
};

const ImageDetailScreen = () => {
  const navigation = useNavigation<ImageDetailScreenNP>();

  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const {
    swiperIndex,
    floor: { pictures, gradient, color },
    setPictures,
    setSwiperIndex,
  } = useFloorStore();

  const iconColorByBackground = getColorByBackgroundColor(color);
  const textColorByBackground = getColorByBackgroundColor(color, {
    dark: COLOR.mono.gray5,
  });
  const [likeUsers, setLikeUser] = useState<LikeUser[]>([]);
  const [isEditMode, setEditMode] = useState<boolean>(true);
  const [bottomSheetIndex, setBottomSheetIndex] = useState<number>(-1);
  const [likeUserSheetIndex, setLikeUserSheetIndex] = useState<number>(-1);
  const [pictureInfoModalVisible, setPictureInfoModalVisible] =
    useState<boolean>(false);
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

  const swiperIndexRef = useRef<number>(swiperIndex);
  const changeSwiperIndex = useCallback(
    (newSwiperIndex: number) => {
      setSwiperIndex(newSwiperIndex);
      swiperIndexRef.current = newSwiperIndex;
    },
    [setSwiperIndex],
  );

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
    const { isLiked, pictureNo } = pictures[swiperIndexRef.current];
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
  }, [isEditMode, isLikeAnimation, scaleImage, setPictures, pictures]);

  const visitFloor = useCallback(() => {
    const { floorNo } = pictures[swiperIndexRef.current];
    navigation.navigate(Screen.FloorViewerScreen, { floorNo });
  }, [pictures, navigation]);

  const visitProfile = useCallback(async () => {
    // await lockAsync(OrientationLock.PORTRAIT_UP);
    const { userNo } = pictures[swiperIndexRef.current];
    navigation.navigate(Screen.ProfileScreen, { userNo });
  }, [pictures, navigation]);

  const toggleScrap = useCallback(async () => {
    const { isScraped, pictureNo } = pictures[swiperIndexRef.current];
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
  }, [scaleImage, isLikeAnimation, pictures, setPictures]);

  const deletePicture = useCallback(async () => {
    const { pictureNo } = pictures[swiperIndexRef.current];
    bottomSheetRef.current?.close();
    await PictureAPI.deletePicture({ pictureNo });
    navigation.goBack();
  }, [pictures, navigation]);

  const editDescription = useCallback(async () => {
    setPictureInfoModalVisible(true);
  }, []);

  const orientation =
    windowWidth >= windowHeight
      ? OrientationType.landscape
      : OrientationType.portrait;
  const SIZE = 150;
  const Favorite = pictures[swiperIndex].isLiked
    ? FavoriteIcon
    : FavoriteOutlineIcon;
  const Bookmark = pictures[swiperIndex].isScraped
    ? BookmarkFilledIcon
    : BookmarkIcon;
  const headerOpacity = isEditMode ? 1 : 0;
  // const itemPadding = isEditMode ? 40 : 0;

  const showLikesPeople = async () => {
    const { pictureNo } = pictures[swiperIndexRef.current];
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
      <Pressable
        onPress={() =>
          setBottomSheetIndex(pictures[swiperIndex].isMine ? 1 : 0)
        }
      >
        <MoreIcon color={iconColorByBackground} />
      </Pressable>
    </View>
  );
  const renderHeader = () => (
    <View
      style={[
        orientation === OrientationType.portrait && styles.wrapHeaderPortrait,
        { paddingTop: insets.top, opacity: headerOpacity },
      ]}
    >
      <Header
        iconColor={iconColorByBackground}
        backgroundColor="transparent"
        headerRight={headerRight}
      />
    </View>
  );
  const renderFooter = () =>
    isEditMode && (
      <PictureInfoSheet
        {...{
          description: pictures[swiperIndex].description,
          title: pictures[swiperIndex].title,
          manufactureYear: pictures[swiperIndex].manufactureYear,
          material: pictures[swiperIndex].material,
          userId: pictures[swiperIndex].userId,
          scale: pictures[swiperIndex].scale,
        }}
      />
    );

  const share = useCallback(async () => {
    const { pictureNo } = pictures[swiperIndexRef.current];
    const link = await buildDynamicLink({
      type: DynamicLinkType.IMAGE,
      id: pictureNo,
    });
    Share.share({ url: link });
  }, [pictures]);

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
            label={`${pictures[swiperIndex].userId} 프로필 보기`}
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
    [bottomSheetIndex, visitFloor, pictures, visitProfile, share, swiperIndex],
  );

  const renderBottomSheet = () =>
    pictures[swiperIndex].isMine ? bottomSheetForEditor : bottomSheetForVisiter;

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

  const onPictureInfoComplete = useCallback(
    (value: PictureInfoModalValue) => {
      const newPictures = pictures.map((picture) => {
        if (picture.imageUrl !== pictures[swiperIndexRef.current].imageUrl)
          return picture;
        return { ...picture, ...value };
      });
      setPictures(newPictures);
      patchPicture({
        pictureNo: pictures[swiperIndexRef.current].pictureNo,
        ...value,
      });
    },
    [pictures, setPictures],
  );

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

  const renderImageItem: ListRenderItem<Picture> = useCallback(
    (props) => <ImageItem {...props} isEditMode={isEditMode} />,
    [isEditMode],
  );

  const onChangeIndex = useCallback(
    ({ index }: { index: number }) => {
      changeSwiperIndex(index);
    },
    [changeSwiperIndex],
  );

  const keyExtractor = (item: Picture, index: number) =>
    `detail_${index}_${item.id}`;

  return (
    <>
      <GestureDetector gesture={pinchGesture}>
        <LinearGradient
          style={[
            styles.container,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              paddingLeft: insets.left,
              paddingRight: insets.right,
              paddingBottom:
                orientation === OrientationType.landscape ? 55 : 120,
            },
          ]}
          colors={
            isEditMode
              ? getBackgroundColorsByGradient({ color, gradient })
              : [COLOR.mono.black]
          }
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
                  renderItem={renderImageItem}
                  onChangeIndex={onChangeIndex}
                  keyExtractor={keyExtractor}
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
          <PictureInfoModal
            visible={pictureInfoModalVisible}
            headerTitle="작품 설명 추가"
            headerRightText="완료"
            setVisible={setPictureInfoModalVisible}
            onComplete={onPictureInfoComplete}
            {...pictures[swiperIndex]}
          />
        </LinearGradient>
      </GestureDetector>
      {loading && <Spinner />}
    </>
  );
};

export default ImageDetailScreen;
