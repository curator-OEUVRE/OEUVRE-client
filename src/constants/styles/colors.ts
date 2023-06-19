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
    gray2: '#AAAAAA',
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
  [COLOR.floor.gray2]: ['#AAAAAA', '#FFFFFF'],
  [COLOR.floor.black]: ['#434343', '#C6CACB'],
};

export const FOOTER_GRADIENT_COLOR_MAP = {
  [COLOR.floor.sky]: ['#C5CCCE', '#E3ECEE'],
  [COLOR.floor.yellow]: ['#DBD8CE', '#ECE7D6'],
  [COLOR.floor.orange]: ['#D2CBC1', '#EBE5DC'],
  [COLOR.floor.green]: ['#BDC2BB', '#DDE3DB'],
  [COLOR.floor.purple]: ['#C5C5CE', '#DEDEE9'],
  [COLOR.floor.blue]: ['#C4CAD4', '#E3E6EB'],
  [COLOR.floor.white]: ['#EAEAEA', '#F2F2F2'],
  [COLOR.floor.gray1]: ['#D2D2D2', '#EBEBEB'],
  [COLOR.floor.gray2]: ['#AAAAAA', '#D9D9D9'],
  [COLOR.floor.black]: ['#434343', '#959A9B'],
};
