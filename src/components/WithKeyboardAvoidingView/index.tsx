import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface WithKeyboardAvoidingViewProps {
  children: React.ReactNode;
}

const WithKeyboardAvoidingView = ({
  children,
}: WithKeyboardAvoidingViewProps) => (
  <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.select({ ios: 'padding' })}
    keyboardVerticalOffset={20}
  >
    {children}
  </KeyboardAvoidingView>
);

export { WithKeyboardAvoidingView };
