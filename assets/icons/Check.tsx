import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={26} height={26} viewBox="0 0 26 26" fill="none" {...props}>
    <Path
      d="M9.528 17.198L5.011 12.68l-1.538 1.528 6.055 6.056 13-13-1.527-1.528L9.528 17.198z"
      fill="currentColor"
    />
  </Svg>
);

export default SvgComponent;
