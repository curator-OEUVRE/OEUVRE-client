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
    sky: '#CEDFE4',
    yellow: '#E9E2BD',
    orange: '#E1D1BA',
    green: '#BCD6B2',
    purple: '#CEC7E2',
    blue: '#C6D1E3',
    white: '#EAEAEA',
    gray1: '#D2D2D2',
    gray2: '#939393',
    black: '#434343',
  },
  system: {
    blue: '#5AB5BF',
    red: '#EE5A5A',
  },
  notification: {
    blue: '#EAFAFF',
  },
} as const;

export const FLOOR_BACKGROUND_COLORS = [
  COLOR.floor.sky,
  COLOR.floor.yellow,
  COLOR.floor.orange,
  COLOR.floor.green,
  COLOR.floor.purple,
  COLOR.floor.blue,
  COLOR.floor.white,
  COLOR.floor.gray1,
  COLOR.floor.gray2,
  COLOR.floor.black,
];

export const BACKGROUND_GRADIENT_COLOR_MAP = {
  [COLOR.floor.sky]: ['#C5CCCE', '#FFFFFF'],
  [COLOR.floor.yellow]: ['#DBD8CE', '#FFFFFF'],
  [COLOR.floor.orange]: ['#D2CBC1', '#FFFFFF'],
  [COLOR.floor.green]: ['#BDC2BB', '#FFFFFF'],
  [COLOR.floor.purple]: ['#C5C5CE', '#FFFFFF'],
  [COLOR.floor.blue]: ['#C4CAD4', '#FFFFFF'],
  [COLOR.floor.white]: ['#EAEAEA', '#FFFFFF'],
  [COLOR.floor.gray1]: ['#D2D2D2', '#FFFFFF'],
  [COLOR.floor.gray2]: ['#939393', '#DFDFDF'],
  [COLOR.floor.black]: ['#434343', '#939393'],
};

export const FOOTER_GRADIENT_COLOR_MAP = {
  [COLOR.floor.sky]: ['#E3ECEE', '#C5CCCE'],
  [COLOR.floor.yellow]: ['#ECE7D6', '#DBD8CE'],
  [COLOR.floor.orange]: ['#EBE5DC', '#D2CBC1'],
  [COLOR.floor.green]: ['#DDE3DB', '#BDC2BB'],
  [COLOR.floor.purple]: ['#DEDEE9', '#C5C5CE'],
  [COLOR.floor.blue]: ['#E3E6EB', '#C4CAD4'],
  [COLOR.floor.white]: ['#F2F2F2', '#EAEAEA'],
  [COLOR.floor.gray1]: ['#EBEBEB', '#D2D2D2'],
  [COLOR.floor.gray2]: ['#D9D9D9', '#AAAAAA'],
  [COLOR.floor.black]: ['#959A9B', '#434343'],
};
