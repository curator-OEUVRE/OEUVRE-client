import { useCallback, useState } from 'react';
import {
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Keyboard,
  View,
  StyleProp,
  ViewStyle,
  Pressable,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FloorStyleIcon from '@/assets/icons/FloorStyle';
import {
  Header,
  UserInputLayout,
  FormInput,
  FormInputStatus,
  SettingItem,
} from '@/components';
import { CREATE_FLOOR_CONFIG } from '@/constants/common';
import { IMAGE } from '@/constants/images';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import FloorPictureList from '@/feature/FloorPictureList';
import { validateFloorName } from '@/services/validation/createFloor';
import {
  useCreateFloorStore,
  FLOOR_BACKGROUND_COLORS,
} from '@/states/createFloorStore';

export type FloorInfoFormScreenParams = undefined;

const styles = StyleSheet.create({
  confirmText: {
    color: COLOR.system.blue,
  },
  floorIconWrap: {
    position: 'relative',
  },
  floorNameLengthText: {
    color: COLOR.mono.gray5,
  },
  icon: {
    marginTop: 6,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  safeAreaView: {
    backgroundColor: COLOR.mono.white,
    flex: 1,
  },
  shadow: {
    height: 95,
    left: -5,
    position: 'absolute',
    top: 1,
    width: 70,
    zIndex: -1,
  },
  subtitle: {
    marginBottom: 14,
  },
  toggleItem: {
    marginBottom: 8,
  },
});

interface FloorIconProps {
  color: string;
  flip: boolean;
  isSelected?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const FloorIcon = ({
  color,
  flip,
  style,
  isSelected,
  onPress,
}: FloorIconProps) => (
  <Pressable style={styles.floorIconWrap} onPress={onPress}>
    <FloorStyleIcon
      color={color}
      style={[
        style,
        {
          transform: flip ? undefined : [{ rotateY: '180deg' }],
        },
      ]}
    />
    {isSelected && (
      <Image
        source={IMAGE.floorStyleShadow}
        style={[
          styles.shadow,
          {
            transform: flip ? undefined : [{ rotateY: '180deg' }],
          },
        ]}
      />
    )}
  </Pressable>
);

const PICTURES = [
  {
    imageUri:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
    description: 'test',
    width: 640 / 5 / 375,
    height: 480 / 5 / 375,
    location: 0,
    hashtags: [],
  },
  {
    imageUri:
      'https://cdn.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej-1520x800.png',
    description: 'test',
    width: 1600 / 6 / 375,
    height: 840 / 6 / 375,
    location: 20 / 375,
    hashtags: [],
  },
  {
    imageUri:
      'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNoYW5nZXxlbnwwfHwwfHw%3D&w=1000&q=80',
    description: 'test',
    width: 1000 / 4 / 375,
    height: 667 / 4 / 375,
    location: 30 / 375,
    hashtags: [],
  },
  {
    imageUri:
      'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    description: 'test',
    width: 771 / 3 / 375,
    height: 480 / 3 / 375,
    location: -50 / 375,
    hashtags: [],
  },
];

const FloorInfoFormScreen = () => {
  const [data, setData] = useState(PICTURES);

  return <FloorPictureList pictures={data} setPictures={setData} editable />;

  const {
    name,
    setName,
    color,
    setColor,
    // texture,
    // setTexture,
    isPublic,
    setIsPublic,
    isCommentAvailable,
    setIsCommentAvailable,
  } = useCreateFloorStore();

  const ConfirmButton = useCallback(
    () => (
      <Pressable>
        <Text style={[TEXT_STYLE.button16M, styles.confirmText]}>다음</Text>
      </Pressable>
    ),
    [],
  );

  const FloorNameLength = useCallback(
    () => (
      <Text style={[TEXT_STYLE.body14R, styles.floorNameLengthText]}>
        {name.value.length}/{CREATE_FLOOR_CONFIG.floorName.limit[1]}
      </Text>
    ),
    [name.value.length],
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeAreaView}>
        <Header headerTitle="플로어 추가" headerRight={ConfirmButton} />
        <UserInputLayout
          infoMessage={`멋진 사진이네요!\n플로어를 소개해 주세요`}
          gap={28}
        >
          <FormInput
            label="플로어 이름"
            placeholder="플로어의 이름을 입력해 주세요. (총 1-10자)"
            value={name.value}
            status={name.status}
            message={name.error}
            onChangeText={(text) => {
              setName({ value: text });
            }}
            onBlur={() => {
              const [isValidated, error] = validateFloorName(name.value);
              if (isValidated) {
                setName({ status: FormInputStatus.Valid });
              } else {
                setName({ status: FormInputStatus.Error, error });
              }
            }}
            rightElement={
              name.value.length > 0 ? <FloorNameLength /> : undefined
            }
          />
          <View>
            <Text style={[styles.subtitle, TEXT_STYLE.body14B]}>
              플로어 배경색 설정
            </Text>
            <View>
              {FLOOR_BACKGROUND_COLORS.map((row, index) => (
                /* eslint-disable-next-line react/no-array-index-key */
                <View key={index} style={styles.iconsContainer}>
                  {row.map((backgroundColor) => (
                    <FloorIcon
                      key={backgroundColor}
                      color={backgroundColor}
                      flip={index % 2 === 0}
                      style={styles.icon}
                      isSelected={color === backgroundColor}
                      onPress={() => {
                        setColor(backgroundColor);
                      }}
                    />
                  ))}
                </View>
              ))}
            </View>
          </View>
          <View>
            <Text style={[styles.subtitle, TEXT_STYLE.body14B]}>
              플로어 권한 설정
            </Text>
            <View>
              <SettingItem.Toggle
                left="플로어 비공개"
                isSelected={!isPublic}
                onToggle={() => {
                  setIsPublic(!isPublic);
                }}
                style={styles.toggleItem}
              />
              <SettingItem.Toggle
                left="방명록 기능 해제"
                isSelected={!isCommentAvailable}
                onToggle={() => {
                  setIsCommentAvailable(!isCommentAvailable);
                }}
                style={styles.toggleItem}
              />
            </View>
          </View>
        </UserInputLayout>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default FloorInfoFormScreen;
