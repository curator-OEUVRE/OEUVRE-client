import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import ProfileCard from '.';

storiesOf('ProfileCard', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <ProfileCard
      profileImageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
      name={text('name', '열심히입력중인모습입')}
      id={text('id', 'abcdefghijklmno')}
      introduceMessage={text('introduceMessage', '')}
      onEditPress={action('onEditPress')}
    />
  ));
