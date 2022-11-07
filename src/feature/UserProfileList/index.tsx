import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Profile } from '@/components';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import { LikeUser } from '@/types/picture';

interface UserItemProps {
  data: LikeUser;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: COLOR.mono.black,
    marginLeft: 12,
  },
  userItem: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    marginBottom: 8,
    paddingHorizontal: 20,
    width: '100%',
  },
});

const UserItem = ({ data }: UserItemProps) => {
  const { profileImageUrl, id } = data;
  return (
    <View style={styles.userItem}>
      <Profile imageUrl={profileImageUrl} size={50} />
      <Text style={[styles.text, TEXT_STYLE.body14R]}>{id}</Text>
    </View>
  );
};

interface UserProfileListProps {
  data: LikeUser[];
}

const keyExtractor = (item: LikeUser) => item.id;

const UserProfileList = ({ data }: UserProfileListProps) => (
  <FlatList
    style={styles.container}
    data={data}
    renderItem={({ item }) => <UserItem data={item} />}
    keyExtractor={keyExtractor}
  />
);

export default UserProfileList;
