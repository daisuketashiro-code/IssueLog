export function SectionTitle({ index, title, lead }: { index: string; title: string; lead?: string }) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="text-sm tracking-[0.16em] text-clay">{index}</p>
      <h2 className="mt-2 font-serif text-3xl sm:text-4xl">{title}</h2>
      {lead && <p className="mt-3 leading-8 text-muted">{lead}</p>}
    </div>
  );
}
