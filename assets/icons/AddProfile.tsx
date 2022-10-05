import * as React from 'react';
import Svg, {
  Circle,
  Mask,
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  SvgProps,
} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg
    width={142}
    height={125}
    viewBox="0 0 142 125"
    fill="none"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  >
    <Circle cx={62.5} cy={62.5} r={62.5} fill="url(#paint0_linear_926_12544)" />
    <Circle cx={62.9768} cy={47.7097} r={21.9466} fill="#9AB2B5" />
    <Mask
      id="a"
      style={{
        maskType: 'alpha',
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={125}
      height={125}
    >
      <Circle cx={62.5} cy={62.5} r={62.5} fill="#ECF1F0" />
    </Mask>
    <G mask="url(#a)">
      <Circle cx={62.9771} cy={119.275} r={44.8473} fill="#9AB2B5" />
    </G>
    <Circle cx={114.5} cy={97.5} r={21.1538} fill="#fff" />
    <Path
      d="M114.5 74.583c-12.65 0-22.917 10.267-22.917 22.917 0 12.65 10.267 22.917 22.917 22.917 12.65 0 22.917-10.267 22.917-22.917 0-12.65-10.267-22.917-22.917-22.917zm11.458 25.209h-9.166v9.166h-4.584v-9.166h-9.166v-4.584h9.166v-9.166h4.584v9.166h9.166v4.584z"
      fill="#6FA1A7"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_926_12544"
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
