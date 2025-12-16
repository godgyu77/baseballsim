# 🎯 CURSOR 프롬프트: HARD 모드 구현

## [CURSOR-HANDOFF TEMPLATE]

# 🎯 ROLE & OBJECTIVE

당신은 베테랑 React/TypeScript 게임 클라이언트 개발자입니다.

현재 야구 시뮬레이션 게임에 **새로운 난이도 'HARD(하드)' 모드**를 추가해야 합니다.

HARD 모드는 EASY/NORMAL과 HELL 사이의 중간 단계로, 도전적이지만 공정한 밸런스를 목표로 합니다.

**중요:** `GameConfig.ts`에는 이미 HARD 모드 설정이 추가되어 있습니다. 이제 UI와 로직 연동만 완료하면 됩니다.

---

# 📂 CONTEXT & FILES

**Target Files:**

1. ✅ `src/constants/GameConfig.ts` - **이미 완료됨** (HARD 설정 존재)
2. 🔧 `src/components/DifficultyModal.tsx` - HARD 모드 버튼 추가 필요
3. 🔧 `src/components/GameHeader.tsx` - HARD 모드 뱃지 스타일 추가 필요
4. 🔧 `src/components/ChatInterface.tsx` - HARD 모드 처리 로직 추가 필요
5. 🔧 `src/App.tsx` - HARD 모드 처리 로직 확인 필요

---

# 🛠️ TASKS (Step-by-Step)

## Task 1: `DifficultyModal.tsx` - HARD 모드 버튼 추가

**위치:** `NORMAL` 모드 버튼과 `HELL` 모드 버튼 **사이**에 삽입

**변경 내용:**

```tsx
// [HARD MODE] Added - NORMAL 버튼 다음, HELL 버튼 이전에 삽입

{/* 하드 모드 */}
<motion.button
  whileHover={{ scale: 1.02, y: -2 }}
  whileTap={{ scale: 0.98 }}
  onClick={() => onSelect('HARD')}
  className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-300 rounded-xl hover:border-orange-500 transition-all text-left touch-manipulation"
>
  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
    <div className="p-1.5 sm:p-2 bg-orange-500 rounded-lg">
      <Shield className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
    </div>
    <div>
      <h3 className="text-base sm:text-lg md:text-xl font-bold text-orange-800">하드 모드</h3>
      <p className="text-[10px] sm:text-xs md:text-sm text-orange-600">도전적/공정</p>
    </div>
  </div>
  <ul className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs md:text-sm text-gray-700">
    <li className="flex items-start gap-1.5 sm:gap-2">
      <span className="text-orange-600 mt-0.5">•</span>
      <span>초기 자금: <strong className="text-orange-800">20.0억 원</strong></span>
    </li>
    <li className="flex items-start gap-1.5 sm:gap-2">
      <span className="text-orange-600 mt-0.5">•</span>
      <span>선수단 샐러리캡: <strong className="text-orange-800">120억 원</strong></span>
    </li>
    <li className="flex items-start gap-1.5 sm:gap-2">
      <span className="text-orange-600 mt-0.5">•</span>
      <span>용병 샐러리캡: <strong className="text-orange-800">47.5억 원</strong></span>
    </li>
    <li className="flex items-start gap-1.5 sm:gap-2">
      <span className="text-orange-600 mt-0.5">•</span>
      <span>아시아 쿼터 샐러리캡: <strong className="text-orange-800">2.5억 원</strong></span>
    </li>
    <li className="flex items-start gap-1.5 sm:gap-2">
      <span className="text-orange-600 mt-0.5">•</span>
      <span>수입 <strong className="text-orange-800">0.9배</strong> 감소</span>
    </li>
    <li className="flex items-start gap-1.5 sm:gap-2">
      <span className="text-orange-600 mt-0.5">•</span>
      <span>지출 <strong className="text-orange-800">1.1배</strong> 증가</span>
    </li>
    <li className="flex items-start gap-1.5 sm:gap-2">
      <span className="text-orange-600 mt-0.5">•</span>
      <span>부상 빈도 1.5배, 소프트 캡</span>
    </li>
  </ul>
</motion.button>
```

**주의사항:**
- `Shield` 아이콘은 이미 import되어 있으므로 추가 import 불필요
- `grid-cols-3` 레이아웃이므로 4개 버튼이 정상적으로 표시됨

---

## Task 2: `GameHeader.tsx` - HARD 모드 뱃지 스타일 추가

**위치:** 난이도 뱃지 조건문 (라인 51-58)

**변경 내용:**

```tsx
// [HARD MODE] Added - 난이도 뱃지 조건문 수정
<span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold ${
  difficulty === 'EASY' 
    ? 'bg-green-500 text-white' 
    : difficulty === 'NORMAL'
    ? 'bg-blue-500 text-white'
    : difficulty === 'HARD'
    ? 'bg-orange-500 text-white'
    : 'bg-red-600 text-white'
}`}>
  {difficulty === 'EASY' ? '이지' : difficulty === 'NORMAL' ? '노말' : difficulty === 'HARD' ? '하드' : '헬'}
</span>
```

---

## Task 3: `ChatInterface.tsx` - HARD 모드 처리 로직 추가

**위치 1:** 난이도 모드 문자열 생성 (약 라인 1233)

**변경 내용:**

```tsx
// [HARD MODE] Added - 난이도 모드 문자열 생성
const difficultyMode = difficulty === 'EASY' ? '이지 모드' 
  : difficulty === 'NORMAL' ? '노말 모드' 
  : difficulty === 'HARD' ? '하드 모드' 
  : '헬 모드';
```

**위치 2:** 난이도별 샐러리캡 설정 (약 라인 1237)

**변경 내용:**

```tsx
// [HARD MODE] Added - 난이도별 샐러리캡 설정
const squadSalaryCap = difficulty === 'EASY' 
  ? 250.0 
  : difficulty === 'NORMAL' 
  ? 137.0 
  : difficulty === 'HARD'
  ? 120.0
  : 100.0;
```

**참고:** `ChatInterface.tsx`에서 난이도 관련 로직이 여러 곳에 있을 수 있으므로, `difficulty === 'NORMAL'` 또는 `difficulty === 'HELL'` 패턴을 검색하여 모두 확인하세요.

---

## Task 4: `App.tsx` - HARD 모드 처리 로직 확인 및 추가

**위치:** 난이도 처리 로직 (약 라인 140-150, 200-215)

**변경 내용:**

기존 코드에서 `'HARD'` 케이스가 누락된 부분이 있는지 확인하고, 필요시 추가:

```tsx
// [HARD MODE] Added - 난이도 복원 시 HARD 처리
if (data.difficulty) {
  if (data.difficulty === 'HARD') {
    setDifficulty('HARD');
  } else if (data.difficulty === 'HARD') { // 기존 HARD 처리
    setDifficulty('HELL');
  } else {
    setDifficulty(data.difficulty as Difficulty);
  }
}
```

**주의:** 기존 코드에서 `'HARD'`를 `'HELL'`로 변환하는 로직이 있다면, 이를 제거하거나 수정해야 합니다.

---

# 🚫 CONSTRAINTS & RULES

1. **No Overwriting:** 기존 EASY, NORMAL, HELL 모드 코드를 삭제하거나 변경하지 마십시오. 오직 추가만 수행합니다.

2. **Order Matters:** 난이도 순서는 반드시 `EASY` → `NORMAL` → **`HARD`** → `HELL` 순서를 유지해야 합니다.

3. **Type Safety:** TypeScript 타입 에러가 발생하지 않도록 `HARD` 타입이 모든 곳에서 올바르게 처리되는지 확인하세요.

4. **Consistency:** 모든 파일에서 HARD 모드 처리가 일관되게 이루어져야 합니다.

---

# ✅ OUTPUT FORMAT

수정된 파일별로 **변경된 부분만** 코드 블록으로 보여주십시오.

각 변경 위치에 `// [HARD MODE] Added` 주석을 달아주십시오.

---

# 🔍 VERIFICATION CHECKLIST

구현 완료 후 다음을 확인하세요:

- [ ] `DifficultyModal.tsx`에서 HARD 모드 버튼이 NORMAL과 HELL 사이에 정상적으로 표시됨
- [ ] `GameHeader.tsx`에서 HARD 모드 선택 시 오렌지색 뱃지가 표시됨
- [ ] `ChatInterface.tsx`에서 HARD 모드 관련 모든 로직이 올바르게 처리됨
- [ ] `App.tsx`에서 HARD 모드 저장/불러오기가 정상 작동함
- [ ] TypeScript 컴파일 에러 없음
- [ ] 게임 실행 시 HARD 모드 선택 및 플레이 가능

---

# 📝 NOTES

- `GameConfig.ts`는 이미 완료되어 있으므로 수정하지 마세요.
- 모든 변경사항은 기존 코드 스타일과 일관성을 유지하세요.
- 모바일 반응형 디자인도 고려하여 클래스명을 확인하세요.
