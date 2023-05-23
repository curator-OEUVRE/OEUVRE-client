import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
    <Path
      d="M10.7 14.949a.519.519 0 00.242-.137l3.405-3.405a.52.52 0 000-.735l-1.17-1.17a.52.52 0 00-.734 0l-3.405 3.406a.52.52 0 00-.137.242l-.388 1.558a.52.52 0 00.63.629l1.557-.388z"
      stroke="#7B7F82"
      strokeWidth={1.03846}
      strokeLinejoin="round"
    />
    <Path
      d="M6.228 14.848H2.154c-.765 0-1.384-.62-1.384-1.385V2.462c0-.765.62-1.385 1.384-1.385h9.513c.764 0 1.384.62 1.384 1.385V7.28M4.121 4.427h5.583M4.121 7.032h5.583M4.121 9.638H7.1"
      stroke="#7B7F82"
      strokeWidth={1.03846}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SvgComponent;
