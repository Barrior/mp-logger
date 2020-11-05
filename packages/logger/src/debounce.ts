export default function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
) {
  let timeout: number

  return function (this: unknown, ...args: unknown[]) {
    const later = () => {
      return func.apply(this, args)
    }

    clearTimeout(timeout)
    timeout = (setTimeout(later, wait) as unknown) as number
  }
}
