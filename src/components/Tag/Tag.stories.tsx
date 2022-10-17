import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import { Tag } from '.';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

storiesOf('Tag', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <View style={styles.container}>
      <Tag
        text={text('text', '해시태그')}
        onDeletePress={action('onDeletePress')}
      />
    </View>
  ));
