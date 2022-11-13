import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={38} height={38} fill="none" viewBox="0 0 38 38" {...props}>
    <G clipPath="url(#a)">
      <Path
        d="M26.66 11.34c-4.228-4.229-11.092-4.229-15.32 0-4.229 4.228-4.229 11.092 0 15.32 4.228 4.229 11.092 4.229 15.32 0 4.229-4.228 4.229-11.092 0-15.32Zm-5.362 11.49L19 20.532l-2.298 2.298a1.087 1.087 0 0 1-1.532 0 1.087 1.087 0 0 1 0-1.532L17.468 19l-2.298-2.298a1.086 1.086 0 0 1 0-1.532 1.086 1.086 0 0 1 1.532 0L19 17.468l2.298-2.298a1.086 1.086 0 0 1 1.532 0c.422.421.422 1.11 0 1.532L20.532 19l2.298 2.298c.422.421.422 1.11 0 1.532a1.087 1.087 0 0 1-1.532 0Z"
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
