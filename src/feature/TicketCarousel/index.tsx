import React, { useCallback } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { interpolate } from 'react-native-reanimated';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import Ticket, { TicketProps } from '@/feature/Ticket';

const styles = StyleSheet.create({
  carousel: {
    height: 500,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});

interface TicketCarouselProps {
  data: TicketProps[];
  onPress?: (floorNo: number) => void;
  onProfilePress?: (userNo: number) => void;
  onEndReached?: () => void;
}

const TicketCarousel = React.forwardRef(
  (
    { data, onPress, onProfilePress, onEndReached }: TicketCarouselProps,
    ref: React.ForwardedRef<ICarouselInstance>,
  ) => {
    const { width: PAGE_WIDTH } = useWindowDimensions();
    const ITEM_SIZE = 210;
    const centerOffset = PAGE_WIDTH / 2 - ITEM_SIZE / 2;

    const animationStyle = useCallback(
      (value: number) => {
        'worklet';

        const itemGap = interpolate(value, [-1, 0, 1], [-70, 0, 70]);
        const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
        const rotateZ = `${interpolate(value, [-1, 0, 1], [-10, 0, 10])}deg`;
        const translateX =
          interpolate(value, [-1, 0, 1], [-ITEM_SIZE, 0, ITEM_SIZE]) +
          centerOffset +
          itemGap;

        return {
          transform: [{ rotateZ }, { translateX }],
          zIndex,
        };
      },
      [centerOffset],
    );

    return (
      <View style={styles.container}>
        <Carousel
          width={420}
          height={210}
          style={[styles.carousel, { width: PAGE_WIDTH }]}
          data={data}
          ref={ref}
          renderItem={({ index }) => (
            <Ticket
              {...data[index]}
              key={`ticket_${index}`}
              onPress={onPress}
              onProfilePress={onProfilePress}
            />
          )}
          loop={false}
          customAnimation={animationStyle}
          onScrollEnd={(index) => {
            if (index === data.length - 1) {
              onEndReached?.();
            }
          }}
        />
      </View>
    );
  },
);

export default TicketCarousel;