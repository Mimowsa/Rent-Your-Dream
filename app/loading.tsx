import Image from 'next/image'

export default function Loading() {
  return (
    <div className="brand-loading" role="status" aria-live="polite">
      <Image
        src="/brand/ryd-mark.png"
        alt="Rent Your Dream"
        width={1099}
        height={352}
      />
      <span className="brand-loading__bar" aria-hidden="true" />
      <span>Chargement / Loading…</span>
    </div>
  )
}
