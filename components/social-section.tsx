import { company } from '@/lib/company'

/* --- Brand marks, in their own colours, for the white/yellow badges --- */

function IgMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden width={22} height={22}>
      <defs>
        <linearGradient id="ig" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F58529" />
          <stop offset="0.5" stopColor="#DD2A7B" />
          <stop offset="1" stopColor="#8134AF" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="url(#ig)" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="url(#ig)" strokeWidth="2" />
      <circle cx="17.4" cy="6.6" r="1.3" fill="url(#ig)" />
    </svg>
  )
}
function TtMark() {
  return (
    <svg viewBox="0 0 24 24" fill="#0b0b0b" aria-hidden width={22} height={22}>
      <path d="M16.5 3c.3 2.06 1.46 3.5 3.5 3.86v2.64c-1.3.13-2.44-.24-3.66-.94v6.02c0 3.9-2.9 6.42-6.3 5.8-3.02-.55-4.68-3.72-3.62-6.6.86-2.32 3.1-3.5 5.62-3.03v2.9c-.36-.1-.72-.2-1.08-.2-1.32-.03-2.3.98-2.28 2.26.02 1.24 1.03 2.2 2.3 2.18 1.26-.02 2.14-.94 2.14-2.28V3h2.86Z" />
    </svg>
  )
}
function SnapMark() {
  return (
    <svg viewBox="0 0 24 24" fill="#fff" aria-hidden width={23} height={23}>
      <path d="M12.03 2.5c1.9 0 3.86 1.06 4.7 3.06.3.72.26 1.9.23 2.86 0 .28-.03.55-.03.76 0 .15.05.24.2.3.28.13.66.11 1-.06.16-.07.35-.11.53-.11.26 0 .53.09.7.32.24.34.13.79-.35 1.06-.24.13-.53.23-.83.33-.4.13-.85.28-1 .63-.08.19-.05.42.03.66l.02.05c.02.05.9 2.3 3.1 2.66.2.03.34.2.33.4 0 .08-.02.16-.05.23-.27.62-1.42.86-2.28 1.02-.14.03-.19.24-.26.55-.03.13-.06.27-.11.42-.05.16-.19.24-.4.24h-.05c-.16 0-.38-.03-.66-.09a4.7 4.7 0 0 0-1-.11c-.28 0-.57.02-.88.08-.6.1-1.1.46-1.7.87-.75.53-1.6 1.12-2.86 1.12s-2.09-.59-2.83-1.11c-.6-.42-1.11-.78-1.72-.88a5.3 5.3 0 0 0-.88-.08c-.42 0-.76.06-1 .11-.26.05-.47.09-.63.09-.28 0-.42-.16-.47-.31-.05-.15-.08-.29-.11-.42-.07-.31-.12-.51-.26-.54-.86-.16-2.01-.4-2.28-1.03a.55.55 0 0 1-.05-.22c0-.2.13-.37.33-.4 2.2-.36 3.08-2.61 3.1-2.66l.02-.05c.08-.24.11-.47.03-.66-.15-.35-.6-.5-1-.63-.3-.1-.59-.2-.83-.33-.62-.34-.5-.83-.32-1.08.16-.22.42-.35.71-.35.16 0 .34.04.5.11.32.15.68.19.96.08.17-.06.24-.16.23-.36 0-.2-.02-.44-.03-.7-.05-.98-.1-2.2.22-2.94C8.14 3.56 10.11 2.5 12.03 2.5Z" />
    </svg>
  )
}

function ArrowUR() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="sb-arrow" width={16} height={16}>
      <path d="M7 7h10v10M7 17 17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const entries = [
  { key: 'snapchat' as const, name: 'Snapchat', Mark: SnapMark, badge: '#FFFC00' },
  { key: 'instagram' as const, name: 'Instagram', Mark: IgMark, badge: '#ffffff' },
  { key: 'tiktok' as const, name: 'TikTok', Mark: TtMark, badge: '#ffffff' },
]

/**
 * Dark contrast band — "Suivez Rent Your Dream" à gauche, 3 pastilles réseaux à
 * droite (badge logo blanc/jaune + nom + identifiant + flèche). Snapchat est
 * cliquable ; Instagram et TikTok s'affichent "Bientôt", non cliquables.
 */
export function SocialBand() {
  return (
    <div className="sb">
      <div className="sb-card">
        <div className="sb-copy">
          <p className="sb-kick">Suivez {company.name}</p>
          <h2>
            Retrouvez-nous
            <br />
            sur les réseaux.
          </h2>
          <p className="sb-sub">
            Les véhicules, les nouveautés et les disponibilités, en direct.
          </p>
        </div>

        <div className="sb-links">
          {entries.map(({ key, name, Mark, badge }) => {
            const c = company.socials[key]
            const inner = (
              <>
                <span className="sb-badge" style={{ background: badge }}>
                  <Mark />
                </span>
                <span className="sb-meta">
                  <b>{name}</b>
                  <span>{c.handle ?? 'Bientôt'}</span>
                </span>
                {c.url && <ArrowUR />}
              </>
            )
            return c.url ? (
              <a
                key={key}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="sb-pill"
              >
                {inner}
              </a>
            ) : (
              <span key={key} className="sb-pill sb-pill--soon">
                {inner}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
