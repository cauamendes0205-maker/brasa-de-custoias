type Props = { className?: string; titulo?: boolean; "aria-hidden"?: boolean };

/**
 * Marca da casa, redesenhada a partir do letreiro da montra: chama
 * vermelha sobre a grelha, palavra BRASA e, por baixo, DE CUSTOIAS
 * atravessado pelo espeto.
 */
export function Logo({ className = "", titulo = true, ...resto }: Props) {
  return (
    <span className={"logo inline-flex flex-col items-center " + className} {...resto}>
      <svg
        viewBox="0 0 120 120"
        className="logo-chama"
        role="img"
        aria-label="Logótipo da Brasa de Custóias: uma chama sobre a grelha"
      >
        <defs>
          <linearGradient id="grad-chama" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#c81212" />
            <stop offset="55%" stopColor="#f0231b" />
            <stop offset="100%" stopColor="#ff5a1f" />
          </linearGradient>
        </defs>
        <path
          fill="url(#grad-chama)"
          d="M60 4c6 16-2 24-8 32-4 6-6 12-3 18-6-3-9-9-9-16-8 8-14 19-14 31 0 20 15 35 34 35s34-15 34-35c0-15-8-28-18-38-6-6-12-14-16-27z"
        />
        <g fill="#0b0908">
          <rect x="38" y="74" width="44" height="4.5" rx="2.2" />
          <rect x="42" y="82" width="36" height="4" rx="2" />
          <rect x="47" y="89.5" width="26" height="3.6" rx="1.8" />
          <rect x="44" y="60" width="4" height="12" rx="2" />
          <rect x="58" y="56" width="4" height="16" rx="2" />
          <rect x="72" y="60" width="4" height="12" rx="2" />
        </g>
      </svg>

      {titulo ? (
        <span className="logo-texto">
          <span className="logo-brasa">BRASA</span>
          <span className="logo-espeto" aria-hidden="true" />
          <span className="logo-custoias">DE CUSTÓIAS</span>
        </span>
      ) : null}
    </span>
  );
}
