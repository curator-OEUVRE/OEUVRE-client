import { COLOR, GRADIENT_COLOR_MAP } from '@/constants/styles';
import { FloorGradient, FloorBackgroundColor } from '@/types/floor';
/* eslint-disable no-bitwise */

interface Options {
  light?: string;
  dark?: string;
}

export const getColorByBackgroundColor = (
  hexColor: string,
  options?: Options,
) => {
  const light = options?.light || COLOR.mono.white;
  const dark = options?.dark || COLOR.mono.gray7;
  const c = hexColor.substring(1); // 색상 앞의 # 제거
  const rgb = parseInt(c, 16); // rrggbb를 10진수로 변환
  const r = (rgb >> 16) & 0xff; // red 추출
  const g = (rgb >> 8) & 0xff; // green 추출
  const b = (rgb >> 0) & 0xff; // blue 추출
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  // 색상 선택
  return luma < 127.5 ? light : dark; // 글자색이
};

export const getBackgroundColorsByGradient = ({
  color,
  gradient,
}: {
  color: FloorBackgroundColor;
  gradient: FloorGradient;
}) => {
  if (gradient === FloorGradient.FULL) return [color, color];
  if (gradient === FloorGradient.BOTTOM)
    return [color, GRADIENT_COLOR_MAP[color]];
  return [GRADIENT_COLOR_MAP[color], color];
};
