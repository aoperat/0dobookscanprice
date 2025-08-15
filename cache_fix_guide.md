<!-- 캐시 문제 해결 가이드 -->

## 🚨 캐시 문제 완전 해결 방법

### 📱 **즉시 해결 방법**

#### 1. **브라우저 하드 새로고침**
- **Chrome/Edge**: `Ctrl + Shift + R` 또는 `Ctrl + F5`
- **Firefox**: `Ctrl + Shift + R`
- **Safari**: `Cmd + Shift + R`
- **모바일**: 브라우저 새로고침 버튼 길게 누르기

#### 2. **브라우저 개발자 도구 사용**
1. `F12` 키로 개발자 도구 열기
2. Network 탭에서 "Disable cache" 체크
3. 페이지 새로고침

#### 3. **시크릿/사생활 보호 모드**
- **Chrome**: `Ctrl + Shift + N`
- **Firefox**: `Ctrl + Shift + P`
- **Safari**: `Cmd + Shift + N`

#### 4. **브라우저 데이터 삭제**
1. 브라우저 설정 → 개인정보/보안
2. "인터넷 사용 기록 삭제"
3. 캐시된 이미지 및 파일 삭제

### 🔧 **URL 직접 수정**
파일 URL 뒤에 버전 파라미터 추가:
```
thumbnail.html?v=20250815_003
toc_price_table.html?v=20250815_003
```

### ⚡ **서버 설정 (고급)**
웹서버에 .htaccess 파일 생성:
```apache
<FilesMatch "\.(html|htm)$">
    Header set Cache-Control "no-cache, no-store, must-revalidate"
    Header set Pragma "no-cache"
    Header set Expires 0
</FilesMatch>
```

### 🎯 **적용된 자동 해결책**
1. ✅ 강력한 캐시 방지 메타 태그
2. ✅ JavaScript 버전 체크 시스템
3. ✅ 로컬스토리지 기반 자동 새로고침
4. ✅ URL 타임스탬프 자동 추가
5. ✅ 서비스 워커 캐시 자동 삭제

이제 페이지를 다시 열면 자동으로 최신 버전이 로드됩니다!
