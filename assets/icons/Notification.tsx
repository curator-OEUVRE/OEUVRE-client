import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={72} height={72} viewBox="0 0 72 72" fill="none" {...props}>
    <Path
      d="M15.166 53.256h10.027c.17 4.625 3.968 8.908 9.566 8.908 5.573 0 9.395-4.235 9.59-8.908h10.003c2.53 0 4.089-1.387 4.089-3.48 0-2.604-2.361-4.82-4.576-6.937-1.728-1.68-2.142-5.038-2.459-8.47-.34-9.175-3.042-15.309-9.37-17.597-.95-3.237-3.65-5.695-7.277-5.695-3.627 0-6.328 2.458-7.253 5.695-6.353 2.288-9.03 8.422-9.395 17.597-.317 3.432-.73 6.79-2.458 8.47-2.215 2.118-4.576 4.333-4.576 6.937 0 2.093 1.558 3.48 4.089 3.48zm1.85-4.527v-.292c.632-.706 2.044-1.996 3.237-3.359 1.68-1.922 2.458-5.476 2.701-10.1.292-9.76 3.31-13.046 7.205-14.093.608-.17.925-.462.973-1.12.122-2.457 1.51-4.112 3.627-4.112 2.142 0 3.505 1.655 3.626 4.113.049.657.39.95.974 1.12 3.918 1.046 6.912 4.332 7.204 14.092.268 4.624 1.047 8.178 2.702 10.1 1.192 1.363 2.555 2.653 3.188 3.36v.291H17.016zm17.743 9.517c-2.75 0-4.722-1.972-4.892-4.99h9.808c-.146 2.994-2.142 4.99-4.916 4.99z"
      fill="currentColor"
    />
  </Svg>
);

export default SvgComponent;
