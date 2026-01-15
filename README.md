# Learning Helper Agent

학습과 성장을 돕는 AI Agent 시스템입니다.

## 개요

이 레포지토리는 학습 과정을 개선하고 인사이트를 실제 행동으로 전환하는 데 도움을 주는 여러 AI Agent 스킬을 포함하고 있습니다.

## 사용 가능한 스킬 (Skills)

### 1. study-mentor
**목적**: 학습 내용 리뷰 및 피드백 제공

사용자가 오늘 학습한 내용을 리뷰하고, 더 깊은 이해와 실무적 통찰을 제공합니다.

**주요 기능**:
- 놓친 부분 및 깊이 있는 포인트 제공
- 관점의 확장
- 실무 연결
- 학습 목표 점검

**사용 시점**: 일일 학습 후 피드백이 필요할 때

자세한 내용: [`.opencode/skill/study-mentor/SKILL.md`](.opencode/skill/study-mentor/SKILL.md)

---

### 2. weekly-review
**목적**: 주간 학습 통계 및 복습 자료 생성

사용자가 한 주 동안 작성한 학습 기록을 분석하여 주간 학습 요약을 제공합니다.

**주요 기능**:
- 이번 주 학습 주제 정리
- 주제별 핵심 요약
- 전반적인 코멘트 및 다음 주 제안

**사용 시점**: 주말 회고 시

자세한 내용: [`.opencode/skill/weekly-review/SKILL.md`](.opencode/skill/weekly-review/SKILL.md)

---

### 3. action-trigger ✨ NEW
**목적**: 깨달음을 실제 행동으로 체화

학습이나 독서를 통해 얻은 인사이트를 실제 삶에서 적용 가능한 행동 패턴으로 전환하고, 습관화를 지원합니다.

**주요 기능**:
- 깨달음 재구성 및 명확화
- 체화 차원 분석 (반응적/습관적/사고방식)
- 구체적 행동 트리거 설계
- 체화 로드맵 제공
- 리마인더 시스템 설계
- 추적 템플릿 생성

**사용 시점**: 
- "이걸 어떻게 실제로 적용할 수 있을까?" 고민될 때
- 학습한 내용을 습관으로 만들고 싶을 때
- 인사이트가 "우와 맞지맞지"로 끝나는 것을 방지하고 싶을 때

**핵심 개념**:
- **체화 3단계**: 인지 → 의식적 적용 → 체화 (자동 실행)
- **체화 3차원**: 반응적 체화 / 습관적 체화 / 사고방식 체화
- **행동 트리거**: 상황 + 행동 + 측정

자세한 내용: [`.opencode/skill/action-trigger/SKILL.md`](.opencode/skill/action-trigger/SKILL.md)

**참고 문서**:
- [체화 프레임워크](.opencode/skill/action-trigger/references/embodiment-framework.md): 체화의 정의와 방법론
- [예시: 문제 정의 우선](.opencode/skill/action-trigger/references/example-problem-first.md): "문제 정의가 먼저다" 체화 실전 예시

---

## 구조

```
.opencode/
└── skill/
    ├── study-mentor/         # 학습 리뷰 스킬
    │   ├── SKILL.md
    │   ├── references/
    │   │   └── learning-goals.md
    │   └── scripts/
    │       └── get_latest_file.js
    │
    ├── weekly-review/        # 주간 학습 요약 스킬
    │   └── SKILL.md
    │
    └── action-trigger/       # 깨달음 → 행동 체화 스킬
        ├── SKILL.md
        └── references/
            ├── embodiment-framework.md
            └── example-problem-first.md
```

## 사용 방법

각 스킬은 독립적으로 사용할 수 있으며, AI Agent에게 해당 스킬을 활성화하도록 요청하면 됩니다.

### 예시

**study-mentor 사용**:
```
"오늘 학습한 내용 리뷰해줘"
```

**weekly-review 사용**:
```
"이번 주 학습 내용 요약해줘"
```

**action-trigger 사용**:
```
"오늘 '문제 정의가 먼저다'는 걸 깨달았는데, 이걸 실제로 어떻게 적용할 수 있을까?"
```

## 개발 아이디어

향후 추가될 수 있는 기능들: [`ideas.md`](ideas.md) 참고

## 라이선스

이 프로젝트는 개인 학습 목적으로 사용됩니다.
