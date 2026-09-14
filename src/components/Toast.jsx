import { useToast } from '../context/ToastContext.jsx'

const ICONS = {
  success: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="var(--success)" />
      <path d="M6 10.5l2.5 2.5L14 7.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="var(--error)" />
      <path d="M10 6v5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="10" cy="13.6" r="0.9" fill="#fff" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="var(--primary)" />
      <path d="M10 9.2v4.3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="10" cy="6.5" r="0.9" fill="#fff" />
    </svg>
  ),
}

export default function ToastContainer() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="toast-stack" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast--${toast.type}`}>
          <span className="toast__icon">{ICONS[toast.type] ?? ICONS.info}</span>
          <span className="toast__message">{toast.message}</span>
          <button
            type="button"
            className="toast__close"
            aria-label="Dismiss notification"
            onClick={() => dismiss(toast.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
