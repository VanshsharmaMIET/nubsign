import { useState } from 'react'
import Button from '../components/Button.jsx'

export default function TermsPage({ onBack, onAccept }) {
  const [checked, setChecked] = useState(false)
  const [showWarning, setShowWarning] = useState(false)

  const handleContinue = () => {
    if (!checked) {
      setShowWarning(true)
      return
    }
    onAccept()
  }

  return (
    <div className="page-shell">
      <header className="page-header">
        <button type="button" className="icon-btn" aria-label="Back to landing page" onClick={onBack}>
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M12.5 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="page-header__title">NubSign</span>
        <span className="page-header__spacer" />
      </header>

      <div className="card card--terms">
        <h1 className="card__title">Terms &amp; Conditions</h1>

        <div className="terms-scroll" tabIndex={0}>
          <h2>1. Acceptance of terms</h2>
          <p>
            By creating a NubSign profile you agree to use the service responsibly and to
            provide accurate information during signup. These terms govern your access to
            and use of the application.
          </p>

          <h2>2. Your information</h2>
          <p>
            We collect the details you provide during signup — your email, name, age,
            pronouns, location, and institution — solely to set up and personalize your
            profile. This is a demo application and no information is sent to a server.
          </p>

          <h2>3. Eligibility</h2>
          <p>
            You must be at least 18 years old to create a profile. Accounts found to belong
            to someone under this age will not be able to complete signup.
          </p>

          <h2>4. Privacy</h2>
          <p>
            We do not sell your information to third parties. Data entered in this demo
            stays in your browser session and is cleared when the page is refreshed.
          </p>

          <h2>5. Account responsibility</h2>
          <p>
            You are responsible for keeping your verification code confidential and for any
            activity that happens under your profile.
          </p>

          <h2>6. Changes to these terms</h2>
          <p>
            We may update these terms from time to time. Continued use of NubSign after a
            change means you accept the updated terms.
          </p>

          <h2>7. Contact</h2>
          <p>
            Questions about these terms can be directed to the NubSign support team through
            the app's help section.
          </p>
        </div>

        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => {
              setChecked(e.target.checked)
              if (e.target.checked) setShowWarning(false)
            }}
          />
          <span>I agree to the Terms &amp; Conditions</span>
        </label>

        {showWarning && (
          <p className="field__error" role="alert">
            You need to accept the Terms &amp; Conditions to continue.
          </p>
        )}

        <Button onClick={handleContinue} disabled={!checked}>
          Continue
        </Button>
      </div>
    </div>
  )
}
