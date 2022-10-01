import { Pressable, PressableProps } from 'react-native';
import CheckCircleIcon from '@/assets/icons/CheckCircle';
import CheckCircleUncheckOutlineIcon from '@/assets/icons/CheckCircleUncheckOutline';
import { COLOR } from '@/constants/styles/colors';

interface Props extends PressableProps {
  isChecked?: boolean;
  size?: number;
}

export const Checkbox = ({
  isChecked = false,
  size = 26,
  ...pressableProps
}: Props) => (
  // spreading이 문제가 될 상황이 아니라고 판단
  /* eslint-disable-next-line react/jsx-props-no-spreading */
  <Pressable {...pressableProps}>
    {isChecked ? (
      <CheckCircleIcon width={size} height={size} color={COLOR.system.blue} />
    ) : (
      <CheckCircleUncheckOutlineIcon
        width={size}
        height={size}
        color={COLOR.mono.gray3}
      />
    )}
  </Pressable>
);
