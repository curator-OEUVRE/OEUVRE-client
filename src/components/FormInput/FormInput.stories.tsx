import { action } from '@storybook/addon-actions';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import FormInput, { FormInputStatus } from './FormInput';

storiesOf('FormInput', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <FormInput
      placeholder={text('placeholder', '테스트')}
      label={text('label', '테스트')}
      message={text('message', '테스트')}
      status={select(
        'status',
        [FormInputStatus.Initial, FormInputStatus.Error, FormInputStatus.Valid],
        FormInputStatus.Initial,
      )}
      onChangeText={action('onChangeText')}
      multiline={boolean('multiline', false)}
    />
  ));
