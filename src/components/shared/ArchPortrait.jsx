/** Arched portrait frame with a rim-lit border. */
export default function ArchPortrait({ name }) {
  return (
    <div className="rim relative aspect-[3/4] overflow-hidden rounded-t-full rounded-b-3xl bg-ink-800">
      {/* PLACEHOLDER portrait: replace the gradient and silhouette with a real photo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_10%,rgba(226,200,147,0.25),transparent_55%),linear-gradient(180deg,#2a2525,#141212)]" />
      <svg viewBox="0 0 200 260" className="absolute inset-x-0 bottom-0 w-full text-ink-950/80" aria-hidden="true">
        <circle cx="100" cy="105" r="42" fill="currentColor" />
        <path d="M20 260c6-62 40-96 80-96s74 34 80 96z" fill="currentColor" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 p-6 text-center">
        <p className="font-display text-lg text-silver-50">{name}</p>
      </div>
    </div>
  );
}
