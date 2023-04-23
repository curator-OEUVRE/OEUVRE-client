import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Shadow } from 'react-native-shadow-2';
import ArrowUpIcon from '@/assets/icons/ArrowUpSmall';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import { OtherFloor } from '@/types/guestbook';

interface FloorDropDownProps {
  // 1층부터 시작하지만 여기서 데이터는 array로 들어올 거 같으므로 편의를 위해 0부터 시작하는 idx 사용
  currentIdx: number;
  floors: OtherFloor[];
  onPress: (idx: number) => void;
}

const styles = StyleSheet.create({
  arrow: {
    transform: [
      {
        rotate: '180deg',
      },
    ],
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: COLOR.mono.gray1,
    borderStyle: 'solid',
  },
  container: {
    flex: 1,
    height: 27,
  },
  floorName: {
    flex: 1,
  },
  floorNum: {
    color: COLOR.mono.gray3,
    marginRight: 32,
  },
  option: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 44,
    paddingLeft: 37,
  },
  pressable: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  scrollView: {
    overflow: 'scroll',
  },
  title: {
    color: COLOR.mono.gray7,
    marginRight: 6,
  },
  wrapOptions: {
    backgroundColor: COLOR.mono.white,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    height: 180,
    left: 0,
    paddingBottom: 18,
    paddingLeft: 35,
    paddingRight: 20,
    paddingTop: 12,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 100,
  },
});

const FloorDropDown = ({ currentIdx, floors, onPress }: FloorDropDownProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const renderFloors = () =>
    floors.map(({ name, floorNo }, idx) => (
      <Pressable
        style={[styles.option, idx > 0 && styles.borderBottom]}
        onPress={() => {
          onPress(floorNo);
          setOpen(false);
        }}
        key={`floor_${floors.length - idx}_${name}`}
      >
        <Text style={styles.floorNum}>{floors.length - idx}F</Text>
        <Text
          style={[
            styles.floorName,
            {
              color: currentIdx === idx ? COLOR.mono.gray3 : COLOR.mono.gray7,
            },
            TEXT_STYLE.body14R,
          ]}
        >
          {name}
        </Text>
      </Pressable>
    ));
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressable}
        onPress={() => setOpen((prev) => !prev)}
      >
        <Text style={[styles.title, TEXT_STYLE.body16M]}>
          {currentIdx >= 0 && currentIdx < floors.length
            ? floors[currentIdx].name
            : '플로어'}
        </Text>
        <ArrowUpIcon style={!open && styles.arrow} />
      </Pressable>
      {open && (
        <Shadow
          style={styles.wrapOptions}
          startColor="#00000025"
          sides={{ bottom: true, top: false, start: false, end: false }}
          paintInside
        >
          <ScrollView style={styles.scrollView} persistentScrollbar>
            <View onStartShouldSetResponder={() => true}>{renderFloors()}</View>
          </ScrollView>
        </Shadow>
      )}
    </View>
  );
};

export default FloorDropDown;
