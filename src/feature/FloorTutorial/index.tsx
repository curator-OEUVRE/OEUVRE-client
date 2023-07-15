/* eslint-disable react-native/no-color-literals */
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { IMAGE } from '@/constants/images';
import { COLOR, TEXT_STYLE } from '@/constants/styles';

interface FloorTutorialProps {
  onPressButton: () => void;
}

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  container: {
    backgroundColor: 'rgba(20, 23, 24, 0.8)',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  desc: {
    color: COLOR.mono.white,
    lineHeight: 18,
    opacity: 0.8,
  },
  footer: {
    alignItems: 'center',
    marginTop: 114,
  },
  img: {
    marginRight: 35,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 38,
  },
  title: {
    color: COLOR.mono.white,
    marginBottom: 4,
  },
  wrapTitle: {
    alignItems: 'center',
    marginBottom: 67,
  },
});

const FloorTutorial = ({ onPressButton }: FloorTutorialProps) => (
  <View style={styles.container}>
    <View style={styles.wrapTitle}>
      <Text style={[TEXT_STYLE.body16M, styles.title]}>
        OEUVRE 플로어 제작 팁
      </Text>
      <Text style={[TEXT_STYLE.body12M, styles.desc, styles.center]}>
        아래의 기능들을 사용해 자유롭게{'\n'}나만의 플로어를 완성하세요.
      </Text>
    </View>
    <View style={styles.section}>
      <Image source={IMAGE.tutorial.add} style={styles.img} />
      <View>
        <Text style={[TEXT_STYLE.body14M, styles.title]}>작품 추가</Text>
        <Text style={[TEXT_STYLE.body12M, styles.desc]}>
          작품 사이 구분선을 눌러{'\n'}작품을 추가할 수 있어요
        </Text>
      </View>
    </View>
    <View style={styles.section}>
      <Image source={IMAGE.tutorial.size} style={styles.img} />
      <View>
        <Text style={[TEXT_STYLE.body14M, styles.title]}>크기 변경</Text>
        <Text style={[TEXT_STYLE.body12M, styles.desc]}>
          두 손가락으로 작품의{'\n'}크기를 조절할 수 있어요
        </Text>
      </View>
    </View>
    <View style={styles.section}>
      <Image source={IMAGE.tutorial.order} style={styles.img} />
      <View>
        <Text style={[TEXT_STYLE.body14M, styles.title]}>순서 변경</Text>
        <Text style={[TEXT_STYLE.body12M, styles.desc]}>
          작품을 길게 눌러{'\n'}순서를 변경할 수 있어요
        </Text>
      </View>
    </View>
    <View style={styles.footer}>
      <Pressable onPress={onPressButton}>
        <Text style={[TEXT_STYLE.body14M, styles.title]}>플로어 제작하기</Text>
      </Pressable>
    </View>
  </View>
);

export default FloorTutorial;
