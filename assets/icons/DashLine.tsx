import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={2} height={162} fill="none" viewBox="0 0 2 162" {...props}>
    <Path
      d="M1 1v160"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeDasharray="5 10"
    />
  </Svg>
);

export default SvgComponent;
