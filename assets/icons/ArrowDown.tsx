import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={26} height={26} viewBox="0 0 26 26" fill="none" {...props}>
    <Path
      d="M3.515 6.403L1.598 8.332l10.725 10.714L23.048 8.32 21.13 6.403l-8.807 8.808-8.808-8.808z"
      fill="#D3D4D5"
    />
  </Svg>
);

export default SvgComponent;
