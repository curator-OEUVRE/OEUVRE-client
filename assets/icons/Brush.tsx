import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={26} height={26} viewBox="0 0 26 26" fill="none" {...props}>
    <Path
      d="M20.17 3.927c-.448.325-5.317 3.648-8.35 6.328a6.782 6.782 0 014.369 4.377c2.689-3.04 6.011-7.901 6.337-8.358 1.107-1.573-.827-3.463-2.356-2.347zm-8.358 10.705c.676.677 1.169 1.556 1.318 2.32.668-.123 1.222-.43 1.784-.975.097-.088.185-.176.273-.273-.352-2.223-2.233-4.104-4.439-4.447-.096.08-.193.176-.281.273-.545.562-.861 1.134-.967 1.801.747.132 1.635.616 2.312 1.301zM3.462 19.8c1.608 2.127 4.948 2.76 7.049 1.17 1.784-1.337 2.092-3.367.808-5.063-1.16-1.539-3.146-1.916-4.464-.897-1.407 1.064-.844 2.426-1.67 3.041-.712.545-1.31.194-1.767.536-.36.273-.351.712.044 1.213z"
      fill="#D3D4D5"
    />
  </Svg>
);

export default SvgComponent;
