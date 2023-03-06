import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={26} height={27} viewBox="0 0 26 27" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.61 22.306c0-.415.323-.75.722-.75h17.333c.399 0 .722.335.722.75 0 .414-.323.75-.722.75H4.332a.737.737 0 01-.723-.75z"
      fill="#7B7F82"
    />
    <Path
      d="M3.64 4.944c0-.383.312-.694.695-.694h2.889c.383 0 .694.31.694.694V16.5c0 .384-.31.694-.694.694H4.335a.694.694 0 01-.694-.694V4.944zM12.75 7.6c0-.035.016-.108.121-.192a.814.814 0 01.504-.158h8.25c.221 0 .397.072.504.158.105.084.121.157.121.192v8.8c0 .035-.016.108-.121.192a.814.814 0 01-.504.158h-8.25a.814.814 0 01-.504-.158c-.105-.084-.121-.157-.121-.192V7.6z"
      stroke="#7B7F82"
      strokeWidth={1.5}
    />
  </Svg>
);

export default SvgComponent;
