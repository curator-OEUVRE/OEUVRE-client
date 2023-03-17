import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={26} height={26} viewBox="0 0 26 26" fill="none" {...props}>
    <Path
      d="M12.999 17.488c.308-.008.589-.123.817-.369l6.68-6.838c.194-.193.299-.44.299-.73 0-.58-.457-1.045-1.037-1.045-.281 0-.554.114-.756.316l-5.994 6.161-6.012-6.16a1.094 1.094 0 00-.756-.317c-.58 0-1.037.466-1.037 1.046a1 1 0 00.299.73l6.688 6.837c.238.246.501.37.809.37z"
      fill="currentColor"
    />
  </Svg>
);

export default SvgComponent;
