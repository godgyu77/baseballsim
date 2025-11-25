export interface Team {
  id: string;
  name: string;
  fullName: string;
  color: string;
  secondaryColor: string;
  icon: string;
}

export const TEAMS: Team[] = [
  {
    id: 'kia',
    name: 'KIA',
    fullName: 'KIA 타이거즈',
    color: '#EA0029',
    secondaryColor: '#000000',
    icon: '🐅',
  },
  {
    id: 'samsung',
    name: '삼성',
    fullName: '삼성 라이온즈',
    color: '#1D4D8B',
    secondaryColor: '#FFD700',
    icon: '🦁',
  },
  {
    id: 'lg',
    name: 'LG',
    fullName: 'LG 트윈스',
    color: '#C30452',
    secondaryColor: '#000000',
    icon: '👯',
  },
  {
    id: 'doosan',
    name: '두산',
    fullName: '두산 베어스',
    color: '#131230',
    secondaryColor: '#0D4A9B',
    icon: '🐻',
  },
  {
    id: 'kt',
    name: 'KT',
    fullName: 'KT 위즈',
    color: '#000000',
    secondaryColor: '#FFD700',
    icon: '⚡',
  },
  {
    id: 'ssg',
    name: 'SSG',
    fullName: 'SSG 랜더스',
    color: '#CE0E2D',
    secondaryColor: '#000000',
    icon: '🚂',
  },
  {
    id: 'lotte',
    name: '롯데',
    fullName: '롯데 자이언츠',
    color: '#041E42',
    secondaryColor: '#ED1C24',
    icon: '⚾',
  },
  {
    id: 'hanwha',
    name: '한화',
    fullName: '한화 이글스',
    color: '#FF6600',
    secondaryColor: '#000000',
    icon: '🦅',
  },
  {
    id: 'nc',
    name: 'NC',
    fullName: 'NC 다이노스',
    color: '#315288',
    secondaryColor: '#FFD700',
    icon: '🦕',
  },
  {
    id: 'kiwoom',
    name: '키움',
    fullName: '키움 히어로즈',
    color: '#570514',
    secondaryColor: '#FFD700',
    icon: '🦸',
  },
];

