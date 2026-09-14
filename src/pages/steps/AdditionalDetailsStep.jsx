import { useState } from 'react'
import Input from '../../components/Input.jsx'
import Select from '../../components/Select.jsx'
import Button from '../../components/Button.jsx'
import { states, locations } from '../../data/locations.js'
import { validateAdditionalDetails, hasErrors } from '../../utils/validation.js'

export default function AdditionalDetailsStep({ data, onFieldChange, onSubmit }) {
  const form = {
    state: data.state || '',
    city: data.city || '',
    college: data.college || '',
    phone: data.phone || '',
  }
  const [errors, setErrors] = useState({ state: '', city: '', college: '', phone: '' })
  const [submitting, setSubmitting] = useState(false)

  const cityOptions = form.state ? locations[form.state] || [] : []

  const handleStateChange = (value) => {
    onFieldChange('state', value)
    onFieldChange('city', '')
    setErrors((prev) => ({ ...prev, state: '', city: '' }))
  }

  const handleCityChange = (value) => {
    onFieldChange('city', value)
    setErrors((prev) => ({ ...prev, city: '' }))
  }

  const updateField = (field, value) => {
    onFieldChange(field, value)
  }

  const validateAll = (values) => {
    const nextErrors = validateAdditionalDetails(values)
    setErrors(nextErrors)
    return nextErrors
  }

  const handleBlurField = (field) => {
    const nextErrors = validateAdditionalDetails(form)
    setErrors((prev) => ({ ...prev, [field]: nextErrors[field] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (submitting) return
    const nextErrors = validateAll(form)
    if (hasErrors(nextErrors)) return

    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      onSubmit()
    }, 1700)
  }

  return (
    <form className="step" onSubmit={handleSubmit} noValidate>
      <h1 className="step__heading">Complete your profile</h1>
      <p className="step__subtitle">Just a few more details to finish setting up.</p>

      <Select
        id="state"
        label="State"
        options={states}
        value={form.state}
        error={errors.state}
        onChange={(e) => handleStateChange(e.target.value)}
        onBlur={() => handleBlurField('state')}
      />

      <Select
        id="city"
        label="City"
        options={cityOptions}
        value={form.city}
        error={errors.city}
        disabled={!form.state}
        placeholder={form.state ? 'Select' : 'Select a state first'}
        onChange={(e) => handleCityChange(e.target.value)}
        onBlur={() => handleBlurField('city')}
      />

      <Input
        id="college"
        label="College / Institution"
        type="text"
        placeholder="e.g. Delhi Technological University"
        maxLength={100}
        value={form.college}
        error={errors.college}
        onChange={(e) => updateField('college', e.target.value)}
        onBlur={() => handleBlurField('college')}
      />

      <Input
        id="phone"
        label="Phone Number (optional)"
        type="tel"
        inputMode="numeric"
        autoComplete="tel"
        placeholder="10-digit number"
        maxLength={10}
        value={form.phone}
        error={errors.phone}
        onChange={(e) => updateField('phone', e.target.value.replace(/[^\d]/g, ''))}
        onBlur={() => handleBlurField('phone')}
      />

      <Button type="submit" loading={submitting} loadingText="Completing profile...">
        Complete Profile
      </Button>
    </form>
  )
}
