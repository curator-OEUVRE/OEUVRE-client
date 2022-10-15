import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <Path
      d="M19.693 17.819h-.987l-.35-.338a8.089 8.089 0 0 0 1.962-5.287 8.125 8.125 0 0 0-8.125-8.125 8.125 8.125 0 1 0 0 16.25 8.089 8.089 0 0 0 5.288-1.963l.337.35v.988l6.25 6.237 1.863-1.862-6.238-6.25Zm-7.5 0a5.617 5.617 0 0 1-5.625-5.625 5.617 5.617 0 0 1 5.625-5.625 5.617 5.617 0 0 1 5.625 5.625 5.617 5.617 0 0 1-5.625 5.625Z"
      fill="currentColor"
    />
  </Svg>
);

export default SvgComponent;
