import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={60} height={85} fill="none" viewBox="0 0 60 85" {...props}>
    <Path
      d="M3.893 11.736A5 5 0 0 0 0 16.612v51.776a5 5 0 0 0 3.893 4.876l50 11.35c3.129.71 6.107-1.668 6.107-4.876V5.262c0-3.208-2.978-5.586-6.107-4.876l-50 11.35Z"
      fill="currentColor"
    />
  </Svg>
);

export default SvgComponent;
