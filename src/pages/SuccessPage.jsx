import Button from '../components/Button.jsx'

export default function SuccessPage({ name, onGoHome }) {
  return (
    <div className="page-shell page-shell--center">
      <div className="card card--success">
        <div className="success-check">
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="32" r="30" fill="var(--success)" />
            <path
              d="M20 33l8 8 16-17"
              stroke="#fff"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="success-check__mark"
            />
          </svg>
        </div>

        <h1 className="card__title">Profile completed!</h1>
        <p className="success-message">
          {name ? `Welcome, ${name}. ` : ''}Your account has been successfully created.
        </p>

        <Button onClick={onGoHome}>Go to Home</Button>
      </div>
    </div>
  )
}
