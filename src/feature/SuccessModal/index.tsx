/* eslint-disable react-native/no-raw-text */
import { BlurView } from 'expo-blur';
import { useEffect } from 'react';
import { Modal, Pressable, Image, Text, StyleSheet } from 'react-native';
import { IMAGE } from '@/constants/images';
import { COLOR, TEXT_STYLE } from '@/constants/styles';

interface SuccessModalProps {
  onPress: () => void;
}

const styles = StyleSheet.create({
  check: {
    height: 100,
    width: 100,
  },
  pressable: {
    flex: 1,
  },
  text: {
    color: COLOR.mono.black,
    textAlign: 'center',
  },
  wrapModal: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

const SuccessModal = ({ onPress }: SuccessModalProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onPress();
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [onPress]);
  return (
    <Modal transparent animationType="fade">
      <Pressable onPress={() => onPress()} style={styles.pressable}>
        <BlurView intensity={100} tint="light" style={styles.wrapModal}>
          <Image source={IMAGE.check} style={styles.check} />
          <Text style={[styles.text, TEXT_STYLE.title20M]}>
            축하드려요, {'\n'}
            <Text style={TEXT_STYLE.title20B}>새로운 플로어가</Text> 오픈됐어요!
          </Text>
        </BlurView>
      </Pressable>
    </Modal>
  );
};

export default SuccessModal;
