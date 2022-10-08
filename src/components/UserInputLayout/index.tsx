import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { COLOR } from '@/constants/styles/colors';
import { TEXT_STYLE } from '@/constants/styles/textStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  text: {
    color: COLOR.mono.black,
    marginBottom: 38,
    marginTop: 24,
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding' })}
      keyboardVerticalOffset={20}
    >
      <Text style={[styles.text, TEXT_STYLE.title20M]}>{infoMessage}</Text>
      <View style={styles.content}>{renderChildren()}</View>
      {button && <View style={styles.wrapButton}>{button}</View>}
    </KeyboardAvoidingView>
  );
};

export { UserInputLayout };
