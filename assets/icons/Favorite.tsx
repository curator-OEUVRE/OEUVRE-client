import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={26} height={26} viewBox="0 0 26 26" fill="none" {...props}>
    <Path
      d="M13.001 22.94l-1.57-1.43c-5.58-5.06-9.263-8.396-9.263-12.491 0-3.337 2.622-5.958 5.958-5.958 1.885 0 3.694.877 4.875 2.264 1.181-1.387 2.99-2.264 4.875-2.264 3.337 0 5.959 2.621 5.959 5.958 0 4.095-3.684 7.432-9.263 12.501l-1.57 1.42z"
      fill="currentColor"
    />
  </Svg>
);

export default SvgComponent;
