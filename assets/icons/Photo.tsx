import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={72} height={72} fill="none" viewBox="0 0 72 72" {...props}>
    <Path
      d="M14.336 63.692h43.328c3.96 0 6.028-1.973 6.028-5.941V14.249c0-3.968-2.067-5.941-6.028-5.941H14.336c-3.96 0-6.028 1.973-6.028 5.941v43.502c0 3.968 2.067 5.941 6.028 5.941ZM12.53 14.507c0-1.459.652-2.038 2.089-2.038H57.38c1.437 0 2.09.579 2.09 2.038v36.218L47.74 35.012c-.958-.88-2.09-1.308-3.265-1.308-1.175 0-2.263.407-3.264 1.287l-8.253 11.9-4.94-4.376c-.892-.815-1.893-1.223-2.938-1.223-1 0-1.915.408-2.785 1.18l-9.766 8.875v-36.84Zm14.428 14.802c2.829 0 5.18-2.317 5.18-5.17 0-2.81-2.351-5.147-5.18-5.147-2.894 0-5.267 2.338-5.267 5.148 0 2.852 2.373 5.169 5.267 5.169Z"
      fill="currentColor"
    />
  </Svg>
);

export default SvgComponent;
