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
      d="M7.349 12.654c0 .308.114.572.36.8l6.838 6.697c.193.194.44.3.73.3.58 0 1.045-.458 1.045-1.047 0-.29-.123-.545-.316-.747l-6.161-6.003 6.16-6.003a1.09 1.09 0 00.317-.747c0-.589-.466-1.046-1.046-1.046-.29 0-.536.106-.73.3L7.71 11.845c-.246.237-.36.5-.36.808z"
      fill="currentColor"
    />
  </Svg>
);

export default SvgComponent;
