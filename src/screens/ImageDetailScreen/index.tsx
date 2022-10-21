/* eslint-disable global-require */
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
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
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
import { COLOR, TEXT_STYLE } from '@/constants/styles';

export interface ImageDetailScreenParams {
  imageUri: string;
}

const { width: SIZE } = Dimensions.get('window');
const AnimatedImage = Animated.createAnimatedComponent(Image);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.mono.white,
    flex: 1,
  },
  image: {
    height: SIZE,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.35,
    shadowRadius: 35,
    width: SIZE,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  pressable: {
    flex: 1,
    marginTop: 26,
  },
  text: {
    color: COLOR.mono.white,
  },
  wrapFooter: {
    height: 120,
    lineHeight: 21,
    paddingHorizontal: 20,
    paddingTop: 31,
    width: '100%',
  },
  wrapHeader: {
    width: '100%',
  },
  wrapHeaderRight: {
    flexDirection: 'row',
  },
  wrapMore: {
    marginRight: 9,
  },
});
const imageUri =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/IU_posing_for_Marie_Claire_Korea_March_2022_issue_03.jpg/500px-IU_posing_for_Marie_Claire_Korea_March_2022_issue_03.jpg';

const ImageDetailScreen = () => {
  const { width: windowWidth } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();
  const [isLike, setLike] = useState<boolean>(false);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [bottomSheetIndex, setBottomSheetIndex] = useState<number>(-1);
  const wrapHeaderStyle = [styles.wrapHeader, { paddingTop: top }];
  const wrapFooterStyle = [styles.wrapFooter, { paddingBottom: bottom }];

  const scale = useSharedValue(0);

  const onSingleTap = useCallback(() => {
    setEditMode((prev) => !prev);
  }, []);

  const onDoubleTap = useCallback(() => {
    scale.value = withSpring(1, undefined, (isFinished) => {
      if (isFinished) {
        scale.value = withDelay(500, withSpring(0));
      }
    });
  }, [scale]);

  const doubleTapRef = useRef();
  const imageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: Math.max(scale.value, 0) }],
  }));

  const toggleLike = () => {
    setLike((prev) => !prev);
  };
  const headerRight = () => (
    <View style={styles.wrapHeaderRight}>
      {isLike ? (
        <Pressable style={styles.wrapMore} onPress={toggleLike}>
          <FavoriteIcon color={COLOR.mono.white} />
        </Pressable>
      ) : (
        <Pressable
          style={styles.wrapMore}
          onPress={() => {
            toggleLike();
            onDoubleTap();
          }}
        >
          <FavoriteOutlineIcon color={COLOR.mono.white} />
        </Pressable>
      )}
      <Pressable onPress={() => setBottomSheetIndex(1)}>
        <MoreIcon color={COLOR.mono.white} />
      </Pressable>
    </View>
  );
  const renderHeader = () =>
    isEditMode ? (
      <LinearGradient
        style={wrapHeaderStyle}
        colors={['rgba(20, 23, 24, 0.5)', 'rgba(20, 23, 24, 0)']}
        locations={[0, 1]}
      >
        <Header
          iconColor={COLOR.mono.white}
          backgroundColor="transparent"
          headerRight={headerRight}
        />
      </LinearGradient>
    ) : (
      <View style={wrapHeaderStyle}>
        <Header />
      </View>
    );
  const renderFooter = () =>
    isEditMode ? (
      <LinearGradient
        style={wrapFooterStyle}
        colors={['rgba(20, 23, 24, 0)', 'rgba(20, 23, 24, 0.5)']}
        locations={[0, 1]}
      >
        <Text style={[styles.text, TEXT_STYLE.body14R]}>
          어떻게하면오십글자가될수있는지한번또쳐보겠습니다이렇게저렇게하다보면오십글자가또되겠죠좀적은거같기도
        </Text>
      </LinearGradient>
    ) : (
      <View style={wrapFooterStyle} />
    );
  const renderBottomSheet = () => (
    <BottomSheet
      index={bottomSheetIndex}
      onChange={(index) => setBottomSheetIndex(index)}
    >
      <BottomSheet.Group>
        <BottomSheet.Item label="사진 스크랩하기" icon={<BookmarkIcon />} />
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
    <View style={styles.container}>
      {renderHeader()}
      <TapGestureHandler waitFor={doubleTapRef} onActivated={onSingleTap}>
        <TapGestureHandler
          maxDelayMs={250}
          ref={doubleTapRef}
          numberOfTaps={2}
          onActivated={onDoubleTap}
        >
          <Animated.View style={styles.pressable}>
            <ImageBackground
              source={{ uri: imageUri }}
              style={styles.imageBackground}
              resizeMode="contain"
            >
              <AnimatedImage
                source={IMAGE.heart}
                style={[styles.image, imageStyle]}
              />
            </ImageBackground>
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
      {renderFooter()}
      {renderBottomSheet()}
    </View>
  );
};

export default ImageDetailScreen;
