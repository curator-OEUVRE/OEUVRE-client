import { useCallback } from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  useWindowDimensions,
  type ListRenderItemInfo,
  FlatList,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import type { PictureByHashtag, HashtagInfo } from '@/apis/hashtag';
import { Profile } from '@/components/Profile';
import { COLOR, TEXT_STYLE } from '@/constants/styles';

interface PictureListItemProps extends PictureByHashtag {
  onPress?: (pictureNo: number) => void;
  onProfilePress?: (userNo: number) => void;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  hashtag: {
    marginBottom: 16,
    marginLeft: 2,
  },
  hashtagContainer: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  pictureListItemContainer: {
    marginRight: 8,
  },
  profileArea: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 4,
  },
  profileText: {
    marginLeft: 4,
  },
  sharp: {
    color: COLOR.mono.gray3,
  },
});

const PictureListItem = ({
  imageUrl,
  width,
  height,
  profileImageUrl,
  id,
  pictureNo,
  userNo,
  onPress,
  onProfilePress,
}: PictureListItemProps) => {
  const deviceSize = useWindowDimensions();

  return (
    <Pressable
      onPress={() => {
        onPress?.(pictureNo);
      }}
      style={styles.pictureListItemContainer}
    >
      <FastImage
        source={{ uri: imageUrl }}
        style={{
          width: (width * deviceSize.height * 0.15) / height,
          height: deviceSize.height * 0.15,
        }}
      />
      <Pressable
        onPress={() => {
          onProfilePress?.(userNo);
        }}
        style={styles.profileArea}
      >
        <Profile imageUrl={profileImageUrl} size={18} />
        <Text style={[TEXT_STYLE.body12R, styles.profileText]}>{id}</Text>
      </Pressable>
    </Pressable>
  );
};

interface Props extends HashtagInfo {
  onPress?: (hashtagNo: number, hashtag: string) => void;
  onPicturePress?: (pictureNo: number) => void;
  onProfilePress?: (userNo: number) => void;
}

const keyExtractor = (item: PictureByHashtag) => `${item.pictureNo}`;

const HashtagListItem = ({
  hashtag,
  hashtagNo,
  pictures,
  onPress,
  onPicturePress,
  onProfilePress,
}: Props) => {
  const renderItem = useCallback(
    (props: ListRenderItemInfo<PictureByHashtag>) => (
      <PictureListItem
        {...props.item}
        onPress={onPicturePress}
        onProfilePress={onProfilePress}
      />
    ),
    [onPicturePress, onProfilePress],
  );

  return (
    <Pressable
      onPress={() => {
        onPress?.(hashtagNo, hashtag);
      }}
      style={styles.container}
    >
      <View style={styles.hashtagContainer}>
        <Text style={[TEXT_STYLE.button16M, styles.sharp]}>#</Text>
        <Text style={[TEXT_STYLE.button16M, styles.hashtag]}>
          {hashtag[0] === '#' ? hashtag.slice(1) : hashtag}
        </Text>
      </View>

      <FlatList
        data={pictures}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        maxToRenderPerBatch={5}
        initialNumToRender={5}
        windowSize={5}
        horizontal
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
      />
    </Pressable>
  );
};

export default HashtagListItem;
