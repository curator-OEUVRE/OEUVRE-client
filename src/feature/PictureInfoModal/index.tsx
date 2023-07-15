import React, { useCallback, useMemo, useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInputProps,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AddHashtagForm from '../AddHashtagForm';
import BrushIcon from '@/assets/icons/Brush';
import CalendarIcon from '@/assets/icons/Calendar';
import RulerIcon from '@/assets/icons/Ruler';
import {
  Accordian,
  FormInput,
  Header,
  WithKeyboardAvoidingView,
} from '@/components';
import { COLOR, TEXT_STYLE } from '@/constants/styles';

export interface PictureInfoModalValue {
  title: string;
  manufactureYear: string;
  material: string;
  scale: string;
  description: string;
  hashtags: string[];
}

interface PictureInfoModalProps extends PictureInfoModalValue {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onComplete?: (value: PictureInfoModalValue) => void;
  onGoBack?: () => void;
  headerTitle?: string;
  headerRightText?: string;
  imageUrl: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  down: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingVertical: 21,
  },
  floorNameLengthText: {
    color: COLOR.mono.gray5,
    marginTop: 'auto',
  },
  gap: {
    backgroundColor: COLOR.mono.gray1,
    height: 21,
    width: '100%',
  },
  iconWrap: {
    flexDirection: 'row',
    marginTop: 12,
  },
  image: {
    flex: 1,
  },
  left: {
    flex: 1,
    marginLeft: 8,
  },
  up: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingBottom: 16,
  },
  wrapImage: {
    height: 312,
    marginBottom: 18,
    width: '100%',
  },
  wrapInput: {
    paddingHorizontal: 20,
  },
  wrapTitle: {
    marginBottom: 35,
  },
});

interface InputWithIconProps extends TextInputProps {
  icon: React.ReactNode;
  rightElement?: React.ReactNode;
}

const InputWithIcon = ({
  icon,
  rightElement,
  ...textInputProps
}: InputWithIconProps) => (
  <View style={styles.iconWrap}>
    {icon}
    <FormInput
      {...textInputProps}
      containerStyle={styles.left}
      rightElement={rightElement}
    />
  </View>
);

const PictureInfoModal = ({
  visible,
  setVisible,
  onComplete,
  headerTitle,
  headerRightText,
  imageUrl,
  onGoBack,
  ...info
}: PictureInfoModalProps) => {
  const [title, setTitle] = useState<string>(info.title || '');
  const [manufactureYear, setManufactureYear] = useState<string>(
    info.manufactureYear || '',
  );
  const [material, setMaterial] = useState<string>(info.material || '');
  const [scale, setScale] = useState<string>(info.scale || '');
  const [description, setDescription] = useState<string>(
    info.description || '',
  );
  const [hashtags, setHashtag] = useState<string[]>(info.hashtags || []);
  const hideModal = useCallback(() => {
    setVisible(false);
    onGoBack?.();
  }, [setVisible, onGoBack]);

  const onPressComplete = useCallback(async () => {
    hideModal();
    onComplete?.({
      title,
      manufactureYear,
      material,
      scale,
      description,
      hashtags,
    });
  }, [
    hideModal,
    onComplete,
    title,
    manufactureYear,
    material,
    scale,
    description,
    hashtags,
  ]);

  const headerRight = useCallback(
    () => (
      <Pressable onPress={onPressComplete}>
        <Text style={[TEXT_STYLE.body16M, { color: COLOR.system.blue }]}>
          {headerRightText}
        </Text>
      </Pressable>
    ),
    [onPressComplete, headerRightText],
  );
  const restLength = useCallback((limit: number, current: number) => {
    if (current > 0)
      return (
        <Text style={[TEXT_STYLE.body14R, styles.floorNameLengthText]}>
          {limit - current}
        </Text>
      );
    return undefined;
  }, []);

  const ArtistContent = useMemo(
    () => (
      <View>
        <InputWithIcon
          icon={<CalendarIcon />}
          value={manufactureYear}
          onChangeText={setManufactureYear}
          placeholder="제작년도"
          keyboardType="numeric"
          maxLength={4}
        />
        <InputWithIcon
          icon={<BrushIcon />}
          onChangeText={setMaterial}
          value={material}
          placeholder="재료"
          rightElement={restLength(20, material.length)}
          maxLength={20}
        />
        <InputWithIcon
          icon={<RulerIcon />}
          onChangeText={setScale}
          value={scale}
          placeholder="작품 크기"
          rightElement={restLength(20, scale.length)}
          maxLength={20}
        />
      </View>
    ),
    [material, manufactureYear, scale, restLength],
  );

  return (
    <Modal
      animationType="slide"
      visible={visible}
      supportedOrientations={['portrait', 'landscape']}
    >
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <WithKeyboardAvoidingView>
            <Header
              backgroundColor="transparent"
              headerTitle={headerTitle}
              onGoBack={hideModal}
              headerRight={headerRight}
              defaultBackAction={false}
            />
            <ScrollView>
              <View style={styles.up}>
                <View style={styles.wrapImage}>
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.wrapInput}>
                  <View style={styles.wrapTitle}>
                    <FormInput
                      label="Title"
                      value={title}
                      onChangeText={setTitle}
                      rightElement={restLength(20, title.length)}
                      maxLength={20}
                      multiline
                    />
                  </View>
                  <Accordian label="For Artist">{ArtistContent}</Accordian>
                </View>
              </View>
              <View style={styles.gap} />
              <View style={[styles.down, styles.wrapInput]}>
                <FormInput
                  label="Description"
                  value={description}
                  onChangeText={setDescription}
                  rightElement={restLength(55, description.length)}
                  maxLength={55}
                  multiline
                />
                <AddHashtagForm hashtags={hashtags} setHashtag={setHashtag} />
              </View>
            </ScrollView>
          </WithKeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};

export default PictureInfoModal;
