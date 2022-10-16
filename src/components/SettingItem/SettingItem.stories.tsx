import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { SettingItem } from '.';

storiesOf('SettingItem', module)
  .addDecorator(withKnobs)
  .add('Toggle', () => (
    <SettingItem.Toggle
      isSelected={boolean('isSelected', false)}
      onToggle={action('onToggle')}
      left={text('left', '텍스트')}
    />
  ));
