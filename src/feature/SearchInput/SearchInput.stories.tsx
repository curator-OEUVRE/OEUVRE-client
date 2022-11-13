import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import SearchInput from '.';

storiesOf('SearchInput', module)
  .addDecorator(withKnobs)
  .add('default', () => <SearchInput onEnd={action('onEnd')} />);
