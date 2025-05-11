import { writeFileSync } from "node:fs";
import Parser from "rss-parser";

let text = `
## 👋 About Me

### 꾸준함을 강점으로 삼고 있는 프론트엔드 개발자 엄성준 입니다.

\`\`\`javascript
const umsungjun = {
  code: ["HTML", "CSS", "JavaScript", "TypeScript"],
  framework: ["ReactJs", "NextJs", "ReactNative"],
  styling: ["CSS3", "Styled-Component", "Tailwind CSS"],
  stateManagement: ["TanStack-Query(React-Query)"],
  globalStateManagement: ["Zustand", "Redux Toolkit"],
  packageManager: ["npm", "Yarn", "pnpm"],
  collaboration: ["Slack", "Figma", "Github", "JIRA", "Bitbucket"],

  challenge:
    "NextJs와 ReactNative에 모두 관심이 있지만, 현재는 NextJs를 우선적으로 깊이 학습하고 있습니다.",
};
\`\`\`

## 🔥 Open Source Contribution
<ul style="line-height: 2;">
  <li>
  ✅ <a href="https://github.com/luciancah/nextjs-ko/pull/158">Nextjs 한글 문서 (PR #158)</a> - 전역적으로 사용하는 <code>ExternalImage</code> 컴포넌트의 <code>baseUrl</code>을 수정하여 이미지 출력 문제 해결.
  </li>
  <li>
    ✅ <a href="https://github.com/toss/frontend-fundamentals/pull/207">Frontend Fundamentals (PR #207)</a> - 이미지 기반 예시 코드를 복사 가능한 코드 블록으로 변경하고, 문서 흐름에 맞게 설명 문구를 간결하고 쉽게 이해할 수 있도록 수정.
  </li>
  <li>
    ✅ <a href="https://github.com/toss/frontend-fundamentals/pull/211">Frontend Fundamentals (PR #211)</a> - GitHub에서 이미지가 렌더링되지 않는 문제를 해결하기 위해 이미지 경로를 <code>./images/ff-meta.png</code>로 수정하여 이미지 표시 문제 해결.
  </li>
  <li>
    ✅ <a href="https://github.com/NaverPayDev/hidash/pull/250">NaverPayDev/hidash (PR #250)</a> - README 파일에서 CI 배지 URL을 업데이트하여 올바른 경로로 배지가 표시되도록 수정.
  </li>
   <li>
    ✅ <a href="https://github.com/NaverPayDev/hidash/pull/252">NaverPayDev/hidash (PR #252)</a> - <code>isArray</code> 함수에 대한 단위 테스트(<code>isArray.test.ts</code>)와 벤치마크 테스트(<code>isArray.bench.ts</code>)를 추가.
  </li>
  <li>
    ✅ <a href="https://github.com/toss/es-toolkit/pull/1159">es-toolkit (PR #1159)</a> - <code>ary</code> 함수에 대한 누락된 벤치마크 파일(<code>ary.bench.ts</code>)을 추가
  </li>
  <li>
    ✅ <a href="https://github.com/NaverPayDev/hidash/pull/253">NaverPayDev/hidash (PR #253)</a> - <code>isFunction</code> 함수에 대한 벤치마크 테스트(<code>isFunction.bench.ts</code>) 추가.
  </li>
  <li>
    ✅ <a href="https://github.com/NaverPayDev/hidash/pull/254">NaverPayDev/hidash (PR #254)</a> - <code>before</code> 함수에 대한 벤치마크 테스트(<code>before.bench.ts</code>) 추가.
  </li>
  <li>
    ✅ <a href="https://github.com/NaverPayDev/hidash/pull/262">NaverPayDev/hidash (PR #262)</a> - <code>first</code> 함수에 대한 벤치마크 테스트(<code>first.bench.ts</code>) 추가.
  </li>
</ul>

## 📝 Latest Posts
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

  // 최신 5개의 글의 제목과 링크를 가져온 후 text에 추가
  for (let i = 0; i < 5; i++) {
    const { title, link } = feed.items[i];
    text += `<li><a href=${link}>${title}</a></li>`;
  }

  text += "</ul>";

  // README.md 파일 작성
  writeFileSync("README.md", text, "utf8", (e) => {
    console.log(e);
  });

  console.log("업데이트 완료");
})();
