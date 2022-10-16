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
import { IMAGE } from '@/constants/images';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import { validateFloorName } from '@/services/validation/createFloor';
import {
  useCreateFloorStore,
  FLOOR_BACKGROUND_COLORS,
} from '@/states/createFloorStore';

export type FloorInfoFormScreenParams = undefined;

const styles = StyleSheet.create({
  floorIconWrap: {
    position: 'relative',
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
    {isSelected ? (
      <Image
        source={IMAGE.floorStyleShadow}
        style={[
          styles.shadow,
          {
            transform: flip ? undefined : [{ rotateY: '180deg' }],
          },
        ]}
      />
    ) : null}
  </Pressable>
);

const FloorInfoFormScreen = () => {
  const {
    name,
    setName,
    color,
    setColor,
    texture,
    setTexture,
    isPublic,
    setIsPublic,
    isCommentAvailable,
    setIsCommentAvailable,
  } = useCreateFloorStore();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeAreaView}>
        <Header headerTitle="플로어 추가" />
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
