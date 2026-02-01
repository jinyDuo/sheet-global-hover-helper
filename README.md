# Sheet Language Global Helper

A VS Code extension that fetches multilingual data from Google Sheets and displays it via hover in your code.

## 🌐 Languages

- [English](README.md) (Current)
- [한국어 (Korean)](README.ko.md)

## 🔗 Links

- 📦 [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=language-global-helper.lang-global-helper)
- 💻 [GitHub Repository](https://github.com/jinyDuo/colo-language-extension)

## ✨ Features

- 📊 **Google Sheets Integration**: Fetch multilingual data via Google Sheets API or CSV URL
- 🔍 **Hover Feature**: Hover over keys starting with `WD`, `ST`, `CD` in your code to see multilingual information
- 🏷️ **Inline Translation (Inlay Hints)**: Show translations inline next to keys and translation calls (no hover needed)
- 💾 **Local Caching**: Data is stored in local storage for offline use
- 🔄 **Manual Sync**: Update to the latest data only when needed
- 📝 **Multi-Sheet Support**: Fetch multiple sheets (WD, ST, CD, etc.) at once

### Complete Workflow

```mermaid
flowchart LR
    A[Google Sheets] -->|API or CSV| B[Data Sync]
    B --> C[Local Storage<br/>Save]
    C --> D[Write Code<br/>in VS Code]
    D --> E[Hover over Keys<br/>WD000001, ST000001, etc.]
    E --> F[Hover Popup<br/>Multilingual Info]
    
    style A fill:#c8e6c9,color:#000000
    style B fill:#b3e5fc,color:#000000
    style C fill:#e1bee7,color:#000000
    style D fill:#ffe0b2,color:#000000
    style E fill:#ffe0b2,color:#000000
    style F fill:#c8e6c9,color:#000000
```

## 🚀 Getting Started

### Installation

1. Open VS Code Extensions Marketplace with `Ctrl + Shift + X` (or `Cmd + Shift + X` on Mac)
2. Search for "Sheet Language Global Helper"
3. Click Install

### Configuration

Open VS Code settings with `Ctrl + ,` (or `Cmd + ,` on Mac) and search for "Sheet Language Global Helper".

#### Method 1: Using Google Sheets API (Recommended)

1. **Get API Key**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a project → APIs & Services > Library → Enable "Google Sheets API"
   - APIs & Services > Credentials > Create API Key

2. **Share Sheet Settings** ⚠️ Required
   - Open your Google Spreadsheet and click the **Share** button (top right)
   - Select **Anyone with the link** and set permission to **Viewer**

3. **VS Code Settings**
   - **Sheet Api Key**: Enter your API key
   - **Sheet Id**: Extract ID from spreadsheet URL (or enter full URL for auto-extraction)
   - **All Sheet Names**: Fetch all sheets (default: checked)
   - **Target Sheet Names**: Fetch only specified sheets (e.g., `WD,ST,CD`)

#### Method 2: Using CSV URL

1. In Google Spreadsheet, go to **File > Share > Publish to web** → Select CSV format
2. Enter the generated URL in **Sheet Url**

> 💡 **Priority**: If API key exists, API is used; otherwise, CSV URL is used.

### Configuration Method Comparison

```mermaid
flowchart TD
    A[Start Configuration] --> B{API Key Available?}
    B -->|Yes| C[Method 1: Google Sheets API]
    B -->|No| D[Method 2: CSV URL]
    
    C --> C1[1. Google Cloud Console<br/>Get API Key]
    C1 --> C2[2. Share Sheet<br/>Anyone with the link]
    C2 --> C3[3. VS Code Settings<br/>Enter sheetApiKey, sheetId]
    C3 --> E[Run Sync]
    
    D --> D1[1. Google Sheet<br/>Publish to web as CSV]
    D1 --> D2[2. VS Code Settings<br/>Enter sheetUrl]
    D2 --> E
    
    style C fill:#c8e6c9,color:#000000
    style D fill:#ffe0b2,color:#000000
    style E fill:#b3e5fc,color:#000000
```

## 📖 Usage

### Data Synchronization

1. Press `Ctrl + Shift + P` → Run "Sheet Language Global Helper: Sheet Connect Sync"
2. Confirm the sync completion message

#### Synchronization Process

```mermaid
flowchart LR
    A[Run Command<br/>Ctrl+Shift+P] --> B{API Key Available?}
    B -->|Yes| C[Google Sheets API<br/>Fetch Data]
    B -->|No| D[CSV URL<br/>Fetch Data]
    
    C --> C1{allSheetNames<br/>Checked?}
    C1 -->|Yes| C2[Fetch All Sheets]
    C1 -->|No| C3[targetSheetNames<br/>Fetch Specified Sheets Only]
    C2 --> E[Parse CSV]
    C3 --> E
    D --> E
    
    E --> F[Local Storage<br/>Save]
    F --> G[Sync Complete<br/>Show Message]
    
    style A fill:#b3e5fc,color:#000000
    style C fill:#c8e6c9,color:#000000
    style D fill:#ffe0b2,color:#000000
    style F fill:#e1bee7,color:#000000
    style G fill:#c8e6c9,color:#000000
```

### View Multilingual Info via Hover

Hover over keys matching the patterns specified in `hoverKeyPatterns` to see multilingual information:

```typescript
const code = "WD000001";  // Shows multilingual info on hover
getLang("ST000001");      // Also detects inside function calls
t("CD000001");            // Supports getLang, t, i18n, translate, etc.
```

**Display Info**: 🇰🇷 KO, 🇺🇸 EN, 🇯🇵 JA

#### Hover Example

![Hover Example](hover-example.png)

*Example: Hovering over `WD000527` displays multilingual translations (EN: Client, KO: 클라이언트)*

#### How Hover Works

```mermaid
flowchart TD
    A[Hover over Code] --> B{Pattern Match<br/>WD/ST/CD + Numbers}
    B -->|Matched| C[Query Local Storage<br/>Data]
    B -->|Not Matched| D[No Hover]
    
    C --> E{Data Exists?}
    E -->|Yes| F[Display Multilingual Info<br/>🇰🇷 KO, 🇺🇸 EN, 🇯🇵 JA]
    E -->|No| D
    
    F --> G[Show Hover Popup]
    
    style A fill:#b3e5fc,color:#000000
    style B fill:#ffe0b2,color:#000000
    style C fill:#e1bee7,color:#000000
    style F fill:#c8e6c9,color:#000000
    style G fill:#c8e6c9,color:#000000
```

### Show Inline Translation (Inlay Hints)

After running sync, translations can be displayed inline (without hover) as inlay hints:

```typescript
t("WD000001");         // → Hello (based on inlineTranslationLanguage)
t("프로그램 등록");      // → Program Registration (if your sheet key is the Korean text)
```

#### Inlay Hints Example

![Inlay Hints Example](inline-hint-example.png)

> Note: Inlay hints are refreshed automatically after sync and when related settings change.

## ⚙️ Configuration

| Setting | Description | Required | Default |
|---------|-------------|----------|---------|
| `sheetApiKey` | Google Sheets API Key | When using API | - |
| `sheetId` | Spreadsheet ID | Optional | - |
| `allSheetNames` | Fetch all sheets | Optional | `true` |
| `targetSheetNames` | Target sheet list (comma-separated) | Optional | `WD,ST,CD` |
| `hoverKeyPatterns` | Hover/Hint key patterns (comma-separated). Used to detect codes like `WD123`, `ST123`. | Optional | `WD,ST,CD` |
| `showInlineTranslation` | Show inline translation as inlay hints | Optional | `true` |
| `inlineTranslationLanguage` | Language to display for inline translation (dropdown: `ko`, `en`, `ja`, etc.) | Optional | `ko` |
| `sheetUrl` | CSV URL | When using CSV | - |

### How It Works

```mermaid
flowchart TD
    A[Run Sync Command] --> B{API Key Configured?}
    
    B -->|Yes| C[Use Google Sheets API]
    B -->|No| D[Use CSV URL]
    
    C --> C1{allSheetNames<br/>Checked?}
    C1 -->|Yes| C2[Fetch All Sheets<br/>Auto Query Sheet List]
    C1 -->|No| C3[targetSheetNames<br/>Fetch Specified Sheets Only<br/>e.g., WD,ST,CD]
    
    C2 --> E[Parse CSV Data]
    C3 --> E
    D --> E
    
    E --> F[Save to Local Storage]
    F --> G[Available for Hover]
    
    style B fill:#ffe0b2,color:#000000
    style C fill:#c8e6c9,color:#000000
    style D fill:#ffe0b2,color:#000000
    style C2 fill:#b3e5fc,color:#000000
    style C3 fill:#b3e5fc,color:#000000
    style F fill:#e1bee7,color:#000000
    style G fill:#c8e6c9,color:#000000
```

**Summary**:
- **API Key Available**: Use Google Sheets API
  - `allSheetNames` checked → Fetch all sheets
  - `allSheetNames` unchecked → Fetch only sheets specified in `targetSheetNames`
- **No API Key**: Use CSV URL (single sheet only)

## 📝 Spreadsheet Format

| key | ko | en | ja |
|-----|----|----|----|
| WD000001 | 안녕하세요 | Hello | こんにちは |
| ST000001 | 감사합니다 | Thank you | ありがとう |

- First row is used as header
- `key` column is required; `ko`, `en`, `ja` are optional

## 🐛 Troubleshooting

### "API Key is Invalid"
- Verify Google Sheets API is enabled
- Check if the sheet is shared with "Anyone with the link"

### "Sheet ID is Incorrect"
- Verify the ID is correctly extracted from the spreadsheet URL

### Hover Not Working
- Make sure data synchronization has been run first
- Verify you're using keys starting with `WD`, `ST`, `CD` in your code

## 🛠️ Development

### Requirements

- **Node.js 20.x or higher** (Required)
- pnpm (or npm)

### Installation and Build

```bash
# Install dependencies
pnpm install

# Development mode (watch)
pnpm run watch

# Production build
pnpm run build
```

### Testing

1. Press `F5` to run Extension Development Host
2. Create a test file in the new window
3. Hover over codes like `WD000001` to verify

## 📦 Deployment

### Prerequisites

1. Create account/organization on [Azure DevOps](https://dev.azure.com/)
2. Generate Personal Access Token (Marketplace > Manage permission required)

### Deployment Process

```mermaid
flowchart TD
    A[Modify Code] --> B[Update package.json<br/>version]
    B --> C[pnpm run build<br/>Production Build]
    C --> D{Build Success?}
    D -->|Failed| E[Fix Errors]
    E --> C
    D -->|Success| F[vsce publish<br/>--no-dependencies]
    F --> G[Enter Personal Access Token]
    G --> H[VSIX Packaging<br/>Auto Execute]
    H --> I[Upload to Marketplace]
    I --> J[Deployment Complete<br/>Reflected in a few minutes]
    
    style A fill:#ffe0b2,color:#000000
    style B fill:#b3e5fc,color:#000000
    style C fill:#ffe0b2,color:#000000
    style F fill:#e1bee7,color:#000000
    style J fill:#c8e6c9,color:#000000
```

### Deployment Commands

```bash
# 1. Install vsce
pnpm add -g @vscode/vsce

# 2. Build
pnpm run build

# 3. Package VSIX
pnpm run package:vsix

# 4. Deploy (skip dependency check)
vsce publish --no-dependencies -p <YOUR_PERSONAL_ACCESS_TOKEN>
```

### Update Deployment

⚠️ **Important**: You must increment the `version` in `package.json` before redeploying after code changes.

```bash
# 1. Update version in package.json (e.g., 0.0.1 → 0.0.2)
# 2. Build and deploy
pnpm run build
vsce publish --no-dependencies -p <TOKEN>
```

### Apply Icon

1. Add `icon.png` to root folder (128x128 recommended)
2. Add `"icon": "icon.png"` to `package.json`
3. Update version and redeploy

## 📄 License

MIT

## 🤝 Contributing

Issues and pull requests are welcome!

---

**Made with ❤️ for better multilingual development experience**
