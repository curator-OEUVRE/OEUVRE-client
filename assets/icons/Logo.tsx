import * as React from 'react';
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  SvgProps,
} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg
    width={112}
    height={79}
    viewBox="0 0 112 79"
    fill="none"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  >
    <Path
      d="M72.348 11.827a3 3 0 012.319 2.921v49.504a3 3 0 01-2.32 2.921L25.296 78.142a3 3 0 01-3.68-2.922V3.78a3 3 0 013.68-2.922l47.053 10.969z"
      fill="url(#paint0_linear_926_12352)"
    />
    <Path
      d="M1.35 69.54A3 3 0 010 67.034V11.966A3 3 0 011.35 9.46l9.72-6.399c1.994-1.313 4.65.118 4.65 2.506v67.866c0 2.388-2.656 3.819-4.65 2.506l-9.72-6.4z"
      fill="url(#paint1_linear_926_12352)"
    />
    <Path
      d="M82.388 66.421a3 3 0 01-1.827-2.76V15.34a3 3 0 011.827-2.761l25.439-10.806c1.978-.84 4.173.611 4.173 2.76v69.933c0 2.15-2.195 3.602-4.173 2.761L82.388 66.421z"
      fill="url(#paint2_linear_926_12352)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_926_12352"
        x1={48.0313}
        y1={13.1667}
        x2={48.0313}
        y2={79}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#fff" />
        <Stop offset={1} stopColor="#fff" stopOpacity={0} />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_926_12352"
        x1={0}
        y1={68.7593}
        x2={0.00000174102}
        y2={0.0000136668}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#fff" />
        <Stop offset={1} stopColor="#fff" stopOpacity={0} />
      </LinearGradient>
      <LinearGradient
        id="paint2_linear_926_12352"
        x1={80.7796}
        y1={66.1991}
        x2={80.7796}
        y2={0.0000110531}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#fff" />
        <Stop offset={1} stopColor="#fff" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default SvgComponent;
