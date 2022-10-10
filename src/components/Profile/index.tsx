import { Image } from 'react-native';

interface ProfileProps {
  imageUrl: string;
  size?: number;
}

const Profile = ({ imageUrl, size = 125 }: ProfileProps) => (
  <Image
    // eslint-disable-next-line react/jsx-props-no-spreading
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
    }}
    source={{ uri: imageUrl }}
  />
);

export { Profile };
