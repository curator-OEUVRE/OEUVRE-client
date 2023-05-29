import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { useState } from 'react';
import PictureInfoModal from '.';

const StoryBookStack = createStackNavigator();
// or the native one
// const StoryBookStack = createNativeStackNavigator();

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

const Component = () => {
  const [visible, setVisible] = useState(true);
  return (
    <PictureInfoModal
      visible={visible}
      setVisible={setVisible}
      headerRightText="다음"
      headerTitle="플로어 추가"
      title=""
      manufactureYear=""
      materials=""
      scale=""
      description=""
      hashtags={[]}
      imageUrl="https://cdn.crowdpic.net/detail-thumb/thumb_d_1F5AF0BCBB2F43EF3C5B79DA763D3CFB.jpg"
    />
  );
};

storiesOf('PictureInfoModal', module)
  .addDecorator(withKnobs)
  .addDecorator(NavigationDecorator)
  .add('default', () => <Component />);
