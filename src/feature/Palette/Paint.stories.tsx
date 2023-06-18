import { action } from '@storybook/addon-actions';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import Paint from './Paint';
import { COLOR } from '@/constants/styles';
import { FloorBackgroundColor } from '@/types/floor';

storiesOf('Paint', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Paint color={COLOR.oeuvre.blue1} selected={false} onPress={() => {}} />
  ));
