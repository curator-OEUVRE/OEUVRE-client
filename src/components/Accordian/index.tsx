import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  UIManager,
  LayoutAnimation,
  Platform,
} from 'react-native';
import ArrowDownIcon from '@/assets/icons/ArrowDown';
import ArrowUpIcon from '@/assets/icons/ArrowUp';
import { COLOR, TEXT_STYLE } from '@/constants/styles';

interface AccordianProps {
  children: React.ReactNode;
  label: string;
}

const styles = StyleSheet.create({
  label: {
    color: COLOR.mono.black,
    marginRight: 12,
  },
  labelArea: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 26,
  },
});

const Accordian = ({ children, label }: AccordianProps) => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);
  const [expanded, setExpanded] = useState(false);
  const onPress = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
  }, []);
  return (
    <View>
      <View style={styles.labelArea}>
        <Text style={[TEXT_STYLE.body14B, styles.label]}>{label}</Text>
        <Pressable onPress={onPress}>
          {expanded ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </Pressable>
      </View>
      {expanded && <View>{children}</View>}
    </View>
  );
};

export { Accordian };
