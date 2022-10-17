import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Svg width={26} height={26} viewBox="0 0 26 26" fill="none" {...props}>
    <Path
      d="M15.232 9.772l.996.996-9.815 9.815h-.996v-.996l9.815-9.815zm3.9-6.522c-.271 0-.553.108-.759.314l-1.982 1.983 4.062 4.062 1.983-1.982a1.079 1.079 0 000-1.528L19.9 3.564a1.064 1.064 0 00-.77-.314zm-3.9 3.456L3.25 18.688v4.062h4.063l11.981-11.982-4.062-4.062z"
      fill="#141718"
    />
  </Svg>
);

export default SvgComponent;
