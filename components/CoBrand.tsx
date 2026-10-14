// Knock-IT x client logo badge for featured projects.
export default function CoBrand() {
  return (
    <div className="cobr">
      <div className="cobp" role="img" aria-label="Knock-IT and Hyundai">
        <img src="/images/logos/logo.jpg" alt="" className="cobk" />
        <i aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m11 17 2 2a1 1 0 1 0 3-3" />
            <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
            <path d="m21 3 1 11h-2" />
            <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
            <path d="M3 4h8" />
          </svg>
        </i>
        <span className="cobh"><img src="/images/logos/l_hyundai.svg" alt="" /><b>Hyundai</b></span>
      </div>
      <small>Delivered for Hyundai</small>
    </div>
  )
}
