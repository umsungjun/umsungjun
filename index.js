import { writeFileSync } from "node:fs";
import Parser from "rss-parser";

let text = `
## 🔥 About Me

### 꾸준함을 강점으로 삼고 있는 프론트엔드 개발자 엄성준 입니다.

## 📌 My Open Source Projects
<ul style="line-height: 2;">
<li><a href="https://github.com/umsungjun/react-head-safe">react-head-safe</a> - A lightweight SEO optimization library that resolves meta tag duplication issues in react-helmet-async</li>
</ul>

## 📌 Open Source Contribution
<ul style="line-height: 2; max-height: 10rem; overflow-y: scroll;">
<li>✅ <a href="https://github.com/luciancah/nextjs-ko/pull/158">Nextjs 한글 문서 (PR #158)</a> - <code>ExternalImage</code>의 <code>baseUrl</code> 수정으로 이미지 출력 문제 해결</li>
  <li>✅ <a href="https://github.com/toss/frontend-fundamentals/pull/207">toss/Frontend Fundamentals (PR #207)</a> - 이미지 예시를 코드 블록으로 변경, 설명 문구 개선</li>
  <li>✅ <a href="https://github.com/toss/frontend-fundamentals/pull/211">toss/Frontend Fundamentals (PR #211)</a> - 이미지 경로 수정으로 렌더링 문제 해결</li>
  <li>✅ <a href="https://github.com/NaverPayDev/hidash/pull/250">NaverPayDev/hidash (PR #250)</a> - README의 CI 배지 URL 수정</li>
  <li>✅ <a href="https://github.com/NaverPayDev/hidash/pull/252">NaverPayDev/hidash (PR #252)</a> - <code>isArray</code> 함수 테스트 및 벤치마크 추가</li>
  <li>✅ <a href="https://github.com/toss/es-toolkit/pull/1159">toss/es-toolkit (PR #1159)</a> - <code>ary</code> 함수 벤치마크 추가</li>
  <li>✅ <a href="https://github.com/NaverPayDev/hidash/pull/253">NaverPayDev/hidash (PR #253)</a> - <code>isFunction</code> 함수 벤치마크 추가</li>
  <li>✅ <a href="https://github.com/NaverPayDev/hidash/pull/254">NaverPayDev/hidash (PR #254)</a> - <code>before</code> 함수 벤치마크 추가</li>
  <li>✅ <a href="https://github.com/NaverPayDev/hidash/pull/262">NaverPayDev/hidash (PR #262)</a> - <code>first</code> 함수 벤치마크 추가</li>
  <li>✅ <a href="https://github.com/NaverPayDev/hidash/pull/265">NaverPayDev/hidash (PR #265)</a> - <code>isMap</code> 함수 테스트 및 벤치마크 추가</li>
  <li>✅ <a href="https://github.com/NaverPayDev/hidash/pull/268">NaverPayDev/hidash (PR #268)</a> - <code>last</code> 함수 벤치마크 추가</li>
  <li>✅ <a href="https://github.com/hamsurang/react-ko-form/pull/100">React Hook Form 한글 문서 (PR #100)</a> - 중복된 <code>&lt;Component {...pageProps} /&gt;</code> 제거로 중복 렌더링 문제 해결</li>
  <li>✅ <a href="https://github.com/NaverPayDev/hidash/pull/270">NaverPayDev/hidash (PR #270)</a> - <code>isNumber</code> 함수 벤치마크 추가</li>
  <li>✅ <a href="https://github.com/NaverPayDev/hidash/pull/271">NaverPayDev/hidash (PR #271)</a> - <code>reverse</code> 함수 벤치마크 추가</li>
  <li>✅ <a href="https://github.com/NaverPayDev/hidash/pull/272">NaverPayDev/hidash (PR #272)</a> - <code>once</code> 함수 JSDoc 및 벤치마크 추가</li>
  <li>✅ <a href="https://github.com/toss/es-toolkit/pull/1197">toss/es-toolkit (PR #1197)</a> - <code>identity</code> 함수 벤치마크 추가</li>
  <li>✅ <a href="https://github.com/NaverPayDev/hidash/pull/277">NaverPayDev/hidash (PR #277)</a> - <code>isError</code> 함수 JSDoc 및 벤치마크 추가</li>
  <li>✅ <a href="https://github.com/ssi02014/react-query-tutorial/pull/41">react-query-tutorial (PR #41)</a> - 문체 변경 및 <code>cacheTime</code> 초기화 내용 추가</li>
  <li>✅ <a href="https://github.com/toss/es-toolkit/pull/1273">toss/es-toolkit (PR #1273)</a> - <code>take</code> 함수 JSDoc 및 벤치마크 추가</li>
  <li>✅ <a href="https://github.com/daangn/stackflow/pull/603">daangn/stackflow (PR #603)</a> - <code>ActivityComponentType</code>에 <code>import type</code> 적용으로 런타임 에러 방지</li>
  <li>✅ <a href="https://github.com/NaverPayDev/hidash/pull/283">NaverPayDev/hidash (PR #283)</a> - <code>isUndefined</code> 함수 테스트 및 벤치마크 추가</li>
  <li>✅ <a href="https://github.com/toss/frontend-fundamentals/pull/380">toss/Frontend Fundamentals (PR #380)</a> - 이미지 파일 <code>import</code> 시 타입 에러 해결 방법 추가</li>
  <li>✅ <a href="https://github.com/mdn/translated-content/pull/29197">mdn/translated-content (PR #29197)</a> - MDN <code>Right shift (>>)</code> 신규 번역</li>
  <li>✅ <a href="https://github.com/mdn/translated-content/pull/29279">mdn/translated-content (PR #29279)</a> - MDN <code>typeof</code> 문서를 영어 원문과 동기화</li>
  <li>⛏️ <a href="https://github.com/mdn/translated-content/pull/29314">mdn/translated-content (PR #29314)</a> - MDN <code>for...of</code> 문서 영어 원문과 동기화</li>
  <li>✅ <a href="https://github.com/mdn/translated-content/pull/29417">mdn/translated-content (PR #29417)</a> - MDN <code>Set</code> 문서를 영어 원문과 동기화</li>
  <li>⛏️ <a href="https://github.com/mdn/translated-content/pull/29429">mdn/translated-content (PR #29429)</a> - MDN <code>matchmedia</code> 영어 원문과 동기화</li>
  <li>⛏️ <a href="https://github.com/mdn/translated-content/pull/29457">mdn/translated-content (PR #29457)</a> - MDN <code>Fetch API</code> 영어 원문과 동기화</li>
  <li>✅ <a href="https://github.com/mdn/translated-content/pull/29482">mdn/translated-content (PR #29482)</a> - MDN <code>::first-letter</code> 문서를 영어 원문과 동기화</li>
  <li>✅ <a href="https://github.com/mdn/translated-content/pull/29737">mdn/translated-content (PR #29737)</a> - MDN <code>Window: requestAnimationFrame() method</code> 영어 원문과 동기화</li>
  <li>✅ <a href="https://github.com/mdn/translated-content/pull/29831">mdn/translated-content (PR #29831)</a> - MDN <code>Document: DOMContentLoaded</code> 이벤트 영어 원문과 동기화</li>
  <li>✅ <a href="https://github.com/mdn/translated-content/pull/29895">mdn/translated-content (PR #29895)</a> - MDN <code>Document: Response: Response() constructor</code> 신규 번역</li>
  <li>✅ <a href="https://github.com/mdn/translated-content/pull/29925">mdn/translated-content (PR #29925)</a> - MDN <code>Document: Response: headers property</code> 신규 번역</li>
</ul>

## 📌 Latest Posts
`;

// rss-parser 생성
const parser = new Parser({
  headers: {
    Accept: "application/rss+xml, application/xml, text/xml; q=0.1",
  },
});

(async () => {
  // 피드 목록 가져오기
  const feed = await parser.parseURL(
    "https://developer-sungjun.tistory.com/rss"
  );

  text += "<ul style='line-height: 2;'>";

  // 최신 10개의 글의 제목과 링크를 가져온 후 text에 추가
  for (let i = 0; i < 10; i++) {
    const { title, link } = feed.items[i];
    text += `<li><a href=${link} target="_blank">${title}</a></li>`;
  }

  text += "</ul>";

  // README.md 파일 작성
  writeFileSync("README.md", text, "utf8", (e) => {
    console.log(e);
  });

  console.log("업데이트 완료");
})();
