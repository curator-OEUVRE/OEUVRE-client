import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={26} height={26} viewBox="0 0 26 26" fill="none" {...props}>
    <Path
      d="M7.23 15.535l5.143-5.258a.818.818 0 01.622-.277c.237 0 .453.095.629.277l5.136 5.258a.77.77 0 01.23.561.792.792 0 01-.797.805.797.797 0 01-.582-.244l-4.61-4.738-4.622 4.738a.801.801 0 01-.581.244.792.792 0 01-.798-.805c0-.216.081-.412.23-.56z"
      fill="#D3D4D5"
    />
  </Svg>
);

export default SvgComponent;
