/**
 * Embossed paper diamonds, taken from the business card. Each diamond is a rotated square with a
 * pale gradient, a crisp white top edge and a soft drop shadow. The global light (--lx/--ly)
 * brightens the paper near the cursor. Purely decorative.
 *
 * Positions are % of the layer; size is % of the layer width. `x`/`y` place the diamond's centre.
 */
const presets = {
  // Front of the card: one large central diamond framed by tiles at the edges
  center: [
    { x: 50, y: 48, s: 46, z: 2 },
    { x: 14, y: 22, s: 24, z: 1 },
    { x: 84, y: 14, s: 22, z: 1 },
    { x: 92, y: 62, s: 26, z: 1 },
    { x: 6, y: 78, s: 22, z: 1 },
    { x: 30, y: 104, s: 28, z: 1 },
    { x: 72, y: 104, s: 24, z: 1 },
  ],
  // Back of the card: a cluster on one side, leaving room for text
  side: [
    { x: 82, y: 40, s: 34, z: 2 },
    { x: 62, y: 4, s: 16, z: 1 },
    { x: 100, y: 0, s: 22, z: 1 },
    { x: 104, y: 84, s: 24, z: 1 },
    { x: 66, y: 98, s: 20, z: 1 },
  ],
  // Low-key band for closing sections
  band: [
    { x: 8, y: 50, s: 18, z: 1 },
    { x: 24, y: 110, s: 20, z: 1 },
    { x: 92, y: 40, s: 20, z: 1 },
    { x: 76, y: 112, s: 18, z: 1 },
    { x: 50, y: -40, s: 26, z: 1 },
  ],
};

export default function Diamonds({ preset = 'center', className = '', fade = true }) {
  const items = presets[preset] ?? presets.center;
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#f3f3f2,#fafaf9)]" />
      {items.map((d, i) => (
        <span
          key={i}
          className="absolute aspect-square rotate-45 border border-white bg-[linear-gradient(135deg,#ffffff_0%,#f6f6f5_45%,#ebebea_100%)] shadow-[-14px_18px_38px_-10px_rgba(18,18,18,0.13),inset_1px_1px_0_rgba(255,255,255,1)]"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: `${d.s}%`,
            zIndex: d.z,
            translate: '-50% -50%',
          }}
        />
      ))}
      {/* The light: brightens the paper where the cursor is */}
      <div className="absolute inset-0 z-[3] bg-[radial-gradient(circle_520px_at_var(--lx)_var(--ly),rgba(255,255,255,0.75),rgba(255,255,255,0)_70%)] bg-fixed" />
      {fade && <div className="absolute inset-x-0 bottom-0 z-[4] h-40 bg-gradient-to-b from-transparent to-ink-950" />}
    </div>
  );
}
