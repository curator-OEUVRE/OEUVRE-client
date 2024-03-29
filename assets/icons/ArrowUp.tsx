import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={26} height={26} viewBox="0 0 26 26" fill="none" {...props}>
    <Path
      d="M5.502 15.063l6.688-6.838c.229-.246.501-.36.809-.36.308 0 .589.122.817.36l6.68 6.838c.194.193.299.439.299.729a1.03 1.03 0 01-1.037 1.046c-.281 0-.554-.106-.756-.317l-5.994-6.16-6.012 6.16a1.042 1.042 0 01-.756.317 1.03 1.03 0 01-1.037-1.046c0-.281.106-.536.299-.73z"
      fill="#D3D4D5"
    />
  </Svg>
);

export default SvgComponent;
