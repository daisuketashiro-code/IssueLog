/**
 * 収集してよいフィードだけを書く。
 * ここに無いURLは取得しない。HTMLのスクレイピングはしない。
 * 追加するときは、配信元がRSSまたはAtomの購読を公開していること。
 */
export type AllowedSource = {
  name: string;
  url: string;
  sourceType: "rss";
  permission: string;
};

export const ALLOWED_SOURCES: AllowedSource[] = [
  {
    name: "経済産業省 ニュースリリース",
    url: "https://www.meti.go.jp/ml_index_release_atom.xml",
    sourceType: "rss",
    permission: "経済産業省が公式ページで購読用に公開しているニュースリリースのフィード",
  },
  {
    name: "厚生労働省 新着情報",
    url: "https://www.mhlw.go.jp/stf/news.rdf",
    sourceType: "rss",
    permission: "厚生労働省が公開している新着情報のRSS",
  },
  {
    name: "PR TIMES",
    url: "https://prtimes.jp/index.rdf",
    sourceType: "rss",
    permission: "PR TIMESが配信しているプレスリリースの公開RSS。見出しとURLだけを使い、本文は取得しない",
  },
];
