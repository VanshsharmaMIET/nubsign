import { useRef } from 'react'

export default function OtpInput({ digits, onChange, error, disabled }) {
  const inputRefs = useRef([])

  const setDigit = (index, value) => {
    const next = [...digits]
    next[index] = value
    onChange(next)
  }

  const handleChange = (index, event) => {
    const raw = event.target.value
    const digit = raw.replace(/\D/g, '').slice(-1) // numeric only, last char typed
    setDigit(index, digit)
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace') {
      if (digits[index]) {
        setDigit(index, '')
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus()
        setDigit(index - 1, '')
      }
      event.preventDefault()
    } else if (event.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (event.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (event) => {
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!pasted) return
    event.preventDefault()
    const next = Array(6).fill('')
    for (let i = 0; i < pasted.length; i += 1) next[i] = pasted[i]
    onChange(next)
    const focusIndex = Math.min(pasted.length, 5)
    inputRefs.current[focusIndex]?.focus()
  }

  return (
    <div>
      <div className="otp-row" onPaste={handlePaste}>
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            className={`otp-box${error ? ' otp-box--error' : ''}`}
            value={digit}
            disabled={disabled}
            aria-label={`Digit ${index + 1} of 6`}
            aria-invalid={Boolean(error)}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        ))}
      </div>
      {error && (
        <p className="field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
