import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg
    width={26}
    height={26}
    viewBox="0 0 26 26"
    fill="none"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  >
    <Path
      d="M17.335 9.75v10.833H8.668V9.75h8.667zm-1.625-6.5h-5.417L9.21 4.333H5.418V6.5h15.167V4.333h-3.792L15.71 3.25zM19.5 7.583h-13v13c0 1.192.975 2.167 2.167 2.167h8.667a2.173 2.173 0 002.166-2.167v-13z"
      fill="#E45959"
    />
  </Svg>
);

export default SvgComponent;
