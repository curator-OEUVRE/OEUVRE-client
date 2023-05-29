import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import FollowButton from '../FollowButton';
import MainImageSelectModal from '.';
import { Picture } from '@/types/picture';

const data: Picture[] = [
  {
    description: '',
    floorNo: 165,
    hashtags: ['ㅎㅇ', '너낰'],
    height: 0.340482,
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/oeuvre-b2a8f.appspot.com/o/893fcbea-a408-478c-afed-32d4cad4f1c5?alt=media&token=fe9f1c6d-c9cd-4b52-921a-d354b3ac1688',
    isLiked: false,
    isMine: false,
    isScraped: false,
    location: 0,
    manufactureYear: '',
    materials: '',
    pictureNo: 527,
    queue: 1,
    scale: '',
    title: '',
    userId: 'oeuvre',
    userNo: 19,
    width: 0.605301,
  },
  {
    description: '',
    floorNo: 165,
    hashtags: [],
    height: 0.274896,
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/oeuvre-b2a8f.appspot.com/o/e52e0237-e15c-44a8-a154-cafd317841c1?alt=media&token=6bbc7e18-ca46-416a-a080-e7e64326f3b0',
    isLiked: false,
    isMine: false,
    isScraped: false,
    location: 0,
    manufactureYear: '',
    materials: '',
    pictureNo: 528,
    queue: 2,
    scale: '',
    title: '',
    userId: 'oeuvre',
    userNo: 19,
    width: 0.366528,
  },
  {
    description: '',
    floorNo: 165,
    hashtags: [],
    height: 0.230277,
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/oeuvre-b2a8f.appspot.com/o/7216c9b0-c391-412f-ab58-5cbc5a323b1e?alt=media&token=2b27218d-c33b-4a73-9377-2f314ceb0c53',
    isLiked: false,
    isMine: false,
    isScraped: false,
    location: 0,
    manufactureYear: '',
    materials: '',
    pictureNo: 529,
    queue: 3,
    scale: '',
    title: '',
    userId: 'oeuvre',
    userNo: 19,
    width: 0.409381,
  },
  {
    description: '',
    floorNo: 165,
    hashtags: [],
    height: 0.336725,
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/oeuvre-b2a8f.appspot.com/o/062e58ef-2955-43bf-b05f-56c96217c4af?alt=media&token=ce552b1e-c06c-42b7-abf5-594341a91a60',
    isLiked: false,
    isMine: false,
    isScraped: false,
    location: 0,
    manufactureYear: '',
    materials: '',
    pictureNo: 530,
    queue: 4,
    scale: '',
    title: '',
    userId: 'oeuvre',
    userNo: 19,
    width: 0.189408,
  },
  {
    description: '',
    floorNo: 165,
    hashtags: [],
    height: 0.251136,
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/oeuvre-b2a8f.appspot.com/o/6f22487e-b04c-4249-9a21-6d481a52d54b?alt=media&token=e0576017-4a54-438e-bd77-0c828d6e36ac',
    isLiked: false,
    isMine: false,
    isScraped: false,
    location: 0,
    manufactureYear: '',
    materials: '',
    pictureNo: 531,
    queue: 5,
    scale: '',
    title: '',
    userId: 'oeuvre',
    userNo: 19,
    width: 0.446463,
  },
  {
    description: '',
    floorNo: 165,
    hashtags: [],
    height: 0.231435,
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/oeuvre-b2a8f.appspot.com/o/285eb772-da24-4749-a478-a96ac69a5272?alt=media&token=81ede99e-ac31-4c6a-9e09-7000ecc5c5f6',
    isLiked: false,
    isMine: false,
    isScraped: false,
    location: 0,
    manufactureYear: '',
    materials: '',
    pictureNo: 532,
    queue: 6,
    scale: '',
    title: '',
    userId: 'oeuvre',
    userNo: 19,
    width: 0.41144,
  },
  {
    description: '',
    floorNo: 165,
    hashtags: [],
    height: 0.282736,
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/oeuvre-b2a8f.appspot.com/o/fddd5f78-e37c-4bdf-854e-9970aad48d86?alt=media&token=37967cdc-efc5-4115-ac7e-444b22edae02',
    isLiked: false,
    isMine: false,
    isScraped: false,
    location: 0,
    manufactureYear: '',
    materials: '',
    pictureNo: 533,
    queue: 7,
    scale: '',
    title: '',
    userId: 'oeuvre',
    userNo: 19,
    width: 0.502641,
  },
  {
    description: '',
    floorNo: 165,
    hashtags: [],
    height: 0.281226,
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/oeuvre-b2a8f.appspot.com/o/8611eb77-60d2-43f1-8c17-fe31d0d995b9?alt=media&token=0f8c1047-eb93-4362-91dc-863d8fd8c8dd',
    isLiked: false,
    isMine: false,
    isScraped: false,
    location: 0,
    manufactureYear: '',
    materials: '',
    pictureNo: 534,
    queue: 8,
    scale: '',
    title: '',
    userId: 'oeuvre',
    userNo: 19,
    width: 0.499957,
  },
];

const StoryBookStack = createStackNavigator();

export const NavigationDecorator = (story: any) => {
  const Screen = () => story();
  return (
    <NavigationContainer independent>
      <StoryBookStack.Navigator>
        <StoryBookStack.Screen
          name="MyStorybookScreen"
          component={Screen}
          options={{ header: () => null }}
        />
      </StoryBookStack.Navigator>
    </NavigationContainer>
  );
};

storiesOf('MainImageSelectModal', module)
  .addDecorator(withKnobs)
  .addDecorator(NavigationDecorator)
  .add('default', () => (
    <MainImageSelectModal
      pictures={data}
      visible
      setVisible={() => {}}
      headerTitle="플로어 추가"
      headerRightText="완료"
    />
  ));
