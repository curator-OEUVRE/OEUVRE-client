import { useState, useCallback, useEffect } from 'react';
import { getFloors } from '@/apis/floor';
import FloorList from '@/feature/FloorList';
import useAuth from '@/hooks/useAuth';
import type { FloorMini } from '@/types/floor';

interface Props {
  floors: FloorMini[];
  userNo: number;
  setFloors: (newFloors: FloorMini[]) => void;
  onDragEnd?: (newFloors: FloorMini[]) => void;
}

const WrappedFloorList = ({ floors, userNo, setFloors, onDragEnd }: Props) => {
  const { fetchWithToken } = useAuth();

  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function init() {
      const response = await fetchWithToken(getFloors, {
        page: 1,
        size: 10,
        userNo,
      });
      if (response.isSuccess) {
        setFloors(response.result.result.contents);
        setPage(1);
      }
    }

    // `floors`가 비어 있을 때만 init
    if (floors.length === 0) init();
    // 필요할 때만 실행시키기 위해 eslint 무시
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [floors.length]);

  const loadMoreFloors = useCallback(async () => {
    const response = await fetchWithToken(getFloors, {
      page: page + 1,
      size: 10,
      userNo,
    });
    if (response.isSuccess) {
      setFloors([...floors, ...response.result.result.contents]);
      setPage((prev) => prev + 1);
    } else {
      console.error(response.result);
    }
  }, [page, fetchWithToken, floors, setFloors, userNo]);

  const refreshFloors = useCallback(async () => {
    setRefreshing(true);

    const response = await fetchWithToken(getFloors, {
      page: 1,
      size: 10,
      userNo,
    });
    if (response.isSuccess) {
      setPage(1);
      setFloors(response.result.result.contents);
    } else {
      console.error(response.result);
    }

    setRefreshing(false);
  }, [fetchWithToken, setFloors, userNo]);

  return (
    <FloorList
      floors={floors}
      onDragEnd={onDragEnd}
      editable={!!onDragEnd}
      onEndReached={loadMoreFloors}
      refreshing={refreshing}
      onRefresh={refreshFloors}
    />
  );
};

export default WrappedFloorList;
