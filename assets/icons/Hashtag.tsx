import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg
    width={26}
    height={26}
    viewBox="0 0 26 26"
    fill="none"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  >
    <Path
      d="M9.8 22h2.664l.72-4.25h2.376l.456-2.606h-2.4l.552-3.288h2.376L17 9.226h-2.388L15.32 5h-2.688l-.708 4.227H8.516L9.224 5H6.536l-.708 4.227H3.44l-.432 2.63h2.376l-.552 3.287H2.456L2 17.75h2.4L3.68 22h2.688l.72-4.25h3.42L9.8 22zm-2.28-6.856l.552-3.288h3.42l-.552 3.288H7.52z"
      fill="#D3D4D5"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21 6V3h-2v3h-3v2h3v3h2V8h3V6h-3z"
      fill="#D3D4D5"
    />
  </Svg>
);

export default SvgComponent;
