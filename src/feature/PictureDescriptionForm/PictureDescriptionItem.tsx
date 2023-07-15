import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  Text,
} from 'react-native';
import Hashtag from '@/assets/icons/Hashtag';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import { Picture } from '@/types/picture';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomColor: COLOR.mono.gray2,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    flexDirection: 'row',
    height: 114,
    paddingVertical: 16,
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    paddingLeft: 20,
  },
  count: {
    color: COLOR.mono.gray4,
    marginTop: 37,
  },
  img: {
    height: 77,
    width: 77,
  },
  sideInfo: {
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    marginLeft: 12,
    width: 40,
  },
  tag: {
    color: COLOR.mono.gray5,
    marginRight: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  textInput: {
    flex: 1,
    height: '100%',
    lineHeight: 24,
    textAlignVertical: 'top',
  },
});

export interface PictureDescriptionItemProps extends Picture {
  onChangeDescription?: (Description: string) => void;
  onHashtagPress?: () => void;
}

const PictureDescriptionItem = ({
  imageUrl,
  description,
  hashtags,
  onChangeDescription,
  onHashtagPress,
}: PictureDescriptionItemProps) => (
  <View style={styles.container}>
    <Image source={{ uri: imageUrl }} style={styles.img} resizeMode="cover" />
    <View style={styles.contentContainer}>
      <TextInput
        multiline
        numberOfLines={4}
        onChangeText={onChangeDescription}
        style={[styles.textInput, TEXT_STYLE.body14R]}
        placeholder="작품의 설명을 입력해 주세요."
        maxLength={50}
        value={description}
      />
      <View style={styles.tagsContainer}>
        {hashtags.map((tag) => (
          <Text key={tag} style={[TEXT_STYLE.body14R, styles.tag]}>
            {tag}
          </Text>
        ))}
      </View>
    </View>

    <View style={styles.sideInfo}>
      <Pressable onPress={onHashtagPress}>
        <Hashtag />
      </Pressable>
      {description.length > 0 && (
        <Text style={styles.count}>{50 - description.length}</Text>
      )}
    </View>
  </View>
);

export default PictureDescriptionItem;
