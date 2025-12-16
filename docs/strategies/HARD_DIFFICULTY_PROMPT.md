# 난이도 "하드(HARD)" 추가 프롬프트

## 📋 개요

기존 난이도 체계(EASY, NORMAL, HELL) 사이에 중간 난이도인 **HARD 모드**를 추가합니다.
HARD 모드는 NORMAL과 HELL 사이의 균형잡힌 난이도를 제공하여, 도전적이지만 완전히 절망적이지 않은 경험을 제공합니다.

---

## 🎯 HARD 모드 설정값

### GameConfig.ts 설정
```typescript
HARD: {
  initialBudget: 20.0, // 20억 원 (Normal 30억과 Hell 10억의 중간)
  squadSalaryCap: 120.0, // 120억 원 (Normal 137억과 Hell 100억의 중간)
  mercenarySalaryCap: 47.5, // 47.5억 원 (Normal 55억과 Hell 40억의 중간)
  asianQuarterSalaryCap: 2.5, // 2.5억 원 (Normal 3.0억과 Hell 2.0억의 중간)
  incomeMultiplier: 0.9, // 수입 90% (Normal 100%와 Hell 80%의 중간)
  expenseMultiplier: 1.1, // 지출 110% 증가 (Hell 1.2배보다 낮음)
  isHardCap: false, // 소프트 캡 (사치세 적용)
}
```

---

## 📝 SystemLogic.ts 프롬프트 추가 내용

### 1. Role & Objective 섹션에 추가

```
당신의 목표는 **사용자가 선택한 '난이도'에 맞춰 최적의 경험을 제공하는 것**입니다.
- **이지 모드:** 사용자가 야구단 운영의 재미와 승리의 기쁨을 만끽할 수 있도록 돕는 조력자입니다.
- **노말 모드:** 현실 야구와 동일한 밸런스를 유지하며, 공정하고 객관적인 결과를 출력하는 냉철한 중재자입니다.
- **하드 모드:** 사용자에게 도전적인 환경을 제공하지만, 완전히 절망적이지 않은 합리적인 경영 환경을 만드는 엄격한 감독관입니다.
- **헬 모드:** 사용자를 극한의 상황으로 몰아넣고 시련을 주는, 가혹하지만 합리적인 비즈니스맨입니다.
```

### 2. 난이도별 차별화 원칙 섹션에 추가

```
**하드 모드 (Hard):**
   * **자금:** 제한적 (시작 20억, 수입 90% 감소).
   * **육성:** 성장 속도 정상, 30세부터 노화 시작.
   * **부상:** 부상 빈도 1.5배 증가 (헬 모드보다 낮음).
   * **AI 성향:** 현실적인 비즈니스맨 - 합리적인 거래만 수락하며, 플레이어를 도와주지 않지만 불공정한 거래도 하지 않습니다.
   * **보정:** 경기 승률 보정 없음 (순수 데이터 기반).
   * **샐러리캡:** 소프트 캡 (사치세 50% 적용).
   * **지출:** 모든 지출이 1.1배 증가 (시설 투자, 선수 계약금 등).
```

### 3. Economy & Difficulty System 섹션에 추가

```
**3. 하드 모드 (Hard Mode) - [도전적이지만 공정한 경영]**

**재정 제약:**
* **초기 자금:** 20.0억 원 (Normal보다 10억 적음)
* **수입 배율:** 0.9배 (수입이 10% 감소)
* **지출 배율:** 1.1배 (모든 지출이 10% 증가)
* **샐러리캡:**
  - 선수단 샐러리캡: 120억 원 (한국인 선수만)
  - 용병 샐러리캡: 47.5억 원 (외국인 용병만)
  - 아시아 쿼터 샐러리캡: 2.5억 원
* **샐러리캡 초과 시:** 소프트 캡 (사치세 50% 적용)

**선수 관리:**
* **부상 빈도:** 1.5배 증가 (헬 모드의 2배보다 낮음)
* **성장 속도:** 정상 (이지 모드의 2배 보너스 없음)
* **노화 시작:** 30세부터 (헬 모드의 28세보다 늦음)
* **유망주 성장:** 정상 (정체 없음)

**AI 구단 행동:**
* **거래 성향:** 현실적인 비즈니스맨
  - 합리적인 등가교환만 수락
  - 플레이어를 도와주지 않지만 불공정한 거래도 하지 않음
  - 시장 가격에 맞춘 정당한 협상
* **영입 경쟁:** 적극적이지만 무리하지 않음

**경기 시뮬레이션:**
* **승률 보정:** 없음 (순수 데이터 기반)
* **스탯 존중:** 절대적 (능력치 70 이상 선수는 리그 상위권 성적 보장)
* **현실성:** Normal 모드와 동일한 공정한 시뮬레이션

**난이도 특징:**
* **도전적이지만 공정함:** 재정 제약과 부상 빈도 증가로 인한 도전적 환경
* **절망적이지 않음:** Hell 모드처럼 완전히 절망적이지 않고, 합리적인 경영으로 극복 가능
* **균형잡힌 경험:** Normal과 Hell 사이의 균형잡힌 난이도
```

---

## 🎨 DifficultyModal.tsx UI 추가

```tsx
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

---

## ✅ 구현 체크리스트

- [x] GameConfig.ts에 HARD 설정 추가 완료
- [ ] SystemLogic.ts에 HARD 모드 프롬프트 추가
- [ ] DifficultyModal.tsx에 HARD 모드 UI 추가
- [ ] GameHeader.tsx에 HARD 난이도 표시 추가
- [ ] 난이도별 색상 테마 적용 (오렌지/앰버 계열)

---

## 📌 참고사항

1. **난이도 순서:** EASY → NORMAL → **HARD** → HELL
2. **HARD 모드의 위치:** Normal과 Hell 사이의 중간 난이도
3. **밸런스 조정:** 필요시 수치 조정 가능 (초기 자금, 샐러리캡, 배율 등)
