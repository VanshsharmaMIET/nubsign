// All validation logic lives here so it stays predictable and easy to change.
// Every function returns an error string, or '' when the value is valid.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateEmail(rawValue) {
  const value = (rawValue ?? '').trim()
  if (!value) return 'Please enter your email address.'
  if (value.length > 254) return 'That email address is too long.'
  if (!EMAIL_RE.test(value)) return 'Please enter a valid email address.'
  return ''
}

export function validateOtp(otpDigits, correctOtp = '123456') {
  const value = otpDigits.join('')
  if (value.length < 6) return 'Please enter all 6 digits.'
  if (value !== correctOtp) return 'Invalid verification code. Please try again.'
  return ''
}

export function validateFullName(rawValue) {
  const value = (rawValue ?? '').trim()
  if (!value) return 'Please enter your full name.'
  if (value.length < 2) return 'Full name must be at least 2 characters.'
  if (value.length > 50) return 'Full name must be under 50 characters.'
  if (!/^[a-zA-Z\s.'-]+$/.test(value)) return 'Full name contains invalid characters.'
  return ''
}

export function validateAge(rawValue) {
  const value = (rawValue ?? '').toString().trim()
  if (!value) return 'Please enter your age.'
  if (!/^\d+$/.test(value)) return 'Age must be a whole number.'
  const age = Number(value)
  if (age < 18) return 'You must be 18 or older to continue.'
  if (age > 120) return 'Please enter a valid age.'
  return ''
}

export function validatePronouns(rawValue) {
  if (!rawValue) return 'Please select your pronouns.'
  return ''
}

export function validateState(rawValue) {
  if (!rawValue) return 'Please select your state.'
  return ''
}

export function validateCity(rawValue, stateValue) {
  if (!stateValue) return 'Please select a state first.'
  if (!rawValue) return 'Please select your city.'
  return ''
}

export function validateCollege(rawValue) {
  const value = (rawValue ?? '').trim()
  if (!value) return 'Please enter your college or institution.'
  if (value.length > 100) return 'That name is too long.'
  return ''
}

export function validatePhone(rawValue) {
  const value = (rawValue ?? '').trim()
  if (!value) return '' // optional field
  if (!/^\d{10}$/.test(value)) return 'Please enter a valid 10-digit phone number.'
  return ''
}

export function validatePersonalDetails({ name, age, pronouns }) {
  return {
    name: validateFullName(name),
    age: validateAge(age),
    pronouns: validatePronouns(pronouns),
  }
}

export function validateAdditionalDetails({ state, city, college, phone }) {
  return {
    state: validateState(state),
    city: validateCity(city, state),
    college: validateCollege(college),
    phone: validatePhone(phone),
  }
}

export function hasErrors(errorObject) {
  return Object.values(errorObject).some(Boolean)
}
