const labels: Record<string, string> = {
  success: "成功",
  failure: "失敗",
  unknown: "経過",
};

const tones: Record<string, string> = {
  success: "bg-green-soft text-green",
  failure: "bg-fail-soft text-fail",
  unknown: "bg-paper-deep text-muted",
};

export function OutcomeBadge({ outcome }: { outcome: string }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${tones[outcome] ?? tones.unknown}`}>
      {labels[outcome] ?? "経過"}
    </span>
  );
}
