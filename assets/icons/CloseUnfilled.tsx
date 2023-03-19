import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={26} height={26} viewBox="0 0 26 26" fill="none" {...props}>
    <Path
      d="M8.237 16.575c-.31.31-.324.862.007 1.178.317.332.877.317 1.186.008l3.572-3.572 3.573 3.572a.836.836 0 001.178-.008.844.844 0 00.008-1.185l-3.573-3.572 3.573-3.564c.316-.324.324-.869-.008-1.185a.836.836 0 00-1.178-.008l-3.573 3.572L9.43 8.239c-.31-.309-.87-.324-1.186.008-.331.316-.317.869-.007 1.178l3.572 3.571-3.572 3.58z"
      fill="#fff"
    />
  </Svg>
);

export default SvgComponent;
