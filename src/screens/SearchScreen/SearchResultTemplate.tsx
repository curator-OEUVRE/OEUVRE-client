import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, FlatList, ListRenderItemInfo } from 'react-native';
import type { ApiResult } from '@/apis/common';
import useAuth from '@/hooks/useAuth';
import type { ResponseDto, SearchRequestDto } from '@/types/common';

const styles = StyleSheet.create({
  contentContainer: {
    marginHorizontal: 20,
    paddingTop: 24,
  },
});

interface Props<Item> {
  keyword: string;
  searchItems: (
    accessToken: string,
    params: SearchRequestDto,
  ) => ApiResult<
    ResponseDto<{
      contents: Item[];
      isLastPage: boolean;
    }>
  >;
  renderItem: (props: ListRenderItemInfo<Item>) => JSX.Element;
  keyExtractor: (item: Item, index: number) => string;
}

const SearchResultTemplate = <Item,>({
  keyword,
  searchItems,
  renderItem,
  keyExtractor,
}: Props<Item>) => {
  const [data, setData] = useState<Item[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const { fetchWithToken } = useAuth();

  const refresh = useCallback(async () => {
    setRefreshing(true);

    const response = await fetchWithToken(searchItems, {
      keyword,
      page: 0,
      size: 10,
    });
    if (response.isSuccess) {
      setPage(0);
      setData(response.result.result.contents);
      setIsLastPage(false);
    } else {
      console.error(response.result);
    }

    setRefreshing(false);
  }, [keyword, searchItems, fetchWithToken]);

  const loadMoreData = useCallback(async () => {
    if (isLastPage) return;

    const response = await fetchWithToken(searchItems, {
      keyword,
      page: page + 1,
      size: 20,
    });
    if (response.isSuccess) {
      setPage((prev) => prev + 1);
      setData((prev) => [...prev, ...response.result.result.contents]);
      setIsLastPage(response.result.result.isLastPage);
    } else {
      console.error(response.result);
    }
  }, [keyword, fetchWithToken, page, searchItems, isLastPage]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      refreshing={refreshing}
      onRefresh={refresh}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.2}
      maxToRenderPerBatch={10}
      initialNumToRender={10}
      windowSize={10}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={keyExtractor}
    />
  );
};

export default SearchResultTemplate;
