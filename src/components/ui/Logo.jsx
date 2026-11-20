/** Inline logo so the wordmark renders in Jost and the monogram picks up CSS. */
export default function Logo({ className = '' }) {
  return (
    <svg
      viewBox="645 460 935 427"
      className={className}
      role="img"
      aria-label="JD Business Consultancy"
    >
      <defs>
        <linearGradient id="logo-g" x1="0" y1="472" x2="0" y2="875" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3a3636" />
          <stop offset="0.42" stopColor="#8d8a8a" />
          <stop offset="1" stopColor="#7c7979" />
        </linearGradient>
      </defs>
      <path
        fill="url(#logo-g)"
        fillRule="evenodd"
        d="M800 472H880Q938 472 938 530V690Q938 748 880 748H800ZM853 520V697H866Q882 697 882 681V536Q882 520 866 520Z"
      />
      <path
        fill="url(#logo-g)"
        d="M735 598H790V820Q790 875 735 875H712Q657 875 657 820V743H712V808Q712 824 723.5 824Q735 824 735 808Z"
      />
      <text
        x="800"
        y="800"
        fill="#D2CFCF"
        fontFamily="Jost, 'Century Gothic', sans-serif"
        fontWeight="300"
        fontSize="41"
        textLength="762"
        lengthAdjust="spacing"
      >
        BUSINESS CONSULTANCY
      </text>
    </svg>
  );
}
