// Knock-IT x client logo badge for featured projects.
export default function CoBrand() {
  return (
    <div className="cobr">
      <div className="cobp" role="img" aria-label="Knock-IT and Hyundai">
        <img src="/images/logos/logo.jpg" alt="" className="cobk" />
        <i aria-hidden="true">&times;</i>
        <span className="cobh"><img src="/images/logos/l_hyundai.svg" alt="" /><b>Hyundai</b></span>
      </div>
      <small>Delivered for Hyundai</small>
    </div>
  )
}
