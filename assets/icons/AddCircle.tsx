import * as React from 'react';
import Svg, { Path, SvgProps, Circle } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg
    width={47}
    height={47}
    viewBox="0 0 47 47"
    fill="none"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  >
    <Circle cx={23} cy={23} r={23} fill="#fff" />
    <Path
      d="M23.5.583C10.85.583.583 10.85.583 23.5c0 12.65 10.267 22.917 22.917 22.917 12.65 0 22.917-10.267 22.917-22.917C46.417 10.85 36.15.583 23.5.583zm11.458 25.209h-9.166v9.166h-4.584v-9.166h-9.166v-4.584h9.166v-9.166h4.584v9.166h9.166v4.584z"
      fill="#6FA1A7"
    />
  </Svg>
);

export default SvgComponent;
