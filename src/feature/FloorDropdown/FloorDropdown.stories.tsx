import { action } from '@storybook/addon-actions';
import { array, number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import FloorDropDown from '.';

const defaultValues = [
  '플로어이름은딱열글자',
  '플로어이름은딱열글자',
  '플로어이름은딱열글자',
  '플로어이름은딱열글자',
  '플로어이름은딱열글자',
];

storiesOf('FloorDropdown', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <FloorDropDown
      currentIdx={number('currentIdx', 0)}
      floorNames={array('floorNames', defaultValues)}
      onChange={action('onChange')}
    />
  ));
