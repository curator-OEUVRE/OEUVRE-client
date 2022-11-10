import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  getComments,
  getOtherFloors,
  createComment,
  deleteComment,
} from '@/apis/guestbook';
import { Header, Spinner } from '@/components';
import { WithKeyboardAvoidingView } from '@/components/WithKeyboardAvoidingView';
import { Screen } from '@/constants/screens';
import { COLOR } from '@/constants/styles';
import FloorDropDown from '@/feature/FloorDropdown';
import GuestBookInput from '@/feature/GuestBookInput';
import GuestBookList from '@/feature/GuestBookList';
import { RootStackParamsList } from '@/feature/Routes';
import { FloorStackParamsList } from '@/feature/Routes/FloorStack';
import { useUserStore } from '@/states/userStore';
import { GuestBookInfo, OtherFloor } from '@/types/guestbook';

export type GuestBookScreenParams = {
  floorNo: number;
};

export type GuestBookScreenRP = RouteProp<
  FloorStackParamsList,
  Screen.GuestBookScreen
>;

export type GuestBookScreenNP = CompositeNavigationProp<
  StackNavigationProp<FloorStackParamsList, Screen.GuestBookScreen>,
  StackNavigationProp<RootStackParamsList>
>;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.mono.white,
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 24,
  },
});

const GuestBookScreen = () => {
  const navigation = useNavigation<GuestBookScreenNP>();
  const isLastPage = useRef<boolean>(true);
  const { params } = useRoute<GuestBookScreenRP>();
  const [page, setPage] = useState<number>(0);
  const [comments, setcomments] = useState<GuestBookInfo[]>([]);
  const [commentsLoading, setCommentsLoading] = useState<boolean>(false);
  const [otherFloors, setOtherFloors] = useState<OtherFloor[]>([]);
  const [otherFloorsLoading, setOtherFloorsLoading] = useState<boolean>(false);
  const { floorNo } = params;
  const { profileImageUrl } = useUserStore();
  useEffect(() => {
    const fetchCommentsData = async () => {
      setCommentsLoading(true);
      const response = await getComments({ page: 0, floorNo });
      if (response.isSuccess) {
        const { result } = response.result;
        setcomments(result.contents);
        isLastPage.current = result.isLastPage;
        setPage((prev) => prev + 1);
      } else {
        // eslint-disable-next-line no-console
        console.log(response.result.errorMessage);
      }
      setCommentsLoading(false);
    };
    const fetchOtherFloors = async () => {
      setOtherFloorsLoading(true);
      const response = await getOtherFloors({ floorNo });
      if (response.isSuccess) {
        const { result } = response.result;
        setOtherFloors(result);
      } else {
        // eslint-disable-next-line no-console
        console.log(response.result.errorMessage);
      }
      setOtherFloorsLoading(false);
    };
    fetchCommentsData();
    fetchOtherFloors();
  }, [floorNo]);

  const onChangeFloor = (nextFloor: number) => {
    navigation.navigate(Screen.GuestBookScreen, { floorNo: nextFloor });
  };

  const headerTitle = () => {
    const currentIdx = otherFloors.findIndex(
      (floor) => floor.floorNo === floorNo,
    );
    return (
      <FloorDropDown
        currentIdx={currentIdx}
        onPress={onChangeFloor}
        floors={otherFloors}
      />
    );
  };

  const onSubmit = useCallback(
    async (comment: string) => {
      if (comment.length === 0) return;
      setCommentsLoading(true);
      const response = await createComment({ floorNo, comment });
      if (response.isSuccess) {
        const { result } = response.result;
        setcomments((prev) => [result, ...prev]);
      }
      setCommentsLoading(false);
    },
    [floorNo],
  );

  const onDelete = useCallback(
    async (idx: number) => {
      const { commentNo } = comments[idx];
      setCommentsLoading(true);
      const response = await deleteComment({ commentNo });
      if (response.isSuccess) {
        setcomments((prev) => [...prev.slice(0, idx), ...prev.slice(idx + 1)]);
      }
      setCommentsLoading(false);
    },
    [comments],
  );

  const onReport = useCallback(() => {
    Alert.alert('신고 완료', '신고 완료했습니다.');
  }, []);

  const fetchMore = useCallback(async () => {
    if (isLastPage.current) return;
    setCommentsLoading(true);
    const response = await getComments({ page, floorNo });
    if (response.isSuccess) {
      const { result } = response.result;
      setcomments((prev) => [...prev, ...result.contents]);
      setPage((prev) => prev + 1);
      isLastPage.current = result.isLastPage;
    } else {
      // eslint-disable-next-line no-console
      console.log(response.result.errorMessage);
    }
    setCommentsLoading(false);
  }, [page, floorNo]);

  const visitProfile = useCallback(
    (userNo: number) => {
      navigation.navigate(Screen.ProfileScreen, { userNo });
    },
    [navigation],
  );

  if (otherFloorsLoading) {
    return <Spinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header headerTitle={headerTitle} />
      <WithKeyboardAvoidingView>
        <View style={styles.content}>
          <GuestBookList
            data={comments}
            onDelete={onDelete}
            onReport={onReport}
            fetchMore={fetchMore}
            isLoading={commentsLoading}
            onPressProfile={visitProfile}
          />
        </View>
        <GuestBookInput avatarUri={profileImageUrl} onSubmit={onSubmit} />
      </WithKeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default GuestBookScreen;
