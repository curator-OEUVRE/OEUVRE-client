import { FlatList } from 'react-native-gesture-handler';
import GuestBookItem from './GuestBookItem';
import { Spinner } from '@/components';
import { GuestBookInfo } from '@/types/guestbook';

interface GuestBookListProps {
  data: GuestBookInfo[];
  onDelete: (idx: number) => void;
  onReport: (idx: number) => void;
  fetchMore: () => void;
  isLoading: boolean;
  onPressProfile?: (userNo: number) => void;
}

const keyExtractor = (item: GuestBookInfo) => `comment_${item.commentNo}`;

const GuestBookList = ({
  data,
  onDelete,
  onReport,
  fetchMore,
  isLoading,
  onPressProfile,
}: GuestBookListProps) => (
  <>
    <FlatList
      data={data}
      renderItem={({ item, index }) => (
        <GuestBookItem
          data={item}
          deleteItem={() => onDelete(index)}
          reportItem={() => onReport(index)}
          onPressProfile={onPressProfile}
        />
      )}
      keyExtractor={keyExtractor}
      onEndReachedThreshold={0.1}
      onEndReached={fetchMore}
    />
    {isLoading && <Spinner />}
  </>
);

export default GuestBookList;
