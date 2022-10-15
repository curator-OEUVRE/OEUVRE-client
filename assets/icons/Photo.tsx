import * as React from 'react';
import Svg, { SvgProps, Path, Circle } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <Path
      d="M23.75 6.25v17.5H6.25V6.25h17.5Zm0-2.5H6.25a2.507 2.507 0 0 0-2.5 2.5v17.5c0 1.375 1.125 2.5 2.5 2.5h17.5c1.375 0 2.5-1.125 2.5-2.5V6.25c0-1.375-1.125-2.5-2.5-2.5Zm-6.075 11.075-3.75 4.838-2.675-3.238L7.5 21.25h15l-4.825-6.425Z"
      fill="currentColor"
    />
    <Circle cx={10.961} cy={10.962} r={1.731} fill="currentColor" />
  </Svg>
);

export default SvgComponent;
