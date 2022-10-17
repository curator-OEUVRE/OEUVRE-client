import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={38} height={38} fill="none" viewBox="0 0 38 38" {...props}>
    <G clipPath="url(#a)">
      <Path
        d="M26.66 11.34c-4.228-4.228-11.092-4.228-15.32 0-4.229 4.229-4.229 11.092 0 15.32 4.228 4.23 11.092 4.23 15.32 0 4.229-4.228 4.229-11.091 0-15.32Zm-4.596 12.256L19 20.532l-3.064 3.064-1.532-1.532L17.468 19l-3.064-3.064 1.532-1.532L19 17.468l3.064-3.064 1.532 1.532L20.532 19l3.064 3.064-1.532 1.532Z"
        fill="currentColor"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path
          fill="currentColor"
          transform="rotate(45 8.757 23.243)"
          d="M0 0h26v26H0z"
        />
      </ClipPath>
    </Defs>
  </Svg>
);

export default SvgComponent;
