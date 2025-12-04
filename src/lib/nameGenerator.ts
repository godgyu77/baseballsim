/**
 * [FIX] 외국인 선수 작명 알고리즘 오류 해결
 * 레전드 선수 이름 반복 방지 및 일반 이름 풀 사용
 */

/**
 * [FIX] 외국인 선수 이름 풀 (일반 이름)
 * Legacy 리스트가 아닌 일반 FirstName/LastName 풀
 */
const FOREIGN_FIRST_NAMES = [
  // 라틴계 이름
  'Carlos', 'Jose', 'Luis', 'Miguel', 'Juan', 'Francisco', 'Manuel', 'Pedro',
  'Rafael', 'Antonio', 'Fernando', 'Roberto', 'Alejandro', 'Daniel', 'Ricardo',
  // 영어권 이름
  'Michael', 'David', 'James', 'John', 'Robert', 'William', 'Richard', 'Joseph',
  'Thomas', 'Christopher', 'Charles', 'Daniel', 'Matthew', 'Anthony', 'Mark',
  // 기타
  'Alex', 'Ryan', 'Kevin', 'Brian', 'Jason', 'Eric', 'Steven', 'Timothy',
];

const FOREIGN_LAST_NAMES = [
  // 라틴계 성
  'Garcia', 'Rodriguez', 'Martinez', 'Lopez', 'Gonzalez', 'Perez', 'Sanchez',
  'Ramirez', 'Torres', 'Flores', 'Rivera', 'Gomez', 'Diaz', 'Cruz', 'Morales',
  'Ortiz', 'Gutierrez', 'Chavez', 'Ramos', 'Mendoza', 'Herrera', 'Jimenez',
  // 영어권 성
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Wilson', 'Anderson', 'Thomas',
  // 기타
  'Lee', 'Kim', 'Chen', 'Wang', 'Tanaka', 'Yamamoto', 'Suzuki', 'Nakamura',
];

/**
 * [FIX] 레전드 선수 이름 리스트 (제외 대상)
 * 이미 존재하는 유명 레전드 선수 이름은 신규 생성 시 사용하지 않음
 */
const LEGACY_PLAYER_NAMES = new Set([
  // MLB 레전드
  'Babe Ruth', 'Hank Aaron', 'Willie Mays', 'Ted Williams', 'Mickey Mantle',
  'Joe DiMaggio', 'Lou Gehrig', 'Cy Young', 'Walter Johnson', 'Sandy Koufax',
  'Nolan Ryan', 'Roger Clemens', 'Barry Bonds', 'Alex Rodriguez', 'Derek Jeter',
  // KBO 레전드 (외국인)
  'Felix Jose', 'Tyrone Woods', 'Danny Rios', 'Sergio Mitre', 'Eric Thames',
  'Mel Rojas', 'Tuffy Rhodes', 'Luis Gonzalez', 'Roberto Petagine', 'Daniel Rios',
  // 기타 유명 선수
  'Ichiro Suzuki', 'Hideki Matsui', 'Daisuke Matsuzaka', 'Yu Darvish',
  'Shohei Ohtani', 'Yoshinobu Yamamoto',
]);

/**
 * [FIX] 기존 리그 선수 명단 (중복 체크용)
 * 실제 게임 내에 존재하는 선수 이름 목록
 */
let existingPlayerNames = new Set<string>();

/**
 * [FIX] 기존 선수 명단 업데이트
 * 게임 내 실제 선수 명단을 업데이트하여 중복 체크에 사용
 * 
 * @param playerNames 선수 이름 목록
 */
export function updateExistingPlayerNames(playerNames: string[]): void {
  if (!playerNames || !Array.isArray(playerNames)) {
    return;
  }

  existingPlayerNames = new Set(
    playerNames.map(name => name?.toLowerCase().trim()).filter(Boolean)
  );

  console.log(`[NameGenerator] 기존 선수 명단 업데이트: ${existingPlayerNames.size}명`);
}

/**
 * [FIX] 작명 풀 분리 - 일반 이름 풀 사용
 * Legacy 리스트가 아닌 일반 FirstName/LastName 풀을 무작위 조합
 * 
 * @param isLegacy 레전드 선수 여부 (기본값: false)
 * @returns 생성된 이름
 */
function generateRandomName(isLegacy: boolean = false): string {
  // [FIX] 레전드가 아닌 경우 일반 이름 풀 사용
  if (!isLegacy) {
    const firstName = FOREIGN_FIRST_NAMES[
      Math.floor(Math.random() * FOREIGN_FIRST_NAMES.length)
    ];
    const lastName = FOREIGN_LAST_NAMES[
      Math.floor(Math.random() * FOREIGN_LAST_NAMES.length)
    ];
    return `${firstName} ${lastName}`;
  }

  // 레전드인 경우에만 레전드 리스트 사용 (하지만 신규 생성 시에는 사용하지 않음)
  // 이 함수는 레전드 생성용이므로 일반적으로 호출되지 않음
  return '';
}

/**
 * [FIX] 외국인 선수 이름 생성 (신규 생성용)
 * Legacy 리스트 제외, 일반 이름 풀 사용, 중복 체크 강화
 * 
 * @param maxAttempts 최대 시도 횟수 (기본값: 50)
 * @returns 생성된 고유한 이름
 */
export function generateForeignPlayerName(maxAttempts: number = 50): string {
  let attempts = 0;
  let generatedName = '';

  // [FIX] while 루프로 중복 체크 보강
  while (attempts < maxAttempts) {
    // [FIX] 일반 FirstName/LastName 풀 무작위 조합 (Random Pick)
    const firstName = FOREIGN_FIRST_NAMES[
      Math.floor(Math.random() * FOREIGN_FIRST_NAMES.length)
    ];
    const lastName = FOREIGN_LAST_NAMES[
      Math.floor(Math.random() * FOREIGN_LAST_NAMES.length)
    ];
    generatedName = `${firstName} ${lastName}`;

    const normalizedName = generatedName.toLowerCase().trim();

    // [FIX] 생성된 이름이 기존 리그 선수 명단에 있는지 중복 체크
    const isDuplicate = existingPlayerNames.has(normalizedName);
    
    // [FIX] 레전드 선수 이름인지 확인
    const isLegacyName = LEGACY_PLAYER_NAMES.has(generatedName);

    // [FIX] 중복이 아니고 레전드 이름이 아니면 사용
    if (!isDuplicate && !isLegacyName) {
      // [FIX] 생성된 이름을 기존 명단에 추가 (다음 생성 시 중복 방지)
      existingPlayerNames.add(normalizedName);
      console.log(`[NameGenerator] 신규 외국인 선수 이름 생성: ${generatedName}`);
      return generatedName;
    }

    attempts++;
    
    if (attempts % 10 === 0) {
      console.warn(
        `[NameGenerator] 이름 생성 시도 ${attempts}회: 중복 또는 레전드 이름 감지, 재시도 중...`
      );
    }
  }

  // [FIX] 최대 시도 횟수 초과 시 숫자 접미사 추가
  const fallbackName = `Player${Date.now()}${Math.floor(Math.random() * 1000)}`;
  console.warn(
    `[NameGenerator] 최대 시도 횟수 초과, 대체 이름 생성: ${fallbackName}`
  );
  existingPlayerNames.add(fallbackName.toLowerCase().trim());
  return fallbackName;
}

/**
 * [FIX] 이름 중복 검증
 * 생성된 이름이 기존 명단에 있는지 확인
 * 
 * @param name 검증할 이름
 * @returns 중복 여부
 */
export function isNameDuplicate(name: string): boolean {
  if (!name || typeof name !== 'string') {
    return false;
  }

  const normalizedName = name.toLowerCase().trim();
  
  // [FIX] 기존 리그 선수 명단 확인
  if (existingPlayerNames.has(normalizedName)) {
    return true;
  }

  // [FIX] 레전드 선수 이름 확인
  if (LEGACY_PLAYER_NAMES.has(name)) {
    return true;
  }

  return false;
}

/**
 * [FIX] Randomness 보장 - 시드 값 확인
 * Math.random()이 고정 시드를 사용하지 않는지 확인하는 헬퍼 함수
 * 
 * @returns 랜덤 시드가 고정되어 있지 않음을 확인
 */
export function ensureRandomSeed(): void {
  // [FIX] Math.random()은 브라우저/Node.js 환경에서 자동으로 시드가 생성되므로
  // 별도의 시드 설정이 필요 없음. 다만 테스트 환경에서는 주의 필요.
  
  // 랜덤성 테스트 (선택적)
  const testValues = Array.from({ length: 10 }, () => Math.random());
  const allSame = testValues.every(val => val === testValues[0]);
  
  if (allSame) {
    console.warn('[NameGenerator] ⚠️ 랜덤 시드가 고정되어 있을 수 있습니다.');
  }
}

