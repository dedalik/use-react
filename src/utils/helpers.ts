/**
 * No-operation function that does nothing.
 */
export const noop = () => {}

/**
 * Adds an event listener to a specified target.
 *
 * @param {Window | Document | HTMLElement | EventTarget | null} target - The target to which the event listener will be added.
 * @param {string} eventType - The type of event to listen for.
 * @param {EventListenerOrEventListenerObject} listener - The function to be called when the event is triggered.
 * @param {boolean | AddEventListenerOptions} [options] - Optional parameters specifying characteristics about the event listener.
 *
 * @example
 * on(window, 'resize', handleResize);
 */
export function on(
  target: Window | Document | HTMLElement | EventTarget | null,
  eventType: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
): void {
  if (target && target.addEventListener) {
    target.addEventListener(eventType, listener, options)
  }
}

/**
 * Removes an event listener from a specified target.
 *
 * @param {Window | Document | HTMLElement | EventTarget | null} target - The target from which the event listener will be removed.
 * @param {string} eventType - The type of event for the listener to be removed.
 * @param {EventListenerOrEventListenerObject} listener - The function that was called when the event was triggered.
 * @param {boolean | EventListenerOptions} [options] - Optional parameters specifying characteristics about the event listener.
 *
 * @example
 * off(window, 'resize', handleResize);
 */
export function off(
  target: Window | Document | HTMLElement | EventTarget | null,
  eventType: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | EventListenerOptions,
): void {
  if (target && target.removeEventListener) {
    target.removeEventListener(eventType, listener, options)
  }
}

/**
 * Checks if the current runtime environment is a web browser.
 */
export const isBrowser = typeof window !== 'undefined'

/**
 * Checks if the navigator object is available in the current runtime environment.
 */
export const isNavigator = typeof navigator !== 'undefined'
