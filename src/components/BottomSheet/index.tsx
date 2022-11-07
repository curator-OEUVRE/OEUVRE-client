import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { COLOR, TEXT_STYLE } from '@/constants/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    backgroundColor: COLOR.mono.gray1,
    height: 12,
    width: '100%',
  },
  handle: {
    backgroundColor: COLOR.mono.gray3,
    height: 4,
    width: 48,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderColor: COLOR.mono.gray1,
    borderStyle: 'solid',
  },
  label: {
    flex: 1,
  },
  landscape: {
    flex: 1,
    marginHorizontal: '18%',
  },
  portrait: {
    flex: 1,
  },
  wrapGroup: {
    marginHorizontal: 35,
  },
  wrapItem: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 48,
    width: '100%',
  },
});

interface BottomSheetItemProps {
  label: string;
  icon: React.ReactNode;
  onPress?: () => void;
  color?: string;
}

const BottomSheetItem = ({
  label,
  icon,
  onPress,
  color = COLOR.mono.gray7,
}: BottomSheetItemProps) => (
  <Pressable onPress={onPress} style={styles.wrapItem}>
    <Text style={[styles.label, TEXT_STYLE.button16M, { color }]}>{label}</Text>
    <View>{icon}</View>
  </Pressable>
);

interface BottomSheetItemGroupProps {
  children?: React.ReactNode;
}

const BottomSheetItemGroup = ({ children }: BottomSheetItemGroupProps) => {
  const lastIdx = React.Children.toArray(children).length - 1;
  const renderChildren = () =>
    React.Children.map(children, (child, index) => (
      <View style={[styles.wrapGroup, index < lastIdx && styles.itemBorder]}>
        {child}
      </View>
    ));
  return <View>{renderChildren()}</View>;
};

interface BottomSheetComponentProps
  extends Omit<BottomSheetProps, 'children' | 'snapPoints'> {
  children?: React.ReactNode;
  onChange: (index: number) => void;
  snapPoints?: (number | string)[];
}

const BottomSheetComponent = React.forwardRef(
  (
    {
      children,
      onChange,
      index,
      snapPoints,
      ...bottomSheetProps
    }: BottomSheetComponentProps,
    ref: React.ForwardedRef<BottomSheet>,
  ) => {
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      [],
    );
    const lastIdx = React.Children.toArray(children).length - 1;
    const { width, height } = useWindowDimensions();
    const defaultSnapPoints = useMemo(() => {
      const points = [];
      for (let i = 0; i <= lastIdx; i += 1) {
        points.push(`${(i + 1) * (width < height ? 15 : 35)}%`);
      }
      return points;
    }, [lastIdx, height, width]);
    const renderChildren = () =>
      React.Children.map(children, (child, idx) =>
        idx < lastIdx ? (
          <>
            {child}
            <View style={styles.divider} />
          </>
        ) : (
          child
        ),
      );

    return (
      <BottomSheet
        ref={ref}
        index={index}
        enablePanDownToClose
        handleIndicatorStyle={styles.handle}
        backdropComponent={renderBackdrop}
        style={width > height ? styles.landscape : styles.portrait}
        onChange={onChange}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...bottomSheetProps}
        snapPoints={snapPoints || defaultSnapPoints}
      >
        <BottomSheetView
          // eslint-disable-next-line react-native/no-inline-styles
          style={styles.container}
        >
          {renderChildren()}
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

export { BottomSheetComponent, BottomSheetItem, BottomSheetItemGroup };
