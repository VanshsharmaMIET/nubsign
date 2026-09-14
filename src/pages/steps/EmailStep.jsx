import { useState } from 'react'
import Input from '../../components/Input.jsx'
import Button from '../../components/Button.jsx'
import { validateEmail } from '../../utils/validation.js'

export default function EmailStep({ email, onFieldChange, onSubmit }) {
  const value = email || ''
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const runValidation = (val) => {
    const message = validateEmail(val)
    setError(message)
    return message
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (loading) return
    const message = runValidation(value)
    if (message) return

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onFieldChange('email', value.trim())
      onSubmit()
    }, 1200)
  }

  return (
    <form className="step" onSubmit={handleSubmit} noValidate>
      <h1 className="step__heading">Create your account</h1>
      <p className="step__subtitle">Enter your email address to continue.</p>

      <Input
        id="email"
        label="Email address"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        maxLength={254}
        value={value}
        error={error}
        onChange={(e) => onFieldChange('email', e.target.value)}
        onBlur={(e) => runValidation(e.target.value)}
      />

      <Button type="submit" loading={loading} loadingText="Sending code...">
        Continue
      </Button>
    </form>
  )
}
