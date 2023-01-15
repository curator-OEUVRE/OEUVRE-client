import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { useState } from 'react';
import ImagePickerModal from '.';

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
    <ImagePickerModal
      visible={visible}
      setVisible={setVisible}
      headerRightText="다음"
      headerTitle="플로어 추가"
    />
  );
};

storiesOf('ImagePickerModal', module)
  .addDecorator(withKnobs)
  .addDecorator(NavigationDecorator)
  .add('default', () => <Component />);
