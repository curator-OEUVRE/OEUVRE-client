/* eslint-disable react-native/no-raw-text */
import Sheet from '@gorhom/bottom-sheet';
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
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  View,
  BackHandler,
  Share,
  Text,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Shadow } from 'react-native-shadow-2';
import AlertIcon from '@/assets/icons/Alert';
import DeleteIcon from '@/assets/icons/Delete';
import EditIcon from '@/assets/icons/Edit';
import MoreIcon from '@/assets/icons/More';
import PersonIcon from '@/assets/icons/Person';
import ShareIcon from '@/assets/icons/Share';
import TextBubbleIcon from '@/assets/icons/TextBubble';
import {
  BottomSheet,
  BottomSheetItem,
  BottomSheetItemGroup,
  Spinner,
} from '@/components';
import { Header } from '@/components/Header';
import { DynamicLinkType } from '@/constants/dynamicLinks';
import { Screen } from '@/constants/screens';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import FloorPictureList from '@/feature/FloorPictureList';
import RotateButton from '@/feature/RotateButton';
import { RootStackParamsList } from '@/feature/Routes';
import { FloorStackParamsList } from '@/feature/Routes/FloorStack';
import {
  getBackgroundColorsByGradient,
  getColorByBackgroundColor,
  getFooterColorsByBackgroundColor,
} from '@/services/common/color';
import { buildDynamicLink } from '@/services/firebase/dynamicLinks';
import { useFloorStore } from '@/states/floorStore';
import { useUserStore } from '@/states/userStore';
import { Picture } from '@/types/picture';

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  comment: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    borderRadius: 12,
    flexDirection: 'row',
    height: 25,
    justifyContent: 'center',
    width: 130,
  },
  commentText: {
    color: COLOR.mono.gray5,
    marginLeft: 9,
  },
  container: {
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 8,
    width: '100%',
  },
  new: {
    backgroundColor: COLOR.system.red,
    borderRadius: 6,
    height: 7,
    position: 'absolute',
    right: 1,
    top: 1,
    width: 7,
    zIndex: 10,
  },
  wrapComment: {
    alignItems: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 16,
  },
  wrapList: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: -45,
  },
});

export interface FloorViewerScreenParams {
  floorNo: number;
}

export type FloorViewerScreenRP = RouteProp<
  FloorStackParamsList,
  Screen.FloorViewerScreen
>;

export type FloorViewerScreenNP = CompositeNavigationProp<
  StackNavigationProp<FloorStackParamsList, Screen.FloorViewerScreen>,
  StackNavigationProp<RootStackParamsList>
>;

const FloorViewerScreen = () => {
  const { params } = useRoute<FloorViewerScreenRP>();

  const navigation = useNavigation<FloorViewerScreenNP>();
  const { floor, fetchFloor, setSwiperIndex } = useFloorStore();
  const {
    isMine,
    color,
    userNo,
    userId,
    name,
    pictures,
    hasNewComment,
    gradient,
  } = floor;

  const { deleteFloor } = useUserStore();
  const { floorNo } = params;
  const [bottomSheetIndex, setBottomSheetIndex] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);
  const [viewingMode, setViewingMode] = useState<boolean>(false);
  const bottomSheetRef = useRef<Sheet>(null);
  const iconColorByBackground = getColorByBackgroundColor(color);
  const textColorByBackground = getColorByBackgroundColor(color, {
    dark: COLOR.mono.gray5,
  });
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const footerHeight = isLandscape ? 69 : 100;

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        await fetchFloor(floorNo);
        setLoading(false);
      };
      fetchData();
    }, [fetchFloor, floorNo]),
  );

  useFocusEffect(
    useCallback(() => () => lockAsync(OrientationLock.PORTRAIT_UP), []),
  );

  const onReport = useCallback(() => {
    Alert.alert('신고 완료', '신고 완료했습니다.');
  }, []);

  const onPressMore = useCallback(() => {
    setBottomSheetIndex(0);
  }, []);

  const ConfirmButton = useCallback(
    () => (
      <Pressable onPress={onPressMore}>
        <MoreIcon color={iconColorByBackground} />
      </Pressable>
    ),
    [onPressMore, iconColorByBackground],
  );

  const onPressPicture = useCallback(
    (picture: Picture) => {
      const idx = pictures.findIndex(
        ({ pictureNo }) => picture.pictureNo === pictureNo,
      );
      if (idx === -1) return;
      setSwiperIndex(idx);
      navigation.navigate(Screen.ImageDetailScreen);
    },
    [navigation, pictures, setSwiperIndex],
  );

  const onEditFloor = () => {
    bottomSheetRef.current?.close();
    navigation.navigate(Screen.EditFloorScreen);
  };

  const onDeleteFloor = useCallback(async () => {
    bottomSheetRef.current?.close();
    await deleteFloor(floorNo);
    // await lockAsync(OrientationLock.PORTRAIT_UP);
    navigation.goBack();
  }, [floorNo, navigation, deleteFloor]);
  const visitProfile = useCallback(() => {
    bottomSheetRef.current?.close();
    if (!userNo) return;
    navigation.navigate(Screen.ProfileScreen, { userNo });
  }, [userNo, navigation]);

  const share = useCallback(async () => {
    bottomSheetRef.current?.close();
    const url = await buildDynamicLink({
      type: DynamicLinkType.FLOOR,
      id: floorNo,
    });
    Share.share({ url });
  }, [floorNo]);

  const bottomSheetForEditor = [
    <BottomSheetItemGroup key="edit">
      <BottomSheetItem
        label="플로어 공유하기"
        icon={<ShareIcon />}
        onPress={share}
      />
      <BottomSheetItem
        label="플로어 수정하기"
        icon={<EditIcon />}
        onPress={onEditFloor}
      />
      <BottomSheetItem
        label="플로어 삭제하기"
        icon={<DeleteIcon />}
        color={COLOR.system.red}
        onPress={() => {
          Alert.alert(`플로어를\n삭제하시겠어요?`, undefined, [
            {
              text: '플로어 삭제하기',
              onPress: onDeleteFloor,
              style: 'destructive',
            },
            { text: '취소하기', style: 'cancel' },
          ]);
        }}
      />
    </BottomSheetItemGroup>,
  ];

  const bottomSheetForVisiter = (
    <BottomSheetItemGroup>
      <BottomSheetItem
        label={`${userId}님 프로필 보기`}
        icon={<PersonIcon color={COLOR.mono.black} />}
        onPress={visitProfile}
      />
      <BottomSheetItem
        label="플로어 공유하기"
        icon={<ShareIcon />}
        onPress={share}
      />
      <BottomSheetItem
        label="플로어 신고하기"
        icon={<AlertIcon color={COLOR.system.red} />}
        color={COLOR.system.red}
        onPress={onReport}
      />
    </BottomSheetItemGroup>
  );

  const renderBottomSheet = () =>
    bottomSheetIndex === -1 ? null : (
      <BottomSheet
        ref={bottomSheetRef}
        index={bottomSheetIndex}
        onChange={(index) => setBottomSheetIndex(index)}
        snapPoints={isMine ? [204] : [192]}
      >
        {isMine ? bottomSheetForEditor : bottomSheetForVisiter}
      </BottomSheet>
    );
  const newIcon = <View style={styles.new} />;

  const guestBookButton = (
    <Pressable
      style={styles.wrapComment}
      onPress={async () => {
        // await lockAsync(OrientationLock.PORTRAIT_UP);
        navigation.navigate(Screen.GuestBookScreen, {
          floorNo,
        });
      }}
    >
      {/* {hasNewComment && newIcon} */}
      <Shadow
        distance={2}
        startColor="#00000020"
        endColor="#00000000"
        style={styles.comment}
      >
        <TextBubbleIcon color={iconColorByBackground} />
        <Text style={[TEXT_STYLE.body12M, styles.commentText]}>
          {isMine ? '방명록 확인하기 ' : '방명록 작성하기'}
        </Text>
      </Shadow>
    </Pressable>
  );

  const onScrollBeginDrag = useCallback(() => {
    setViewingMode(true);
  }, []);

  const onPressBackground = useCallback(() => {
    setViewingMode(false);
  }, []);

  const footer = (
    <LinearGradient
      style={[styles.footer, { height: footerHeight }]}
      colors={getFooterColorsByBackgroundColor({ color })}
    >
      {!viewingMode && (
        <>
          {guestBookButton}
          <RotateButton />
        </>
      )}
    </LinearGradient>
  );

  const headerOpacity = viewingMode ? 0 : 1;
  return (
    <Pressable onPress={onPressBackground} style={styles.container}>
      <LinearGradient
        style={styles.container}
        colors={getBackgroundColorsByGradient({ color, gradient })}
      >
        <SafeAreaView style={styles.container} edges={['top']}>
          <View style={{ opacity: headerOpacity }}>
            <Header
              headerTitle={name}
              headerRight={ConfirmButton}
              backgroundColor="transparent"
              iconColor={iconColorByBackground}
            />
          </View>
          <View style={styles.wrapList}>
            <FloorPictureList
              pictures={pictures}
              editable={false}
              onPressPicture={onPressPicture}
              color={textColorByBackground}
              alignment={floor.alignment}
              onScrollBeginDrag={onScrollBeginDrag}
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
      {footer}
      {renderBottomSheet()}
      {loading && <Spinner />}
    </Pressable>
  );
};

export default FloorViewerScreen;
