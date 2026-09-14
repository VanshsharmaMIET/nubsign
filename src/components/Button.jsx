import LoadingSpinner from './LoadingSpinner.jsx'

export default function Button({
  children,
  loading = false,
  loadingText,
  variant = 'primary',
  type = 'button',
  disabled = false,
  fullWidth = true,
  onClick,
  className = '',
  ...rest
}) {
  return (
    <button
      type={type}
      className={`btn btn--${variant}${fullWidth ? ' btn--full' : ''}${className ? ` ${className}` : ''}`}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
      {...rest}
    >
      {loading ? (
        <>
          <LoadingSpinner size={18} />
          <span>{loadingText || 'Loading...'}</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}
