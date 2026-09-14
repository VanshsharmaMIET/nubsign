const STEP_LABELS = ['Email', 'Verify', 'About you', 'Profile']

export default function ProgressIndicator({ currentStep, totalSteps = 4 }) {
  return (
    <div className="progress" role="group" aria-label={`Step ${currentStep} of ${totalSteps}`}>
      <div className="progress__track">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step, index) => {
          const state = step < currentStep ? 'done' : step === currentStep ? 'current' : 'upcoming'
          return (
            <div className="progress__segment" key={step}>
              <div className={`progress__node progress__node--${state}`}>
                {state === 'done' ? (
                  <svg viewBox="0 0 12 10" aria-hidden="true">
                    <path d="M1 5l3.2 3.2L11 1" stroke="#fff" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  step
                )}
              </div>
              {index < totalSteps - 1 && (
                <div className={`progress__line${step < currentStep ? ' progress__line--done' : ''}`} />
              )}
            </div>
          )
        })}
      </div>
      <p className="progress__label">
        Step {currentStep} of {totalSteps} · {STEP_LABELS[currentStep - 1]}
      </p>
    </div>
  )
}
