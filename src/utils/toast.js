const TOAST_EVENT = 'codexa-toast'

export function toast({ type = 'info', title = 'Notice', message }) {
  if (typeof window === 'undefined') {
    return
  }

  window.dispatchEvent(
    new CustomEvent(TOAST_EVENT, {
      detail: {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        type,
        title,
        message,
      },
    }),
  )
}

export const toastEventName = TOAST_EVENT
