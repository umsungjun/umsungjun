import { writeFileSync } from "node:fs";
import Parser from "rss-parser";

let text = `
## 🔥 About Me

### 꾸준함을 강점으로 삼고 있는 프론트엔드 개발자 엄성준 입니다.

## 📌 My Open Source Projects

<table>
<tr>
<td width="80" align="center">
  <a href="https://www.npmjs.com/package/react-head-safe">
    <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
  </a>
</td>
<td>
  <h3><a href="https://www.npmjs.com/package/react-head-safe">react-head-safe</a></h3>
  <p>
    <img src="https://img.shields.io/npm/v/react-head-safe?style=flat-square&color=blue" alt="npm version" />
    <img src="https://img.shields.io/npm/dt/react-head-safe?style=flat-square&color=green&label=total%20downloads" alt="total downloads" />
    <img src="https://img.shields.io/npm/l/react-head-safe?style=flat-square" alt="license" />
  </p>
  <p>A lightweight SEO optimization library that resolves meta tag duplication issues in <code>react-helmet-async</code></p>
</td>
</tr>
</table>

## 📌 Open Source Contribution

<details open>
<summary><img src="https://github.com/toss.png" width="18" style="vertical-align:middle; border-radius:50%;"> &nbsp;<b><a href="https://github.com/toss/es-toolkit">toss / es-toolkit</a></b></summary>
<ul style="line-height: 2; margin-top: 8px;">
  <li>✨ <a href="https://github.com/toss/es-toolkit/pull/1159">PR #1159</a> - <code>ary</code> 함수 벤치마크 추가</li>
  <li>✨ <a href="https://github.com/toss/es-toolkit/pull/1197">PR #1197</a> - <code>identity</code> 함수 벤치마크 추가</li>
  <li>✨ <a href="https://github.com/toss/es-toolkit/pull/1273">PR #1273</a> - <code>take</code> 함수 JSDoc 및 벤치마크 추가</li>
</ul>
</details>

<details>
<summary><img src="https://github.com/mdn.png" width="18" style="vertical-align:middle; border-radius:50%;"> &nbsp;<b><a href="https://github.com/mdn/translated-content">mdn / translated-content</a></b></summary>
<ul style="line-height: 2; margin-top: 8px;">
  <li>✨ <a href="https://github.com/mdn/translated-content/pull/29197">PR #29197</a> - MDN <code>Right shift (>>)</code> 신규 번역</li>
  <li>✨ <a href="https://github.com/mdn/translated-content/pull/29279">PR #29279</a> - MDN <code>typeof</code> 문서를 영어 원문과 동기화</li>
  <li>🌱 <a href="https://github.com/mdn/translated-content/pull/29314">PR #29314</a> - MDN <code>for...of</code> 문서 영어 원문과 동기화</li>
  <li>✨ <a href="https://github.com/mdn/translated-content/pull/29417">PR #29417</a> - MDN <code>Set</code> 문서를 영어 원문과 동기화</li>
  <li>🌱 <a href="https://github.com/mdn/translated-content/pull/29429">PR #29429</a> - MDN <code>matchmedia</code> 영어 원문과 동기화</li>
  <li>🌱 <a href="https://github.com/mdn/translated-content/pull/29457">PR #29457</a> - MDN <code>Fetch API</code> 영어 원문과 동기화</li>
  <li>✨ <a href="https://github.com/mdn/translated-content/pull/29482">PR #29482</a> - MDN <code>::first-letter</code> 문서를 영어 원문과 동기화</li>
  <li>✨ <a href="https://github.com/mdn/translated-content/pull/29737">PR #29737</a> - MDN <code>Window: requestAnimationFrame() method</code> 영어 원문과 동기화</li>
  <li>✨ <a href="https://github.com/mdn/translated-content/pull/29831">PR #29831</a> - MDN <code>Document: DOMContentLoaded</code> 이벤트 영어 원문과 동기화</li>
  <li>✨ <a href="https://github.com/mdn/translated-content/pull/29895">PR #29895</a> - MDN <code>Document: Response: Response() constructor</code> 신규 번역</li>
  <li>✨ <a href="https://github.com/mdn/translated-content/pull/29925">PR #29925</a> - MDN <code>Document: Response: headers property</code> 신규 번역</li>
</ul>
</details>

<details>
<summary><img src="https://github.com/toss.png" width="18" style="vertical-align:middle; border-radius:50%;"> &nbsp;<b><a href="https://github.com/toss/frontend-fundamentals">toss / Frontend Fundamentals</a></b></summary>
<ul style="line-height: 2; margin-top: 8px;">
  <li>✨ <a href="https://github.com/toss/frontend-fundamentals/pull/207">PR #207</a> - 이미지 예시를 코드 블록으로 변경, 설명 문구 개선</li>
  <li>✨ <a href="https://github.com/toss/frontend-fundamentals/pull/211">PR #211</a> - 이미지 경로 수정으로 렌더링 문제 해결</li>
  <li>✨ <a href="https://github.com/toss/frontend-fundamentals/pull/380">PR #380</a> - 이미지 파일 <code>import</code> 시 타입 에러 해결 방법 추가</li>
</ul>
</details>

<details>
<summary><img src="https://github.com/ssi02014.png" width="18" style="vertical-align:middle; border-radius:50%;"> &nbsp;<b><a href="https://github.com/ssi02014/react-query-tutorial">react-query-tutorial</a></b></summary>
<ul style="line-height: 2; margin-top: 8px;">
  <li>✨ <a href="https://github.com/ssi02014/react-query-tutorial/pull/41">PR #41</a> - 문체 변경 및 <code>cacheTime</code> 초기화 내용 추가</li>
</ul>
</details>

<details>
<summary><img src="https://github.com/daangn.png" width="18" style="vertical-align:middle; border-radius:50%;"> &nbsp;<b><a href="https://github.com/daangn/stackflow">daangn / stackflow</a></b></summary>
<ul style="line-height: 2; margin-top: 8px;">
  <li>✨ <a href="https://github.com/daangn/stackflow/pull/603">PR #603</a> - <code>ActivityComponentType</code>에 <code>import type</code> 적용으로 런타임 에러 방지</li>
</ul>
</details>

<details>
<summary><img src="https://github.com/vercel.png" width="18" style="vertical-align:middle; border-radius:50%;"> &nbsp;<b><a href="https://github.com/luciancah/nextjs-ko">Nextjs 한글 문서</a></b></summary>
<ul style="line-height: 2; margin-top: 8px;">
  <li>✨ <a href="https://github.com/luciancah/nextjs-ko/pull/158">PR #158</a> - <code>ExternalImage</code>의 <code>baseUrl</code> 수정으로 이미지 출력 문제 해결</li>
</ul>
</details>

<details>
<summary><img src="https://github.com/hamsurang.png" width="18" style="vertical-align:middle; border-radius:50%;"> &nbsp;<b><a href="https://github.com/hamsurang/react-ko-form">React Hook Form 한글 문서</a></b></summary>
<ul style="line-height: 2; margin-top: 8px;">
  <li>✨ <a href="https://github.com/hamsurang/react-ko-form/pull/100">PR #100</a> - 중복된 <code>&lt;Component {...pageProps} /&gt;</code> 제거로 중복 렌더링 문제 해결</li>
</ul>
</details>

<details>
<summary><img src="https://github.com/NaverPayDev.png" width="18" style="vertical-align:middle; border-radius:50%;"> &nbsp;<b><a href="https://github.com/NaverPayDev/hidash">NaverPayDev / hidash</a></b></summary>
<ul style="line-height: 2; margin-top: 8px;">
  <li>✨ <a href="https://github.com/NaverPayDev/hidash/pull/250">PR #250</a> - README의 CI 배지 URL 수정</li>
  <li>✨ <a href="https://github.com/NaverPayDev/hidash/pull/252">PR #252</a> - <code>isArray</code> 함수 테스트 및 벤치마크 추가</li>
  <li>✨ <a href="https://github.com/NaverPayDev/hidash/pull/253">PR #253</a> - <code>isFunction</code> 함수 벤치마크 추가</li>
  <li>✨ <a href="https://github.com/NaverPayDev/hidash/pull/254">PR #254</a> - <code>before</code> 함수 벤치마크 추가</li>
  <li>✨ <a href="https://github.com/NaverPayDev/hidash/pull/262">PR #262</a> - <code>first</code> 함수 벤치마크 추가</li>
  <li>✨ <a href="https://github.com/NaverPayDev/hidash/pull/265">PR #265</a> - <code>isMap</code> 함수 테스트 및 벤치마크 추가</li>
  <li>✨ <a href="https://github.com/NaverPayDev/hidash/pull/268">PR #268</a> - <code>last</code> 함수 벤치마크 추가</li>
  <li>✨ <a href="https://github.com/NaverPayDev/hidash/pull/270">PR #270</a> - <code>isNumber</code> 함수 벤치마크 추가</li>
  <li>✨ <a href="https://github.com/NaverPayDev/hidash/pull/271">PR #271</a> - <code>reverse</code> 함수 벤치마크 추가</li>
  <li>✨ <a href="https://github.com/NaverPayDev/hidash/pull/272">PR #272</a> - <code>once</code> 함수 JSDoc 및 벤치마크 추가</li>
  <li>✨ <a href="https://github.com/NaverPayDev/hidash/pull/277">PR #277</a> - <code>isError</code> 함수 JSDoc 및 벤치마크 추가</li>
  <li>✨ <a href="https://github.com/NaverPayDev/hidash/pull/283">PR #283</a> - <code>isUndefined</code> 함수 테스트 및 벤치마크 추가</li>
</ul>
</details>

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
    "https://developer-sungjun.tistory.com/rss",
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
