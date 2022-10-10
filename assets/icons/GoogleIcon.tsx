import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg
    width={32}
    height={32}
    fill="none"
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M23.83 16.182c0-.567-.05-1.113-.145-1.637H16.15v3.095h4.306a3.68 3.68 0 01-1.596 2.415v2.007h2.585c1.513-1.393 2.385-3.444 2.385-5.88z"
      fill="#4285F4"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.15 24c2.16 0 3.97-.716 5.294-1.938l-2.586-2.007c-.716.48-1.633.763-2.709.763-2.084 0-3.847-1.407-4.476-3.298H9v2.073A7.997 7.997 0 0016.15 24z"
      fill="#34A853"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.674 17.52a4.81 4.81 0 01-.25-1.52c0-.527.09-1.04.25-1.52v-2.073H9.001A7.997 7.997 0 008.151 16c0 1.29.308 2.513.85 3.593l2.673-2.073z"
      fill="#FBBC05"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.15 11.182c1.174 0 2.228.403 3.057 1.196l2.295-2.294C20.116 8.793 18.305 8 16.149 8A7.997 7.997 0 009 12.407l2.673 2.073c.629-1.89 2.393-3.298 4.476-3.298z"
      fill="#EA4335"
    />
  </Svg>
);

export default SvgComponent;
