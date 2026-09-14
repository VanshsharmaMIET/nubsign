export default function Select({
  id,
  label,
  error,
  options,
  placeholder = 'Select',
  className = '',
  ...rest
}) {
  const errorId = error ? `${id}-error` : undefined

  return (
    <div className={`field ${className}`}>
      {label && (
        <label htmlFor={id} className="field__label">
          {label}
        </label>
      )}
      <div className="field__select-wrap">
        <select
          id={id}
          className={`field__input field__select${error ? ' field__input--error' : ''}`}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          {...rest}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg className="field__chevron" viewBox="0 0 12 8" aria-hidden="true">
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {error && (
        <p id={errorId} className="field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
