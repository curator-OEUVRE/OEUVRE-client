import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { TicketProps } from '../Ticket';
import TicketCarousel from '.';

const data: TicketProps[] = [
  {
    exhibitionName: 'MY ARTWORK',
    floorName: '플로어이름은딱열글자',
    floorNo: 1,
    id: 'oeuvre',
    profileImageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
    queue: 10,
    thumbnailUrl:
      'https://cdn.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej-1520x800.png',
    updatedAt: new Date().toISOString(),
    userNo: 2,
    width: 1600,
    height: 840,
    isMine: true,
    isNew: true,
    isUpdated: true,
    updateCount: 0,
    floorDescription: 'adsfadf',
  },
  {
    exhibitionName: 'MY ARTWORK',
    floorName: '플로어이름은딱열글자',
    floorNo: 1,
    id: 'oeuvre',
    profileImageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
    queue: 10,
    thumbnailUrl:
      'https://cdn.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej-1520x800.png',
    updatedAt: new Date().toISOString(),
    userNo: 2,
    width: 1600,
    height: 840,
    isMine: true,
    isNew: true,
    isUpdated: true,
    updateCount: 0,
    floorDescription: 'adsfadf',
  },
  {
    exhibitionName: 'MY ARTWORK',
    floorName: '플로어이름은딱열글자',
    floorNo: 1,
    id: 'oeuvre',
    profileImageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
    queue: 10,
    thumbnailUrl:
      'https://cdn.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej-1520x800.png',
    updatedAt: new Date().toISOString(),
    userNo: 2,
    width: 1600,
    height: 840,
    isMine: true,
    isNew: true,
    isUpdated: true,
    updateCount: 0,
    floorDescription: 'adsfadf',
  },
  {
    exhibitionName: 'MY ARTWORK',
    floorName: '플로어이름은딱열글자',
    floorNo: 1,
    id: 'oeuvre',
    profileImageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
    queue: 10,
    thumbnailUrl:
      'https://cdn.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej-1520x800.png',
    updatedAt: new Date().toISOString(),
    userNo: 2,
    width: 1600,
    height: 840,
    isMine: true,
    isNew: true,
    isUpdated: true,
    updateCount: 0,
    floorDescription: 'adsfadf',
  },
  {
    exhibitionName: 'MY ARTWORK',
    floorName: '플로어이름은딱열글자',
    floorNo: 1,
    id: 'oeuvre',
    profileImageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
    queue: 10,
    thumbnailUrl:
      'https://cdn.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej-1520x800.png',
    updatedAt: new Date().toISOString(),
    userNo: 2,
    width: 1600,
    height: 840,
    isMine: true,
    isNew: true,
    isUpdated: true,
    updateCount: 0,
    floorDescription: 'adsfadf',
  },
];

storiesOf('TicketCarousel', module)
  .addDecorator(withKnobs)
  .add('default', () => <TicketCarousel data={data} />);
