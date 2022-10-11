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
import { PictureInfo } from '@/states/createFloorStore';

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
  textInput: {
    flex: 1,
    height: '100%',
    lineHeight: 24,
    paddingLeft: 20,
    textAlignVertical: 'top',
  },
});

export interface PictureDescriptionItemProps extends PictureInfo {
  onChangeDescription?: (Description: string) => void;
}

const PictureDescriptionItem = ({
  imageUri,
  description,
  onChangeDescription,
}: PictureDescriptionItemProps) => (
  <View style={styles.container}>
    <Image source={{ uri: imageUri }} style={styles.img} resizeMode="center" />
    <TextInput
      multiline
      numberOfLines={4}
      onChangeText={onChangeDescription}
      style={[styles.textInput, TEXT_STYLE.body14R]}
      placeholder={'작품의 설명을 입력해 주세요.\n(총 50자)'}
      maxLength={50}
      value={description}
    />
    <View style={styles.sideInfo}>
      <Pressable>
        <Hashtag />
      </Pressable>
      {description.length > 0 && (
        <Text style={styles.count}>{description.length}/50</Text>
      )}
    </View>
  </View>
);

export default PictureDescriptionItem;
