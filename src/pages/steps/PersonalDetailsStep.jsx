import { useState } from 'react'
import Input from '../../components/Input.jsx'
import Button from '../../components/Button.jsx'
import PronounSelect from '../../components/PronounSelect.jsx'
import { validatePersonalDetails, hasErrors } from '../../utils/validation.js'

export default function PersonalDetailsStep({ data, onFieldChange, onSubmit }) {
  const form = { name: data.name || '', age: data.age || '', pronouns: data.pronouns || '' }
  const [errors, setErrors] = useState({ name: '', age: '', pronouns: '' })
  const [saving, setSaving] = useState(false)

  const updateField = (field, value) => {
    onFieldChange(field, value)
  }

  const validateAll = (values) => {
    const nextErrors = validatePersonalDetails(values)
    setErrors(nextErrors)
    return nextErrors
  }

  const handleBlurField = (field) => {
    const nextErrors = validatePersonalDetails(form)
    setErrors((prev) => ({ ...prev, [field]: nextErrors[field] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (saving) return
    const nextErrors = validateAll(form)
    if (hasErrors(nextErrors)) return

    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      onSubmit()
    }, 900)
  }

  return (
    <form className="step" onSubmit={handleSubmit} noValidate>
      <h1 className="step__heading">Tell us about yourself</h1>
      <p className="step__subtitle">This helps us personalize your NubSign profile.</p>

      <Input
        id="name"
        label="Full Name"
        type="text"
        placeholder="e.g. Aditi Sharma"
        autoComplete="name"
        maxLength={50}
        value={form.name}
        error={errors.name}
        onChange={(e) => updateField('name', e.target.value)}
        onBlur={() => handleBlurField('name')}
      />

      <Input
        id="age"
        label="Age"
        type="number"
        inputMode="numeric"
        placeholder="e.g. 21"
        min="0"
        max="120"
        value={form.age}
        error={errors.age}
        onChange={(e) => updateField('age', e.target.value.replace(/[^\d]/g, ''))}
        onBlur={() => handleBlurField('age')}
      />

      <PronounSelect
        value={form.pronouns}
        error={errors.pronouns}
        onChange={(value) => {
          updateField('pronouns', value)
          setErrors((prev) => ({ ...prev, pronouns: '' }))
        }}
      />

      <Button type="submit" loading={saving} loadingText="Saving...">
        Continue
      </Button>
    </form>
  )
}
