export default function LoadingSpinner({ size = 20 }) {
  return (
    <span
      className="spinner"
      style={{ width: size, height: size }}
      role="presentation"
      aria-hidden="true"
    />
  )
}
