import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Handle from './Handle';
import { COLOR, TEXT_STYLE } from '@/constants/styles';

interface ImageInfoSheetProps {
  title: string;
  manufactureYear: string;
  materials: string;
  scale: string;
  description: string;
  userId: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  description: {
    color: COLOR.mono.gray7,
    lineHeight: 18,
  },
  info: {
    paddingBottom: 8,
    width: '100%',
  },
  sheet: {
    elevation: 5,
    flex: 1,
    marginHorizontal: 20,
    shadowColor: COLOR.mono.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  summary: {
    color: COLOR.mono.gray5,
    textAlign: 'right',
  },
  title: {
    color: COLOR.mono.black,
  },
  userId: {
    color: COLOR.mono.black,
    marginBottom: 2,
    textAlign: 'right',
  },
  wrapDescription: {
    borderTopColor: COLOR.mono.gray3,
    borderTopWidth: 1,
    paddingTop: 8,
  },
});

const PictureInfoSheet = React.forwardRef(
  (
    {
      title,
      manufactureYear,
      materials,
      scale,
      userId,
      description,
    }: ImageInfoSheetProps,
    ref: React.ForwardedRef<BottomSheet>,
  ) => {
    const [index, setIndex] = useState<number>(0);
    const snapPoints = useMemo(() => [92, 160], []);
    const summary = [manufactureYear, materials, scale].join(', ');
    return (
      <BottomSheet
        ref={ref}
        snapPoints={snapPoints}
        style={styles.sheet}
        index={index}
        onChange={setIndex}
        handleComponent={Handle}
      >
        <BottomSheetView style={styles.container}>
          <View style={styles.info}>
            <Text style={[styles.title, TEXT_STYLE.body14M]}>
              {title || '무제'}
            </Text>
            <Text style={[styles.userId, TEXT_STYLE.body12R]}>{userId}</Text>
            <Text style={[styles.summary, TEXT_STYLE.body12R]}>{summary}</Text>
          </View>
          {index > 0 && (
            <View style={styles.wrapDescription}>
              <Text style={[styles.description, TEXT_STYLE.body12R]}>
                {description}
              </Text>
            </View>
          )}
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

export default PictureInfoSheet;
