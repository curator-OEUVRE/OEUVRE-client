import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { useState } from 'react';
import { Radio } from '.';

const data = [
  { label: '팔로잉', value: 0 },
  { label: '최신순', value: 1 },
];

const Component = () => {
  const [value, setValue] = useState<number>(0);
  return <Radio value={value} onChange={setValue} data={data} />;
};

storiesOf('Radio', module)
  .addDecorator(withKnobs)
  .add('Radio', () => <Component />);
