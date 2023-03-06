export const COLOR = {
  mono: {
    white: '#FFFFFF',
    gray1: '#F4F4F5',
    gray2: '#E9EAEA',
    gray3: '#D3D4D5',
    gray4: '#A7A9AB',
    gray5: '#7B7F82',
    gray6: '#4F5458',
    gray7: '#22292E',
    black: '#141718',
  },
  oeuvre: {
    blue1: '#ECF1F0',
    blue2: '#CCDCDE',
    blue3: '#9AB2B5',
    blue4: '#6FA1A7',
  },
  floor: {
    red: '#F9E2E2',
    orange: '#F4E2D8',
    yellow: '#FFF5DB',
    purple: '#EDECF1',
    blue: '#E3EBFB',
  },
  system: {
    blue: '#5AB5BF',
    red: '#EE5A5A',
  },
} as const;

export const FLOOR_BACKGROUND_COLORS = [
  COLOR.mono.white,
  COLOR.mono.gray1,
  COLOR.mono.gray5,
  COLOR.mono.gray7,
  COLOR.floor.blue,
  COLOR.oeuvre.blue1,
  COLOR.floor.purple,
  COLOR.floor.yellow,
  COLOR.floor.red,
  COLOR.floor.orange,
];

export const GRADIENT_COLOR_MAP = {
  [COLOR.mono.white]: COLOR.mono.white,
  [COLOR.mono.gray1]: COLOR.mono.white,
  [COLOR.mono.gray5]: COLOR.mono.gray3,
  [COLOR.mono.gray7]: COLOR.mono.gray5,
  [COLOR.floor.blue]: COLOR.mono.white,
  [COLOR.oeuvre.blue1]: COLOR.mono.white,
  [COLOR.floor.purple]: COLOR.mono.white,
  [COLOR.floor.yellow]: COLOR.mono.white,
  [COLOR.floor.red]: COLOR.mono.white,
  [COLOR.floor.orange]: COLOR.mono.white,
};
