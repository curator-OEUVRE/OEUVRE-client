import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={26} height={26} viewBox="0 0 26 26" fill="none" {...props}>
    <Path
      d="M6.499 10.833A2.173 2.173 0 004.332 13c0 1.191.975 2.166 2.167 2.166A2.173 2.173 0 008.665 13 2.173 2.173 0 006.5 10.833zm13 0A2.173 2.173 0 0017.332 13c0 1.191.975 2.166 2.167 2.166A2.173 2.173 0 0021.665 13a2.173 2.173 0 00-2.166-2.167zm-6.5 0A2.173 2.173 0 0010.832 13c0 1.191.975 2.166 2.167 2.166A2.173 2.173 0 0015.165 13 2.173 2.173 0 0013 10.833z"
      fill="currentColor"
    />
  </Svg>
);

export default SvgComponent;
