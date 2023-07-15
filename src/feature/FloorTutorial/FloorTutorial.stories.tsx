import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import FloorTutorial from '.';

storiesOf('FloorTutorial', module)
  .addDecorator(withKnobs)
  .add('default', () => <FloorTutorial onPressButton={() => {}} />);
