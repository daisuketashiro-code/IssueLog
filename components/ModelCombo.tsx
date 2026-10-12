export function ModelCombo({ components }: { components: string[] }) {
  return (
    <p className="flex flex-wrap items-center gap-2">
      {components.map((component, index) => (
        <span key={`${component}-${index}`} className="contents">
          {index > 0 && (
            <span aria-hidden="true" className="text-clay">
              ×
            </span>
          )}
          <span className="rounded-full bg-ink px-3 py-1 text-sm text-paper">{component}</span>
        </span>
      ))}
    </p>
  );
}
