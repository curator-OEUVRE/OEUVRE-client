import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FavoriteOutlineIcon from '@/assets/icons/FavoriteOutline';
import MoreIcon from '@/assets/icons/More';
import { Header } from '@/components/Header';
import { BottomSheet } from '@/components/index';
import { COLOR } from '@/constants/styles';

export interface ImageDetailScreenParams {
  imageUri: string;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.mono.white,
    flex: 1,
  },
  image: {
    flex: 1,
  },
  more: {
    marginRight: 9,
  },
  pressable: {
    flex: 1,
    marginTop: 26,
  },
  wrapFooter: {
    height: 120,
    width: '100%',
  },
  wrapHeader: {
    width: '100%',
  },
  wrapHeaderRight: {
    flexDirection: 'row',
  },
});

const ImageDetailScreen = () => {
  const { width: windowWidth } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();
  console.log(windowWidth);
  const imageUri =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/IU_posing_for_Marie_Claire_Korea_March_2022_issue_03.jpg/500px-IU_posing_for_Marie_Claire_Korea_March_2022_issue_03.jpg';
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const wrapHeaderStyle = [styles.wrapHeader, { paddingTop: top }];
  const wrapFooterStyle = [styles.wrapFooter, { paddingBottom: bottom }];
  const headerRight = () => (
    <View style={styles.wrapHeaderRight}>
      <FavoriteOutlineIcon color={COLOR.mono.white} style={styles.more} />
      <MoreIcon color={COLOR.mono.white} />
    </View>
  );
  const renderHeader = () =>
    isEditMode ? (
      <LinearGradient
        style={wrapHeaderStyle}
        colors={['rgba(20, 23, 24, 0.5)', 'rgba(20, 23, 24, 0)']}
        locations={[0, 1]}
      >
        <Header
          iconColor={COLOR.mono.white}
          backgroundColor="transparent"
          headerRight={headerRight}
        />
      </LinearGradient>
    ) : (
      <View style={wrapHeaderStyle}>
        <Header />
      </View>
    );
  const renderFooter = () =>
    isEditMode ? (
      <LinearGradient
        style={wrapFooterStyle}
        colors={['rgba(20, 23, 24, 0)', 'rgba(20, 23, 24, 0.5)']}
        locations={[0, 1]}
      >
        <Text>hi11klqwkel</Text>
      </LinearGradient>
    ) : (
      <View style={wrapFooterStyle} />
    );
  return (
    <View style={styles.container}>
      {renderHeader()}
      <Pressable
        style={styles.pressable}
        onPress={() => {
          setEditMode((prev) => !prev);
        }}
      >
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="contain"
        />
      </Pressable>
      {renderFooter()}
    </View>
  );
};

export default ImageDetailScreen;
