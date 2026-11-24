/**
 * Horizontal lock-up from the business card: bold "JD", a thin divider, then
 * "BUSINESS" in a light grey and "CONSULTANCY" in bold. Inline SVG so it scales by height
 * and renders in Jost; textLength pins each word's width so the layout never shifts.
 */
export default function Logo({ className = '' }) {
  return (
    <svg viewBox="0 0 512 64" className={className} overflow="visible" role="img" aria-label="JD Business Consultancy">
      <text
        x="0"
        y="55"
        fill="#121212"
        fontFamily="Jost, 'Century Gothic', sans-serif"
        fontWeight="700"
        fontSize="64"
        textLength="80"
        lengthAdjust="spacingAndGlyphs"
      >
        JD
      </text>
      <rect x="99" y="10" width="1.5" height="46" fill="#8a8a8a" />
      <text
        x="118"
        y="44"
        fill="#6b6b6b"
        fontFamily="Jost, 'Century Gothic', sans-serif"
        fontWeight="300"
        fontSize="29"
        textLength="146"
        lengthAdjust="spacingAndGlyphs"
      >
        BUSINESS
      </text>
      <text
        x="276"
        y="44"
        fill="#121212"
        fontFamily="Jost, 'Century Gothic', sans-serif"
        fontWeight="700"
        fontSize="29"
        textLength="236"
        lengthAdjust="spacingAndGlyphs"
      >
        CONSULTANCY
      </text>
    </svg>
  );
}
