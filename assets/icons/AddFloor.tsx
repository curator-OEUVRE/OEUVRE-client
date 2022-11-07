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
      <Path d="M2.492 13.032a.886.886 0 0 1 1.214-.307l9.378 5.588 9.377-5.588a.886.886 0 1 1 .907 1.521l-9.378 5.588a1.771 1.771 0 0 1-1.813 0l-9.378-5.588a.886.886 0 0 1-.307-1.214Z" />
      <Path d="M2.492 17.004a.886.886 0 0 1 1.214-.307l9.378 5.588 9.377-5.588a.886.886 0 1 1 .907 1.521l-9.378 5.589a1.771 1.771 0 0 1-1.813 0l-9.378-5.589a.886.886 0 0 1-.307-1.214ZM20.167.5a.5.5 0 0 0-.5-.5h-1.143a.5.5 0 0 0-.5.5v2.714H15.31a.5.5 0 0 0-.5.5v1.143a.5.5 0 0 0 .5.5h2.714V8.07a.5.5 0 0 0 .5.5h1.143a.5.5 0 0 0 .5-.5V5.357h2.715a.5.5 0 0 0 .5-.5V3.714a.5.5 0 0 0-.5-.5h-2.715V.5Z" />
      <Path d="M13.877 2.465a1.771 1.771 0 0 0-1.701.061L3.409 7.751a1.771 1.771 0 0 0 0 3.043l8.767 5.225a1.77 1.77 0 0 0 1.813 0l8.767-5.225a1.771 1.771 0 0 0 0-3.043l-1.586-.945a.516.516 0 0 0-.003.051v2.009l.683.406-8.768 5.225-8.767-5.225 8.767-5.224.728.434V2.714c0-.09.025-.176.067-.25Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h26v26H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default SvgComponent;
