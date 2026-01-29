VitePress로 문서 홈페이지를 빌드 후 GitHub Pages로 배포합니다.

`docs-test-sub-a`, `docs-test-sub-b` 레포지터리에서 문서(`docs/**`) 변경이 `main`에 반영되면, homepage 레포의 배포 워크플로가 실행되도록 구성되어 있습니다.

## 구성 요소

- `docs-test-homepage` (이 레포)
  - VitePress 문서 사이트 소스 디렉토리: `docs/`
  - SDK 문서 소스는 `sdks/` 디렉토리 아래에 git submodule로 포함:
    - `sdks/js-sdk` → `https://github.com/blurfx/docs-test-sub-a`
    - `sdks/go-sdk` → `https://github.com/blurfx/docs-test-sub-b`
  - VitePress에서 보기 쉽게 심볼릭 링크로 노출:
    - `docs/js-sdk` → `../sdks/js-sdk/docs`
    - `docs/go-sdk` → `../sdks/go-sdk/docs`

## 동작 흐름

1. `docs-test-sub-a` 또는 `docs-test-sub-b`에서 `docs/**` 경로에 변경사항이 `main` 브랜치에 push
2. 각 sub 레포의 deploy 워크플로가 실행되며, GitHub API를 통해 `docs-test-homepage`의 `deploy` 워크플로를 `workflow_dispatch`로 호출
3. `docs-test-homepage`의 `deploy` 워크플로는 빌드 전에 `git submodule update --init --remote`를 실행
4. homepage의 deploy 워크플로가 vitepress 빌드 후 GitHub Pages에 배포

## 세팅 가이드 (Fine-grained PAT)

서브 레포(sub-a/sub-b)에서 홈페이지 레포(homepage)의 워크플로를 트리거하려면 토큰이 필요합니다.

### Token

homepage repo에 Actions: Read and write 권한이 있는 fine-grained PAT을 생성


sub 레포에 actions secret을 추가 

- Name: `HOMEPAGE_DISPATCH_TOKEN`
- Value: 위에서 만든 Fine-grained PAT

## 로컬 개발

```bash
# (처음 클론 시) submodule 포함해서 클론
git clone --recurse-submodules git@github.com:blurfx/docs-test-homepage.git
cd docs-test-homepage

npm ci
npm run update-sdks
npm run dev
```
