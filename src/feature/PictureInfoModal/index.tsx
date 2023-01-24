import { lockAsync, OrientationLock } from 'expo-screen-orientation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  Text,
  View,
  Image,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AddHashtagForm from '../AddHashtagForm';
import BrushIcon from '@/assets/icons/Brush';
import CalendarIcon from '@/assets/icons/Calendar';
import RulerIcon from '@/assets/icons/Ruler';
import {
  FormInput,
  Accordian,
  WithKeyboardAvoidingView,
  Header,
} from '@/components';
import { COLOR, TEXT_STYLE } from '@/constants/styles';

export interface PictureInfoModalValue {
  title: string;
  productionYear: string;
  materials: string;
  size: string;
  description: string;
  hashtags: string[];
}

interface PictureInfoModalProps extends PictureInfoModalValue {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onComplete?: (value: PictureInfoModalValue) => void;
  headerTitle?: string;
  headerRightText?: string;
  imageUri: string;
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
  imageUri,
  ...info
}: PictureInfoModalProps) => {
  const [title, setTitle] = useState<string>(info.title);
  const [productionYear, setProductionYear] = useState<string>(
    info.productionYear,
  );
  const [materials, setMaterials] = useState<string>(info.materials);
  const [size, setSize] = useState<string>(info.size);
  const [description, setDescription] = useState<string>(info.description);
  const [hashtags, setHashtag] = useState<string[]>([]);
  useEffect(() => {
    lockAsync(OrientationLock.PORTRAIT_UP);
  }, []);

  const hideModal = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onPressComplete = useCallback(async () => {
    hideModal();
    onComplete?.({
      title,
      productionYear,
      materials,
      size,
      description,
      hashtags,
    });
  }, [
    hideModal,
    onComplete,
    title,
    productionYear,
    materials,
    size,
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
          value={productionYear}
          onChangeText={setProductionYear}
          placeholder="제작년도"
          keyboardType="numeric"
        />
        <InputWithIcon
          icon={<BrushIcon />}
          onChangeText={setMaterials}
          value={materials}
          placeholder="재료 (총 20자)"
          rightElement={restLength(20, materials.length)}
        />
        <InputWithIcon
          icon={<RulerIcon />}
          onChangeText={setSize}
          value={size}
          placeholder="작품 크기 (총15자)"
          rightElement={restLength(15, size.length)}
        />
      </View>
    ),
    [materials, productionYear, size, restLength],
  );

  return (
    <Modal animationType="slide" visible={visible}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <WithKeyboardAvoidingView>
            <Header
              backgroundColor="transparent"
              headerTitle={headerTitle}
              onGoBack={hideModal}
              headerRight={headerRight}
            />
            <ScrollView>
              <View style={styles.up}>
                <View style={styles.wrapImage}>
                  <Image
                    source={{ uri: imageUri }}
                    style={styles.image}
                    resizeMode="center"
                  />
                </View>
                <View style={styles.wrapInput}>
                  <View style={styles.wrapTitle}>
                    <FormInput
                      label="Title"
                      value={title}
                      onChangeText={setTitle}
                      placeholder="작품의 제목을 입력해주세요. (총 15자)"
                      rightElement={restLength(15, title.length)}
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
                  placeholder="작품의 설명을 입력해주세요. (총 55자)"
                  rightElement={restLength(55, description.length)}
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
