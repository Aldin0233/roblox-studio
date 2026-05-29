# Roblox Studio 수업 자료실

학부모님이 접속해 수업 프린트를 내려받고 코드 예제를 복사할 수 있는 GitHub Pages용 정적 사이트입니다.

## 포함 파일

- `index.html`: 회차별 자료실 페이지
- `styles.css`: 반응형 화면 스타일
- `script.js`: 복사 버튼 동작
- `docs/lesson-01-review.pdf`: 1회차 복습 프린트
- `docs/lesson-02-training.pdf`: 2회차 복습 프린트
- `docs/lesson-03-script.pdf`: 3회차 스크립트 기초 프린트
- `docs/lesson-04-gui-publish.pdf`: 4회차 GUI와 게시하기 프린트

## GitHub Pages 배포

1. 이 `parent-docs-site` 폴더 안의 파일을 새 GitHub 저장소에 업로드합니다.
2. GitHub 저장소에서 `Settings` → `Pages`로 이동합니다.
3. `Build and deployment`의 Source를 `Deploy from a branch`로 설정합니다.
4. Branch를 `main`, Folder를 `/ (root)`로 선택한 뒤 저장합니다.
5. 표시되는 Pages 주소를 학부모님께 공유합니다.

문서 링크는 `docs` 폴더의 `lesson-*` 프린트 파일명을 사용합니다.

## 업로드 전 체크리스트

- 저장소에는 `parent-docs-site` 폴더 안의 내용만 올리세요. 상위 작업 폴더 전체를 올리면 백업본과 임시 파일이 함께 공개될 수 있습니다.
- GitHub Pages 설정에서 Folder는 `/ (root)`로 선택하세요.
- Pages 주소가 생성된 뒤 휴대폰에서도 접속해 프린트 다운로드와 코드 복사 버튼이 동작하는지 확인하세요.
- 2회차와 3회차 복사 버튼은 `index.html`의 `data-copy-example` 값과 `script.js` 예제 본문으로 연결합니다.
- 문서를 교체할 때는 현재 `index.html`에 연결된 프린트 파일명을 그대로 유지하면 링크를 다시 고칠 필요가 없습니다.
- 저장소가 공개 저장소라면 Pages 주소를 아는 사람이 문서에 접근할 수 있습니다. 학부모 외부 공개가 부담되면 비공개 저장소의 Pages 사용 가능 여부를 계정 요금제에서 먼저 확인하세요.
