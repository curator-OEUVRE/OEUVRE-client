import FastImage from 'react-native-fast-image';
import AddProfileIcon from '@/assets/icons/AddProfile';
import { COLOR } from '@/constants/styles';

interface ProfileProps {
  imageUrl: string;
  size?: number;
}

const Profile = ({ imageUrl, size = 125 }: ProfileProps) =>
  imageUrl ? (
    <FastImage
      // eslint-disable-next-line react/jsx-props-no-spreading
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
      }}
      source={{ uri: imageUrl }}
    />
  ) : (
    <AddProfileIcon width={size} height={size} color={COLOR.mono.gray3} />
  );

export { Profile };
