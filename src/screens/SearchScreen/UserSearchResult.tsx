import { useCallback } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  Text,
  ListRenderItemInfo,
} from 'react-native';
import SearchResultTemplate from './SearchResultTemplate';
import { searchUsers } from '@/apis/user';
import { Profile } from '@/components/Profile';
import { TEXT_STYLE } from '@/constants/styles';

interface UserResult {
  profileImageUrl: string;
  name: string;
  id: string;
  userNo: number;
}

interface UserResultItemProps extends UserResult {
  onPress?: (userNo: number) => void;
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

const UserResultItem = ({
  profileImageUrl,
  name,
  id,
  userNo,
  onPress,
}: UserResultItemProps) => (
  <Pressable
    style={styles.itemContainer}
    onPress={() => {
      onPress?.(userNo);
    }}
  >
    <Profile imageUrl={profileImageUrl} size={50} />
    <View style={styles.itemTextArea}>
      <Text style={TEXT_STYLE.body14M}>{name}</Text>
      <Text style={TEXT_STYLE.body12M}>{id}</Text>
    </View>
  </Pressable>
);

interface Props {
  keyword: string;
  onProfilePress?: (userNo: number) => void;
}

const keyExtractor = (item: UserResult) => `${item.userNo}`;

const UserSearchResult = ({ keyword, onProfilePress }: Props) => {
  const renderItem = useCallback(
    (props: ListRenderItemInfo<UserResult>) => (
      <UserResultItem {...props.item} onPress={onProfilePress} />
    ),
    [onProfilePress],
  );

  return (
    <SearchResultTemplate
      keyword={keyword}
      searchItems={searchUsers}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

export default UserSearchResult;
