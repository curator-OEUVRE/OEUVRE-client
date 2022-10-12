import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <Path
      d="M15 27.188c1.375 0 2.5-1.125 2.5-2.5h-5c0 1.375 1.125 2.5 2.5 2.5Zm7.5-7.5v-6.25c0-3.838-2.038-7.05-5.625-7.9v-.85A1.872 1.872 0 0 0 15 2.813a1.872 1.872 0 0 0-1.875 1.874v.85c-3.575.85-5.625 4.05-5.625 7.9v6.25l-2.5 2.5v1.25h20v-1.25l-2.5-2.5Zm-2.5 1.25H10v-7.5c0-3.1 1.887-5.626 5-5.626s5 2.526 5 5.625v7.5Z"
      fill="currentColor"
    />
  </Svg>
);

export default SvgComponent;
