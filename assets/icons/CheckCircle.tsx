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
      d="M13 2.167C7.02 2.167 2.167 7.02 2.167 13S7.02 23.833 13 23.833 23.834 18.98 23.834 13 18.98 2.166 13 2.166Zm-2.166 16.25L5.417 13l1.527-1.528 3.89 3.879 8.222-8.223 1.528 1.538-9.75 9.75Z"
      fill="currentColor"
    />
  </Svg>
);

export default SvgComponent;
