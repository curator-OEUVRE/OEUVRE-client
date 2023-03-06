import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={26} height={27} viewBox="0 0 26 27" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.797 13.75c0-.414.086-.75.192-.75h4.616c.106 0 .192.336.192.75s-.086.75-.192.75H7.989c-.106 0-.192-.336-.192-.75z"
      fill="#7B7F82"
    />
    <Path
      d="M3.75 7.4a.65.65 0 01.65-.65h2.8a.65.65 0 01.65.65v11.2a.65.65 0 01-.65.65H4.4a.65.65 0 01-.65-.65V7.4z"
      stroke="#7B7F82"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    <Path
      d="M12.547 9.1c0-.035.016-.108.121-.192a.813.813 0 01.504-.158h8.25c.221 0 .397.072.504.158.105.084.12.157.12.192v8.8c0 .035-.015.108-.12.192a.813.813 0 01-.504.158h-8.25a.814.814 0 01-.504-.158c-.105-.084-.121-.157-.121-.192V9.1z"
      stroke="#7B7F82"
      strokeWidth={1.5}
    />
  </Svg>
);

export default SvgComponent;
