import { action } from '@storybook/addon-actions';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Checkbox } from '.';

storiesOf('Checkbox', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Checkbox
      onPress={action('onPress')}
      size={number('size', 26)}
      isChecked={boolean('isChecked', false)}
    />
  ));
