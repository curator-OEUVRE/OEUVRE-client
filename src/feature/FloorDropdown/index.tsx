import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Shadow } from 'react-native-shadow-2';
import ArrowDownIcon from '@/assets/icons/ArrowDown';
import ArrowUpIcon from '@/assets/icons/ArrowUp';
import { COLOR, TEXT_STYLE } from '@/constants/styles';

interface FloorDropDownProps {
  // 1층부터 시작하지만 여기서 데이터는 array로 들어올 거 같으므로 편의를 위해 0부터 시작하는 idx 사용
  currentIdx: number;
  floorNames: string[];
  onChange: (idx: number) => void;
}

const styles = StyleSheet.create({
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: COLOR.mono.gray1,
    borderStyle: 'solid',
  },
  container: {
    // backgroundColor: COLOR.system.red,
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

const FloorDropDown = ({
  currentIdx,
  floorNames,
  onChange,
}: FloorDropDownProps) => {
  const renderFloors = () =>
    floorNames
      .map((name, idx) => (
        <Pressable
          style={[styles.option, idx > 0 && styles.borderBottom]}
          onPress={() => onChange(idx)}
          key={`floor_${idx + 1}_${name}`}
        >
          <Text style={styles.floorNum}>{idx + 1}F</Text>
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
      ))
      .reverse();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressable}
        onPress={() => setOpen((prev) => !prev)}
      >
        <Text style={[styles.title, TEXT_STYLE.title18M]}>
          {floorNames[currentIdx]}
        </Text>
        {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </Pressable>
      {open && (
        <Shadow
          style={styles.wrapOptions}
          startColor="#00000025"
          sides={{ bottom: true, top: false, start: false, end: false }}
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
