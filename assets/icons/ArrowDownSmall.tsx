import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={26} height={26} viewBox="0 0 26 26" fill="none" {...props}>
    <Path
      d="M12.995 16.907a.864.864 0 00.629-.283l5.136-5.259a.77.77 0 00.23-.56.796.796 0 00-.797-.805.825.825 0 00-.582.243l-4.61 4.738-4.622-4.738A.841.841 0 007.798 10a.796.796 0 00-.798.804.77.77 0 00.23.561l5.143 5.259c.183.189.385.283.622.283z"
      fill="#D3D4D5"
    />
  </Svg>
);

export default SvgComponent;
