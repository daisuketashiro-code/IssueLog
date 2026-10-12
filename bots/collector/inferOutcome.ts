const FAILURE_WORDS = ["倒産", "破綻", "民事再生", "撤退", "サービス終了", "事業終了", "行政処分", "リコール", "閉鎖", "不正アクセス"];
const SUCCESS_WORDS = ["黒字", "資金調達", "受賞", "導入社", "継続率が", "解約率が低下", "待ち時間を短縮"];

export function inferOutcome(title: string, summary: string): "success" | "failure" | "unknown" {
  const text = `${title}\n${summary}`;
  if (FAILURE_WORDS.some((word) => text.includes(word))) return "failure";
  if (SUCCESS_WORDS.some((word) => text.includes(word))) return "success";
  return "unknown";
}
