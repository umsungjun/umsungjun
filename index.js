import { writeFileSync } from "node:fs";
import Parser from "rss-parser";

async function fetchLeagueStats() {
  const apiKey = process.env.RIOT_API_KEY;
  const gameName = process.env.GAME_NAME;
  const tagLine = process.env.TAG_LINE;

  if (!apiKey || !gameName || !tagLine) {
    console.warn(
      "RIOT_API_KEY / GAME_NAME / TAG_LINE 환경변수가 없어 League 통계를 건너뜁니다.",
    );
    return null;
  }

  const accountRes = await fetch(
    `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`,
    { headers: { "X-Riot-Token": apiKey } },
  );
  if (!accountRes.ok) throw new Error(`Account API ${accountRes.status}`);
  const { puuid } = await accountRes.json();

  const leagueRes = await fetch(
    `https://kr.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
    { headers: { "X-Riot-Token": apiKey } },
  );
  if (!leagueRes.ok) throw new Error(`League API ${leagueRes.status}`);
  const entries = await leagueRes.json();

  return { summonerName: `${gameName}#${tagLine}`, entries };
}

// 개별 shields 배지는 GitHub 모바일 앱에서 이미지마다 줄바꿈되므로 통계를 직접 조회해 배지 하나로 합친다.
async function buildNpmBadge(pkg) {
  // 조회 실패 시 기존 개별 배지 3개로 폴백
  const fallback = [
    `[![npm version](https://img.shields.io/npm/v/${pkg}?style=flat-square&color=blue)](https://www.npmjs.com/package/${pkg})`,
    `[![total downloads](https://img.shields.io/npm/dt/${pkg}?style=flat-square&color=green&label=downloads)](https://www.npmjs.com/package/${pkg})`,
    `[![license](https://img.shields.io/npm/l/${pkg}?style=flat-square)](https://www.npmjs.com/package/${pkg})`,
  ].join("\n");

  try {
    const meta = await (await fetch(`https://registry.npmjs.org/${pkg}`)).json();
    const version = meta["dist-tags"].latest;
    const license = meta.license ?? "";

    // 다운로드 API는 요청당 최대 18개월까지만 허용되어 패키지 생성일부터 기간을 나눠 합산한다.
    let downloads = 0;
    let start = new Date(meta.time.created);
    const today = new Date();
    while (start <= today) {
      const end = new Date(start);
      end.setMonth(end.getMonth() + 17);
      const rangeEnd = end > today ? today : end;
      const range = `${start.toISOString().slice(0, 10)}:${rangeEnd.toISOString().slice(0, 10)}`;
      const res = await fetch(
        `https://api.npmjs.org/downloads/point/${range}/${pkg}`,
      );
      if (res.ok) downloads += (await res.json()).downloads ?? 0;
      start = new Date(rangeEnd);
      start.setDate(start.getDate() + 1);
    }

    const count =
      downloads >= 1000 ? `${(downloads / 1000).toFixed(1)}k` : `${downloads}`;
    // shields 정적 배지는 하이픈이 구분자라서 값의 하이픈을 이스케이프(--)한 뒤 인코딩한다.
    const message = encodeURIComponent(
      `v${version} • ${count} downloads • ${license}`.replace(/-/g, "--"),
    );
    return `[![npm](https://img.shields.io/badge/npm-${message}-CB3837?style=flat-square&logo=npm&logoColor=white)](https://www.npmjs.com/package/${pkg})`;
  } catch (e) {
    console.warn("npm 통계 조회 실패, 개별 배지로 대체:", e.message);
    return fallback;
  }
}

function buildLeagueSection(leagueData) {
  const QUEUE_LABEL = {
    RANKED_SOLO_5x5: "솔로랭크",
    RANKED_FLEX_SR: "자유랭크",
  };
  const TIER_KO = {
    IRON: "Iron",
    BRONZE: "Bronze",
    SILVER: "Silver",
    GOLD: "Gold",
    PLATINUM: "Platinum",
    EMERALD: "Emerald",
    DIAMOND: "Diamond",
    MASTER: "Master",
    GRANDMASTER: "Grandmaster",
    CHALLENGER: "Challenger",
  };

  const solo = leagueData.entries.find(
    (e) => e.queueType === "RANKED_SOLO_5x5",
  );

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

  return `\n\n<details open>\n<summary><h2>🎮 League of Legends</h2></summary>\n${card}\n\n</details>`;
}

let text = `
## 🔥 About Me

### 안녕하세요, 꾸준함을 강점으로 삼고 있는 프론트엔드 개발자 엄성준 입니다.

## 🧑‍💻 My Open Source Projects

### [react-head-safe](https://www.npmjs.com/package/react-head-safe)

{{NPM_BADGE_REACT_HEAD_SAFE}}

A lightweight SEO optimization library that resolves meta tag duplication issues in <code>react-helmet-async</code>

### [react-device-check](https://www.npmjs.com/package/react-device-check)

{{NPM_BADGE_REACT_DEVICE_CHECK}}

Lightweight React hooks for accurate device and OS detection — zero dependencies, works in both <code>React</code> and <code>Next.js</code>

## 🌍 Open Source Contribution

<details open>
<summary><b><a href="https://github.com/toss/es-toolkit">toss / es-toolkit</a></b></summary>
<ul style="line-height: 2; margin-top: 8px;">
  <li>✨ <a href="https://github.com/toss/es-toolkit/pull/1159">PR #1159</a> - <code>ary</code> 함수 벤치마크 추가</li>
  <li>✨ <a href="https://github.com/toss/es-toolkit/pull/1197">PR #1197</a> - <code>identity</code> 함수 벤치마크 추가</li>
  <li>✨ <a href="https://github.com/toss/es-toolkit/pull/1273">PR #1273</a> - <code>take</code> 함수 JSDoc 및 벤치마크 추가</li>
  <li>✨ <a href="https://github.com/toss/es-toolkit/pull/1695">PR #1695</a> - <code>map</code>·<code>set</code> 모듈의 누락된 <code>forEach</code>/<code>countBy</code> export 추가</li>
</ul>
</details>

<details>
<summary><b><a href="https://github.com/mdn/translated-content">mdn / translated-content</a></b></summary>
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
<summary><b><a href="https://github.com/toss/frontend-fundamentals">toss / Frontend Fundamentals</a></b></summary>
<ul style="line-height: 2; margin-top: 8px;">
  <li>✨ <a href="https://github.com/toss/frontend-fundamentals/pull/207">PR #207</a> - 이미지 예시를 코드 블록으로 변경, 설명 문구 개선</li>
  <li>✨ <a href="https://github.com/toss/frontend-fundamentals/pull/211">PR #211</a> - 이미지 경로 수정으로 렌더링 문제 해결</li>
  <li>✨ <a href="https://github.com/toss/frontend-fundamentals/pull/380">PR #380</a> - 이미지 파일 <code>import</code> 시 타입 에러 해결 방법 추가</li>
</ul>
</details>

<details>
<summary><b><a href="https://github.com/ssi02014/react-query-tutorial">react-query-tutorial</a></b></summary>
<ul style="line-height: 2; margin-top: 8px;">
  <li>✨ <a href="https://github.com/ssi02014/react-query-tutorial/pull/41">PR #41</a> - 문체 변경 및 <code>cacheTime</code> 초기화 내용 추가</li>
</ul>
</details>

<details>
<summary><b><a href="https://github.com/daangn/stackflow">daangn / stackflow</a></b></summary>
<ul style="line-height: 2; margin-top: 8px;">
  <li>✨ <a href="https://github.com/daangn/stackflow/pull/603">PR #603</a> - <code>ActivityComponentType</code>에 <code>import type</code> 적용으로 런타임 에러 방지</li>
</ul>
</details>

<details>
<summary><b><a href="https://github.com/luciancah/nextjs-ko">Nextjs 한글 문서</a></b></summary>
<ul style="line-height: 2; margin-top: 8px;">
  <li>✨ <a href="https://github.com/luciancah/nextjs-ko/pull/158">PR #158</a> - <code>ExternalImage</code>의 <code>baseUrl</code> 수정으로 이미지 출력 문제 해결</li>
</ul>
</details>

<details>
<summary><b><a href="https://github.com/hamsurang/react-ko-form">React Hook Form 한글 문서</a></b></summary>
<ul style="line-height: 2; margin-top: 8px;">
  <li>✨ <a href="https://github.com/hamsurang/react-ko-form/pull/100">PR #100</a> - 중복된 <code>&lt;Component {...pageProps} /&gt;</code> 제거로 중복 렌더링 문제 해결</li>
</ul>
</details>

<details>
<summary><b><a href="https://github.com/NaverPayDev/hidash">NaverPayDev / hidash</a></b></summary>
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

## 📝 Latest Blog Posts
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

  // 정적 템플릿의 자리표시자를 통합 npm 배지로 치환. 패키지별 조회는 서로 독립이므로 병렬로 처리한다.
  const [headSafeBadge, deviceCheckBadge] = await Promise.all([
    buildNpmBadge("react-head-safe"),
    buildNpmBadge("react-device-check"),
  ]);
  text = text
    .replace("{{NPM_BADGE_REACT_HEAD_SAFE}}", headSafeBadge)
    .replace("{{NPM_BADGE_REACT_DEVICE_CHECK}}", deviceCheckBadge);

  // README.md 파일 작성
  writeFileSync("README.md", text, "utf8", (e) => {
    console.log(e);
  });

  console.log("업데이트 완료");
})();
