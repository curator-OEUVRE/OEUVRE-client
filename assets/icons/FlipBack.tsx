import * as React from 'react';
import Svg, { G, Circle, Mask, Path, Defs, SvgProps } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const SvgComponent = (props: SvgProps) => (
  <Svg width={42} height={42} viewBox="0 0 42 42" fill="none" {...props}>
    <G filter="url(#filter0_d_5283_76713)">
      <Circle
        cx={21}
        cy={21}
        r={15.5}
        stroke="#F4F4F5"
        shapeRendering="crispEdges"
      />
    </G>
    <Mask id="a" fill="#fff">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.915 11a1.5 1.5 0 01-2.83 0H14a1 1 0 00-1 1v18a1 1 0 001 1h2.085a1.5 1.5 0 012.83 0h4.17a1.5 1.5 0 012.83 0H28a1 1 0 001-1V12a1 1 0 00-1-1h-2.085a1.5 1.5 0 01-2.83 0h-4.17z"
      />
    </Mask>
    <Path
      d="M18.915 11V9.5h-1.061l-.354 1 1.415.5zm-2.83 0l1.415-.5-.354-1h-1.06V11zm0 20v1.5h1.061l.354-1-1.415-.5zm2.83 0l-1.415.5.354 1h1.06V31zm4.17 0v1.5h1.061l.354-1-1.415-.5zm2.83 0l-1.415.5.354 1h1.06V31zm0-20V9.5h-1.061l-.354 1 1.415.5zm-2.83 0l1.415-.5-.354-1h-1.06V11zM17.5 13.5a3 3 0 002.829-2l-2.829-1v3zm-2.829-2a3 3 0 002.829 2v-3l-2.829 1zm-.671 1h2.085v-3H14v3zm.5-.5a.5.5 0 01-.5.5v-3a2.5 2.5 0 00-2.5 2.5h3zm0 18V12h-3v18h3zm-.5-.5a.5.5 0 01.5.5h-3a2.5 2.5 0 002.5 2.5v-3zm2.085 0H14v3h2.085v-3zm1.415-1a3 3 0 00-2.829 2l2.829 1v-3zm2.829 2a3 3 0 00-2.829-2v3l2.829-1zm2.756-1h-4.17v3h4.17v-3zm1.415-1a3 3 0 00-2.829 2l2.829 1v-3zm2.829 2a3 3 0 00-2.829-2v3l2.829-1zm.671-1h-2.085v3H28v-3zm-.5.5a.5.5 0 01.5-.5v3a2.5 2.5 0 002.5-2.5h-3zm0-18v18h3V12h-3zm.5.5a.5.5 0 01-.5-.5h3A2.5 2.5 0 0028 9.5v3zm-2.085 0H28v-3h-2.085v3zm-1.415-2v3a3 3 0 002.829-2l-2.829-1zm0 0l-2.829 1a3 3 0 002.829 2v-3zm-5.585 2h4.17v-3h-4.17v3z"
      fill="#F4F4F5"
      mask="url(#a)"
    />
    <Defs />
  </Svg>
);

export default SvgComponent;
