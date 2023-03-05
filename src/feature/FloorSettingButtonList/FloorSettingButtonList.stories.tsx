import { action } from '@storybook/addon-actions';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import FloorSettingButtonList from '.';
import PaletteIcon from '@/assets/icons/Palette';
import { FloorAlignment, FloorGradient } from '@/types/floor';

storiesOf('FloorSettingButtonList', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <FloorSettingButtonList
      isFramed
      alignment={FloorAlignment.CENTER}
      color="#F9E2E2"
      gradient={FloorGradient.FULL}
    />
  ));
