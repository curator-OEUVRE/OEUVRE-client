import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import AppleLogin from '.';

storiesOf('AppleLogin', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <AppleLogin
      disabled={boolean('disabled', false)}
      onSuccess={action('onSuccess')}
    />
  ));
