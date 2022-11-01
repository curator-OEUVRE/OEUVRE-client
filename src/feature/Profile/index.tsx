import {
  View,
  Image,
  StyleSheet,
  Text,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import PencilIcon from '@/assets/icons/Pencil';
import { COLOR, TEXT_STYLE } from '@/constants/styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 98,
    paddingHorizontal: 20,
    width: '100%',
  },
  idText: {
    color: COLOR.mono.gray4,
  },
  introduceMessageText: {
    color: COLOR.mono.gray7,
    marginTop: 4,
  },
  nameArea: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  nameText: {
    color: COLOR.mono.gray7,
  },
  profileContent: {
    paddingTop: 25,
  },
  profileImage: {
    borderRadius: 45,
    height: 90,
    marginRight: 12,
    width: 90,
  },
});

interface Props {
  profileImageUrl: string;
  name: string;
  id: string;
  introduceMessage?: string;
  style?: StyleProp<ViewStyle>;
  onEditPress?: () => void;
}

const Profile = ({
  profileImageUrl,
  name,
  id,
  introduceMessage,
  style,
  onEditPress,
}: Props) => (
  <View style={[styles.container, style]}>
    <Image style={styles.profileImage} source={{ uri: profileImageUrl }} />
    <View style={styles.profileContent}>
      <View style={styles.nameArea}>
        <Text style={[TEXT_STYLE.body14B, styles.nameText]}>{name}</Text>
        <Pressable onPress={onEditPress}>
          <PencilIcon color={COLOR.mono.gray3} />
        </Pressable>
      </View>
      <Text style={[TEXT_STYLE.body14R, styles.idText]}>{id}</Text>
      {introduceMessage && (
        <Text style={[TEXT_STYLE.body12M, styles.introduceMessageText]}>
          {introduceMessage}
        </Text>
      )}
    </View>
  </View>
);

export default Profile;
