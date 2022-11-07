import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={72} height={72} fill="none" viewBox="0 0 72 72" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.385 16.615v43.363l18-9.502 18 9.502V16.615a5.538 5.538 0 0 0-5.539-5.538H24.923a5.539 5.539 0 0 0-5.538 5.538Z"
      fill="currentColor"
    />
  </Svg>
);

export default SvgComponent;
