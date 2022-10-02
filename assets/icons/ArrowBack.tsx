import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg
    width={26}
    height={26}
    fill="none"
    viewBox="0 0 26 26"
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    {...props}
  >
    <Path
      d="M12.6425 1.9175L10.7142 0L0 10.725L10.725 21.45L12.6425 19.5325L3.835 10.725L12.6425 1.9175Z"
      fill="currentColor"
    />
  </Svg>
);

export default SvgComponent;
