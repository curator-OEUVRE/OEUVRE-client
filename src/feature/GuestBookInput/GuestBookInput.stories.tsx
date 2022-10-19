import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import GuestBookInput from '.';

storiesOf('GuestBookInput', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <GuestBookInput
      avatarUri={text(
        'avatarUri',
        'http://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
      )}
      onSubmit={action('onSubmit')}
    />
  ));
