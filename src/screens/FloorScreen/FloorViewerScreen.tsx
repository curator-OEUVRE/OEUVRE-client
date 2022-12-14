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
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, BackHandler, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AlertIcon from '@/assets/icons/Alert';
import DeleteIcon from '@/assets/icons/Delete';
import EditIcon from '@/assets/icons/Edit';
import MoreIcon from '@/assets/icons/More';
import PersonIcon from '@/assets/icons/Person';
import TextBubbleIcon from '@/assets/icons/TextBubble';
import {
  BottomSheet,
  BottomSheetItem,
  BottomSheetItemGroup,
  Spinner,
} from '@/components';
import { Header } from '@/components/Header';
import { Screen } from '@/constants/screens';
import { COLOR } from '@/constants/styles';
import FloorPictureList from '@/feature/FloorPictureList';
import { RootStackParamsList } from '@/feature/Routes';
import { FloorStackParamsList } from '@/feature/Routes/FloorStack';
import { getColorByBackgroundColor } from '@/services/common/color';
import { useFloorStore } from '@/states/floorStore';
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
  const { floor, fetchFloor } = useFloorStore();
  const { isMine, color, userNo, userId, name, pictures, hasNewComment } =
    floor;

  const { deleteFloor } = useUserStore();
  const { floorNo } = params;
  const [bottomSheetIndex, setBottomSheetIndex] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);
  const bottomSheetRef = useRef<Sheet>(null);
  const iconColorByBackground = getColorByBackgroundColor(color);
  const textColorByBackground = getColorByBackgroundColor(color, {
    dark: COLOR.mono.gray5,
  });

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

  const onReport = useCallback(() => {
    Alert.alert('?????? ??????', '?????? ??????????????????.');
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
    navigation.navigate(Screen.EditFloorScreen, { floorNo });
  };

  const onDeleteFloor = useCallback(async () => {
    bottomSheetRef.current?.close();
    await deleteFloor(floorNo);
    // await lockAsync(OrientationLock.PORTRAIT_UP);
    navigation.goBack();
  }, [floorNo, navigation, deleteFloor]);
  const visitProfile = useCallback(() => {
    if (!userNo) return;
    navigation.navigate(Screen.ProfileScreen, { userNo });
  }, [userNo, navigation]);

  const bottomSheetForEditor = [
    <BottomSheetItemGroup key="edit">
      <BottomSheetItem
        label="????????? ????????????"
        icon={<EditIcon />}
        onPress={onEditFloor}
      />
      <BottomSheetItem
        label="????????? ????????????"
        icon={<DeleteIcon />}
        color={COLOR.system.red}
        onPress={() => {
          Alert.alert(`????????????\n??????????????????????`, undefined, [
            {
              text: '????????? ????????????',
              onPress: onDeleteFloor,
              style: 'destructive',
            },
            { text: '????????????', style: 'cancel' },
          ]);
        }}
      />
    </BottomSheetItemGroup>,
  ];

  const bottomSheetForVisiter = (
    <BottomSheetItemGroup>
      <BottomSheetItem
        label={`${userId}??? ????????? ??????`}
        icon={<PersonIcon color={COLOR.mono.black} />}
        onPress={visitProfile}
      />
      {/* <BottomSheetItem label="?????? ????????????" icon={<ShareIcon />} /> */}
      <BottomSheetItem
        label="????????? ????????????"
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
        // await lockAsync(OrientationLock.PORTRAIT_UP);
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
        headerTitle={name}
        headerRight={ConfirmButton}
        backgroundColor="transparent"
        iconColor={iconColorByBackground}
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
