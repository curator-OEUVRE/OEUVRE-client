import {
  type CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { BlurView } from 'expo-blur';
import { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  ImageRequireSource,
  Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import PagerView from 'react-native-pager-view';
import Animated, {
  SharedValue,
  useSharedValue,
  interpolateColor,
  useDerivedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IMAGE } from '@/constants/images';
import { Screen } from '@/constants/screens';
import { TEXT_STYLE, COLOR } from '@/constants/styles';
import type { RootStackParamsList } from '@/feature/Routes';
import type { AuthStackParamsList } from '@/feature/Routes/AuthStack';

export type OnboardingScreenParams = undefined;

export type OnboardingScreenNP = CompositeNavigationProp<
  StackNavigationProp<AuthStackParamsList, Screen.LoginScreen>,
  StackNavigationProp<RootStackParamsList>
>;

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  backgroundImageBlurView: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  backgroundImageWrap: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLOR.system.blue,
    borderRadius: 10,
    bottom: 24,
    height: 48,
    justifyContent: 'center',
    left: 20,
    position: 'absolute',
    right: 20,
  },
  buttonText: {
    color: COLOR.mono.white,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  image: {
    height: '55%',
    width: '100%',
  },
  indicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '5%',
    width: '100%',
  },
  page: {
    height: '100%',
    width: '100%',
  },
  pagerView: {
    flex: 1,
    marginTop: '25%',
  },
  paginationDot: {
    borderRadius: 4,
    height: 8,
  },
  safeAreaView: {
    flex: 1,
    position: 'relative',
  },
  skipButtonText: {
    color: COLOR.mono.gray3,
    marginRight: 18,
  },
  text: {
    color: COLOR.mono.white,
    marginTop: '20%',
    textAlign: 'center',
  },
  topBar: {
    alignItems: 'flex-end',
    height: 45,
    justifyContent: 'center',
    width: '100%',
  },
});

interface PaginationDotProps {
  page: number;
  offset: SharedValue<number>;
}

const MINIMUM = 8;

const PaginationDot = ({ page, offset }: PaginationDotProps) => {
  const progress = useDerivedValue(() => {
    if (offset.value < page - 1 || offset.value > page + 1) {
      return 0;
    }

    if (offset.value < page) {
      return offset.value - page + 1;
    }
    return page + 1 - offset.value;
  });

  const animatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [COLOR.mono.gray2, COLOR.system.blue],
    );

    return {
      backgroundColor: color,
      width: 16 * progress.value + MINIMUM,
      marginLeft: page !== 0 ? 6 : 0,
    };
  });

  return <Animated.View style={[styles.paginationDot, animatedStyle]} />;
};

interface PageProps {
  image: ImageRequireSource;
  text: string;
  button?: JSX.Element;
}

const Page = ({ image, text, button }: PageProps) => (
  <View style={styles.page}>
    <FastImage source={image} style={styles.image} resizeMode="contain" />
    <Text style={[TEXT_STYLE.body16M, styles.text]}>{text}</Text>
    {button}
  </View>
);

const PAGE_NUM = 5;

const OnboardingScreen = () => {
  const navigation = useNavigation<OnboardingScreenNP>();
  const offset = useSharedValue(0);
  const pagerViewRef = useRef<PagerView>(null);
  const [page, setPage] = useState(0);

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: page === PAGE_NUM - 1 ? withTiming(1) : withTiming(0),
  }));

  return (
    <View style={styles.container}>
      <View style={styles.backgroundImageWrap}>
        <Image
          /* eslint-disable-next-line global-require */
          source={require('@/assets/images/login.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <BlurView
          intensity={10}
          tint="dark"
          style={styles.backgroundImageBlurView}
        />
      </View>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <View style={styles.topBar}>
            {page < PAGE_NUM - 1 && (
              <Pressable
                onPress={() => {
                  pagerViewRef.current?.setPage(PAGE_NUM - 1);
                }}
              >
                <Text style={[TEXT_STYLE.button16M, styles.skipButtonText]}>
                  건너뛰기
                </Text>
              </Pressable>
            )}
          </View>

          <View style={styles.indicator}>
            {[...Array(5)].map((v, index) => (
              /* eslint-disable-next-line react/no-array-index-key */
              <PaginationDot key={index} offset={offset} page={index} />
            ))}
          </View>
          <AnimatedPagerView
            initialPage={0}
            onPageScroll={(e) => {
              'worklet';

              offset.value = e.nativeEvent.offset + e.nativeEvent.position;
            }}
            onPageSelected={(e) => {
              setPage(e.nativeEvent.position);
            }}
            style={styles.pagerView}
            ref={pagerViewRef}
          >
            <Page
              key="0"
              image={IMAGE.onboarding[0]}
              text={`사진이 작품이 되는 공간\nOEUVRE 입니다`}
            />
            <Page
              key="1"
              image={IMAGE.onboarding[1]}
              text={`사진을 자유롭게 디스플레이하고\n나만의 전시회를 열어보세요`}
            />
            <Page
              key="2"
              image={IMAGE.onboarding[2]}
              text={`전시회를 거닐듯\n작품들을 가로로 감상할 수 있어요`}
            />
            <Page
              key="3"
              image={IMAGE.onboarding[3]}
              text={`비율에 상관없이 꽉 찬 화면으로\n작품을 오롯이 느껴보세요`}
            />
            <Page
              key="4"
              image={IMAGE.onboarding[4]}
              text={`작가님의\n멋진 전시회를 오픈해보세요!`}
            />
          </AnimatedPagerView>
          <AnimatedPressable
            style={[styles.button, buttonStyle]}
            onPress={() => {
              if (page === PAGE_NUM - 1) {
                navigation.navigate(Screen.LoginScreen);
              }
            }}
          >
            <Text style={[TEXT_STYLE.button16M, styles.buttonText]}>
              시작하기
            </Text>
          </AnimatedPressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default OnboardingScreen;
