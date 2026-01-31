# Colo Language Helper

구글 스프레드시트에서 다국어 데이터를 가져와 코드에서 hover로 확인할 수 있는 VS Code 익스텐션입니다.

## ✨ 주요 기능

- 📊 **구글 스프레드시트 연동**: Google Sheets API 또는 CSV URL을 통해 다국어 데이터 가져오기
- 🔍 **Hover 기능**: 코드에서 `WD`, `ST`, `CD`로 시작하는 키에 마우스를 올리면 다국어 정보 표시
- 💾 **로컬 캐싱**: 데이터를 로컬 스토리지에 저장하여 오프라인에서도 사용 가능
- 🔄 **수동 동기화**: 원할 때만 최신 데이터로 업데이트
- 📝 **다중 시트 지원**: 여러 시트(WD, ST, CD 등)를 한 번에 가져오기

## 🚀 시작하기

### 설치

1. VS Code에서 `Ctrl + Shift + X` (또는 `Cmd + Shift + X` on Mac)로 익스텐션 마켓플레이스 열기
2. "Colo Language Helper" 검색
3. 설치 클릭

### 설정

VS Code에서 `Ctrl + ,` (또는 `Cmd + ,` on Mac)를 눌러 설정을 열고, 검색창에 "Colo Language Helper"를 입력하면 모든 설정 항목을 확인할 수 있습니다.

#### 설정 방법 선택

익스텐션은 두 가지 방법으로 구글 스프레드시트 데이터를 가져올 수 있습니다:

1. **Google Sheets API 사용** (권장) - 실시간 데이터, 다중 시트 지원
2. **CSV URL 사용** - 간단한 설정, 단일 시트만 지원

> 💡 **우선순위**: API 키가 설정되어 있으면 API를 사용하고, 없으면 CSV URL을 사용합니다.

---

## 📋 설정 방법 1: Google Sheets API 사용 (권장)

### 1단계: Google Cloud Console에서 API 키 발급

1. **Google Cloud Console 접속**
   - [Google Cloud Console](https://console.cloud.google.com/) 접속
   - Google 계정으로 로그인

2. **프로젝트 생성 또는 선택**
   - 상단에서 프로젝트 선택 또는 새 프로젝트 생성
   - 프로젝트 이름 입력 후 생성

3. **Google Sheets API 활성화**
   - 왼쪽 메뉴에서 **API 및 서비스 > 라이브러리** 클릭
   - 검색창에 "Google Sheets API" 입력
   - "Google Sheets API" 선택 후 **사용 설정** 클릭

4. **API 키 생성**
   - 왼쪽 메뉴에서 **API 및 서비스 > 사용자 인증 정보** 클릭
   - 상단의 **+ 사용자 인증 정보 만들기 > API 키** 클릭
   - 생성된 API 키 복사 (나중에 다시 확인할 수 없으니 안전한 곳에 보관)

5. **API 키 제한 설정 (선택사항, 권장)**
   - 생성된 API 키 클릭
   - **애플리케이션 제한사항**에서 "HTTP 리퍼러(웹사이트)" 선택
   - **API 제한사항**에서 "키 제한" 선택
   - "Google Sheets API" 체크 후 저장

### 2단계: 구글 스프레드시트 공유 설정

⚠️ **중요**: 이 단계를 건너뛰면 API로 데이터를 가져올 수 없습니다!

1. **스프레드시트 열기**
   - 데이터가 있는 구글 스프레드시트 열기

2. **공유 설정**
   - 우측 상단의 **공유** 버튼 클릭
   - **링크가 있는 모든 사용자** 선택
   - 권한을 **뷰어**로 설정
   - **완료** 클릭

3. **스프레드시트 ID 확인**
   - 스프레드시트 URL에서 ID 추출
   - URL 형식: `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`
   - 예시: URL이 `https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j/edit`이면
   - 스프레드시트 ID는 `1a2b3c4d5e6f7g8h9i0j`

### 3단계: VS Code 설정 입력

1. **설정 열기**
   - `Ctrl + ,` (또는 `Cmd + ,` on Mac)로 설정 열기
   - 검색창에 "Colo Language Helper" 입력

2. **필수 설정 입력**
   - **Sheet Api Key**: 1단계에서 발급받은 API 키 입력
   - **Sheet Id**: 2단계에서 확인한 스프레드시트 ID 입력
     - 또는 스프레드시트 전체 URL을 입력해도 자동으로 ID를 추출합니다

3. **선택 설정 구성**
   - **All Sheet Names**: 
     - ✅ **체크됨 (기본값)**: 스프레드시트의 모든 시트를 가져옵니다
     - ❌ **체크 해제**: `Target Sheet Names`에 지정한 시트만 가져옵니다
   
   - **Target Sheet Names**: 
     - `All Sheet Names`가 체크 해제되어 있을 때만 사용됩니다
     - 가져올 시트 이름을 **쉼표(,)로 구분**하여 입력
     - 예시: `WD,ST,CD`
     - 이 설정은 hover에서 추출할 코드 패턴과도 연동됩니다
     - 예: `WD,ST,CD`로 설정하면 `WD123`, `ST123`, `CD123` 같은 패턴을 감지합니다

---

## 📋 설정 방법 2: CSV URL 사용

API 키 발급이 번거롭거나 단일 시트만 사용하는 경우 CSV URL 방식을 사용할 수 있습니다.

### 1단계: CSV URL 생성

1. **스프레드시트 열기**
   - 데이터가 있는 구글 스프레드시트 열기

2. **웹에 게시**
   - 상단 메뉴에서 **파일 > 공유 > 웹에 게시** 클릭
   - 또는 **파일 > 공유 > 웹에 게시** 선택

3. **CSV 형식 선택**
   - 형식 드롭다운에서 **CSV** 선택
   - **게시** 버튼 클릭

4. **URL 복사**
   - 생성된 URL 복사
   - URL 형식: `https://docs.google.com/spreadsheets/d/e/{PUBLISH_ID}/pub?output=csv`

### 2단계: VS Code 설정 입력

1. **설정 열기**
   - `Ctrl + ,` (또는 `Cmd + ,` on Mac)로 설정 열기
   - 검색창에 "Colo Language Helper" 입력

2. **CSV URL 입력**
   - **Sheet Url**: 1단계에서 복사한 CSV URL 입력

> ⚠️ **주의**: CSV URL 방식은 단일 시트만 지원합니다. 여러 시트를 사용하려면 API 방식을 사용하세요.

## 🔄 작동 방식 및 데이터 흐름

### 전체 시스템 아키텍처

```
┌─────────────────────────────────────────────────────────────────┐
│                        VS Code Extension                         │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              extension.ts (메인 진입점)                    │  │
│  │  • Extension 활성화                                        │  │
│  │  • Command 등록 (Sync)                                     │  │
│  │  • Hover Provider 등록                                     │  │
│  │  • globalState에서 기존 데이터 로드                        │  │
│  └──────────────┬───────────────────────┬──────────────────┘  │
│                 │                       │                       │
│                 ▼                       ▼                       │
│  ┌──────────────────────┐  ┌──────────────────────────────┐  │
│  │  services/sync.ts   │  │  providers/hover.ts           │  │
│  │  (동기화 로직)        │  │  (Hover 제공)                 │  │
│  └──────────┬───────────┘  └───────────┬──────────────────┘  │
│             │                          │                       │
│             ▼                          ▼                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              utils/ (유틸리티 함수들)                   │  │
│  │  • apiFetcher.ts      • fetcher.ts                    │  │
│  │  • parser.ts           • multiSheetFetcher.ts          │  │
│  │  • sheetListFetcher.ts • sheetIdExtractor.ts          │  │
│  │  • sheetNameParser.ts  • codePatternExtractor.ts     │  │
│  │  • csvHelper.ts        • errorHandler.ts              │  │
│  │  • markdown.ts                                        │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              types/index.ts                           │  │
│  │  • LanguageEntry                                     │  │
│  │  • LanguageDictionary                                │  │
│  │  • GoogleSheetsApiResponse                           │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### 데이터 동기화 플로우 (Sync Command)

```
사용자: Ctrl+Shift+P → "Sheet Connect Sync" 실행
│
├─▶ extension.ts
│   └─▶ handleSyncCommand()
│       │
│       └─▶ services/sync.ts
│           └─▶ syncLanguageData()
│               │
│               ├─▶ [1단계] 설정 읽기
│               │   └─▶ vscode.workspace.getConfiguration('languageHelper')
│               │       • sheetApiKey
│               │       • sheetId
│               │       • allSheetNames
│               │       • targetSheetNames
│               │       • sheetUrl
│               │
│               ├─▶ [2단계] 데이터 소스 결정
│               │   │
│               │   ├─▶ API 키가 있는가?
│               │   │   │
│               │   │   ├─▶ YES → [경로 A] Google Sheets API 사용
│               │   │   │
│               │   │   └─▶ NO → [경로 B] CSV URL 사용
│               │
│               ├─▶ [경로 A] Google Sheets API
│               │   │
│               │   ├─▶ resolveSheetId()
│               │   │   └─▶ sheetIdExtractor.ts
│               │   │       • sheetId에서 ID 추출
│               │   │       • sheetUrl에서 ID 추출 (자동)
│               │   │
│               │   ├─▶ allSheetNames 체크?
│               │   │   │
│               │   │   ├─▶ YES → fetchAllSheetNames()
│               │   │   │   └─▶ sheetListFetcher.ts
│               │   │   │       └─▶ GET https://sheets.googleapis.com/v4/spreadsheets/{id}
│               │   │   │           └─▶ 모든 시트 이름 목록 반환
│               │   │   │
│               │   │   └─▶ NO → parseSheetNames()
│               │   │       └─▶ sheetNameParser.ts
│               │   │           └─▶ "WD,ST,CD" → ["WD", "ST", "CD"]
│               │   │
│               │   └─▶ fetchMultipleSheetsByApi()
│               │       └─▶ multiSheetFetcher.ts
│               │           │
│               │           ├─▶ 각 시트별로 반복:
│               │           │   └─▶ GET https://sheets.googleapis.com/v4/spreadsheets/{id}/values/{sheetName}!A:Z?key={apiKey}
│               │           │       └─▶ 2D 배열 데이터 반환
│               │           │
│               │           └─▶ 모든 시트 데이터 병합
│               │               └─▶ CSV 형식으로 변환
│               │
│               └─▶ [경로 B] CSV URL
│                   └─▶ fetchDictionaryData()
│                       └─▶ fetcher.ts
│                           └─▶ GET {sheetUrl}
│                               └─▶ CSV 텍스트 반환
│
│               ├─▶ [3단계] 데이터 파싱
│               │   └─▶ parseCsvToDictionary()
│               │       └─▶ parser.ts
│               │           └─▶ papaparse 라이브러리 사용
│               │               └─▶ CSV → LanguageDictionary 변환
│               │                   {
│               │                     "WD000001": { ko: "안녕", en: "Hello", ja: "こんにちは" },
│               │                     "ST000001": { ko: "감사", en: "Thanks", ja: "ありがとう" }
│               │                   }
│               │
│               └─▶ [4단계] 데이터 저장
│                   └─▶ context.globalState.update('langData', dictionary)
│                       └─▶ VS Code 로컬 스토리지에 영구 저장
│
└─▶ 완료 메시지 표시
    └─▶ "동기화 완료! (N개 데이터, API/CSV URL 사용)"
```

### Hover 요청 플로우

```
사용자: 코드에서 마우스 오버 (예: "WD000001")
│
├─▶ VS Code Hover 이벤트 발생
│   └─▶ extension.ts
│       └─▶ handleProvideHover()
│           │
│           └─▶ providers/hover.ts
│               └─▶ provideHover()
│                   │
│                   ├─▶ [1단계] 패턴 생성
│                   │   └─▶ getCodePattern()
│                   │       ├─▶ 설정에서 targetSheetNames 읽기
│                   │       ├─▶ parseSheetNames() → ["WD", "ST", "CD"]
│                   │       └─▶ createCodePattern() → /(WD|ST|CD)\d+/
│                   │
│                   ├─▶ [2단계] 코드 추출
│                   │   │
│                   │   ├─▶ extractCodeFromPosition()
│                   │   │   └─▶ document.getWordRangeAtPosition(pattern)
│                   │   │       └─▶ "WD000001" 추출
│                   │   │
│                   │   └─▶ (실패 시) extractCodeFromStringLiteral()
│                   │       └─▶ 함수 호출 내부 문자열 추출
│                   │           • getLang("WD000001")
│                   │           • t("ST000001")
│                   │
│                   ├─▶ [3단계] 데이터 조회
│                   │   └─▶ languageDictionary[code]
│                   │       └─▶ globalState에서 로드된 데이터 사용
│                   │           └─▶ { ko: "안녕", en: "Hello", ja: "こんにちは" }
│                   │
│                   └─▶ [4단계] Hover 콘텐츠 생성
│                       └─▶ createHoverContent()
│                           └─▶ markdown.ts
│                               └─▶ MarkdownString 생성
│                                   └─▶ 마크다운 형식으로 포맷팅
│                                       └─▶ VS Code Hover UI에 표시
│
└─▶ 사용자에게 다국어 정보 표시
    └─▶ 🌐 WD000001
        • KO: 안녕
        • EN: Hello
        • JA: こんにちは
```

### 데이터 통신 상세 플로우

#### Google Sheets API 통신

```
┌──────────────┐
│  VS Code     │
│  Extension   │
└──────┬───────┘
       │
       │ [1] API 키 + 시트 ID로 요청
       ▼
┌─────────────────────────────────────────────────────────┐
│  Google Sheets API v4                                   │
│  https://sheets.googleapis.com/v4/spreadsheets/{id}/... │
└──────┬──────────────────────────────────────────────────┘
       │
       │ [2] 인증 및 권한 확인
       │     • API 키 유효성 검증
       │     • 시트 공유 설정 확인 ("링크가 있는 모든 사용자")
       │
       │ [3] 데이터 조회
       │     • 시트 메타데이터 조회 (시트 목록)
       │     • 각 시트의 값 조회 (A:Z 범위)
       │
       ▼
┌─────────────────────────────────────────────────────────┐
│  응답 데이터 (JSON)                                      │
│  {                                                       │
│    "values": [                                           │
│      ["key", "ko", "en", "ja"],                         │
│      ["WD000001", "안녕", "Hello", "こんにちは"],        │
│      ["ST000001", "감사", "Thanks", "ありがとう"]        │
│    ]                                                     │
│  }                                                       │
└──────┬──────────────────────────────────────────────────┘
       │
       │ [4] 2D 배열 → CSV 변환
       ▼
┌──────────────┐
│  CSV 형식     │
│  key,ko,en,ja│
│  WD000001,... │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Parser      │
│  (papaparse) │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Dictionary  │
│  {           │
│    "WD000001"│
│    : {...}   │
│  }           │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  globalState │
│  (로컬 저장)  │
└──────────────┘
```

#### CSV URL 통신

```
┌──────────────┐
│  VS Code     │
│  Extension   │
└──────┬───────┘
       │
       │ [1] CSV URL로 HTTP GET 요청
       ▼
┌─────────────────────────────────────────────────────────┐
│  Google Sheets (웹에 게시된 CSV)                         │
│  https://docs.google.com/spreadsheets/d/e/.../pub?...   │
└──────┬──────────────────────────────────────────────────┘
       │
       │ [2] CSV 텍스트 반환
       │
       ▼
┌──────────────┐
│  CSV 텍스트   │
│  key,ko,en,ja│
│  WD000001,... │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Parser      │
│  (papaparse) │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Dictionary  │
│  {           │
│    "WD000001"│
│    : {...}   │
│  }           │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  globalState │
│  (로컬 저장)  │
└──────────────┘
```

### 컴포넌트 간 상호작용

```
┌─────────────────────────────────────────────────────────────┐
│                    Extension Lifecycle                       │
└─────────────────────────────────────────────────────────────┘

[활성화 시]
extension.ts
  ├─▶ globalState.get('langData') → 기존 데이터 로드
  ├─▶ registerCommand('languageHelper.sync') → Sync 명령 등록
  └─▶ registerHoverProvider() → Hover 기능 등록

[Sync 명령 실행 시]
extension.ts
  └─▶ syncLanguageData()
      ├─▶ services/sync.ts
      │   ├─▶ utils/fetcher.ts (CSV URL)
      │   ├─▶ utils/apiFetcher.ts (API)
      │   ├─▶ utils/multiSheetFetcher.ts (다중 시트)
      │   ├─▶ utils/sheetListFetcher.ts (시트 목록)
      │   ├─▶ utils/sheetIdExtractor.ts (ID 추출)
      │   ├─▶ utils/sheetNameParser.ts (시트 이름 파싱)
      │   ├─▶ utils/parser.ts (CSV 파싱)
      │   └─▶ utils/errorHandler.ts (에러 처리)
      └─▶ globalState.update() → 데이터 저장

[Hover 요청 시]
extension.ts
  └─▶ provideHover()
      ├─▶ providers/hover.ts
      │   ├─▶ utils/codePatternExtractor.ts (패턴 생성)
      │   ├─▶ utils/sheetNameParser.ts (시트 이름 파싱)
      │   └─▶ utils/markdown.ts (마크다운 생성)
      └─▶ languageDictionary 조회 (메모리에서)
```

## 📖 사용 방법

### 데이터 동기화

1. `Ctrl + Shift + P` (또는 `Cmd + Shift + P` on Mac)로 명령어 팔레트 열기
2. "Colo Language Helper: Sheet Connect Sync" 입력 후 실행
3. 동기화 완료 메시지 확인

### Hover로 다국어 확인

코드에서 `targetSheetNames` 설정에 지정된 시트 이름으로 시작하는 키에 마우스를 올리면 다국어 정보가 표시됩니다:

```typescript
// 기본 설정 (WD,ST,CD)인 경우
const code = "WD000001"; // 여기에 마우스를 올리면
getLang("ST000001");     // 함수 호출 내부도 감지됩니다
t("CD000001");           // 다양한 함수명 지원 (getLang, t, i18n, translate 등)
```

표시되는 정보:
- 🇰🇷 **KO**: 한국어
- 🇺🇸 **EN**: 영어
- 🇯🇵 **JA**: 일본어

**지원하는 함수명**: `getLang`, `t`, `i18n`, `translate`, `lang` 등

## ⚙️ 설정 항목 상세 설명

### 설정 항목 목록

| 설정 ID | 설정 이름 | 타입 | 필수 | 기본값 | 설명 |
|---------|----------|------|------|--------|------|
| `languageHelper.sheetApiKey` | Sheet Api Key | 문자열 | API 사용 시 | `""` | 구글 시트 API 키 (우선순위 1) |
| `languageHelper.sheetId` | Sheet Id | 문자열 | 선택 | `""` | 스프레드시트 ID (URL에서 자동 추출 가능) |
| `languageHelper.allSheetNames` | All Sheet Names | 불린 | 선택 | `true` | 모든 시트 가져오기 여부 |
| `languageHelper.targetSheetNames` | Target Sheet Names | 문자열 | 선택 | `WD,ST,CD` | 대상 시트 이름 목록 (쉼표로 구분) |
| `languageHelper.sheetUrl` | Sheet Url | 문자열 | CSV 사용 시 | `""` | CSV URL (우선순위 2) |

### 각 설정 항목 상세 설명

#### 1. Sheet Api Key (`languageHelper.sheetApiKey`)

- **설명**: Google Cloud Console에서 발급받은 Google Sheets API 키
- **타입**: 문자열
- **필수 여부**: API 방식 사용 시 필수
- **기본값**: 빈 문자열
- **입력 예시**: `AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- **참고**: 
  - API 키가 설정되어 있으면 API 방식을 사용합니다
  - API 키가 없으면 CSV URL 방식을 사용합니다
  - API 키는 Google Cloud Console에서 발급받을 수 있습니다

#### 2. Sheet Id (`languageHelper.sheetId`)

- **설명**: 구글 스프레드시트의 고유 ID
- **타입**: 문자열
- **필수 여부**: 선택 (Sheet Url에 ID가 포함되어 있으면 자동 추출)
- **기본값**: 빈 문자열
- **입력 방법**:
  - 방법 1: 스프레드시트 URL에서 ID만 추출하여 입력
    - URL: `https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j/edit`
    - ID: `1a2b3c4d5e6f7g8h9i0j`
  - 방법 2: 전체 URL을 입력하면 자동으로 ID를 추출합니다
- **참고**: 
  - Sheet Url에 ID가 포함되어 있으면 자동으로 추출되므로 비워둬도 됩니다
  - API 방식 사용 시 필수입니다

#### 3. All Sheet Names (`languageHelper.allSheetNames`)

- **설명**: 스프레드시트의 모든 시트를 가져올지 여부
- **타입**: 불린 (체크박스)
- **필수 여부**: 선택
- **기본값**: `true` (체크됨)
- **동작**:
  - ✅ **체크됨 (`true`)**: 스프레드시트의 모든 시트를 가져옵니다
  - ❌ **체크 해제 (`false`)**: `Target Sheet Names`에 지정한 시트만 가져옵니다
- **참고**: 
  - 체크 해제 시 `Target Sheet Names` 설정이 필요합니다
  - 기본값은 모든 시트를 가져오는 것입니다

#### 4. Target Sheet Names (`languageHelper.targetSheetNames`)

- **설명**: 가져올 시트 이름 목록 (쉼표로 구분)
- **타입**: 문자열
- **필수 여부**: `All Sheet Names`가 체크 해제되어 있을 때 필수
- **기본값**: `WD,ST,CD`
- **입력 형식**: 쉼표(,)로 구분된 시트 이름 목록
- **입력 예시**: 
  - `WD,ST,CD`
  - `Sheet1,Sheet2,Sheet3`
  - `WD`
- **참고**: 
  - `All Sheet Names`가 체크 해제되어 있을 때만 사용됩니다
  - 이 설정은 hover에서 추출할 코드 패턴과도 연동됩니다
  - 예: `WD,ST,CD`로 설정하면 `WD123`, `ST123`, `CD123` 같은 패턴을 감지합니다
  - 공백은 자동으로 제거되므로 `WD, ST, CD`와 `WD,ST,CD`는 동일합니다

#### 5. Sheet Url (`languageHelper.sheetUrl`)

- **설명**: 구글 스프레드시트 CSV URL
- **타입**: 문자열
- **필수 여부**: CSV 방식 사용 시 필수 (API 키가 없을 때)
- **기본값**: 빈 문자열
- **입력 예시**: `https://docs.google.com/spreadsheets/d/e/2PACX-1vxxxxxxxxxxxx/pub?output=csv`
- **참고**: 
  - API 키가 없을 때 사용됩니다
  - 구글 스프레드시트에서 "파일 > 공유 > 웹에 게시"로 생성할 수 있습니다
  - CSV 형식으로 게시해야 합니다
  - 단일 시트만 지원합니다

### 동작 방식 및 우선순위

#### 데이터 가져오기 우선순위

1. **API 키가 설정된 경우** → Google Sheets API 사용
   - `All Sheet Names`가 `true` (체크됨)
     - → 스프레드시트의 **모든 시트**를 가져옵니다
     - → `Target Sheet Names` 설정은 무시됩니다
   
   - `All Sheet Names`가 `false` (체크 해제)
     - → `Target Sheet Names`에 지정한 **시트들만** 가져옵니다
     - → 예: `WD,ST,CD`로 설정하면 WD, ST, CD 시트만 가져옵니다

2. **API 키가 없는 경우** → CSV URL 사용
   - `Sheet Url`에 입력한 CSV URL에서 데이터를 가져옵니다
   - 단일 시트만 지원합니다

#### Hover 패턴 추출

- `Target Sheet Names` 설정에 따라 hover에서 추출할 코드 패턴이 결정됩니다
- 예시:
  - `Target Sheet Names`가 `WD,ST,CD`인 경우
  - `WD123`, `ST456`, `CD789` 같은 패턴을 감지합니다
  - `WD000001`, `ST000002` 같은 긴 코드도 감지합니다

### 설정 예시

#### 예시 1: 모든 시트 가져오기 (기본 설정)

```json
{
  "languageHelper.sheetApiKey": "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "languageHelper.sheetId": "1a2b3c4d5e6f7g8h9i0j",
  "languageHelper.allSheetNames": true,
  "languageHelper.targetSheetNames": "WD,ST,CD",
  "languageHelper.sheetUrl": ""
}
```

**동작**:
- ✅ 모든 시트를 가져옵니다
- `Target Sheet Names`는 무시됩니다
- hover에서 `Target Sheet Names`에 지정된 패턴만 감지합니다 (WD, ST, CD)

#### 예시 2: 지정된 시트들만 가져오기

```json
{
  "languageHelper.sheetApiKey": "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "languageHelper.sheetId": "1a2b3c4d5e6f7g8h9i0j",
  "languageHelper.allSheetNames": false,
  "languageHelper.targetSheetNames": "WD,ST,CD",
  "languageHelper.sheetUrl": ""
}
```

**동작**:
- ❌ `All Sheet Names`가 체크 해제됨
- → WD, ST, CD 시트만 가져옵니다
- → hover에서 `WD123`, `ST123`, `CD123` 패턴 추출

#### 예시 3: CSV URL 사용

```json
{
  "languageHelper.sheetApiKey": "",
  "languageHelper.sheetId": "",
  "languageHelper.allSheetNames": true,
  "languageHelper.targetSheetNames": "WD,ST,CD",
  "languageHelper.sheetUrl": "https://docs.google.com/spreadsheets/d/e/2PACX-1vxxxxxxxxxxxx/pub?output=csv"
}
```

**동작**:
- API 키가 없으므로 CSV URL을 사용합니다
- CSV URL에서 데이터를 가져옵니다
- 단일 시트만 지원합니다
- hover에서 `Target Sheet Names`에 지정된 패턴을 감지합니다

#### 예시 4: Sheet Id 자동 추출

```json
{
  "languageHelper.sheetApiKey": "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "languageHelper.sheetId": "https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j/edit",
  "languageHelper.allSheetNames": true,
  "languageHelper.targetSheetNames": "WD,ST,CD",
  "languageHelper.sheetUrl": ""
}
```

**동작**:
- `Sheet Id`에 전체 URL을 입력해도 자동으로 ID를 추출합니다
- `1a2b3c4d5e6f7g8h9i0j`로 자동 변환됩니다

## 📁 프로젝트 구조

```
src/
├── extension.ts          # 메인 진입점
├── types/
│   └── index.ts          # 타입 정의
├── utils/
│   ├── apiFetcher.ts     # API 데이터 가져오기
│   ├── fetcher.ts        # CSV 데이터 가져오기
│   ├── parser.ts         # CSV 파싱
│   ├── markdown.ts       # 마크다운 생성
│   ├── multiSheetFetcher.ts  # 다중 시트 가져오기
│   ├── sheetListFetcher.ts   # 모든 시트 목록 가져오기
│   ├── sheetIdExtractor.ts   # 시트 ID 추출
│   ├── codePatternExtractor.ts  # 코드 패턴 추출
│   └── errorHandler.ts   # 에러 처리
├── services/
│   └── sync.ts           # 동기화 로직
└── providers/
    └── hover.ts          # Hover Provider
```

## 🛠️ 개발

### 필수 요구사항

- Node.js 18.x 이상
- pnpm (또는 npm)

### 설치

```bash
pnpm install
```

### 빌드

```bash
# 개발 모드 (watch)
pnpm run watch

# 프로덕션 빌드
pnpm run package
```

### 테스트

Extension Development Host에서 테스트:

1. `F5` 키를 눌러 Extension Development Host 실행
2. 새 창에서 테스트 파일 생성
3. `WD000001` 같은 코드에 마우스 오버하여 확인

## ⚙️ 개발 환경 설정

프로젝트의 코드 스타일 규칙과 개발 가이드는 `.cursor/.cursorrules.md` 파일을 참고하세요.

### 개발 워크플로우

1. **코드 작성**
   - `.cursor/.cursorrules.md` 규칙 준수

2. **린트 체크**
   ```bash
   pnpm run lint
   ```

3. **빌드 및 테스트**
   ```bash
   # 개발 모드 (자동 재빌드)
   pnpm run watch
   
   # Extension Development Host에서 테스트
   # F5 키로 실행
   ```

4. **커밋 전 체크리스트**
   - [ ] ESLint 오류 없음 (`pnpm run lint`)
   - [ ] 순환 참조 없음
   - [ ] 타입 오류 없음

## 📝 스프레드시트 형식

스프레드시트는 다음 형식이어야 합니다:

| key | ko | en | ja |
|-----|----|----|----|
| WD000001 | 안녕하세요 | Hello | こんにちは |
| ST000001 | 감사합니다 | Thank you | ありがとう |

- 첫 번째 행은 헤더로 사용됩니다
- `key` 컬럼은 필수입니다
- `ko`, `en`, `ja` 컬럼은 선택사항입니다

## 🐛 문제 해결

### "API 키가 유효하지 않습니다" 오류

- Google Sheets API가 활성화되어 있는지 확인
- API 키 제한 설정 확인
- 시트가 "링크가 있는 모든 사용자"로 공유되어 있는지 확인

### "시트 ID가 잘못되었습니다" 오류

- 스프레드시트 URL에서 ID를 올바르게 추출했는지 확인
- 시트가 삭제되지 않았는지 확인

### Hover가 작동하지 않습니다

- 데이터 동기화를 먼저 실행했는지 확인
- 코드에서 `WD`, `ST`, `CD`로 시작하는 키를 사용했는지 확인
- TypeScript/JavaScript 파일에서 사용 중인지 확인

## 📦 배포 가이드

### 사전 준비

1. **Azure DevOps 계정 생성**
   - [Azure DevOps](https://dev.azure.com/) 접속
   - Microsoft 계정으로 로그인 (없으면 생성)
   - 조직(Organization) 생성

2. **Personal Access Token (PAT) 생성**
   - Azure DevOps 프로필 아이콘 클릭
   - **Security** > **Personal access tokens** 선택
   - **+ New Token** 클릭
   - 설정:
     - **Name**: `VS Code Extension Publishing` (원하는 이름)
     - **Organization**: 생성한 조직 선택
     - **Expiration**: 원하는 만료 기간 설정
     - **Scopes**: **Custom defined** 선택
     - **Marketplace** 섹션에서 **Manage** 권한 체크
   - **Create** 클릭
   - ⚠️ **토큰을 안전한 곳에 복사해두세요!** (다시 확인할 수 없습니다)

### 배포 단계

#### 1단계: vsce 도구 설치

```bash
# 전역 설치 (권장)
pnpm add -g @vscode/vsce

# 또는 프로젝트에 devDependency로 추가
pnpm add -D @vscode/vsce
```

#### 2단계: package.json 확인

배포 전에 `package.json`의 다음 항목을 확인하세요:

- ✅ `name`: 익스텐션 ID (소문자, 하이픈만 사용)
- ✅ `displayName`: 마켓플레이스에 표시될 이름
- ✅ `version`: 버전 번호 (semver 형식: `major.minor.patch`)
- ✅ `publisher`: 발행자 ID (Azure DevOps 조직 이름과 일치해야 함)
- ✅ `description`: 익스텐션 설명
- ✅ `repository`: GitHub 저장소 URL (선택사항, 있으면 좋음)

현재 설정:
```json
{
  "name": "lang-global-helper",
  "displayName": "Colo Language Helper",
  "version": "0.0.1",
  "publisher": "lang-global-helper"
}
```

> 💡 **주의**: `publisher`는 Azure DevOps 조직 이름과 일치해야 합니다. 다른 이름을 사용하려면 변경하세요.

#### 3단계: 프로덕션 빌드

```bash
# 프로덕션 빌드 실행
pnpm run package
```

빌드가 성공하면 `dist/extension.js` 파일이 생성됩니다.

#### 4단계: 패키징 (VSIX 파일 생성)

```bash
# VSIX 파일 생성
pnpm run package:vsix

# 또는 직접 실행
vsce package
```

성공하면 `lang-global-helper-0.0.1.vsix` 파일이 생성됩니다.

#### 5단계: 배포

**첫 배포 (새 익스텐션):**

```bash
# Personal Access Token을 사용하여 배포
vsce publish -p <YOUR_PERSONAL_ACCESS_TOKEN>

# 또는 환경 변수로 설정
export VSCE_PAT=<YOUR_PERSONAL_ACCESS_TOKEN>
vsce publish
```

**업데이트 배포 (기존 익스텐션):**

⚠️ **중요**: 코드를 수정하고 다시 배포할 때는 반드시 `package.json`의 `version`을 올린 뒤 배포해야 합니다.

1. **버전 업데이트** (필수)
   - `package.json`의 `version`을 업데이트 (예: `0.0.1` → `0.0.2`)
   - 버전을 올리지 않으면 배포가 실패합니다

2. **빌드 및 패키징**:
   ```bash
   pnpm run build
   pnpm run package:vsix
   ```

3. **배포**:
   ```bash
   vsce publish -p <YOUR_PERSONAL_ACCESS_TOKEN>
   ```

### 배포 프로세스 도식화

#### 첫 배포 프로세스

```
[코드 작성]
    │
    ▼
[package.json 설정 확인]
    │
    ├─▶ publisher: "language-global-helper"
    ├─▶ name: "lang-global-helper"
    ├─▶ version: "0.0.1"
    └─▶ main: "./dist/extension.js"
    │
    ▼
[프로덕션 빌드]
    │
    └─▶ pnpm run build
        └─▶ dist/extension.js 생성
    │
    ▼
[VSIX 패키징]
    │
    └─▶ pnpm run package:vsix
        └─▶ lang-global-helper-0.0.1.vsix 생성
    │
    ▼
[마켓플레이스 배포]
    │
    └─▶ vsce publish -p <TOKEN>
        └─▶ VS Code Marketplace에 게시
    │
    ▼
[배포 완료]
    └─▶ 마켓플레이스에서 확인 가능
```

#### 업데이트 배포 프로세스

```
[코드 수정]
    │
    ▼
[버전 업데이트] ⚠️ 필수!
    │
    └─▶ package.json
        └─▶ version: "0.0.1" → "0.0.2"
    │
    ▼
[프로덕션 빌드]
    │
    └─▶ pnpm run build
        └─▶ dist/extension.js 재생성
    │
    ▼
[VSIX 패키징]
    │
    └─▶ pnpm run package:vsix
        └─▶ lang-global-helper-0.0.2.vsix 생성
    │
    ▼
[마켓플레이스 배포]
    │
    └─▶ vsce publish -p <TOKEN>
        └─▶ 새 버전으로 업데이트
    │
    ▼
[업데이트 완료]
    └─▶ 사용자들이 새 버전으로 업데이트 가능
```

### 아이콘 적용

익스텐션에 아이콘을 적용하려면:

1. **아이콘 이미지 준비**
   - 루트 폴더에 `icon.png` 파일 추가
   - 권장 크기: 128x128 픽셀 (PNG 형식)
   - 투명 배경 권장

2. **package.json에 아이콘 추가**
   ```json
   {
     "name": "lang-global-helper",
     "displayName": "Colo Language Helper",
     "version": "0.0.1",
     "publisher": "language-global-helper",
     "icon": "icon.png",
     ...
   }
   ```

3. **재배포**
   ```bash
   # 버전 업데이트 (필수)
   # package.json에서 version: "0.0.1" → "0.0.2"
   
   # 빌드 및 패키징
   pnpm run build
   pnpm run package:vsix
   
   # 배포
   vsce publish -p <YOUR_PERSONAL_ACCESS_TOKEN>
   ```

> 💡 **참고**: 아이콘을 추가하거나 변경할 때도 반드시 버전을 올려야 합니다.

### 배포 후 확인

1. **VS Code 마켓플레이스 확인**
   - [VS Code Marketplace](https://marketplace.visualstudio.com/vscode) 접속
   - 익스텐션 이름으로 검색
   - 배포 완료까지 몇 분 정도 소요될 수 있습니다

2. **VS Code에서 설치 테스트**
   - VS Code에서 `Ctrl + Shift + X` (또는 `Cmd + Shift + X`)
   - 익스텐션 이름으로 검색
   - 설치하여 정상 작동 확인

### 배포 체크리스트

배포 전 확인사항:

- [ ] `package.json`의 모든 필수 필드가 올바르게 설정되어 있는가?
- [ ] `version`이 이전 버전보다 높은가? (semver 형식)
- [ ] 프로덕션 빌드가 성공적으로 완료되었는가?
- [ ] `dist/extension.js` 파일이 생성되었는가?
- [ ] `.vscodeignore`에 불필요한 파일이 제외되어 있는가?
- [ ] Personal Access Token이 준비되어 있는가?
- [ ] `publisher`가 Azure DevOps 조직 이름과 일치하는가?

### 문제 해결

#### "publisher not found" 오류

- Azure DevOps에 해당 이름의 조직이 있는지 확인
- `package.json`의 `publisher`를 Azure DevOps 조직 이름과 일치시킴

#### "Extension with same name already exists" 오류

- 다른 사용자가 이미 해당 이름을 사용 중
- `package.json`의 `name`을 다른 이름으로 변경

#### "Invalid Personal Access Token" 오류

- 토큰이 만료되었는지 확인
- 토큰에 **Marketplace > Manage** 권한이 있는지 확인
- 새 토큰을 생성하여 다시 시도

#### 배포 후 마켓플레이스에 표시되지 않음

- 배포 완료까지 몇 분에서 몇 시간까지 소요될 수 있음
- VS Code 마켓플레이스 웹사이트에서 직접 검색해보기
- 익스텐션 ID로 직접 접근: `https://marketplace.visualstudio.com/items?itemName=<publisher>.<name>`

### 로컬 설치 (테스트용)

VSIX 파일을 직접 설치하여 테스트할 수 있습니다:

```bash
# VSIX 파일 생성
pnpm run package:vsix

# VS Code에서 설치
code --install-extension lang-global-helper-0.0.1.vsix
```

### 버전 관리 전략

- **Major (1.0.0)**: 호환되지 않는 변경사항
- **Minor (0.1.0)**: 새로운 기능 추가 (하위 호환)
- **Patch (0.0.1)**: 버그 수정 (하위 호환)

예시:
- `0.0.1` → `0.0.2`: 버그 수정
- `0.0.2` → `0.1.0`: 새로운 기능 추가
- `0.1.0` → `1.0.0`: 주요 변경사항

## 📄 라이선스

MIT

## 🤝 기여

이슈 및 풀 리퀘스트를 환영합니다!

## 📧 문의

문제가 발생하거나 제안사항이 있으시면 이슈를 등록해주세요.

---

**Made with ❤️ for better multilingual development experience**
