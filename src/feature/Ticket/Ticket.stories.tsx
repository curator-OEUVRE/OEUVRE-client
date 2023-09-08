import { action } from '@storybook/addon-actions';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import Ticket from '.';
import { HomeFloor } from '@/types/home';

const FLOOR_INFO: Omit<
  HomeFloor,
  'isMine' | 'isNew' | 'isUpdated' | 'updateCount'
> = {
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
  floorDescription: 'adsfadf',
};

storiesOf('Ticket', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Ticket
      {...FLOOR_INFO}
      isMine={boolean('isMine', false)}
      isNew={boolean('isNew', true)}
      isUpdated={boolean('isUpdated', true)}
      updateCount={number('updateCount', 0)}
      onPress={action('onPress')}
      onProfilePress={action('onProfilePress')}
    />
  ));
