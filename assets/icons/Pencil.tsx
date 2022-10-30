import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={26} height={26} viewBox="0 0 26 26" fill="none" {...props}>
    <Path
      d="M19.013 8.496l.958-.949c.475-.474.492-.993.062-1.432l-.343-.352c-.43-.43-.967-.387-1.433.08l-.958.94 1.714 1.713zM8.246 19.246l9.923-9.923-1.705-1.697-9.923 9.906-.86 2.074c-.098.263.175.553.439.457l2.126-.817z"
      fill="currentColor"
    />
  </Svg>
);

export default SvgComponent;
