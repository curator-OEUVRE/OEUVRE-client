import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface WithKeyboardAvoidingViewProps {
  children: React.ReactNode;
  keyboardVerticalOffset?: number;
}

const WithKeyboardAvoidingView = ({
  children,
  keyboardVerticalOffset = 20,
}: WithKeyboardAvoidingViewProps) => (
  <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.select({ ios: 'padding' })}
    keyboardVerticalOffset={keyboardVerticalOffset}
  >
    {children}
  </KeyboardAvoidingView>
);

export { WithKeyboardAvoidingView };
