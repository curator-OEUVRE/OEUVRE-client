import * as React from 'react';
import Svg, { G, Circle, Path, Defs, SvgProps } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const SvgComponent = (props: SvgProps) => (
  <Svg width={50} height={50} viewBox="0 0 50 50" fill="none" {...props}>
    <Circle cx={25} cy={25} r={20} fill="#fff" fillOpacity={0.72} />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 18.676C20 17.198 21.07 16 22.391 16h5.218C28.929 16 30 17.198 30 18.676v12.648C30 32.802 28.93 34 27.609 34H22.39C21.071 34 20 32.802 20 31.324V18.676zm2.391-1.216c-.6 0-1.087.544-1.087 1.216v12.648c0 .672.487 1.216 1.087 1.216h5.218c.6 0 1.087-.544 1.087-1.216V18.676c0-.672-.487-1.216-1.087-1.216H22.39zM16.07 16.945c-1.777 1.484-2.912 4.097-3.055 6.868-.143 2.787.713 5.81 3.019 8.118l.784.706v-5.455h-2.344a10.166 10.166 0 01-.37-3.313c.132-2.546 1.176-4.843 2.665-6.086l-.699-.838zM33.93 32.637c1.777-1.484 2.912-4.097 3.055-6.868.143-2.787-.713-5.81-3.019-8.118l-.784-.706V22.4h2.343c.313 1.092.427 2.219.37 3.313-.13 2.546-1.175 4.843-2.664 6.086l.699.838z"
      fill="#5AB5BF"
    />
    <Defs />
  </Svg>
);

export default SvgComponent;
