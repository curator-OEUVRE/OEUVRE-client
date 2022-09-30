// if you use expo remove this line
import { withKnobs } from '@storybook/addon-knobs';
import {
  getStorybookUI,
  configure,
  addDecorator,
} from '@storybook/react-native';

import { loadStories } from './storyLoader';

import './rn-addons';

// enables knobs for all stories
addDecorator(withKnobs);

// import stories
configure(() => {
  loadStories();
}, module);

// Refer to https://github.com/storybookjs/react-native/tree/master/app/react-native#getstorybookui-options
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  asyncStorage: null,
});

export default StorybookUIRoot;
