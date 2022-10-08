import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg
    width={335}
    height={2}
    fill="none"
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    {...props}
  >
    <Path d="M1 1h333" stroke="#E9EAEA" strokeLinecap="round" />
  </Svg>
);

export default SvgComponent;
