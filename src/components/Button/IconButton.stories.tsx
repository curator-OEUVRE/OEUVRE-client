import { action } from '@storybook/addon-actions';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { IconButton } from '.';
import PaletteIcon from '@/assets/icons/Palette';

storiesOf('IconButton', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <IconButton
      onPress={action('onPress')}
      icon={<PaletteIcon color="#F9E2E2" />}
    />
  ));
