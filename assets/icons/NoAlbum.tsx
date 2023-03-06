import * as React from 'react';
import Svg, { Rect, Path, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
    <Rect
      x={1}
      y={1}
      width={18}
      height={18}
      rx={1}
      fill="#fff"
      stroke="#D3D4D5"
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <Path
      d="M1.5 2L18 18.5"
      stroke="#D3D4D5"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

export default SvgComponent;
