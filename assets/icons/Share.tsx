import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Svg width={26} height={26} viewBox="0 0 26 26" fill="none" {...props}>
    <Path
      d="M19.499 16.25v3.25h-13v-3.25H4.332v3.25c0 1.191.975 2.166 2.167 2.166h13a2.173 2.173 0 002.166-2.166v-3.25H19.5zM7.582 9.75l1.528 1.527 2.805-2.795v8.851h2.167v-8.85l2.806 2.794 1.527-1.527L13 4.333 7.582 9.75z"
      fill="#141718"
    />
  </Svg>
);

export default SvgComponent;
