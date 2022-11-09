import * as React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Circle cx={11.8} cy={11.56} r={11.52} fill="#fff" />
    <Path
      d="M11.8.04C5.441.04.28 5.201.28 11.56c0 6.36 5.161 11.52 11.52 11.52 6.36 0 11.52-5.16 11.52-11.52C23.32 5.201 18.16.04 11.8.04Zm5.76 12.672h-4.608v4.608h-2.304v-4.608H6.04v-2.304h4.608V5.8h2.304v4.608h4.608v2.304Z"
      fill="currentColor"
    />
  </Svg>
);

export default SvgComponent;
