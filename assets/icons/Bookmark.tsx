import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Svg width={26} height={26} viewBox="0 0 26 26" fill="none" {...props}>
    <Path
      d="M18.418 3.25H7.585a2.173 2.173 0 00-2.167 2.167V22.75l7.583-3.25 7.584 3.25V5.417a2.173 2.173 0 00-2.167-2.167zm0 16.25l-5.417-2.362L7.585 19.5V5.417h10.833V19.5z"
      fill="currentColor"
    />
  </Svg>
);

export default SvgComponent;
