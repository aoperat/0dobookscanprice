# 북스캔 서비스 가격 정책 관리 가이드

## 📋 개요
가격 정책이 `pricing_config.json` 파일로 분리되어 관리됩니다. 
가격이나 정책 변경 시 JSON 파일만 수정하면 웹사이트에 자동 반영됩니다.

## 🔧 JSON 설정 파일 구조 (`pricing_config.json`)

### 1. 기본 스캔 가격 (`scan_pricing`)
```json
{
  "scan_pricing": {
    "base_prices": [
      { "max_pages": 300, "price": 4000 },
      { "max_pages": 400, "price": 5000 },
      { "max_pages": 500, "price": 6000 },
      { "max_pages": 600, "price": 7000 },
      { "max_pages": null, "base_price": 4000, "extra_per_100": 1000 }
    ],
    "options": {
      "ocr": 2000,
      "high_resolution": 2000
    }
  }
}
```

- `base_prices`: 페이지 범위별 기본 가격
- `max_pages`: 최대 페이지 수 (null이면 무제한)
- `extra_per_100`: 초과 페이지당 100쪽 단위 추가 요금

### 2. 목차 생성 가격 (`toc_pricing`)
```json
{
  "toc_pricing": {
    "tiers": [
      { "max_count": 10, "base_price": 3000, "per_item": 0 },
      { "max_count": 30, "base_price": 3000, "per_item": 250, "threshold": 10 },
      { "max_count": 60, "base_price": 5000, "per_item": 80, "threshold": 30 },
      { "max_count": 100, "base_price": 8000, "per_item": 60, "threshold": 60 },
      { "max_count": null, "base_price": 10400, "per_item": 50, "threshold": 100 }
    ],
    "bundle_discount": 0.3
  }
}
```

- `tiers`: 목차 개수별 가격 단계
- `base_price`: 기본 가격
- `per_item`: 임계값 초과시 개당 추가 요금
- `threshold`: 추가 요금 시작 지점
- `bundle_discount`: 책과 함께 주문시 할인율

### 3. 대량 할인 (`bulk_discounts`)
```json
{
  "bulk_discounts": [
    { "min_books": 5, "discount_rate": 0.05 },
    { "min_books": 10, "discount_rate": 0.10 },
    { "min_books": 20, "discount_rate": 0.15 }
  ]
}
```

### 4. 프로모션 설정 (`promotion`)
```json
{
  "promotion": {
    "active": true,
    "end_date": "2025-08-21T23:59:59Z",
    "description": "특가 기간: 8월 21일까지!"
  }
}
```

### 5. 서비스 정보 (`service_info`)
```json
{
  "service_info": {
    "max_width_mm": 240,
    "min_pages": 1,
    "default_pages": 100,
    "default_toc_count": 0
  }
}
```

### 6. 표시 메시지 (`display_messages`)
```json
{
  "display_messages": {
    "urgency_messages": [
      "⏰ 특가 종료까지 {time}! 지금 주문하세요!",
      "🔥 8월 21일까지 한정 특가! 남은 시간 {time}"
    ],
    "recommendations": {
      "ocr_threshold": 300,
      "high_res_threshold": 200,
      "toc_threshold": 400,
      "bundle_threshold": 250
    },
    "tooltips": {
      "ocr": "텍스트 검색이 가능한 PDF로 만들어드려요!<br><small>단어나 문장을 바로 찾을 수 있어요</small>",
      "high_resolution": "400dpi 고화질로 선명하게!<br><small>이미지와 도표가 더 깨끗해요</small>",
      "toc": "클릭 한 번으로 원하는 페이지로!<br><small>✅ 굿노트, 플렉슬 완벽 호환</small>"
    }
  }
}
```

## 🚀 가격 정책 변경 방법

### 1. 기본 스캔 가격 변경
```json
// 예: 300쪽 이하 가격을 4500원으로 변경
{ "max_pages": 300, "price": 4500 }
```

### 2. OCR/고해상도 옵션 가격 변경
```json
"options": {
  "ocr": 2500,        // OCR 가격 변경
  "high_resolution": 2500  // 고해상도 가격 변경
}
```

### 3. 할인율 변경
```json
// 예: 5권 이상 할인율을 7%로 변경
{ "min_books": 5, "discount_rate": 0.07 }
```

### 4. 새로운 할인 단계 추가
```json
"bulk_discounts": [
  { "min_books": 5, "discount_rate": 0.05 },
  { "min_books": 10, "discount_rate": 0.10 },
  { "min_books": 15, "discount_rate": 0.12 },  // 새 단계 추가
  { "min_books": 20, "discount_rate": 0.15 }
]
```

### 5. 프로모션 종료일 연장
```json
"promotion": {
  "active": true,
  "end_date": "2025-12-31T23:59:59Z",  // 날짜 변경
  "description": "특가 기간: 12월 31일까지!"
}
```

### 6. 프로모션 비활성화
```json
"promotion": {
  "active": false,  // 프로모션 비활성화
  "end_date": "2025-08-21T23:59:59Z",
  "description": "특가 기간 종료"
}
```

## 📝 주의사항

1. **JSON 문법 준수**: 문법 오류 시 기본값으로 폴백됩니다.
2. **브라우저 캐시**: 변경 후 강제 새로고침(Ctrl+F5) 권장
3. **백업**: 변경 전 기존 파일 백업 권장
4. **테스트**: 가격 계산기에서 변경사항 확인

## 🔄 버전 관리

- JSON 파일의 `version` 필드로 버전 추적
- `last_updated` 필드로 최종 수정일 기록

```json
{
  "version": "2025.08.25",
  "last_updated": "2025-08-25T00:00:00Z"
}
```

## 📊 실시간 반영

JSON 파일 저장 시 웹사이트에서 자동으로:
- 가격표 업데이트
- 할인율 재계산  
- 마케팅 메시지 변경
- 툴팁 내용 업데이트

더 이상 HTML 파일을 직접 수정할 필요가 없습니다! 🎉
