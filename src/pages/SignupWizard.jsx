import { useState } from 'react'
import ProgressIndicator from '../components/ProgressIndicator.jsx'
import EmailStep from './steps/EmailStep.jsx'
import OtpStep from './steps/OtpStep.jsx'
import PersonalDetailsStep from './steps/PersonalDetailsStep.jsx'
import AdditionalDetailsStep from './steps/AdditionalDetailsStep.jsx'

const TOTAL_STEPS = 4

export default function SignupWizard({ formData, setFormData, onBackToTerms, onComplete }) {
  const [step, setStep] = useState(1)

  const goBack = () => {
    if (step === 1) {
      onBackToTerms()
    } else {
      setStep((s) => s - 1)
    }
  }

  const updateField = (field, value) => {
    setFormData((f) => ({ ...f, [field]: value }))
  }

  return (
    <div className="page-shell">
      <header className="page-header">
        <button type="button" className="icon-btn" aria-label="Go back" onClick={goBack}>
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M12.5 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="page-header__title">NubSign</span>
        <span className="page-header__spacer" />
      </header>

      <div className="card card--wizard">
        <ProgressIndicator currentStep={step} totalSteps={TOTAL_STEPS} />

        {step === 1 && (
          <EmailStep
            email={formData.email}
            onFieldChange={updateField}
            onSubmit={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <OtpStep
            email={formData.email}
            onVerified={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <PersonalDetailsStep
            data={formData}
            onFieldChange={updateField}
            onSubmit={() => setStep(4)}
          />
        )}

        {step === 4 && (
          <AdditionalDetailsStep
            data={formData}
            onFieldChange={updateField}
            onSubmit={() => onComplete(formData)}
          />
        )}
      </div>
    </div>
  )
}
