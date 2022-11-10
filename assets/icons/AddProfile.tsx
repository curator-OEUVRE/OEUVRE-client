import * as React from 'react';
import Svg, {
  SvgProps,
  Circle,
  Mask,
  G,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={90} height={90} fill="none" viewBox="0 0 90 90" {...props}>
    <Circle cx={45} cy={45} r={45} fill="url(#a)" />
    <Circle cx={45.343} cy={34.351} r={15.802} fill="#7B7F82" />
    <Mask
      id="b"
      style={{
        maskType: 'alpha',
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={90}
      height={90}
    >
      <Circle cx={45} cy={45} r={45} fill="#ECF1F0" />
    </Mask>
    <G mask="url(#b)">
      <Circle cx={45.343} cy={85.878} r={32.29} fill="#7B7F82" />
    </G>
    <Defs>
      <LinearGradient
        id="a"
        x1={45}
        y1={0}
        x2={45}
        y2={90}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#A7A9AB" />
        <Stop offset={1} stopColor="#D3D4D5" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default SvgComponent;
