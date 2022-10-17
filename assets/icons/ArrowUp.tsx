import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={26} height={26} viewBox="0 0 26 26" fill="none" {...props}>
    <Path
      d="M21.13 19.046l1.917-1.928L12.322 6.402 1.597 17.128l1.917 1.918 8.808-8.808 8.807 8.808z"
      fill="#D3D4D5"
    />
  </Svg>
);

export default SvgComponent;
