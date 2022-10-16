import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { WithKeyboardAvoidingView } from '../WithKeyboardAvoidingView';
import { COLOR } from '@/constants/styles/colors';
import { TEXT_STYLE } from '@/constants/styles/textStyles';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
    position: 'relative',
  },
  text: {
    color: COLOR.mono.black,
    marginBottom: 38,
    marginTop: 24,
    paddingHorizontal: 20,
  },
  wrapButton: {
    alignItems: 'center',
    height: 48,
    marginBottom: 34,
  },
});

interface UserInputLayoutProps {
  children: React.ReactNode;
  infoMessage: string;
  gap?: number;
  button?: React.ReactNode;
}

const UserInputLayout = ({
  children,
  infoMessage,
  gap = 0,
  button,
}: UserInputLayoutProps) => {
  const renderChildren = () =>
    React.Children.map(children, (child) => (
      <View style={{ marginBottom: gap }}>{child}</View>
    ));
  return (
    <WithKeyboardAvoidingView>
      <Text style={[styles.text, TEXT_STYLE.title20M]}>{infoMessage}</Text>
      <ScrollView style={styles.content}>{renderChildren()}</ScrollView>
      {button && <View style={styles.wrapButton}>{button}</View>}
    </WithKeyboardAvoidingView>
  );
};

export { UserInputLayout };
