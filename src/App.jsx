import { useState } from 'react'
import { ToastProvider } from './context/ToastContext.jsx'
import ToastContainer from './components/Toast.jsx'
import LandingPage from './pages/LandingPage.jsx'
import TermsPage from './pages/TermsPage.jsx'
import SignupWizard from './pages/SignupWizard.jsx'
import SuccessPage from './pages/SuccessPage.jsx'

const INITIAL_FORM_DATA = {
  email: '',
  name: '',
  age: '',
  pronouns: '',
  state: '',
  city: '',
  college: '',
  phone: '',
}

// screen: 'landing' | 'terms' | 'wizard' | 'success'
export default function App() {
  const [screen, setScreen] = useState('landing')
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)

  const handleComplete = () => {
    setScreen('success')
  }

  const handleGoHome = () => {
    setFormData(INITIAL_FORM_DATA)
    setScreen('landing')
  }

  return (
    <ToastProvider>
      <div className="app-root">
        {screen === 'landing' && (
          <LandingPage onGetStarted={() => setScreen('terms')} />
        )}

        {screen === 'terms' && (
          <TermsPage
            onBack={() => setScreen('landing')}
            onAccept={() => setScreen('wizard')}
          />
        )}

        {screen === 'wizard' && (
          <SignupWizard
            formData={formData}
            setFormData={setFormData}
            onBackToTerms={() => setScreen('terms')}
            onComplete={handleComplete}
          />
        )}

        {screen === 'success' && (
          <SuccessPage name={formData.name} onGoHome={handleGoHome} />
        )}

        <ToastContainer />
      </div>
    </ToastProvider>
  )
}
