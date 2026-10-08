'use client'

import { useI18n } from '@/components/locale-provider'

import { company } from '@/lib/company'

import Image from 'next/image'

function SocialMark({ name }: { name: string }) {
  return (
    <Image
      src={`/socials/${name}.svg`}
      alt=""
      width={30}
      height={30}
      unoptimized
    />
  )
}

const entries = [
  {
    key: 'snapchat' as const,
    name: 'Snapchat',

    badge: '#FFFC00',
  },
  {
    key: 'instagram' as const,
    name: 'Instagram',

    badge: '#ffffff',
  },
  { key: 'tiktok' as const, name: 'TikTok', badge: '#ffffff' },
]

export function SocialBand() {
  const { t } = useI18n()

  return (
    <div className="sb">
      <div className="sb-card">
        <div className="sb-copy">
          <p className="sb-kick">
            {t('Suivez ')}
            {t(company.name)}
          </p>
          <h2>
            {t('Retrouvez-nous')}
            <br />
            <span>{t('sur les réseaux.')}</span>
          </h2>
          <p className="sb-sub">
            {t(
              'Les véhicules, les nouveautés et les disponibilités, en direct.',
            )}
          </p>
        </div>

        <div className="sb-links">
          {entries.map(({ key, name, badge }) => {
            const c = company.socials[key]
            const inner = (
              <>
                <span className="sb-badge" style={{ background: badge }}>
                  <SocialMark name={key} />
                </span>
                <span className="sb-meta">
                  <b>{t(name)}</b>
                  <span>{c.handle ?? 'Bientôt'}</span>
                </span>
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
                {t(inner)}
              </a>
            ) : (
              <span key={key} className="sb-pill sb-pill--soon">
                {t(inner)}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
