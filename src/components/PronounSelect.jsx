import { pronounOptions } from '../data/locations.js'

export default function PronounSelect({ value, onChange, error }) {
  return (
    <div className="field" role="group" aria-labelledby="pronouns-label">
      <span id="pronouns-label" className="field__label">
        Pronouns
      </span>
      <div className="pill-group">
        {pronounOptions.map((option) => {
          const selected = value === option
          return (
            <button
              key={option}
              type="button"
              className={`pill${selected ? ' pill--selected' : ''}`}
              aria-pressed={selected}
              onClick={() => onChange(option)}
            >
              {option}
            </button>
          )
        })}
      </div>
      {error && (
        <p className="field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
