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
import { lockAsync, OrientationLock } from 'expo-screen-orientation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, View, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import { Navigator, Screen } from '@/constants/screens';
import { COLOR } from '@/constants/styles';
import FloorPictureList from '@/feature/FloorPictureList';
import { RootStackParamsList } from '@/feature/Routes';
import { FloorStackParamsList } from '@/feature/Routes/FloorStack';
import { getColorByBackgroundColor } from '@/services/common/color';
import { FloorMode, useCreateFloorStore } from '@/states/createFloorStore';
import { useUserStore } from '@/states/userStore';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.mono.white,
    flex: 1,
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
  textBubble: {
    bottom: '7%',
    position: 'absolute',
    right: '7%',
  },
  wrapList: {
    flex: 1,
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
  const {
    setFloorMode,
    fetchFloor,
    isMine,
    color,
    userNo,
    userId,
    name,
    pictures,
    clearCreateFloorStore,
    hasNewComment,
  } = useCreateFloorStore();

  const { deleteFloor } = useUserStore();
  const { floorNo } = params;
  const [bottomSheetIndex, setBottomSheetIndex] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);
  const bottomSheetRef = useRef<Sheet>(null);
  const iconColorByBackground = getColorByBackgroundColor(color);
  const textColorByBackground = getColorByBackgroundColor(color, {
    dark: COLOR.mono.gray5,
  });

  const onGoBack = useCallback(async () => {
    clearCreateFloorStore();
    await lockAsync(OrientationLock.PORTRAIT_UP);
  }, [clearCreateFloorStore]);

  useEffect(() => {
    const backAction = () => {
      onGoBack();
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [onGoBack, navigation]);

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
        await fetchFloor(floorNo);
        setLoading(false);
      };
      fetchData();
    }, [fetchFloor, floorNo]),
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
    (pictureNo: number) => {
      navigation.navigate(Screen.ImageDetailScreen, {
        pictureNo,
        color,
      });
    },
    [navigation, color],
  );

  const onEditFloor = () => {
    setFloorMode({ mode: FloorMode.EDIT });
    navigation.navigate(Screen.EditFloorScreen, { floorNo });
  };

  const onDeleteFloor = useCallback(async () => {
    bottomSheetRef.current?.close();
    await deleteFloor(floorNo);
    await lockAsync(OrientationLock.PORTRAIT_UP);
    navigation.goBack();
  }, [floorNo, navigation, deleteFloor]);
  const visitProfile = useCallback(() => {
    navigation.navigate(Navigator.ProfileStack, {
      screen: Screen.ProfileScreen,
      params: { userNo },
    });
  }, [userNo, navigation]);

  const bottomSheetForEditor = [
    <BottomSheetItemGroup key="edit">
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
      {/* <BottomSheetItem label="사진 공유하기" icon={<ShareIcon />} /> */}
      <BottomSheetItem
        label="플로어 신고하기"
        icon={<AlertIcon color={COLOR.system.red} />}
        color={COLOR.system.red}
        onPress={onReport}
      />
    </BottomSheetItemGroup>
  );

  const renderBottomSheet = () => (
    <BottomSheet
      ref={bottomSheetRef}
      index={bottomSheetIndex}
      onChange={(index) => setBottomSheetIndex(index)}
      snapPoints={isMine ? [140] : [192]}
    >
      {isMine ? bottomSheetForEditor : bottomSheetForVisiter}
    </BottomSheet>
  );
  const newIcon = <View style={styles.new} />;

  const guestBookButton = (
    <Pressable
      style={styles.textBubble}
      onPress={async () => {
        await lockAsync(OrientationLock.PORTRAIT_UP);
        navigation.navigate(Screen.GuestBookScreen, { floorNo });
      }}
    >
      {hasNewComment && newIcon}
      <TextBubbleIcon color={iconColorByBackground} />
    </Pressable>
  );

  if (loading) return <Spinner />;
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: color }]}>
      <Header
        headerTitle={name.value}
        headerRight={ConfirmButton}
        backgroundColor="transparent"
        iconColor={iconColorByBackground}
        onGoBack={onGoBack}
      />
      <View style={styles.wrapList}>
        <FloorPictureList
          pictures={pictures}
          editable={false}
          onPressPicture={onPressPicture}
          color={textColorByBackground}
        />
      </View>
      {guestBookButton}
      {renderBottomSheet()}
    </SafeAreaView>
  );
};

export default FloorViewerScreen;
