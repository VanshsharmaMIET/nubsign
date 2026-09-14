import { useEffect, useRef, useState } from 'react'
import OtpInput from '../../components/OtpInput.jsx'
import Button from '../../components/Button.jsx'
import { validateOtp } from '../../utils/validation.js'
import { useToast } from '../../context/ToastContext.jsx'

const RESEND_SECONDS = 30
const CORRECT_OTP = '123456'

export default function OtpStep({ email, onVerified }) {
  const [digits, setDigits] = useState(Array(6).fill(''))
  const [error, setError] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [resending, setResending] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)
  const { showToast } = useToast()
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0))
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [])

  const handleDigitsChange = (next) => {
    setDigits(next)
    if (error) setError('')
  }

  const handleVerify = (e) => {
    e.preventDefault()
    if (verifying) return
    const message = validateOtp(digits, CORRECT_OTP)
    if (message) {
      setError(message)
      return
    }
    setVerifying(true)
    setTimeout(() => {
      setVerifying(false)
      showToast('Verification successful.', 'success')
      onVerified()
    }, 1200)
  }

  const handleResend = () => {
    if (secondsLeft > 0 || resending) return
    setResending(true)
    setTimeout(() => {
      setResending(false)
      setSecondsLeft(RESEND_SECONDS)
      setDigits(Array(6).fill(''))
      setError('')
      showToast('Verification code sent again.', 'success')
    }, 900)
  }

  return (
    <form className="step" onSubmit={handleVerify} noValidate>
      <h1 className="step__heading">Verify your email</h1>
      <p className="step__subtitle">Enter the 6-digit verification code sent to your email.</p>
      <p className="step__meta">Code sent to <strong>{email}</strong></p>

      <OtpInput digits={digits} onChange={handleDigitsChange} error={error} disabled={verifying} />

      <p className="otp-demo-hint">Demo code: {CORRECT_OTP}</p>

      <Button type="submit" loading={verifying} loadingText="Verifying...">
        Verify
      </Button>

      <div className="resend-row">
        {secondsLeft > 0 ? (
          <span className="resend-row__timer">Resend code in {secondsLeft}s</span>
        ) : (
          <button
            type="button"
            className="link-btn"
            onClick={handleResend}
            disabled={resending}
          >
            {resending ? 'Resending...' : 'Resend code'}
          </button>
        )}
      </div>
    </form>
  )
}
