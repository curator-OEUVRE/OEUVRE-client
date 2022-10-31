import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={26} height={26} viewBox="0 0 26 26" fill="none" {...props}>
    <Path
      d="M8.277 24c.566 0 .984-.279 1.669-.886l3.407-3.006h5.979c2.99 0 4.668-1.731 4.668-4.687V7.688C24 4.732 22.321 3 19.332 3H6.668C3.688 3 2 4.732 2 7.688v7.733c0 2.966 1.738 4.688 4.599 4.688h.407v2.438c0 .886.467 1.453 1.271 1.453zm.497-2.23v-2.836c0-.587-.258-.816-.815-.816H6.738c-1.868 0-2.761-.945-2.761-2.757V7.747c0-1.811.893-2.756 2.76-2.756h12.535c1.858 0 2.752.945 2.752 2.756v7.614c0 1.811-.894 2.757-2.752 2.757h-6.029c-.606 0-.904.1-1.32.538l-3.15 3.115zm4.231-8.569c.546 0 .854-.308.874-.885l.149-4.788c.02-.587-.417-1.015-1.033-1.015-.616 0-1.043.418-1.023 1.005l.14 4.798c.019.567.337.885.893.885zm0 3.305c.646 0 1.172-.468 1.172-1.105 0-.627-.526-1.095-1.172-1.095-.646 0-1.172.468-1.172 1.095s.536 1.105 1.172 1.105z"
      fill="#E45959"
    />
  </Svg>
);

export default SvgComponent;