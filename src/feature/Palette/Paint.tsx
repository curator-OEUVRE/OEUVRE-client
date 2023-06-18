import { Canvas, RoundedRect, Shadow } from '@shopify/react-native-skia';
import { Pressable, StyleSheet } from 'react-native';
import { FloorBackgroundColor } from '@/types/floor';

const styles = StyleSheet.create({
  container: {
    height: 39,
    width: 31,
  },
});

interface PaintProps {
  selected: boolean;
  onPress: (color: FloorBackgroundColor) => void;
  color: FloorBackgroundColor;
}

const Paint = ({ selected, onPress, color }: PaintProps) => {
  const unSelectedShadow = (
    <Shadow dx={2} dy={0} blur={3} color="rgba(0, 0, 0, 0.35)" />
  );
  const selectedShadow = (
    <Shadow dx={4} dy={4} blur={4} color="rgba(0, 0, 0, 0.35)" inner />
  );
  return (
    <Pressable onPress={() => onPress(color)}>
      <Canvas style={styles.container}>
        <RoundedRect x={0} y={0} width={28} height={39} r={3} color={color}>
          {selected ? selectedShadow : unSelectedShadow}
        </RoundedRect>
      </Canvas>
    </Pressable>
  );
};

export default Paint;
