import { RouteProp, useRoute } from '@react-navigation/native';
import { lockAsync, OrientationLock } from 'expo-screen-orientation';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getPictureDetail } from '@/apis/floor';
import BookmarkIcon from '@/assets/icons/Bookmark';
import DeleteIcon from '@/assets/icons/Delete';
import EditIcon from '@/assets/icons/Edit';
import FavoriteIcon from '@/assets/icons/Favorite';
import FavoriteOutlineIcon from '@/assets/icons/FavoriteOutline';
import MoreIcon from '@/assets/icons/More';
import ShareIcon from '@/assets/icons/Share';
import { Header } from '@/components/Header';
import { BottomSheet } from '@/components/index';
import { IMAGE } from '@/constants/images';
import { Screen } from '@/constants/screens';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import { FloorStackParamsList } from '@/feature/Routes/FloorStack';
import throttle from '@/services/common/throttle';
import { PictureDetail } from '@/types/floor';

enum OrientationType {
  portrait,
  landscape,
}

export interface ImageDetailScreenParams {
  pictureNo: number;
}

export type ImageDetailScreenRP = RouteProp<
  FloorStackParamsList,
  Screen.ImageDetailScreen
>;

const AnimatedImage = Animated.createAnimatedComponent(Image);
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.mono.white,
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
  text: {
    color: COLOR.mono.gray7,
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

const ImageDetailScreen = () => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const { params } = useRoute<ImageDetailScreenRP>();
  const { pictureNo } = params;

  const [pictureDetail, setPictureDetail] = useState<PictureDetail>();
  const [isLike, setLike] = useState<boolean>(false);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [bottomSheetIndex, setBottomSheetIndex] = useState<number>(-1);

  useEffect(() => {
    const fetchPictureDetail = async () => {
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
        console.log(response.result.info);
      }
    };
    fetchPictureDetail();
    return () => {
      lockAsync(OrientationLock.DEFAULT);
    };
  }, [pictureNo]);

  const isBottomSheetOpen = bottomSheetIndex >= 0;
  const scale = useSharedValue(0.0001);
  const onSingleTap = useCallback(() => {
    setEditMode((prev) => !prev);
  }, []);

  const scaleImage = useCallback(() => {
    scale.value = withSpring(1, undefined, (isFinished) => {
      if (isFinished) {
        scale.value = withDelay(500, withSpring(0.0001));
      }
    });
  }, [scale]);

  const toggleLike = () => {
    setLike((prev) => !prev);
    if (isLike) return;
    scaleImage();
  };

  const onScrap = () => {
    scaleImage();
  };

  const doubleTapRef = useRef();
  const imageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: Math.max(scale.value, 0) }],
  }));

  if (!pictureDetail)
    return <Text>adsfdasfdasjflasdjflkasdjfklsadjflkasdfjalskdfjadslfj</Text>;
  const { width, height } = pictureDetail;
  const imageUrl =
    'https://w.namu.la/s/4aad8742a150565290d15e6d0dd9042ebcc24719f738683f55d6325a40c7c866a7a1aded220e0d04876914dd39ce48530c6d92f539e53acb5fe707248d7a7621dd08519a85130cafa0efbd83eb680cc407cbb80141223362aa1848a4d4e29092e0b5cd31256eb766fbe73717006ee0b5';
  const orientation =
    width > height ? OrientationType.landscape : OrientationType.portrait;
  const SIZE =
    orientation === OrientationType.landscape ? windowHeight : windowWidth;

  const headerRight = () => (
    <View style={styles.wrapHeaderRight}>
      {isLike ? (
        <Pressable style={styles.wrapMore} onPress={throttle(toggleLike, 1000)}>
          <FavoriteIcon color={COLOR.mono.gray7} />
        </Pressable>
      ) : (
        <Pressable style={styles.wrapMore} onPress={throttle(toggleLike, 1000)}>
          <FavoriteOutlineIcon color={COLOR.mono.gray7} />
        </Pressable>
      )}
      <Pressable onPress={() => setBottomSheetIndex(1)}>
        <MoreIcon color={COLOR.mono.gray7} />
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
          iconColor={COLOR.mono.gray7}
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
        <Text style={[styles.text, TEXT_STYLE.body14R]}>
          어떻게하면오십글자가될수있는지한번또쳐보겠습니다이렇게저렇게하다보면오십글자가또되겠죠좀적은거같기도
        </Text>
      </View>
    );
  const renderBottomSheet = () => (
    <BottomSheet
      index={bottomSheetIndex}
      onChange={(index) => setBottomSheetIndex(index)}
    >
      <BottomSheet.Group>
        <BottomSheet.Item
          label="사진 스크랩하기"
          icon={<BookmarkIcon />}
          onPress={onScrap}
        />
        <BottomSheet.Item label="사진 공유하기" icon={<ShareIcon />} />
      </BottomSheet.Group>
      <BottomSheet.Group>
        <BottomSheet.Item label="설명 수정하기" icon={<EditIcon />} />
        <BottomSheet.Item
          label="사진 삭제하기"
          icon={<DeleteIcon />}
          color={COLOR.system.red}
        />
      </BottomSheet.Group>
    </BottomSheet>
  );

  return (
    <View
      style={[
        styles.container,
        { paddingLeft: insets.left, paddingRight: insets.right },
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
            <Image
              source={{ uri: imageUrl }}
              style={styles.imageBackground}
              resizeMode="contain"
            />
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
      {renderFooter()}
      {renderBottomSheet()}
      <AnimatedImage
        source={isBottomSheetOpen ? IMAGE.bookmark : IMAGE.heart}
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
