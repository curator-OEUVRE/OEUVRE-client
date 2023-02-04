import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Text } from 'react-native';
import { Accordian } from '.';

storiesOf('Accordian', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Accordian label="For Artist">
      <Text>hihi</Text>
    </Accordian>
  ));
