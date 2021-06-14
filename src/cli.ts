async function* pickLocation(url: string): AsyncGenerator<string> {
  const res = await fetch(url);
  const doc = await res.text();
  const regExp = /<loc>(.+?)<\/loc>/g;
  const locationPicker = doc.matchAll(regExp);

  for(const match of locationPicker) {
    if(match[1] == null) {
      continue;
    }
    yield match[1];
  }
}
// collect sitemap
// collect sitemap file urls
const urls: Array<{ type: string, url: string }> = [];
for await (const url of pickLocation("https://100mon.jp/wp-sitemap.xml")) {
  if (url.includes("wp-sitemap-posts-post-")) {
    // Article の一覧
    urls.push({type: "sitemap-article", url: url})
  }
  if (url.includes("wp-sitemap-taxonomies-category-")) {
    // カテゴリごとのページ の一覧
    urls.push({type: "sitemap-category", url: url});
  }
  if (url.includes("wp-sitemap-posts-page-")) {
    // その他のページ の一覧
    urls.push({type: "sitemap-other", url: url})
  }
}

// 各 Article ページの処理
for (const page of urls.filter(value => value.type === "sitemap-article")) {
  for await (const match of pickLocation(page.url)) {
    const url = match[1];
    if(url == null) {
      continue;
    }

    urls.push({type: "article", url: url});
  }
}

// カテゴリーごとのページの処理

// その他のページの処理
// nothing

console.log(urls);

export { };
//
// const a = await Promise.all(urls.map((value) => fetch(value)));
// const b = await Promise.all(a.map((res) => res.text()));
// console.log(b);
//
// import * as https from "https";
// https.get("https://100mon.jp/wp-sitemap.xml", () => {
//
// }).end();
// // const req = ;
// // req.open("GET", "https://100mon.jp/wp-sitemap.xml", false);
// // req.send();
// // console.log(req.responseXML);
// // baseURI: "https://100mon.jp/wp-sitemap.xml";
