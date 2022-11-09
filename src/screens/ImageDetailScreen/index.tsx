import Sheet from '@gorhom/bottom-sheet';
import { RouteProp, useRoute } from '@react-navigation/native';
import { lockAsync, OrientationLock } from 'expo-screen-orientation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getLikeUsers, getPictureDetail } from '@/apis/picture';
import * as PictureAPI from '@/apis/picture';
import AlertIcon from '@/assets/icons/Alert';
import BookmarkIcon from '@/assets/icons/Bookmark';
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
import { IMAGE } from '@/constants/images';
import { Screen } from '@/constants/screens';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import { FloorStackParamsList } from '@/feature/Routes/FloorStack';
import UserProfileList from '@/feature/UserProfileList';
import { getColorByBackgroundColor } from '@/services/common/color';
import throttle from '@/services/common/throttle';
import { LikeUser, PictureDetail } from '@/types/picture';

enum OrientationType {
  portrait,
  landscape,
}

export interface ImageDetailScreenParams {
  pictureNo: number;
  color: string;
}

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
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.35,
    shadowRadius: 35,
    top: '50%',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  likeTitle: {
    color: COLOR.mono.black,
    height: 56,
    textAlign: 'center',
    width: '100%',
  },
  text: {
    color: COLOR.mono.gray7,
    textAlign: 'center',
  },
  wrapFooter: {
    lineHeight: 21,
    paddingHorizontal: 20,
    width: '100%',
  },
  wrapFooterLandscape: {
    height: 55,
    paddingTop: 11,
  },
  wrapFooterPortrait: {
    height: 120,
    paddingTop: 17,
  },
  wrapHeaderLandscape: {
    marginTop: 10,
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
  wrapMore: {
    marginRight: 9,
  },
});

const initialPicture = {
  description: '...',
  floorNo: 1,
  height: 0.5,
  imageUrl: '',
  isLiked: false,
  isMine: false,
  isScraped: false,
  pictureNo: 1,
  width: 0.5,
};

const ImageDetailScreen = () => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const { params } = useRoute<ImageDetailScreenRP>();
  const { pictureNo, color } = params;
  const colorByBackground = getColorByBackgroundColor(color);
  const [pictureDetail, setPictureDetail] =
    useState<PictureDetail>(initialPicture);
  const [likeUsers, setLikeUser] = useState<LikeUser[]>([]);
  const [isEditMode, setEditMode] = useState<boolean>(true);
  const [bottomSheetIndex, setBottomSheetIndex] = useState<number>(-1);
  const [likeUserSheetIndex, setLikeUserSheetIndex] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);

  const bottomSheetRef = useRef<Sheet>(null);
  const likePeoplesRef = useRef<Sheet>(null);
  useEffect(() => {
    const fetchPictureDetail = async () => {
      setLoading(true);
      const response = await getPictureDetail({ pictureNo });
      if (response.isSuccess) {
        const { result } = response.result;
        setPictureDetail(result);
        const { width, height } = result;
        lockAsync(
          width > height
            ? OrientationLock.LANDSCAPE
            : OrientationLock.PORTRAIT_UP,
        );
      } else {
        // eslint-disable-next-line no-console
        console.log(response.result.info);
      }
      setLoading(false);
    };
    fetchPictureDetail();
  }, [pictureNo]);

  const { width, height, description, imageUrl, isLiked, isScraped, isMine } =
    pictureDetail;

  const scale = useSharedValue(0);
  const isLikeAnimation = useSharedValue(true);
  const onAnimation = useSharedValue(false);
  const onSingleTap = useCallback(() => {
    setEditMode((prev) => !prev);
  }, []);

  const scaleImage = useCallback(() => {
    onAnimation.value = true;
    scale.value = withSpring(1, undefined, (isFinished) => {
      if (isFinished) {
        scale.value = withDelay(
          500,
          withSpring(0, undefined, (done) => {
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
    await API({ pictureNo });
    setPictureDetail((prev) => {
      if (!prev) return prev;
      isLikeAnimation.value = true;
      if (!prev.isLiked) scaleImage();
      return {
        ...prev,
        isLiked: !prev.isLiked,
      };
    });
  }, [isEditMode, isLikeAnimation, isLiked, pictureNo, scaleImage]);

  const toggleScrap = useCallback(async () => {
    const API = isScraped ? PictureAPI.unscrapPicture : PictureAPI.scrapPicture;
    bottomSheetRef.current?.close();
    await API({ pictureNo });
    setPictureDetail((prev) => {
      if (!prev) return prev;
      if (!prev.isScraped) {
        isLikeAnimation.value = false;
        scaleImage();
      }
      return {
        ...prev,
        isScraped: !prev.isScraped,
      };
    });
  }, [isScraped, scaleImage, pictureNo, isLikeAnimation]);

  const orientation =
    width >= height ? OrientationType.landscape : OrientationType.portrait;
  const SIZE =
    orientation === OrientationType.landscape ? windowHeight : windowWidth;
  const Favorite = isLiked ? FavoriteIcon : FavoriteOutlineIcon;

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
        style={styles.wrapMore}
        onPress={throttle(toggleLike)}
        onLongPress={showLikesPeople}
      >
        <Favorite color={colorByBackground} />
      </Pressable>
      <Pressable onPress={() => setBottomSheetIndex(isMine ? 1 : 0)}>
        <MoreIcon color={colorByBackground} />
      </Pressable>
    </View>
  );
  const renderHeader = () =>
    isEditMode && (
      <View
        style={[
          orientation === OrientationType.landscape
            ? styles.wrapHeaderLandscape
            : styles.wrapHeaderPortrait,
          { paddingTop: insets.top },
        ]}
      >
        <Header
          iconColor={colorByBackground}
          backgroundColor="transparent"
          headerRight={headerRight}
        />
      </View>
    );
  const renderFooter = () =>
    isEditMode && (
      <View
        style={[
          styles.wrapFooter,
          orientation === OrientationType.landscape
            ? styles.wrapFooterLandscape
            : styles.wrapFooterPortrait,
          { paddingBottom: insets.bottom },
        ]}
      >
        <Text style={[styles.text, TEXT_STYLE.body14R]}>{description}</Text>
      </View>
    );

  const bottomSheetForEditor = useMemo(
    () => (
      <BottomSheet
        ref={bottomSheetRef}
        index={bottomSheetIndex}
        onChange={(index) => setBottomSheetIndex(index)}
        snapPoints={[114, 300]}
      >
        <BottomSheetItemGroup>
          <BottomSheetItem
            label="플로어 방문하기"
            icon={<PhotoIcon color={COLOR.mono.black} />}
          />
          <BottomSheetItem
            label="사진 스크랩하기"
            icon={<BookmarkIcon />}
            onPress={toggleScrap}
          />
          <BottomSheetItem label="사진 공유하기" icon={<ShareIcon />} />
        </BottomSheetItemGroup>
        <BottomSheetItemGroup>
          <BottomSheetItem label="설명 수정하기" icon={<EditIcon />} />
          <BottomSheetItem
            label="사진 삭제하기"
            icon={<DeleteIcon />}
            color={COLOR.system.red}
          />
        </BottomSheetItemGroup>
      </BottomSheet>
    ),
    [bottomSheetIndex, toggleScrap],
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
            label="프로필 보기"
            icon={<PersonIcon color={COLOR.mono.black} />}
          />
          <BottomSheetItem
            label="플로어 방문하기"
            icon={<PhotoIcon color={COLOR.mono.black} />}
          />
          <BottomSheetItem
            label="사진 스크랩하기"
            icon={<BookmarkIcon />}
            onPress={toggleScrap}
          />
          <BottomSheetItem label="사진 공유하기" icon={<ShareIcon />} />
          <BottomSheetItem
            label="사진 신고하기"
            icon={<AlertIcon color={COLOR.system.red} />}
            color={COLOR.system.red}
          />
        </BottomSheetItemGroup>
      </BottomSheet>
    ),
    [bottomSheetIndex, toggleScrap],
  );

  const renderBottomSheet = () =>
    isMine ? bottomSheetForEditor : bottomSheetForVisiter;

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
    <View
      style={[
        styles.container,
        {
          paddingLeft: insets.left,
          paddingRight: insets.right,
          backgroundColor: color,
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
          <Animated.View style={styles.wrapImage}>
            <FastImage
              source={{ uri: imageUrl }}
              style={styles.imageBackground}
              resizeMode="contain"
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
  );
};

export default ImageDetailScreen;
