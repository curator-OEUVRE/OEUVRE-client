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
    <Rect width={20} height={20} rx={2} fill="url(#paint0_linear_6878_3030)" />
    <Defs>
      <LinearGradient
        id="paint0_linear_6878_3030"
        x1={10}
        y1={0}
        x2={10}
        y2={20}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#7B7F82" />
        <Stop offset={0.200556} stopColor="#7B7F82" stopOpacity={0.4} />
        <Stop offset={0.401308} stopColor="#7B7F82" stopOpacity={0.1} />
        <Stop offset={0.498412} stopColor="#7B7F82" stopOpacity={0} />
        <Stop offset={0.599974} stopColor="#7B7F82" stopOpacity={0.1} />
        <Stop offset={0.801994} stopColor="#7B7F82" stopOpacity={0.4} />
        <Stop offset={1} stopColor="#7B7F82" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default SvgComponent;
