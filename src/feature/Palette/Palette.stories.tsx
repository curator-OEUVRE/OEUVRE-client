import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { useState } from 'react';
import Palette from '.';
import { COLOR } from '@/constants/styles';
import { FloorBackgroundColor } from '@/types/floor';

const Component = () => {
  const [color, setColor] = useState<FloorBackgroundColor>(COLOR.floor.gray1);

  return <Palette selectedColor={color} onSelected={setColor} />;
};

storiesOf('Palette', module)
  .addDecorator(withKnobs)
  .add('default', () => <Component />);
