import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={26} height={26} fill="none" viewBox="0 0 26 26" {...props}>
    <G
      clipPath="url(#a)"
      fillRule="evenodd"
      clipRule="evenodd"
      fill="currentColor"
    >
      <Path d="M2.734 9.272c0-.624.328-1.202.864-1.521l8.768-5.225a1.771 1.771 0 0 1 1.813 0l8.767 5.225a1.771 1.771 0 0 1 0 3.043l-8.767 5.224a1.771 1.771 0 0 1-1.813 0l-8.768-5.224a1.771 1.771 0 0 1-.864-1.522Zm1.771 0 8.767 5.225 8.767-5.225-8.767-5.224-8.767 5.224Z" />
      <Path d="M2.681 13.032a.886.886 0 0 1 1.214-.308l9.378 5.589 9.377-5.589a.886.886 0 0 1 .907 1.522l-9.378 5.588a1.771 1.771 0 0 1-1.813 0l-9.378-5.588a.886.886 0 0 1-.307-1.214Z" />
      <Path d="M2.681 17.004a.886.886 0 0 1 1.214-.307l9.378 5.588 9.377-5.588a.886.886 0 1 1 .907 1.521l-9.378 5.589a1.771 1.771 0 0 1-1.813 0l-9.378-5.589a.886.886 0 0 1-.307-1.214Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h26v26H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default SvgComponent;
