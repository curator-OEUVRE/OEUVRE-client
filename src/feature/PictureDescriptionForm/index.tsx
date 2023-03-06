import React from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import PictureDescriptionList from './PictureDescriptionList';
import { WithKeyboardAvoidingView } from '@/components';
import { Picture } from '@/types/picture';

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
  },
});

interface PictureDescriptionFormProps {
  onHashtagPress: (id: number) => void;
  data: Picture[];
  changeDescriptionByIdx: (idx: number, description: string) => void;
}

const PictureDescriptionForm = ({
  onHashtagPress,
  data,
  changeDescriptionByIdx,
}: PictureDescriptionFormProps) => (
  <WithKeyboardAvoidingView>
    <View style={styles.content}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <PictureDescriptionList
          {...{ onHashtagPress, data, changeDescriptionByIdx }}
        />
      </TouchableWithoutFeedback>
    </View>
  </WithKeyboardAvoidingView>
);

export default PictureDescriptionForm;
