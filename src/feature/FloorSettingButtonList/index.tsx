/* eslint-disable react-native/no-color-literals */
import { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import AlbumIcon from '@/assets/icons/Album';
import NoAlbumIcon from '@/assets/icons/NoAlbum';
import PaletteIcon from '@/assets/icons/Palette';
import BottomAlignmentIcon from '@/assets/icons/align/Bottom';
import CenterAlignmentIcon from '@/assets/icons/align/Center';
import TopAlignmentIcon from '@/assets/icons/align/Top';
import BottomGradientIcon from '@/assets/icons/gradient/Bottom';
import FullGradientIcon from '@/assets/icons/gradient/Full';
import TopGradientIcon from '@/assets/icons/gradient/Top';
import { IconButton } from '@/components';
import { IMAGE } from '@/constants/images';
import { COLOR } from '@/constants/styles';
import { FLOOR_BACKGROUND_COLORS } from '@/constants/styles/colors';
import { FloorAlignment, FloorGradient, FloorSetting } from '@/types/floor';

interface FloorSettingButtonListProps extends FloorSetting {
  onChange?: (setting: Partial<FloorSetting>) => void;
}

const AlignmentIconMap = {
  [FloorAlignment.TOP]: <TopAlignmentIcon />,
  [FloorAlignment.CENTER]: <CenterAlignmentIcon />,
  [FloorAlignment.BOTTOM]: <BottomAlignmentIcon />,
};

const NextAlignmentMap = {
  [FloorAlignment.TOP]: FloorAlignment.CENTER,
  [FloorAlignment.CENTER]: FloorAlignment.BOTTOM,
  [FloorAlignment.BOTTOM]: FloorAlignment.TOP,
};

const GradientIconMap = {
  [FloorGradient.FULL]: <FullGradientIcon />,
  [FloorGradient.TOP]: <TopGradientIcon />,
  [FloorGradient.BOTTOM]: <BottomGradientIcon />,
};

const NextGradientMap = {
  [FloorGradient.FULL]: FloorGradient.TOP,
  [FloorGradient.TOP]: FloorGradient.BOTTOM,
  [FloorGradient.BOTTOM]: FloorGradient.FULL,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 40,
    width: 184,
  },
  inner: {
    backgroundColor: COLOR.mono.white,
    borderRadius: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    minHeight: 40,
    paddingHorizontal: 18,
    paddingVertical: 5,
    width: '100%',
  },
  marginRight: {
    marginRight: 8,
  },
  overay: {
    backgroundColor: 'transparent',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  paint: {
    marginRight: 5,
  },
  selectorBase: {
    left: '50%',
    position: 'absolute',
  },
  selectorLandScape: {
    marginLeft: -239,
    top: 55,
    width: 478,
  },
  selectorPortrait: {
    marginLeft: -126,
    top: 159,
    width: 252,
  },
});

const FloorSettingButtonList = ({
  isFramed,
  alignment,
  gradient,
  onChange,
}: FloorSettingButtonListProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const renderPaint = () =>
    FLOOR_BACKGROUND_COLORS.map((backgroundColor) => (
      <Pressable
        onPress={() => onChange?.({ color: backgroundColor })}
        key={`Paint_${backgroundColor}`}
      >
        <Image source={IMAGE.paint[backgroundColor]} style={styles.paint} />
      </Pressable>
    ));
  const { width, height } = useWindowDimensions();
  const SelectModal = (
    <Modal visible={visible} transparent>
      <Pressable onPress={() => setVisible(false)} style={styles.overay} />
      <View
        style={[
          styles.selectorBase,
          width > height ? styles.selectorLandScape : styles.selectorPortrait,
        ]}
      >
        <Shadow
          distance={1}
          offset={[1, 1]}
          startColor="#00000020"
          endColor="#00000000"
        >
          <View style={styles.inner}>{renderPaint()}</View>
        </Shadow>
      </View>
    </Modal>
  );
  return (
    <View style={styles.container}>
      {SelectModal}
      <IconButton
        icon={AlignmentIconMap[alignment]}
        style={styles.marginRight}
        onPress={() => onChange?.({ alignment: NextAlignmentMap[alignment] })}
      />
      <IconButton
        icon={<PaletteIcon color={COLOR.mono.gray5} />}
        style={styles.marginRight}
        onPress={() => setVisible(true)}
      />
      <IconButton
        icon={GradientIconMap[gradient]}
        style={styles.marginRight}
        onPress={() => onChange?.({ gradient: NextGradientMap[gradient] })}
      />
      <IconButton
        icon={isFramed ? <AlbumIcon /> : <NoAlbumIcon />}
        style={styles.marginRight}
      />
    </View>
  );
};

export default FloorSettingButtonList;
