import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg
    width={26}
    height={26}
    fill="none"
    viewBox="0 0 26 26"
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    {...props}
  >
    <Path
      d="M13 2.167C7.02 2.167 2.167 7.02 2.167 13S7.02 23.833 13 23.833 23.834 18.98 23.834 13 18.98 2.166 13 2.166Zm1.084 16.25h-2.167V16.25h2.167v2.166Zm0-4.334h-2.167v-6.5h2.167v6.5Z"
      fill="currentColor"
    />
  </Svg>
);

export default SvgComponent;
