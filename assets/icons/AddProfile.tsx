import * as React from 'react';
import Svg, {
  Circle,
  Mask,
  G,
  Defs,
  LinearGradient,
  SvgProps,
  Stop,
} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg
    width={125}
    height={125}
    viewBox="0 0 125 125"
    fill="none"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  >
    <Circle cx={62.5} cy={62.5} r={62.5} fill="url(#paint0_linear_926_12289)" />
    <Circle cx={62.9768} cy={47.7097} r={21.9466} fill="#9AB2B5" />
    <Mask
      id="a"
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={125}
      height={125}
    >
      <Circle cx={62.5} cy={62.5} r={62.5} fill="#ECF1F0" />
    </Mask>
    <G mask="url(#a)">
      <Circle cx={62.9772} cy={119.275} r={44.8473} fill="#9AB2B5" />
    </G>
    <Defs>
      <LinearGradient
        id="paint0_linear_926_12289"
        x1={62.5}
        y1={0}
        x2={62.5}
        y2={125}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#CCDCDE" />
        <Stop offset={1} stopColor="#ECF1F0" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default SvgComponent;
