<h1 align="center">
<span style="color:rgb(8, 126, 164)">useReact</span>
<br>
Collection of React Hooks
</p>

<p align="center">
<a href="https://www.npmjs.com/package/@dedalik/use-react" target="__blank"><img src="https://img.shields.io/npm/v/%40dedalik%2Fuse-react" alt="NPM version"></a>
<a href="https://usereact.org" target="__blank"><img src="https://img.shields.io/badge/documents%20&%20demos-8A2BE2" alt="Docs & Demos"></a>
<img alt="Code size" src="https://img.shields.io/github/languages/code-size/dedalik/use-react">
<br />
<img alt="License" src="https://img.shields.io/github/license/dedalik/use-react">

</p>

## Features

- [**Engaging Documentation & Live Demos**](https://usereact.org)
- **React Support**: Compatible with React.js 17 and above
- **Robust Typing**: Crafted in [TypeScript](https://www.typescriptlang.org/) with comprehensive [TS Docs](https://github.com/microsoft/tsdoc)
- **Server-Side Rendering (SSR) Compatible**
- **Adaptable**: Customizable event filters and targets for various needs

## API catalog

Current exports: **188** (hooks + utilities).

### State (16)

- `useAsyncState` - Export Size: `1.9 kB` (gzip `732 B`) - load async data with managed state and loading flags.
- `useCounter` - Export Size: `1.2 kB` (gzip `440 B`) - count state with inc/dec/set/reset and optional min/max clamping.
- `useDebounce` - Export Size: `621 B` (gzip `328 B`) - Delay value updates until input settles.
- `useEventCallback` - Export Size: `415 B` (gzip `250 B`) - Keep callback identity stable.
- `useLatest` - Export Size: `199 B` (gzip `155 B`) - Store the latest value in a ref.
- `useStorage` - Export Size: `1.5 kB` (gzip `581 B`) - persist state in localStorage-compatible storage.
- `useStorageAsync` - Export Size: `2.9 kB` (gzip `815 B`) - persist state in async storage backends.
- `useLastChanged` - Export Size: `554 B` (gzip `309 B`) - returns timestamp of the last observed value change.
- `useRefHistory` - Export Size: `1.9 kB` (gzip `691 B`) - state utility with undo/redo history.
- `useManualRefHistory` - Export Size: `1.9 kB` (gzip `652 B`) - commit-based state history with undo/redo.
- `useDebouncedRefHistory` - Export Size: `2.4 kB` (gzip `782 B`) - records history snapshots after debounce delay.
- `useThrottledRefHistory` - Export Size: `3.2 kB` (gzip `920 B`) - records history snapshots at throttled intervals.
- `useOnMount` - Export Size: `226 B` (gzip `169 B`) - Run logic when component mounts.
- `usePrevious` - Export Size: `341 B` (gzip `224 B`) - Read the previous value.
- `useThrottle` - Export Size: `856 B` (gzip `381 B`) - Limit update frequency.
- `useToggle` - Export Size: `512 B` (gzip `268 B`) - Toggle boolean state.

### Elements (9)

- `useDraggable` - Export Size: `6.6 kB` (gzip `1.7 kB`) - Make an element draggable.
- `useActiveElement` - Export Size: `784 B` (gzip `322 B`) - reactive document.activeElement tracker.
- `useElementSize` - Export Size: `808 B` (gzip `391 B`) - observe element width/height with ResizeObserver.
- `useElementBounding` - Export Size: `1.4 kB` (gzip `560 B`) - observe element client rect values.
- `useElementVisibility` - Export Size: `798 B` (gzip `407 B`) - observe if element intersects viewport.
- `useDropZone` - Export Size: `1.7 kB` (gzip `609 B`) - observe drag-over state and dropped files.
- `useParentElement` - Export Size: `488 B` (gzip `292 B`) - resolve parent element for a target ref.
- `useWindowFocus` - Export Size: `776 B` (gzip `350 B`) - reactive window focus/blur state.
- `useWindowScroll` - Export Size: `823 B` (gzip `366 B`) - reactive window scroll coordinates.

### Browser (53)

- `useBrowserLocation` - Export Size: `1.1 kB` (gzip `440 B`) - reactive snapshot of URL fields with popstate/hashchange updates.
- `useBreakpoints` - Export Size: `1.1 kB` (gzip `469 B`) - active breakpoint names and flags from window width.
- `useBluetooth` - Export Size: `2.3 kB` (gzip `751 B`) - request and track selected Bluetooth device.
- `useClickOutside` - Export Size: `1.0 kB` (gzip `433 B`) - Handle clicks outside an element.
- `useColorMode` - Export Size: `1.7 kB` (gzip `676 B`) - persisted light/dark/auto mode with DOM sync.
- `useCopyToClipboard` - Export Size: `1.3 kB` (gzip `505 B`) - Copy text to the clipboard.
- `useClipboardItems` - Export Size: `1.6 kB` (gzip `645 B`) - reads rich clipboard items via navigator.clipboard.read.
- `useCssSupports` - Export Size: `552 B` (gzip `288 B`) - checks CSS.supports for conditions and declarations.
- `useCssVar` - Export Size: `881 B` (gzip `389 B`) - reactive CSS custom property getter/setter.
- `useDark` - Export Size: `1.3 kB` (gzip `548 B`) - persisted dark mode state with DOM class sync.
- `useBroadcastChannel` - Export Size: `1.2 kB` (gzip `478 B`) - cross-tab messaging with reactive last payload.
- `useEyeDropper` - Export Size: `1.8 kB` (gzip `662 B`) - open system color picker and read sRGB hex.
- `useEventListener` - Export Size: `868 B` (gzip `363 B`) - Attach and clean up event listeners.
- `useFavicon` - Export Size: `1.2 kB` (gzip `524 B`) - Update the page favicon dynamically.
- `useFileDialog` - Export Size: `1.6 kB` (gzip `666 B`) - opens a file picker and tracks selected files.
- `useFileSystemAccess` - Export Size: `4.1 kB` (gzip `978 B`) - open and save text files with File System Access API.
- `useFullscreen` - Export Size: `3.2 kB` (gzip `833 B`) - enter, exit, and toggle fullscreen mode.
- `useHash` - Export Size: `1015 B` (gzip `426 B`) - Read and update URL hash state.
- `useGamepad` - Export Size: `1.4 kB` (gzip `511 B`) - reactive connected gamepad list via browser API.
- `useIdle` - Export Size: `1.2 kB` (gzip `462 B`) - Detect user inactivity.
- `useImage` - Export Size: `1.6 kB` (gzip `564 B`) - load image sources with loading/error state.
- `useIntersectionObserver` - Export Size: `1.1 kB` (gzip `473 B`) - Track element visibility in viewport.
- `useLockBodyScroll` - Export Size: `513 B` (gzip `273 B`) - Lock body scrolling while active.
- `useMediaQuery` - Export Size: `1.4 kB` (gzip `512 B`) - React to media query matches.
- `useMediaControls` - Export Size: `3.6 kB` (gzip `987 B`) - reactive playback controls for HTML media elements.
- `useMemory` - Export Size: `988 B` (gzip `449 B`) - reactive snapshot of performance.memory values.
- `useMutationObserver` - Export Size: `593 B` (gzip `312 B`) - Observe DOM mutations.
- `usePageVisibility` - Export Size: `783 B` (gzip `337 B`) - Track page visibility changes.
- `usePermission` - Export Size: `1.9 kB` (gzip `649 B`) - tracks PermissionStatus for a named feature.
- `usePerformanceObserver` - Export Size: `1.0 kB` (gzip `458 B`) - collect PerformanceObserver entries reactively.
- `usePreferredColorScheme` - Export Size: `1.2 kB` (gzip `441 B`) - returns light/dark/no-preference from media queries.
- `usePreferredContrast` - Export Size: `1.5 kB` (gzip `458 B`) - media-query based contrast preference value.
- `usePreferredDark` - Export Size: `259 B` (gzip `194 B`) - boolean flag for dark preference.
- `usePreferredLanguages` - Export Size: `1000 B` (gzip `429 B`) - reactive browser language priority list.
- `usePreferredReducedTransparency` - Export Size: `306 B` (gzip `198 B`) - reacts to reduced transparency preference.
- `usePreferredReducedMotion` - Export Size: `274 B` (gzip `186 B`) - true when prefers-reduced-motion is reduce.
- `useResizeObserver` - Export Size: `805 B` (gzip `366 B`) - Track element size changes.
- `useScript` - Export Size: `1.5 kB` (gzip `519 B`) - Load external scripts with status.
- `useScreenOrientation` - Export Size: `1.1 kB` (gzip `450 B`) - orientation type and angle updates.
- `useScreenSafeArea` - Export Size: `1.5 kB` (gzip `573 B`) - reads top/right/bottom/left safe-area values.
- `useShare` - Export Size: `1.2 kB` (gzip `480 B`) - share data via native Web Share API with fallback.
- `useStyleTag` - Export Size: `1.0 kB` (gzip `460 B`) - injects and cleans up dynamic styles.
- `useSSRWidth` - Export Size: `405 B` (gzip `256 B`) - client width with safe server fallback.
- `useTextareaAutoSize` - Export Size: `1.8 kB` (gzip `598 B`) - Auto-resize textarea to fit content.
- `useTextDirection` - Export Size: `955 B` (gzip `428 B`) - observes `dir` attribute changes and returns ltr/rtl.
- `useTitle` - Export Size: `539 B` (gzip `264 B`) - Set and restore document title.
- `useUrlSearchParams` - Export Size: `1.3 kB` (gzip `518 B`) - read and update URL query params.
- `useVibrate` - Export Size: `480 B` (gzip `271 B`) - vibration helper for supported devices.
- `useWakeLock` - Export Size: `2.3 kB` (gzip `689 B`) - request and release screen wake locks safely.
- `useWebNotification` - Export Size: `1.1 kB` (gzip `467 B`) - request permission and show notifications.
- `useWebWorker` - Export Size: `1.5 kB` (gzip `619 B`) - create a worker from script text with reactive messages.
- `useWebWorkerFn` - Export Size: `712 B` (gzip `374 B`) - offload function execution to worker context.
- `useWindowSize` - Export Size: `781 B` (gzip `356 B`) - Track window width and height.

### Sensors (29)

- `useBattery` - Export Size: `2.0 kB` (gzip `563 B`) - level, charging, times, isSupported, event-driven.
- `useDevicePixelRatio` - Export Size: `729 B` (gzip `346 B`) - reactive device pixel ratio value.
- `useDisplayMedia` - Export Size: `2.3 kB` (gzip `805 B`) - start and stop screen-share media streams.
- `useDeviceMotion` - Export Size: `1.2 kB` (gzip `480 B`) - reactive acceleration and rotation values from devicemotion.
- `useDeviceOrientation` - Export Size: `1.3 kB` (gzip `498 B`) - reactive alpha/beta/gamma orientation values.
- `useDevicesList` - Export Size: `2.0 kB` (gzip `721 B`) - enumerate and refresh available media devices.
- `useElementByPoint` - Export Size: `371 B` (gzip `247 B`) - helper for document.elementFromPoint.
- `useElementHover` - Export Size: `802 B` (gzip `348 B`) - reactive hover state from element ref.
- `useFocus` - Export Size: `815 B` (gzip `362 B`) - ref-based element focus state helper.
- `useFocusWithin` - Export Size: `951 B` (gzip `422 B`) - tracks focus for container and descendants.
- `useFps` - Export Size: `1.2 kB` (gzip `477 B`) - requestAnimationFrame-based FPS estimator.
- `useGeolocation` - Export Size: `1.3 kB` (gzip `532 B`) - watch latitude/longitude updates and errors.
- `useInfiniteScroll` - Export Size: `1001 B` (gzip `470 B`) - invoke loader near bottom of page.
- `useKeyModifier` - Export Size: `1.2 kB` (gzip `439 B`) - alt/ctrl/meta/shift key state.
- `useMagicKeys` - Export Size: `1.4 kB` (gzip `479 B`) - reactive map of active keys.
- `useMouse` - Export Size: `631 B` (gzip `343 B`) - reactive mouse position in viewport coordinates.
- `useMousePressed` - Export Size: `876 B` (gzip `362 B`) - reactive state for mouse button down/up.
- `useNavigatorLanguage` - Export Size: `808 B` (gzip `357 B`) - current navigator language with languagechange updates.
- `useNetwork` - Export Size: `1.6 kB` (gzip `489 B`) - online status and connection metadata when available.
- `useOnline` - Export Size: `917 B` (gzip `370 B`) - reactive online/offline network status.
- `usePageLeave` - Export Size: `788 B` (gzip `373 B`) - invokes callback when pointer leaves viewport from top edge.
- `useParallax` - Export Size: `964 B` (gzip `457 B`) - parallax offsets and transform string.
- `usePointer` - Export Size: `1.5 kB` (gzip `477 B`) - pointer position, type, and pressed flag.
- `useScroll` - Export Size: `757 B` (gzip `356 B`) - reactive `scrollX` and `scrollY` values.
- `useSpeechRecognition` - Export Size: `2.3 kB` (gzip `785 B`) - transcript, listening, and error state.
- `useSpeechSynthesis` - Export Size: `2.0 kB` (gzip `679 B`) - speak/cancel API with speaking state.
- `useSwipe` - Export Size: `1.7 kB` (gzip `588 B`) - touch swipe direction and active swipe state.
- `useTextSelection` - Export Size: `977 B` (gzip `406 B`) - current selected text and collapsed state.
- `useUserMedia` - Export Size: `2.2 kB` (gzip `792 B`) - start/stop media stream with loading and errors.

### Network (5)

- `useAbortController` - Export Size: `1.6 kB` (gzip `500 B`) - Cancel stale async requests.
- `useAsync` - Export Size: `1.6 kB` (gzip `585 B`) - Manage async state and execution.
- `useEventSource` - Export Size: `1.3 kB` (gzip `484 B`) - status and payload state for SSE streams.
- `useFetch` - Export Size: `2.6 kB` (gzip `867 B`) - loading/data/error state around fetch calls.
- `useWebSocket` - Export Size: `1.4 kB` (gzip `580 B`) - connection status, last message, and send helper.

### Animation (6)

- `useAnimate` - Export Size: `1.3 kB` (gzip `526 B`) - Web Animations API wrapper with play/cancel.
- `useIntervalFn` - Export Size: `1.2 kB` (gzip `475 B`) - interval controls with active state.
- `useRafFn` - Export Size: `1.3 kB` (gzip `475 B`) - start/stop RAF loop with active state.
- `useRafState` - Export Size: `661 B` (gzip `312 B`) - Schedule state updates with requestAnimationFrame.
- `useTimeoutFn` - Export Size: `1.2 kB` (gzip `475 B`) - one-shot timeout controls.
- `usePresenceTransition` - Export Size: `1.3 kB` (gzip `552 B`) - derive enter/exit stages with mount control (no clash with React’s useTransition).

### Component (2)

- `useMountedState` - Export Size: `408 B` (gzip `218 B`) - Check if component is mounted.
- `useVirtualList` - Export Size: `1.6 kB` (gzip `637 B`) - render only visible rows for large lists.

### Watch (12)

- `useWatchImmediate` - Export Size: `558 B` (gzip `344 B`) - run callback on mount and each source change.
- `useWatchOnce` - Export Size: `805 B` (gzip `424 B`) - fire a callback a single time from a watched value.
- `useWatchDebounced` - Export Size: `764 B` (gzip `410 B`) - delay watch callback until value stops changing.
- `useWatchThrottled` - Export Size: `1.5 kB` (gzip `550 B`) - cap how often a watch callback runs.
- `useWatchAtMost` - Export Size: `701 B` (gzip `394 B`) - only handle the first N value updates.
- `useWatchArray` - Export Size: `765 B` (gzip `394 B`) - diff array updates into added/removed items.
- `useWatchPausable` - Export Size: `904 B` (gzip `453 B`) - pause and resume a watch on value changes.
- `useWatchTriggerable` - Export Size: `1.0 kB` (gzip `488 B`) - re-run watch side effects on demand.
- `useWatchWithFilter` - Export Size: `642 B` (gzip `361 B`) - run a watch only when a predicate matches.
- `useWatchDeep` - Export Size: `778 B` (gzip `399 B`) - trigger callback when deep serialized state changes.
- `useWatchIgnorable` - Export Size: `918 B` (gzip `434 B`) - batch updates without firing a watch.
- `useWhenever` - Export Size: `573 B` (gzip `335 B`) - call side effects when a condition flips to true.

### Reactivity (3)

- `useRefAutoReset` - Export Size: `1.2 kB` (gzip `458 B`) - reset a value to initial state after a timeout.
- `useRefDebounced` - Export Size: `547 B` (gzip `308 B`) - expose a debounced version of a changing value.
- `useRefThrottled` - Export Size: `1.3 kB` (gzip `456 B`) - expose a throttled version of a changing value.

### Array (15)

- `useCycleList` - Export Size: `1.3 kB` (gzip `474 B`) - cyclic next/prev index and current item.
- `useArrayMap` - Export Size: `265 B` (gzip `195 B`) - useMemo around Array.map for derived rows.
- `useArrayFilter` - Export Size: `288 B` (gzip `203 B`) - useMemo around Array.filter for derived subset.
- `useArrayReduce` - Export Size: `327 B` (gzip `211 B`) - useMemo around Array.reduce for aggregates.
- `useArrayFind` - Export Size: `278 B` (gzip `204 B`) - useMemo around Array.find.
- `useArrayFindIndex` - Export Size: `299 B` (gzip `205 B`) - useMemo around Array.findIndex.
- `useArraySome` - Export Size: `283 B` (gzip `204 B`) - useMemo around Array.some.
- `useArrayIncludes` - Export Size: `304 B` (gzip `212 B`) - useMemo around Array.includes.
- `useArrayJoin` - Export Size: `331 B` (gzip `226 B`) - useMemo around Array.join.
- `useArrayEvery` - Export Size: `279 B` (gzip `201 B`) - useMemo around Array.every.
- `useArrayDifference` - Export Size: `336 B` (gzip `224 B`) - items in source not in values (includes).
- `useArrayFindLast` - Export Size: `461 B` (gzip `275 B`) - find last match without relying on findLast.
- `useArrayUnique` - Export Size: `270 B` (gzip `202 B`) - first-seen unique values via Set.
- `useSorted` - Export Size: `610 B` (gzip `335 B`) - memoized sorted array copy.
- `useStepper` - Export Size: `1.1 kB` (gzip `419 B`) - numeric step in [min, max] with next/prev.

### Time (8)

- `useCountdown` - Export Size: `3.4 kB` (gzip `1.1 kB`) - remaining ms, clock fields, optional onComplete.
- `useDateFormat` - Export Size: `1.2 kB` (gzip `556 B`) - memoized Intl.DateTimeFormat output string.
- `useInterval` - Export Size: `552 B` (gzip `270 B`) - recurring timer with ref-safe callback and cleanup.
- `useNow` - Export Size: `701 B` (gzip `365 B`) - re-render on a wall-clock tick with Date state.
- `useTimeAgo` - Export Size: `2.9 kB` (gzip `1013 B`) - RelativeTimeFormat label with auto bucket choice.
- `useTimeAgoIntl` - Export Size: `227 B` (gzip `165 B`) - same behavior as useTimeAgo, Intl-oriented name.
- `useTimeout` - Export Size: `546 B` (gzip `269 B`) - schedule a callback with automatic cleanup.
- `useTimestamp` - Export Size: `749 B` (gzip `390 B`) - Date.now on an interval, same as useNow but number.

### Utilities (30)

**Hooks**

- `useAsyncQueue` - Export Size: `3.9 kB` (gzip `987 B`) - for-await style results/errors, autoStart option.
- `useBase64` - Export Size: `906 B` (gzip `469 B`) - UTF-8 Base64, optional JSON stringification, memoized.
- `useCloned` - Export Size: `509 B` (gzip `306 B`) - memoized deep clone via structuredClone with JSON fallback.
- `useCached` - Export Size: `309 B` (gzip `235 B`) - useMemo with an explicit dependency list in the API.
- `useConfirmDialog` - Export Size: `1.1 kB` (gzip `452 B`) - reveal→Promise, confirm/cancel, optional payload.
- `useDebounceFn` - Export Size: `1016 B` (gzip `414 B`) - debounced callback with cancel, stable fn ref.
- `useEventBus` - Export Size: `1.2 kB` (gzip `440 B`) - module-level channels by name, on/off/emit/reset.
- `useLocalStorage` - Export Size: `3.4 kB` (gzip `916 B`) - useState-like API backed by localStorage, sync, SSR-safe.
- `useMemoize` - Export Size: `802 B` (gzip `396 B`) - per-argument cache via JSON key, stable wrapper.
- `useOffsetPagination` - Export Size: `1.8 kB` (gzip `615 B`) - page, pageSize, total, next/prev, offset.
- `useObjectUrl` - Export Size: `562 B` (gzip `302 B`) - createObjectURL + revoke on change/unmount.
- `useSessionStorage` - Export Size: `2.4 kB` (gzip `730 B`) - useState-like API backed by sessionStorage.
- `useThrottleFn` - Export Size: `1.4 kB` (gzip `500 B`) - trailing throttle with optional delayed call, cancel.
- `useTimeoutPoll` - Export Size: `2.1 kB` (gzip `682 B`) - recursive setTimeout poll, start/stop, async-safe.
- `useToNumber` - Export Size: `448 B` (gzip `279 B`) - memoized Number() with NaN replaced by fallback.
- `useToString` - Export Size: `252 B` (gzip `193 B`) - memoized String(value) for display and keys.
- `useSupported` - Export Size: `427 B` (gzip `261 B`) - safe feature detect, false on SSR.

**Factories**

- `createEventHook` - Export Size: `98 B` (gzip `105 B`) - on/off/trigger/clear outside React, module-friendly.
- `createGlobalState` - Export Size: `102 B` (gzip `106 B`) - module-level state + setState, hook per call site.
- `createInjectionState` - Export Size: `108 B` (gzip `109 B`) - context from a custom hook and args tuple.
- `createSharedComposable` - Export Size: `112 B` (gzip `112 B`) - first call wins, shared return forever.
- `createUnrefFn` - Export Size: `94 B` (gzip `103 B`) - MaybeGetter to zero-arg read function.

**Events**

- `onElementRemoval` - Export Size: `97 B` (gzip `102 B`) - MutationObserver until element removed from DOM.
- `onKeyStroke` - Export Size: `87 B` (gzip `98 B`) - add keydown/keyup listener with key filter, cleanup fn.
- `onLongPress` - Export Size: `87 B` (gzip `98 B`) - mousedown/touch long press with delay, no React hook.
- `onStartTyping` - Export Size: `91 B` (gzip `98 B`) - first printable key after idle, keydown on target.

**Helpers**

- `get` - Export Size: `70 B` (gzip `89 B`) - safe nested get by dot path with optional fallback.
- `makeDestructurable` - Export Size: `100 B` (gzip `104 B`) - object + iterable for dual destructuring.
- `isDefined` - Export Size: `82 B` (gzip `95 B`) - null and undefined type guard, filter-friendly.
- `set` - Export Size: `70 B` (gzip `89 B`) - mutates object tree by dot path, creates empty objects.

## Usage

```tsx
import React from 'react'
import { useTextareaAutoSize } from '@dedalik/use-react'

const TextareaAutoSize: React.FC = () => {
  const [text, setText] = useState('')
  const { textareaRef } = useTextareaAutoSize({ input: text })

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value
    setText(newValue)
  }

  return <textarea ref={textareaRef} value={text} onChange={handleChange} style={{ resize: 'none' }} />
}

export default TextareaAutoSize
```

Refer to [functions list](https://usereact.org/functions) or [documentations](https://usereact.org/) for more details.

## Open source

- [Contributing guide](./CONTRIBUTING.md)
- [Code of conduct](./CODE_OF_CONDUCT.md)
- [Security policy](./SECURITY.md)

## Install

```bash
npm i @dedalik/use-react
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup, formatting (`npm run format`), linting, tests, and pull request expectations.

## Thanks

This project is heavily inspired by the following awesome projects.

- [streamich/react-use](https://github.com/streamich/react-use)
- [@uidotdev/usehooks](https://usehooks.com/)
- [@vueuse/core](https://vueuse.org/)
- [kripod/react-hooks](https://github.com/kripod/react-hooks)

## 📄 License

[MIT License](https://github.com/dedalik/use-react/blob/main/LICENSE) © 2023-PRESENT [dedalik](https://github.com/dedalik)
