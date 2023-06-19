/* eslint-disable react-native/no-color-literals */
import { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import Palette from '../Palette';
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
import { COLOR } from '@/constants/styles';
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
  selectorBase: {
    left: '50%',
    marginLeft: -171.5,
    position: 'absolute',
  },
});

const FloorSettingButtonList = ({
  isFramed,
  alignment,
  gradient,
  color,
  onChange,
}: FloorSettingButtonListProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const bottom = isLandscape ? 69 : 100;
  const SelectModal = (
    <Modal
      visible={visible}
      transparent
      supportedOrientations={['portrait', 'landscape']}
    >
      <Pressable onPress={() => setVisible(false)} style={styles.overay} />
      <View style={[styles.selectorBase, { bottom }]}>
        <Palette
          onSelected={(backgroundColor) =>
            onChange?.({ color: backgroundColor })
          }
          selectedColor={color}
        />
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
