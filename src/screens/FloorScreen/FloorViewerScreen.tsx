/* eslint-disable react-native/no-raw-text */
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
  useIsFocused,
  useFocusEffect,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { lockAsync, OrientationLock } from 'expo-screen-orientation';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFloor } from '@/apis/floor';
import AlertIcon from '@/assets/icons/Alert';
import DeleteIcon from '@/assets/icons/Delete';
import EditIcon from '@/assets/icons/Edit';
import MoreIcon from '@/assets/icons/More';
import PersonIcon from '@/assets/icons/Person';
import ShareIcon from '@/assets/icons/Share';
import TextBubbleIcon from '@/assets/icons/TextBubble';
import { BottomSheet, Spinner } from '@/components';
import { Header } from '@/components/Header';
import { Screen } from '@/constants/screens';
import { COLOR } from '@/constants/styles';
import FloorPictureList from '@/feature/FloorPictureList';
import { RootStackParamsList } from '@/feature/Routes';
import { FloorStackParamsList } from '@/feature/Routes/FloorStack';
import { useCreateFloorStore } from '@/states/createFloorStore';
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
  const isFocused = useIsFocused();
  const navigation = useNavigation<FloorViewerScreenNP>();
  const { setIsEditMode, setFloor } = useCreateFloorStore();
  const { floorNo } = params;
  const [bottomSheetIndex, setBottomSheetIndex] = useState<number>(-1);
  useEffect(() => {
    const fetchFloor = async () => {
      const response = await getFloor({ floorNo });
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
        await lockAsync(OrientationLock.LANDSCAPE);
      };
      lockOrientation();
    }, []),
  );

  useEffect(
    () => () => {
      lockAsync(OrientationLock.PORTRAIT);
    },
    [],
  );

  const onPressMore = useCallback(() => {
    setBottomSheetIndex(floorInfo?.isMine ? 1 : 0);
  }, [floorInfo?.isMine]);

  const ConfirmButton = useCallback(
    () => (
      <Pressable onPress={onPressMore}>
        <MoreIcon color={COLOR.mono.gray7} />
      </Pressable>
    ),
    [onPressMore],
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
    setIsEditMode(true);
    setFloor(floorInfo);
    navigation.navigate(Screen.EditFloorScreen, { floorNo });
  };

  const bottomSheetForEditor = [
    <BottomSheet.Group key="share">
      <BottomSheet.Item label="플로어 공유하기" icon={<ShareIcon />} />
    </BottomSheet.Group>,
    <BottomSheet.Group key="edit">
      <BottomSheet.Item
        label="플로어 수정하기"
        icon={<EditIcon />}
        onPress={onEditFloor}
      />
      <BottomSheet.Item
        label="플로어 삭제하기"
        icon={<DeleteIcon />}
        color={COLOR.system.red}
      />
    </BottomSheet.Group>,
  ];
  const bottomSheetForVisiter = (
    <BottomSheet.Group>
      <BottomSheet.Item label="님 프로필 보기" icon={<PersonIcon />} />
      <BottomSheet.Item label="사진 공유하기" icon={<ShareIcon />} />
      <BottomSheet.Item
        label="플로어 신고하기"
        icon={<AlertIcon color={COLOR.system.red} />}
        color={COLOR.system.red}
      />
    </BottomSheet.Group>
  );

  if (!floorInfo) return <Spinner />;
  const { pictures, color, name, isMine } = floorInfo;
  const renderBottomSheet = () => (
    <BottomSheet
      index={bottomSheetIndex}
      onChange={(index) => setBottomSheetIndex(index)}
      isPortrait={false}
    >
      {isMine ? bottomSheetForEditor : bottomSheetForVisiter}
    </BottomSheet>
  );

  const guestBookButton = (
    <Pressable
      style={styles.textBubble}
      onPress={() => navigation.navigate(Screen.GuestBookScreen, { floorNo })}
    >
      <TextBubbleIcon color={COLOR.mono.black} />
    </Pressable>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: color }]}>
      <Header
        headerTitle={name}
        headerRight={ConfirmButton}
        backgroundColor="transparent"
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
