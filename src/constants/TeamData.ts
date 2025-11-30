export interface RetiredNumber {
  number: number;
  playerName: string;
  position: string;
  note?: string;
}

export interface Team {
  id: string;
  name: string;
  fullName: string;
  color: string;
  secondaryColor: string;
  icon: string;
  retiredNumbers?: RetiredNumber[];
}

export const TEAMS: Team[] = [
  {
    id: 'kia',
    name: 'KIA',
    fullName: 'KIA 타이거즈',
    color: '#EA0029',
    secondaryColor: '#000000',
    icon: '🐅',
    retiredNumbers: [
      { number: 18, playerName: '선동열', position: '투수', note: '국보급 투수' },
      { number: 7, playerName: '이종범', position: '유격수', note: '야구 천재, 바람의 아들' },
    ],
  },
  {
    id: 'samsung',
    name: '삼성',
    fullName: '삼성 라이온즈',
    color: '#1D4D8B',
    secondaryColor: '#FFD700',
    icon: '🦁',
    retiredNumbers: [
      { number: 22, playerName: '이만수', position: '포수', note: '헐크, 최초 트리플크라운' },
      { number: 10, playerName: '양준혁', position: '외야수', note: '양신, 통산 기록의 사나이' },
      { number: 36, playerName: '이승엽', position: '내야수', note: '국민타자, 홈런왕' },
      { number: 21, playerName: '오승환', position: '투수', note: '돌부처, 통산 최다 세이브' },
    ],
  },
  {
    id: 'lg',
    name: 'LG',
    fullName: 'LG 트윈스',
    color: '#C30452',
    secondaryColor: '#000000',
    icon: '👯',
    retiredNumbers: [
      { number: 41, playerName: '김용수', position: '투수', note: '노송, 우승의 주역' },
      { number: 9, playerName: '이병규', position: '외야수', note: '적토마, 영원한 캡틴' },
      { number: 33, playerName: '박용택', position: '외야수', note: 'LG의 심장, 최다 안타' },
    ],
  },
  {
    id: 'doosan',
    name: '두산',
    fullName: '두산 베어스',
    color: '#131230',
    secondaryColor: '#0D4A9B',
    icon: '🐻',
    retiredNumbers: [
      { number: 54, playerName: '김영신', position: '포수', note: '리그 유일 추모 결번' },
      { number: 21, playerName: '박철순', position: '투수', note: '불사조, 원년 MVP' },
    ],
  },
  {
    id: 'kt',
    name: 'KT',
    fullName: 'KT 위즈',
    color: '#000000',
    secondaryColor: '#FFD700',
    icon: '⚡',
    retiredNumbers: [], // 현재 영구결번 없음
  },
  {
    id: 'ssg',
    name: 'SSG',
    fullName: 'SSG 랜더스',
    color: '#CE0E2D',
    secondaryColor: '#000000',
    icon: '🚂',
    retiredNumbers: [
      { number: 26, playerName: '박경완', position: '포수', note: '포수 왕조의 핵' },
    ],
  },
  {
    id: 'lotte',
    name: '롯데',
    fullName: '롯데 자이언츠',
    color: '#041E42',
    secondaryColor: '#ED1C24',
    icon: '⚾',
    retiredNumbers: [
      { number: 11, playerName: '최동원', position: '투수', note: '무쇠팔, 부산의 영혼' },
      { number: 10, playerName: '이대호', position: '내야수', note: '조선의 4번 타자' },
    ],
  },
  {
    id: 'hanwha',
    name: '한화',
    fullName: '한화 이글스',
    color: '#FF6600',
    secondaryColor: '#000000',
    icon: '🦅',
    retiredNumbers: [
      { number: 35, playerName: '장종훈', position: '내야수', note: '연습생 신화' },
      { number: 23, playerName: '정민철', position: '투수', note: '이글스 최다승 에이스' },
      { number: 21, playerName: '송진우', position: '투수', note: '송회장, 최다 이닝/탈삼진' },
      { number: 52, playerName: '김태균', position: '내야수', note: '이글스의 자존심' },
    ],
  },
  {
    id: 'nc',
    name: 'NC',
    fullName: 'NC 다이노스',
    color: '#315288',
    secondaryColor: '#FFD700',
    icon: '🦕',
    retiredNumbers: [], // 현재 영구결번 없음
  },
  {
    id: 'kiwoom',
    name: '키움',
    fullName: '키움 히어로즈',
    color: '#570514',
    secondaryColor: '#FFD700',
    icon: '🦸',
    retiredNumbers: [], // 현재 영구결번 없음
  },
];

