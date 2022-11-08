import { NavigationContainer } from '@react-navigation/native';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PictureDescriptionModal from '.';
import { Button } from '@/components/Button';
import { COLOR } from '@/constants/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Component = () => {
  const [visible, setVisible] = useState(false);

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Button
          onPress={() => {
            setVisible(true);
          }}
        >
          <Text style={{ color: COLOR.mono.white }}>모달 열기</Text>
        </Button>
        <PictureDescriptionModal
          imageUri={text(
            'imageUri',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
          )}
          onBackPress={() => {
            setVisible(false);
          }}
          setDescription={action('setDescription')}
          visible={visible}
          hashtags={['어쩌구저쩌구', '이러쿵저러쿵쿵', '해시태그', '입니다']}
          onHashtagPress={action('onHashtagPress')}
        />
      </SafeAreaView>
    </NavigationContainer>
  );
};

storiesOf('PictureDescriptionModal', module)
  .addDecorator(withKnobs)
  .add('default', () => <Component />);
