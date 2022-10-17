import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import FloorPictureList from '.';
import type { PictureInfo } from '@/states/createFloorStore';

const PICTURES: PictureInfo[] = [
  {
    imageUri:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
    description: 'test',
    width: 640 / 5 / 375,
    height: 480 / 5 / 375,
    location: 0,
    hashtags: [],
  },
  {
    imageUri:
      'https://cdn.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej-1520x800.png',
    description: 'test',
    width: 1600 / 6 / 375,
    height: 840 / 6 / 375,
    location: 20 / 375,
    hashtags: [],
  },
  {
    imageUri:
      'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNoYW5nZXxlbnwwfHwwfHw%3D&w=1000&q=80',
    description: 'test',
    width: 1000 / 4 / 375,
    height: 667 / 4 / 375,
    location: 30 / 375,
    hashtags: [],
  },
  {
    imageUri:
      'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    description: 'test',
    width: 771 / 3 / 375,
    height: 480 / 3 / 375,
    location: -50 / 375,
    hashtags: [],
  },
];

storiesOf('feature/FloorPictureList', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <FloorPictureList
      pictures={PICTURES}
      editable={boolean('editable', false)}
      setPictures={action('setPictures')}
    />
  ));