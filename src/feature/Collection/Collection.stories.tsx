import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import Collection from '.';
import type { PictureMini } from '@/types/floor';

const COLLECTION: PictureMini[] = [
  {
    pictureNo: 1,
    imageUrl:
      'https://media.istockphoto.com/photos/canadian-rockies-banff-national-park-dramatic-landscape-picture-id1342152935?b=1&k=20&m=1342152935&s=170667a&w=0&h=q9-vhO5MC7zwaxX8_zFUiqMnQJ5udMjEBf0npeCCAGs=',
    width: 509,
    height: 339,
  },
  {
    pictureNo: 2,
    imageUrl:
      'https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg',
    width: 384,
    height: 260,
  },
  {
    pictureNo: 3,
    imageUrl:
      'https://st.depositphotos.com/1002489/3561/i/600/depositphotos_35619861-stock-photo-paris-la-defense-at-sunset.jpg',
    width: 600,
    height: 600,
  },
  {
    pictureNo: 4,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdDtPYEVLcGUFQxPiY3JGDwhtX5wgelYSF8g&usqp=CAU',
    width: 262,
    height: 193,
  },
  {
    pictureNo: 5,
    imageUrl:
      'https://www.capturelandscapes.com/wp-content/uploads/2019/04/Desert-Nights.jpg',
    width: 960,
    height: 640,
  },
  {
    pictureNo: 6,
    imageUrl:
      'https://i.pinimg.com/736x/5c/18/0e/5c180e41723312149d2c59680786291d.jpg',
    width: 735,
    height: 866,
  },
  {
    pictureNo: 7,
    imageUrl:
      'https://www.slazzer.com/static/images/home-page/realestate-image-design-maker.jpg',
    width: 439,
    height: 301,
  },
];

storiesOf('Collection', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Collection
      pictures={COLLECTION}
      onPicturePress={action('onPicturePress')}
    />
  ));
