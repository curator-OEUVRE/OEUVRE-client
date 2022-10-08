import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg
    width={32}
    height={32}
    fill="none"
    viewBox="0 0 32 32"
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    {...props}
  >
    <Path
      d="M16.074 9C11.615 9 8 11.868 8 15.408c0 2.289 1.51 4.293 3.785 5.432l-.819 2.944s-.015.137.073.19c.088.051.194.011.194.011.255-.036 2.942-1.937 3.412-2.267.464.067.947.101 1.435.101 4.459 0 8.074-2.868 8.074-6.408 0-3.54-3.622-6.411-8.08-6.411Z"
      fill="#141718"
    />
  </Svg>
);

export default SvgComponent;
