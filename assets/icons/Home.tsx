import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <Path
      d="M12.497 24.16v-6.25h5v6.25c0 .687.563 1.25 1.25 1.25h3.75c.688 0 1.25-.563 1.25-1.25v-8.75h2.125c.575 0 .85-.713.413-1.088L15.835 4.91a1.26 1.26 0 0 0-1.675 0L3.71 14.322c-.425.375-.163 1.088.412 1.088h2.125v8.75c0 .687.563 1.25 1.25 1.25h3.75c.688 0 1.25-.563 1.25-1.25Z"
      fill="currentColor"
    />
  </Svg>
);

export default SvgComponent;
