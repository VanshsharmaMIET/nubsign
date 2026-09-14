import Button from '../components/Button.jsx'

export default function LandingPage({ onGetStarted }) {
  return (
    <div className="landing">
      <div className="landing__panel">
        <div className="brand">
          <span className="brand__mark" aria-hidden="true">
            <span className="brand__dot brand__dot--1" />
            <span className="brand__dot brand__dot--2" />
            <span className="brand__dot brand__dot--3" />
          </span>
          <span className="brand__name">NubSign</span>
        </div>

        <h1 className="landing__heading">Create your profile in minutes.</h1>
        <p className="landing__subtext">
          A simple and secure way to set up your profile and get started.
        </p>

        <div className="landing__cta">
          <Button onClick={onGetStarted} fullWidth={false} className="landing__cta-btn">
            Get Started
          </Button>
        </div>

        <p className="landing__legal">
          By continuing, you agree to our{' '}
          <button type="button" className="link-btn" onClick={onGetStarted}>
            Terms &amp; Conditions
          </button>{' '}
          and Privacy Policy.
        </p>
      </div>

      <div className="landing__visual" aria-hidden="true">
        <div className="steps-graphic">
          {[1, 2, 3, 4].map((n) => (
            <div className="steps-graphic__row" key={n}>
              <span className="steps-graphic__node">{n}</span>
              <span
                className="steps-graphic__bar"
                style={{ width: `${100 - n * 12}%` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
