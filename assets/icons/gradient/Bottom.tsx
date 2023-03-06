import * as React from 'react';
import Svg, {
  Rect,
  Defs,
  LinearGradient,
  Stop,
  SvgProps,
} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
    <Rect width={20} height={20} rx={2} fill="url(#paint0_linear_4316_70058)" />
    <Defs>
      <LinearGradient
        id="paint0_linear_4316_70058"
        x1={10}
        y1={0}
        x2={10}
        y2={20}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#7B7F82" stopOpacity={0} />
        <Stop offset={1} stopColor="#7B7F82" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default SvgComponent;
