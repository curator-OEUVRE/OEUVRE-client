/* eslint-disable react-native/no-raw-text */
import Sheet from '@gorhom/bottom-sheet';
import {
  CompositeNavigationProp,
  RouteProp,
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { lockAsync, OrientationLock } from 'expo-screen-orientation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FloorAPI from '@/apis/floor';
import AlertIcon from '@/assets/icons/Alert';
import DeleteIcon from '@/assets/icons/Delete';
import EditIcon from '@/assets/icons/Edit';
import MoreIcon from '@/assets/icons/More';
import PersonIcon from '@/assets/icons/Person';
import ShareIcon from '@/assets/icons/Share';
import TextBubbleIcon from '@/assets/icons/TextBubble';
import {
  BottomSheet,
  Spinner,
  BottomSheetItem,
  BottomSheetItemGroup,
} from '@/components';
import { Header } from '@/components/Header';
import { Screen } from '@/constants/screens';
import { COLOR } from '@/constants/styles';
import FloorPictureList from '@/feature/FloorPictureList';
import { RootStackParamsList } from '@/feature/Routes';
import { FloorStackParamsList } from '@/feature/Routes/FloorStack';
import { getColorByBackgroundColor } from '@/services/common/color';
import { FloorMode, useCreateFloorStore } from '@/states/createFloorStore';
import { useUserStore } from '@/states/userStore';
import { GetFloorResponse } from '@/types/floor';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.mono.white,
    flex: 1,
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
  const [floorInfo, setFloorInfo] = useState<GetFloorResponse>();
  const colorByBackground = floorInfo
    ? getColorByBackgroundColor(floorInfo.color)
    : COLOR.mono.black;
  const isFocused = useIsFocused();
  const navigation = useNavigation<FloorViewerScreenNP>();
  const { setFloorMode, setFloor } = useCreateFloorStore();
  const { deleteFloor } = useUserStore();
  const { floorNo } = params;
  const [bottomSheetIndex, setBottomSheetIndex] = useState<number>(-1);
  const bottomSheetRef = useRef<Sheet>(null);
  useEffect(() => {
    if (!isFocused) return;
    const fetchFloor = async () => {
      const response = await FloorAPI.getFloor({ floorNo });
      if (response.isSuccess) {
        const { result } = response.result;
        setFloorInfo(result);
      } else {
        // eslint-disable-next-line no-console
        console.log(response.result.info);
      }
    };
    fetchFloor();
  }, [floorNo, isFocused]);

  useFocusEffect(
    useCallback(() => {
      const lockOrientation = async () => {
        await lockAsync(OrientationLock.LANDSCAPE_LEFT);
      };
      lockOrientation();
    }, []),
  );

  useEffect(
    () => () => {
      lockAsync(OrientationLock.PORTRAIT_UP);
    },
    [],
  );

  const onReport = useCallback(() => {
    Alert.alert('신고 완료', '신고 완료했습니다.');
  }, []);

  const onPressMore = useCallback(() => {
    setBottomSheetIndex(floorInfo?.isMine ? 1 : 0);
  }, [floorInfo?.isMine]);

  const ConfirmButton = useCallback(
    () => (
      <Pressable onPress={onPressMore}>
        <MoreIcon color={colorByBackground} />
      </Pressable>
    ),
    [onPressMore, colorByBackground],
  );

  const onPressPicture = useCallback(
    (pictureNo: number) => {
      navigation.navigate(Screen.ImageDetailScreen, {
        pictureNo,
        color: floorInfo?.color || COLOR.mono.white,
      });
    },
    [navigation, floorInfo?.color],
  );

  const onEditFloor = () => {
    if (!floorInfo) return;
    setFloorMode(FloorMode.EDIT);
    setFloor(floorInfo);
    navigation.navigate(Screen.EditFloorScreen, { floorNo });
  };

  const onDeleteFloor = useCallback(async () => {
    bottomSheetRef.current?.close();
    await deleteFloor(floorNo);
    navigation.goBack();
  }, [floorNo, navigation, deleteFloor]);

  const visitProfile = useCallback(() => {
    if (!floorInfo) return;
    navigation.navigate(Screen.ProfileScreen, { userNo: floorInfo.userNo });
  }, [floorInfo, navigation]);

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
        onPress={onDeleteFloor}
      />
    </BottomSheetItemGroup>,
  ];
  const bottomSheetForVisiter = (
    <BottomSheetItemGroup>
      <BottomSheetItem
        label={`${floorInfo?.userId}님 프로필 보기`}
        icon={<PersonIcon color={COLOR.mono.black} />}
        onPress={visitProfile}
      />
      <BottomSheetItem label="사진 공유하기" icon={<ShareIcon />} />
      <BottomSheetItem
        label="플로어 신고하기"
        icon={<AlertIcon color={COLOR.system.red} />}
        color={COLOR.system.red}
        onPress={onReport}
      />
    </BottomSheetItemGroup>
  );

  if (!floorInfo) return <Spinner />;
  const { pictures, color, name, isMine } = floorInfo;
  const renderBottomSheet = () => (
    <BottomSheet
      ref={bottomSheetRef}
      index={bottomSheetIndex}
      onChange={(index) => setBottomSheetIndex(index)}
      snapPoints={isMine ? [114, 204] : [192]}
    >
      {isMine ? bottomSheetForEditor : bottomSheetForVisiter}
    </BottomSheet>
  );

  const guestBookButton = (
    <Pressable
      style={styles.textBubble}
      onPress={() => {
        lockAsync(OrientationLock.PORTRAIT_UP);
        navigation.navigate(Screen.GuestBookScreen, { floorNo });
      }}
    >
      <TextBubbleIcon color={colorByBackground} />
    </Pressable>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: color }]}>
      <Header
        headerTitle={name}
        headerRight={ConfirmButton}
        backgroundColor="transparent"
        iconColor={colorByBackground}
      />
      <View style={styles.wrapList}>
        <FloorPictureList
          pictures={pictures}
          editable={false}
          onPressPicture={onPressPicture}
        />
      </View>
      {guestBookButton}
      {renderBottomSheet()}
    </SafeAreaView>
  );
};

export default FloorViewerScreen;
