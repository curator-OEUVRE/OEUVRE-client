import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createComment, deleteComment, getComments } from '@/apis/guestbook';
import { Header } from '@/components';
import { WithKeyboardAvoidingView } from '@/components/WithKeyboardAvoidingView';
import { Navigator, Screen } from '@/constants/screens';
import { COLOR } from '@/constants/styles';
import GuestBookInput from '@/feature/GuestBookInput';
import GuestBookList from '@/feature/GuestBookList';
import { RootStackParamsList } from '@/feature/Routes';
import { FloorStackParamsList } from '@/feature/Routes/FloorStack';
import { useUserStore } from '@/states/userStore';
import { GuestBookInfo } from '@/types/guestbook';

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
  const flatListRef = useRef<FlatList>(null);
  const isLastPage = useRef<boolean>(true);
  const { params } = useRoute<GuestBookScreenRP>();
  const [page, setPage] = useState<number>(0);
  const [floorName, setFloorName] = useState<string>('');
  const [comments, setcomments] = useState<GuestBookInfo[]>([]);
  const [commentsLoading, setCommentsLoading] = useState<boolean>(false);
  const { floorNo } = params;
  const { userNo: myUserNo } = useUserStore();
  const { profileImageUrl } = useUserStore();
  useEffect(() => {
    const fetchCommentsData = async () => {
      setCommentsLoading(true);
      const response = await getComments({ page: 0, floorNo });
      if (response.isSuccess) {
        const { result } = response.result;
        setcomments(result.contents);
        setFloorName(result.floorName);
        isLastPage.current = result.isLastPage;
        setPage((prev) => prev + 1);
      } else {
        // eslint-disable-next-line no-console
        console.log(response.result.errorMessage);
      }
      setCommentsLoading(false);
    };
    fetchCommentsData();
  }, [floorNo]);

  const onSubmit = useCallback(
    async (comment: string) => {
      if (comment.length === 0) return;
      setCommentsLoading(true);
      const response = await createComment({ floorNo, comment });
      if (response.isSuccess) {
        const { result } = response.result;
        setcomments((prev) => [{ ...result, isMine: true }, ...prev]);
      }
      setCommentsLoading(false);
      flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
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
      if (myUserNo === userNo) {
        navigation.navigate(Navigator.MainTab, {
          screen: Navigator.ProfileStack,
          params: {
            screen: Screen.MyProfileScreen,
          },
        });
      } else {
        navigation.navigate(Screen.ProfileScreen, { userNo });
      }
    },
    [navigation, myUserNo],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header headerTitle={floorName} />
      <WithKeyboardAvoidingView>
        <View style={styles.content}>
          <GuestBookList
            ref={flatListRef}
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
