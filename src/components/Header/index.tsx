import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ArrowBackIcon from '@/assets/icons/ArrowBack';
import { TEXT_STYLE } from '@/constants/styles';
import { COLOR } from '@/constants/styles/colors';

interface HeaderProps {
  headerLeft?: () => React.ReactNode;
  headerTitle?: string | (() => React.ReactNode);
  headerRight?: ({ iconColor }: { iconColor?: string }) => React.ReactNode;
  backgroundColor?: string;
  iconColor?: string;
  onGoBack?: () => void;
  hideBackButton?: boolean;
  defaultBackAction?: boolean;
}

const styles = StyleSheet.create({
  arrowLeft: {
    height: 26,
    width: 26,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 45,
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    zIndex: 100,
  },
  left: {
    alignItems: 'center',
    justifyContent: 'center',
    left: 13,
    position: 'absolute',
    top: 10,
    zIndex: 10,
  },
  right: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    right: 18,
    zIndex: 10,
  },
});

const Header = ({
  headerLeft,
  headerTitle,
  headerRight,
  onGoBack,
  backgroundColor = COLOR.mono.white,
  iconColor = COLOR.mono.black,
  hideBackButton = false,
  defaultBackAction = true,
}: HeaderProps) => {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const marginTop = isLandscape && Platform.OS === 'ios' ? 18 : 0;
  const { left, right } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { backgroundColor, marginTop }]}>
      <View style={[styles.left, { paddingLeft: left }]}>
        {headerLeft
          ? headerLeft()
          : !hideBackButton && (
              <Pressable
                style={styles.arrowLeft}
                onPress={() => {
                  if (onGoBack) {
                    onGoBack();
                  }
                  if (defaultBackAction) {
                    navigation.goBack();
                  }
                }}
                hitSlop={10}
              >
                <ArrowBackIcon color={iconColor} />
              </Pressable>
            )}
      </View>

      {typeof headerTitle === 'string' ? (
        <Text style={[TEXT_STYLE.body16M, { color: iconColor }]}>
          {headerTitle}
        </Text>
      ) : (
        headerTitle && headerTitle()
      )}
      <View style={[styles.right, { paddingRight: right }]}>
        {headerRight && headerRight({ iconColor })}
      </View>
    </View>
  );
};

export { Header };
