import { action } from '@storybook/addon-actions';
import { array, number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import FloorDropDown from '.';
import { OtherFloor } from '@/types/guestbook';

const defaultValues: OtherFloor[] = [
  { floorNo: 11, name: 'ㅎㅎㅎㅗㅗ', queue: 5 },
  { floorNo: 9, name: 'ㅅㅎㅎ', queue: 3 },
  { floorNo: 8, name: '해', queue: 2 },
];

storiesOf('FloorDropdown', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <FloorDropDown
      currentIdx={number('currentIdx', 0)}
      floors={array('floors', defaultValues)}
      onChange={action('onChange')}
    />
  ));
