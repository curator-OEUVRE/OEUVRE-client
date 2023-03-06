import { useCallback } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  Text,
  ListRenderItemInfo,
} from 'react-native';
import SearchResultTemplate from './SearchResultTemplate';
import { searchHashtags } from '@/apis/hashtag';
import HashtagIcon from '@/assets/icons/NormalHashtag';
import { COLOR, TEXT_STYLE } from '@/constants/styles';

interface HashtagResult {
  hashtag: string;
  hashtagNo: number;
}

interface HashtagResultItemProps extends HashtagResult {
  onPress?: (hashtagNo: number, hashtag: string) => void;
}

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    marginBottom: 12,
  },
  itemTextArea: {
    marginLeft: 12,
  },
});

const HashtagResultItem = ({
  hashtag,
  hashtagNo,
  onPress,
}: HashtagResultItemProps) => (
  <Pressable
    style={styles.itemContainer}
    onPress={() => {
      onPress?.(hashtagNo, hashtag);
    }}
  >
    <HashtagIcon width={36} height={36} color={COLOR.mono.gray3} />
    <View style={styles.itemTextArea}>
      <Text style={TEXT_STYLE.body14M}>
        {hashtag[0] === '#' ? hashtag.slice(1) : hashtag}
      </Text>
    </View>
  </Pressable>
);

interface Props {
  keyword: string;
  onHashtagPress?: (hashtagNo: number, hashtag: string) => void;
}

const keyExtractor = (item: HashtagResult, index: number) =>
  `search_${index}_${item.hashtagNo}`;

const HashtagSearchResult = ({ keyword, onHashtagPress }: Props) => {
  const renderItem = useCallback(
    (props: ListRenderItemInfo<HashtagResult>) => (
      <HashtagResultItem {...props.item} onPress={onHashtagPress} />
    ),
    [onHashtagPress],
  );

  return (
    <SearchResultTemplate
      keyword={keyword}
      renderItem={renderItem}
      searchItems={searchHashtags}
      keyExtractor={keyExtractor}
    />
  );
};

export default HashtagSearchResult;
