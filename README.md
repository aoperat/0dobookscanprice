# 북스캔 가격 계산기

북스캔 서비스 가격을 계산하는 웹 애플리케이션입니다.

## 기술 스택

- React 19
- TypeScript
- Vite
- Tailwind CSS 4

## 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버는 `http://localhost:5173`에서 실행됩니다.

## 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

빌드 결과물은 `dist` 폴더에 생성됩니다. 이 폴더의 내용을 웹 서버에 업로드하여 배포할 수 있습니다.

### GitHub Pages 배포

#### 자동 배포 (GitHub Actions)

1. 저장소 Settings → Pages로 이동
2. Source를 "GitHub Actions"로 설정
3. `.github/workflows/deploy.yml` 파일이 push되면 자동으로 배포됩니다

#### 수동 배포

1. **vite.config.ts 설정**
   - 저장소 이름이 서브 경로를 사용하는 경우 (예: `username.github.io/repository-name/`)
     ```typescript
     base: '/repository-name/',
     ```
   - 커스텀 도메인이거나 루트 경로인 경우
     ```typescript
     base: '/',
     ```

2. **빌드 및 배포**
   ```bash
   npm run build
   ```
   
3. **dist 폴더 배포**
   - Option 1: `gh-pages` 브랜치에 `dist` 내용 push
   - Option 2: GitHub Pages 설정에서 Source를 `gh-pages` 브랜치로 설정하고 `dist` 내용을 해당 브랜치에 push

### 다른 배포 방법

1. **정적 호스팅 서비스 (Vercel, Netlify 등)**
   - GitHub 저장소에 연결하여 자동 배포
   - 또는 `dist` 폴더를 직접 업로드

2. **일반 웹 서버**
   - `dist` 폴더의 모든 파일을 웹 서버 루트 디렉토리에 업로드
   - 서버가 SPA를 지원하도록 설정 (모든 경로를 `index.html`로 리다이렉트)

---

## 참고

### React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
