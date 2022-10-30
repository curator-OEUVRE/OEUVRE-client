import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={26} height={26} viewBox="0 0 26 26" fill="none" {...props}>
    <Path
      d="M13.01 12.575c1.916 0 3.542-1.705 3.542-3.91 0-2.154-1.635-3.807-3.542-3.807-1.916 0-3.56 1.68-3.551 3.824 0 2.188 1.626 3.893 3.55 3.893zM7.525 20.75h10.952c1.45 0 1.95-.44 1.95-1.248 0-2.259-2.864-5.37-7.426-5.37-4.553 0-7.427 3.111-7.427 5.37 0 .809.501 1.248 1.951 1.248z"
      fill="#141718"
    />
  </Svg>
);

export default SvgComponent;
