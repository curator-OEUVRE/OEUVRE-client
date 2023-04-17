import * as React from 'react';
import Svg, { G, Circle, Path, Defs, SvgProps } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const SvgComponent = (props: SvgProps) => (
  <Svg width={42} height={42} viewBox="0 0 42 42" fill="none" {...props}>
    <Circle cx={21} cy={21} r={15.5} stroke="#fff" />
    <Path
      d="M13.304 14.95H28.68c.416 0 .75-.343.75-.75a.744.744 0 00-.75-.752H13.304a.742.742 0 00-.742.751c0 .408.326.75.742.75zm0 4.276H28.68c.416 0 .75-.342.75-.75a.744.744 0 00-.75-.751H13.304a.742.742 0 00-.742.75c0 .409.326.751.742.751zm0 4.277H28.68c.416 0 .75-.343.75-.75a.749.749 0 00-.75-.752H13.304a.742.742 0 00-.742.751c0 .408.326.75.742.75zm0 4.276h8.57c.416 0 .75-.342.75-.75a.749.749 0 00-.75-.751h-8.57a.742.742 0 00-.742.75c0 .409.326.751.742.751z"
      fill="#fff"
    />
    <Defs />
  </Svg>
);

export default SvgComponent;
