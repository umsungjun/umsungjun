import { writeFileSync } from "node:fs";
import Parser from "rss-parser";

async function fetchLeagueStats() {
  const apiKey = process.env.RIOT_API_KEY;
  const gameName = process.env.GAME_NAME;
  const tagLine = process.env.TAG_LINE;

  if (!apiKey || !gameName || !tagLine) {
    console.warn("RIOT_API_KEY / GAME_NAME / TAG_LINE 환경변수가 없어 League 통계를 건너뜁니다.");
    return null;
  }

  const accountRes = await fetch(
    `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`,
    { headers: { "X-Riot-Token": apiKey } }
  );
  if (!accountRes.ok) throw new Error(`Account API ${accountRes.status}`);
  const { puuid } = await accountRes.json();

  const leagueRes = await fetch(
    `https://kr.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
    { headers: { "X-Riot-Token": apiKey } }
  );
  if (!leagueRes.ok) throw new Error(`League API ${leagueRes.status}`);
  const entries = await leagueRes.json();

  return { summonerName: `${gameName}#${tagLine}`, entries };
}

function buildLeagueSection(leagueData) {
  const QUEUE_LABEL = { RANKED_SOLO_5x5: "솔로랭크", RANKED_FLEX_SR: "자유랭크" };
  const TIER_KO = {
    IRON: "Iron", BRONZE: "Bronze", SILVER: "Silver", GOLD: "Gold",
    PLATINUM: "Platinum", EMERALD: "Emerald", DIAMOND: "Diamond",
    MASTER: "Master", GRANDMASTER: "Grandmaster", CHALLENGER: "Challenger",
  };

  const solo = leagueData.entries.find((e) => e.queueType === "RANKED_SOLO_5x5");

  const emblemUrl = (tier) =>
    `https://opgg-static.akamaized.net/images/medals_new/${tier.toLowerCase()}.png`;

  let card = "";

  if (!solo) {
    card = `
<div align="center">

<img src="${emblemUrl("unranked")}" width="130" alt="Unranked" />

### Unranked

**${leagueData.summonerName}** · 솔로랭크

배치 미완료

</div>`;
  } else {
    const tier = TIER_KO[solo.tier] ?? solo.tier;
    card = `
<div align="center">

<img src="${emblemUrl(solo.tier)}" width="130" alt="${tier} ${solo.rank}" />

### ${tier} ${solo.rank}

**${leagueData.summonerName}** · 솔로랭크

\`${solo.leaguePoints} LP\` &nbsp; \`${solo.wins}W ${solo.losses}L\`

</div>`;
  }

  return `\n\n<details open>\n<summary><h2><img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/Poppy_1.jpg" height="32" align="center" alt="Noxus Poppy" /> &nbsp;League of Legends</h2></summary>\n${card}\n\n</details>`;
}

let text = `
## 🔥 About Me

### 안녕하세요, 꾸준함을 강점으로 삼고 있는 프론트엔드 개발자 엄성준 입니다.

## <img src="https://cdn.simpleicons.org/npm/CB3837" height="24" align="center" /> &nbsp;My Open Source Projects

### [react-head-safe](https://www.npmjs.com/package/react-head-safe)

[![npm version](https://img.shields.io/npm/v/react-head-safe?style=flat-square&color=blue)](https://www.npmjs.com/package/react-head-safe)
[![monthly downloads](https://img.shields.io/npm/dm/react-head-safe?style=flat-square&color=green&label=downloads%2Fmonth)](https://www.npmjs.com/package/react-head-safe)
[![license](https://img.shields.io/npm/l/react-head-safe?style=flat-square)](https://www.npmjs.com/package/react-head-safe)

A lightweight SEO optimization library that resolves meta tag duplication issues in <code>react-helmet-async</code>

## <img src="https://cdn.simpleicons.org/npm/CB3837" height="24" align="center" /> &nbsp;Open Source Contribution

<details open>
<summary><img src="https://github.com/toss.png" width="18" style="vertical-align:middle; border-radius:50%;"> &nbsp;<b><a href="https://github.com/toss/es-toolkit">toss / es-toolkit</a></b></summary>
<ul style="line-height: 2; margin-top: 8px;">
  <li>✨ <a href="https://github.com/toss/es-toolkit/pull/1159">PR #1159</a> - <code>ary</code> 함수 벤치마크 추가</li>
  <li>✨ <a href="https://github.com/toss/es-toolkit/pull/1197">PR #1197</a> - <code>identity</code> 함수 벤치마크 추가</li>
  <li>✨ <a href="https://github.com/toss/es-toolkit/pull/1273">PR #1273</a> - <code>take</code> 함수 JSDoc 및 벤치마크 추가</li>
  <li>✨ <a href="https://github.com/toss/es-toolkit/pull/1695">PR #1695</a> - <code>map</code>·<code>set</code> 모듈의 누락된 <code>forEach</code>/<code>countBy</code> export 추가</li>
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

## <img src="https://cdn.simpleicons.org/tistory/EC6B33" height="22" align="center" /> &nbsp;Latest Blog Posts
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

  const leagueData = await fetchLeagueStats().catch((e) => {
    console.warn("League 통계 조회 실패:", e.message);
    return null;
  });

  if (leagueData) {
    text += buildLeagueSection(leagueData);
  }

  // README.md 파일 작성
  writeFileSync("README.md", text, "utf8", (e) => {
    console.log(e);
  });

  console.log("업데이트 완료");
})();
