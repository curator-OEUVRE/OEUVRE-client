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
      stroke="#7B7F82"
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <Path
      fill="#fff"
      stroke="#7B7F82"
      strokeLinejoin="round"
      d="M3.5 3.5H16.5V16.5H3.5z"
    />
  </Svg>
);

export default SvgComponent;
