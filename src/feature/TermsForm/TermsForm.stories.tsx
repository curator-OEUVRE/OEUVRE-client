import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import TermsForm from '.';

storiesOf('feature/TermsForm', module)
  .addDecorator(withKnobs)
  .add('default', () => <TermsForm onNextPress={action('onNextPress')} />);
