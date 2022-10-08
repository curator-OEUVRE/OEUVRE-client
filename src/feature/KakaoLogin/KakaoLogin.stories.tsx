import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import KakaoLogin from '.';

storiesOf('KakaoLogin', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <KakaoLogin
      disabled={boolean('disabled', false)}
      onSuccess={action('onSuccess')}
    />
  ));
