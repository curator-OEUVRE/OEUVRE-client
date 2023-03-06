import * as React from 'react';
import Svg, { Rect, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
    <Rect width={20} height={20} rx={2} fill="#7B7F82" />
  </Svg>
);

export default SvgComponent;
