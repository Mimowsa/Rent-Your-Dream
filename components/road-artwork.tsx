/** Decorative route motif: vector artwork stays crisp at every viewport. */
export function RoadArtwork({ roads = false }: { roads?: boolean }) {
  if (roads) {
    // Shared perspective plane: each surface follows the same smooth bend.
    // Its width and separation continuously shrink toward the vanishing point.
    function ribbon(offset: number) {
      const edges = [-1, 1].map((side) =>
        Array.from({ length: 121 }, (_, index) => {
          const t = index / 120
          const u = 1 - t
          const x = u ** 3 * 230 + 3 * u ** 2 * t * 1080
            + 3 * u * t ** 2 * -70 + t ** 3 * 980
          const y = u ** 3 * 650 + 3 * u ** 2 * t * 320
            + 3 * u * t ** 2 * 220 + t ** 3 * 75
          const perspective = u ** 1.85
          return `${(x + (offset + side * 110) * perspective).toFixed(2)},${y.toFixed(2)}`
        }),
      )
      return `M${edges[0].join(' L')} L${edges[1].reverse().join(' L')} Z`
    }
    const routes = [
      { id: 'hero-road-blue', light: '#328aff', mid: '#164bee', dark: '#092675', path: ribbon(-295) },
      { id: 'hero-road-white', light: '#ffffff', mid: '#e8e8e9', dark: '#9399a1', path: ribbon(0) },
      { id: 'hero-road-red', light: '#ff4357', mid: '#e21d35', dark: '#790818', path: ribbon(295) },
    ]
    return (
      <svg
        className="road-artwork road-artwork--routes"
        viewBox="0 0 900 560"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          {routes.map(({ id, light, mid, dark }) => (
            <linearGradient key={id} id={id} x1="0" y1="0" x2="1" y2="0.6">
              <stop offset="0" stopColor={dark} />
              <stop offset="0.28" stopColor={mid} />
              <stop offset="0.55" stopColor={light} />
              <stop offset="0.8" stopColor={mid} />
              <stop offset="1" stopColor={dark} />
            </linearGradient>
          ))}
          <filter id="hero-road-grain" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" seed="7" />
            <feColorMatrix type="saturate" values="0" />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
        <text
          x="80"
          y="290"
          fill="#ffffff"
          opacity="0.055"
          fontSize="260"
          fontWeight="800"
          fontFamily="var(--font-manrope), Arial, sans-serif"
          letterSpacing="-18"
        >RYD</text>
        {routes.map(({ id, path, light }) => (
          <g key={id}>
            <path d={path} fill={`url(#${id})`} />
            <path d={path} fill="#ffffff" filter="url(#hero-road-grain)" opacity="0.075" />
            <path d={path} stroke={light} strokeWidth="0.6" opacity="0.3" />
          </g>
        ))}
      </svg>
    )
  }
  return (
    <svg
      className="road-artwork"
      viewBox="0 0 900 560"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M80 60h160l75 75-90 90H80l70-90-70-75Zm265 0 90 100 90-100h110L485 230v110H385V230L235 60m430 0h135l70 75-70 90H665l60-90-60-75Z"
        stroke="#233550"
        strokeWidth="1.2"
      />
      <path
        d="M-150 590C30 385 630 410 490 260S745 140 920 30"
        stroke="#164BEE"
        strokeWidth="94"
      />
      <path
        d="M85 590C240 390 740 415 590 260S795 140 920 30"
        stroke="#FAFAFA"
        strokeWidth="84"
      />
      <path
        d="M320 590C430 410 850 420 690 260S835 140 920 30"
        stroke="#E21D35"
        strokeWidth="82"
      />
    </svg>
  )
}
