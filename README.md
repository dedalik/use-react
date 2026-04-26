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

Full index: **[usereact.org/functions](https://usereact.org/functions)** — each hook name below links to its reference page on the docs site.

### [State (16)](https://usereact.org/functions/state)

- [`useAsyncState`](https://usereact.org/functions/useAsyncState) - Export Size: `1.9 kB` (gzip `732 B`) - load async data with managed state and loading flags.
- [`useCounter`](https://usereact.org/functions/useCounter) - Export Size: `1.2 kB` (gzip `440 B`) - count state with inc/dec/set/reset and optional min/max clamping.
- [`useDebounce`](https://usereact.org/functions/useDebounce) - Export Size: `621 B` (gzip `328 B`) - Delay value updates until input settles.
- [`useEventCallback`](https://usereact.org/functions/useEventCallback) - Export Size: `415 B` (gzip `250 B`) - Keep callback identity stable.
- [`useLatest`](https://usereact.org/functions/useLatest) - Export Size: `199 B` (gzip `155 B`) - Store the latest value in a ref.
- [`useStorage`](https://usereact.org/functions/useStorage) - Export Size: `1.5 kB` (gzip `581 B`) - persist state in localStorage-compatible storage.
- [`useStorageAsync`](https://usereact.org/functions/useStorageAsync) - Export Size: `2.9 kB` (gzip `815 B`) - persist state in async storage backends.
- [`useLastChanged`](https://usereact.org/functions/useLastChanged) - Export Size: `554 B` (gzip `309 B`) - returns timestamp of the last observed value change.
- [`useRefHistory`](https://usereact.org/functions/useRefHistory) - Export Size: `1.9 kB` (gzip `691 B`) - state utility with undo/redo history.
- [`useManualRefHistory`](https://usereact.org/functions/useManualRefHistory) - Export Size: `1.9 kB` (gzip `652 B`) - commit-based state history with undo/redo.
- [`useDebouncedRefHistory`](https://usereact.org/functions/useDebouncedRefHistory) - Export Size: `2.4 kB` (gzip `782 B`) - records history snapshots after debounce delay.
- [`useThrottledRefHistory`](https://usereact.org/functions/useThrottledRefHistory) - Export Size: `3.2 kB` (gzip `920 B`) - records history snapshots at throttled intervals.
- [`useOnMount`](https://usereact.org/functions/useOnMount) - Export Size: `226 B` (gzip `169 B`) - Run logic when component mounts.
- [`usePrevious`](https://usereact.org/functions/usePrevious) - Export Size: `341 B` (gzip `224 B`) - Read the previous value.
- [`useThrottle`](https://usereact.org/functions/useThrottle) - Export Size: `856 B` (gzip `381 B`) - Limit update frequency.
- [`useToggle`](https://usereact.org/functions/useToggle) - Export Size: `512 B` (gzip `268 B`) - Toggle boolean state.

### [Elements (9)](https://usereact.org/functions/elements)

- [`useDraggable`](https://usereact.org/functions/useDraggable) - Export Size: `6.6 kB` (gzip `1.7 kB`) - Make an element draggable.
- [`useActiveElement`](https://usereact.org/functions/useActiveElement) - Export Size: `784 B` (gzip `322 B`) - reactive document.activeElement tracker.
- [`useElementSize`](https://usereact.org/functions/useElementSize) - Export Size: `808 B` (gzip `391 B`) - observe element width/height with ResizeObserver.
- [`useElementBounding`](https://usereact.org/functions/useElementBounding) - Export Size: `1.4 kB` (gzip `560 B`) - observe element client rect values.
- [`useElementVisibility`](https://usereact.org/functions/useElementVisibility) - Export Size: `798 B` (gzip `407 B`) - observe if element intersects viewport.
- [`useDropZone`](https://usereact.org/functions/useDropZone) - Export Size: `1.7 kB` (gzip `609 B`) - observe drag-over state and dropped files.
- [`useParentElement`](https://usereact.org/functions/useParentElement) - Export Size: `488 B` (gzip `292 B`) - resolve parent element for a target ref.
- [`useWindowFocus`](https://usereact.org/functions/useWindowFocus) - Export Size: `776 B` (gzip `350 B`) - reactive window focus/blur state.
- [`useWindowScroll`](https://usereact.org/functions/useWindowScroll) - Export Size: `823 B` (gzip `366 B`) - reactive window scroll coordinates.

### [Browser (53)](https://usereact.org/functions/browser)

- [`useBrowserLocation`](https://usereact.org/functions/useBrowserLocation) - Export Size: `1.1 kB` (gzip `440 B`) - reactive snapshot of URL fields with popstate/hashchange updates.
- [`useBreakpoints`](https://usereact.org/functions/useBreakpoints) - Export Size: `1.1 kB` (gzip `469 B`) - active breakpoint names and flags from window width.
- [`useBluetooth`](https://usereact.org/functions/useBluetooth) - Export Size: `2.3 kB` (gzip `751 B`) - request and track selected Bluetooth device.
- [`useClickOutside`](https://usereact.org/functions/useClickOutside) - Export Size: `1.0 kB` (gzip `433 B`) - Handle clicks outside an element.
- [`useColorMode`](https://usereact.org/functions/useColorMode) - Export Size: `1.7 kB` (gzip `676 B`) - persisted light/dark/auto mode with DOM sync.
- [`useCopyToClipboard`](https://usereact.org/functions/useCopyToClipboard) - Export Size: `1.3 kB` (gzip `505 B`) - Copy text to the clipboard.
- [`useClipboardItems`](https://usereact.org/functions/useClipboardItems) - Export Size: `1.6 kB` (gzip `645 B`) - reads rich clipboard items via navigator.clipboard.read.
- [`useCssSupports`](https://usereact.org/functions/useCssSupports) - Export Size: `552 B` (gzip `288 B`) - checks CSS.supports for conditions and declarations.
- [`useCssVar`](https://usereact.org/functions/useCssVar) - Export Size: `881 B` (gzip `389 B`) - reactive CSS custom property getter/setter.
- [`useDark`](https://usereact.org/functions/useDark) - Export Size: `1.3 kB` (gzip `548 B`) - persisted dark mode state with DOM class sync.
- [`useBroadcastChannel`](https://usereact.org/functions/useBroadcastChannel) - Export Size: `1.2 kB` (gzip `478 B`) - cross-tab messaging with reactive last payload.
- [`useEyeDropper`](https://usereact.org/functions/useEyeDropper) - Export Size: `1.8 kB` (gzip `662 B`) - open system color picker and read sRGB hex.
- [`useEventListener`](https://usereact.org/functions/useEventListener) - Export Size: `868 B` (gzip `363 B`) - Attach and clean up event listeners.
- [`useFavicon`](https://usereact.org/functions/useFavicon) - Export Size: `1.2 kB` (gzip `524 B`) - Update the page favicon dynamically.
- [`useFileDialog`](https://usereact.org/functions/useFileDialog) - Export Size: `1.6 kB` (gzip `666 B`) - opens a file picker and tracks selected files.
- [`useFileSystemAccess`](https://usereact.org/functions/useFileSystemAccess) - Export Size: `4.1 kB` (gzip `978 B`) - open and save text files with File System Access API.
- [`useFullscreen`](https://usereact.org/functions/useFullscreen) - Export Size: `3.2 kB` (gzip `833 B`) - enter, exit, and toggle fullscreen mode.
- [`useHash`](https://usereact.org/functions/useHash) - Export Size: `1015 B` (gzip `426 B`) - Read and update URL hash state.
- [`useGamepad`](https://usereact.org/functions/useGamepad) - Export Size: `1.4 kB` (gzip `511 B`) - reactive connected gamepad list via browser API.
- [`useIdle`](https://usereact.org/functions/useIdle) - Export Size: `1.2 kB` (gzip `462 B`) - Detect user inactivity.
- [`useImage`](https://usereact.org/functions/useImage) - Export Size: `1.6 kB` (gzip `564 B`) - load image sources with loading/error state.
- [`useIntersectionObserver`](https://usereact.org/functions/useIntersectionObserver) - Export Size: `1.1 kB` (gzip `473 B`) - Track element visibility in viewport.
- [`useLockBodyScroll`](https://usereact.org/functions/useLockBodyScroll) - Export Size: `513 B` (gzip `273 B`) - Lock body scrolling while active.
- [`useMediaQuery`](https://usereact.org/functions/useMediaQuery) - Export Size: `1.4 kB` (gzip `512 B`) - React to media query matches.
- [`useMediaControls`](https://usereact.org/functions/useMediaControls) - Export Size: `3.6 kB` (gzip `987 B`) - reactive playback controls for HTML media elements.
- [`useMemory`](https://usereact.org/functions/useMemory) - Export Size: `988 B` (gzip `449 B`) - reactive snapshot of performance.memory values.
- [`useMutationObserver`](https://usereact.org/functions/useMutationObserver) - Export Size: `593 B` (gzip `312 B`) - Observe DOM mutations.
- [`usePageVisibility`](https://usereact.org/functions/usePageVisibility) - Export Size: `783 B` (gzip `337 B`) - Track page visibility changes.
- [`usePermission`](https://usereact.org/functions/usePermission) - Export Size: `1.9 kB` (gzip `649 B`) - tracks PermissionStatus for a named feature.
- [`usePerformanceObserver`](https://usereact.org/functions/usePerformanceObserver) - Export Size: `1.0 kB` (gzip `458 B`) - collect PerformanceObserver entries reactively.
- [`usePreferredColorScheme`](https://usereact.org/functions/usePreferredColorScheme) - Export Size: `1.2 kB` (gzip `441 B`) - returns light/dark/no-preference from media queries.
- [`usePreferredContrast`](https://usereact.org/functions/usePreferredContrast) - Export Size: `1.5 kB` (gzip `458 B`) - media-query based contrast preference value.
- [`usePreferredDark`](https://usereact.org/functions/usePreferredDark) - Export Size: `259 B` (gzip `194 B`) - boolean flag for dark preference.
- [`usePreferredLanguages`](https://usereact.org/functions/usePreferredLanguages) - Export Size: `1000 B` (gzip `429 B`) - reactive browser language priority list.
- [`usePreferredReducedTransparency`](https://usereact.org/functions/usePreferredReducedTransparency) - Export Size: `306 B` (gzip `198 B`) - reacts to reduced transparency preference.
- [`usePreferredReducedMotion`](https://usereact.org/functions/usePreferredReducedMotion) - Export Size: `274 B` (gzip `186 B`) - true when prefers-reduced-motion is reduce.
- [`useResizeObserver`](https://usereact.org/functions/useResizeObserver) - Export Size: `805 B` (gzip `366 B`) - Track element size changes.
- [`useScript`](https://usereact.org/functions/useScript) - Export Size: `1.5 kB` (gzip `519 B`) - Load external scripts with status.
- [`useScreenOrientation`](https://usereact.org/functions/useScreenOrientation) - Export Size: `1.1 kB` (gzip `450 B`) - orientation type and angle updates.
- [`useScreenSafeArea`](https://usereact.org/functions/useScreenSafeArea) - Export Size: `1.5 kB` (gzip `573 B`) - reads top/right/bottom/left safe-area values.
- [`useShare`](https://usereact.org/functions/useShare) - Export Size: `1.2 kB` (gzip `480 B`) - share data via native Web Share API with fallback.
- [`useStyleTag`](https://usereact.org/functions/useStyleTag) - Export Size: `1.0 kB` (gzip `460 B`) - injects and cleans up dynamic styles.
- [`useSSRWidth`](https://usereact.org/functions/useSSRWidth) - Export Size: `405 B` (gzip `256 B`) - client width with safe server fallback.
- [`useTextareaAutoSize`](https://usereact.org/functions/useTextareaAutoSize) - Export Size: `1.8 kB` (gzip `598 B`) - Auto-resize textarea to fit content.
- [`useTextDirection`](https://usereact.org/functions/useTextDirection) - Export Size: `955 B` (gzip `428 B`) - observes `dir` attribute changes and returns ltr/rtl.
- [`useTitle`](https://usereact.org/functions/useTitle) - Export Size: `539 B` (gzip `264 B`) - Set and restore document title.
- [`useUrlSearchParams`](https://usereact.org/functions/useUrlSearchParams) - Export Size: `1.3 kB` (gzip `518 B`) - read and update URL query params.
- [`useVibrate`](https://usereact.org/functions/useVibrate) - Export Size: `480 B` (gzip `271 B`) - vibration helper for supported devices.
- [`useWakeLock`](https://usereact.org/functions/useWakeLock) - Export Size: `2.3 kB` (gzip `689 B`) - request and release screen wake locks safely.
- [`useWebNotification`](https://usereact.org/functions/useWebNotification) - Export Size: `1.1 kB` (gzip `467 B`) - request permission and show notifications.
- [`useWebWorker`](https://usereact.org/functions/useWebWorker) - Export Size: `1.5 kB` (gzip `619 B`) - create a worker from script text with reactive messages.
- [`useWebWorkerFn`](https://usereact.org/functions/useWebWorkerFn) - Export Size: `712 B` (gzip `374 B`) - offload function execution to worker context.
- [`useWindowSize`](https://usereact.org/functions/useWindowSize) - Export Size: `781 B` (gzip `356 B`) - Track window width and height.

### [Sensors (29)](https://usereact.org/functions/sensors)

- [`useBattery`](https://usereact.org/functions/useBattery) - Export Size: `2.0 kB` (gzip `563 B`) - level, charging, times, isSupported, event-driven.
- [`useDevicePixelRatio`](https://usereact.org/functions/useDevicePixelRatio) - Export Size: `729 B` (gzip `346 B`) - reactive device pixel ratio value.
- [`useDisplayMedia`](https://usereact.org/functions/useDisplayMedia) - Export Size: `2.3 kB` (gzip `805 B`) - start and stop screen-share media streams.
- [`useDeviceMotion`](https://usereact.org/functions/useDeviceMotion) - Export Size: `1.2 kB` (gzip `480 B`) - reactive acceleration and rotation values from devicemotion.
- [`useDeviceOrientation`](https://usereact.org/functions/useDeviceOrientation) - Export Size: `1.3 kB` (gzip `498 B`) - reactive alpha/beta/gamma orientation values.
- [`useDevicesList`](https://usereact.org/functions/useDevicesList) - Export Size: `2.0 kB` (gzip `721 B`) - enumerate and refresh available media devices.
- [`useElementByPoint`](https://usereact.org/functions/useElementByPoint) - Export Size: `371 B` (gzip `247 B`) - helper for document.elementFromPoint.
- [`useElementHover`](https://usereact.org/functions/useElementHover) - Export Size: `802 B` (gzip `348 B`) - reactive hover state from element ref.
- [`useFocus`](https://usereact.org/functions/useFocus) - Export Size: `815 B` (gzip `362 B`) - ref-based element focus state helper.
- [`useFocusWithin`](https://usereact.org/functions/useFocusWithin) - Export Size: `951 B` (gzip `422 B`) - tracks focus for container and descendants.
- [`useFps`](https://usereact.org/functions/useFps) - Export Size: `1.2 kB` (gzip `477 B`) - requestAnimationFrame-based FPS estimator.
- [`useGeolocation`](https://usereact.org/functions/useGeolocation) - Export Size: `1.3 kB` (gzip `532 B`) - watch latitude/longitude updates and errors.
- [`useInfiniteScroll`](https://usereact.org/functions/useInfiniteScroll) - Export Size: `1001 B` (gzip `470 B`) - invoke loader near bottom of page.
- [`useKeyModifier`](https://usereact.org/functions/useKeyModifier) - Export Size: `1.2 kB` (gzip `439 B`) - alt/ctrl/meta/shift key state.
- [`useMagicKeys`](https://usereact.org/functions/useMagicKeys) - Export Size: `1.4 kB` (gzip `479 B`) - reactive map of active keys.
- [`useMouse`](https://usereact.org/functions/useMouse) - Export Size: `631 B` (gzip `343 B`) - reactive mouse position in viewport coordinates.
- [`useMousePressed`](https://usereact.org/functions/useMousePressed) - Export Size: `876 B` (gzip `362 B`) - reactive state for mouse button down/up.
- [`useNavigatorLanguage`](https://usereact.org/functions/useNavigatorLanguage) - Export Size: `808 B` (gzip `357 B`) - current navigator language with languagechange updates.
- [`useNetwork`](https://usereact.org/functions/useNetwork) - Export Size: `1.6 kB` (gzip `489 B`) - online status and connection metadata when available.
- [`useOnline`](https://usereact.org/functions/useOnline) - Export Size: `917 B` (gzip `370 B`) - reactive online/offline network status.
- [`usePageLeave`](https://usereact.org/functions/usePageLeave) - Export Size: `788 B` (gzip `373 B`) - invokes callback when pointer leaves viewport from top edge.
- [`useParallax`](https://usereact.org/functions/useParallax) - Export Size: `964 B` (gzip `457 B`) - parallax offsets and transform string.
- [`usePointer`](https://usereact.org/functions/usePointer) - Export Size: `1.5 kB` (gzip `477 B`) - pointer position, type, and pressed flag.
- [`useScroll`](https://usereact.org/functions/useScroll) - Export Size: `757 B` (gzip `356 B`) - reactive `scrollX` and `scrollY` values.
- [`useSpeechRecognition`](https://usereact.org/functions/useSpeechRecognition) - Export Size: `2.3 kB` (gzip `785 B`) - transcript, listening, and error state.
- [`useSpeechSynthesis`](https://usereact.org/functions/useSpeechSynthesis) - Export Size: `2.0 kB` (gzip `679 B`) - speak/cancel API with speaking state.
- [`useSwipe`](https://usereact.org/functions/useSwipe) - Export Size: `1.7 kB` (gzip `588 B`) - touch swipe direction and active swipe state.
- [`useTextSelection`](https://usereact.org/functions/useTextSelection) - Export Size: `977 B` (gzip `406 B`) - current selected text and collapsed state.
- [`useUserMedia`](https://usereact.org/functions/useUserMedia) - Export Size: `2.2 kB` (gzip `792 B`) - start/stop media stream with loading and errors.

### [Network (5)](https://usereact.org/functions/network)

- [`useAbortController`](https://usereact.org/functions/useAbortController) - Export Size: `1.6 kB` (gzip `500 B`) - Cancel stale async requests.
- [`useAsync`](https://usereact.org/functions/useAsync) - Export Size: `1.6 kB` (gzip `585 B`) - Manage async state and execution.
- [`useEventSource`](https://usereact.org/functions/useEventSource) - Export Size: `1.3 kB` (gzip `484 B`) - status and payload state for SSE streams.
- [`useFetch`](https://usereact.org/functions/useFetch) - Export Size: `2.6 kB` (gzip `867 B`) - loading/data/error state around fetch calls.
- [`useWebSocket`](https://usereact.org/functions/useWebSocket) - Export Size: `1.4 kB` (gzip `580 B`) - connection status, last message, and send helper.

### [Animation (6)](https://usereact.org/functions/animation)

- [`useAnimate`](https://usereact.org/functions/useAnimate) - Export Size: `1.3 kB` (gzip `526 B`) - Web Animations API wrapper with play/cancel.
- [`useIntervalFn`](https://usereact.org/functions/useIntervalFn) - Export Size: `1.2 kB` (gzip `475 B`) - interval controls with active state.
- [`useRafFn`](https://usereact.org/functions/useRafFn) - Export Size: `1.3 kB` (gzip `475 B`) - start/stop RAF loop with active state.
- [`useRafState`](https://usereact.org/functions/useRafState) - Export Size: `661 B` (gzip `312 B`) - Schedule state updates with requestAnimationFrame.
- [`useTimeoutFn`](https://usereact.org/functions/useTimeoutFn) - Export Size: `1.2 kB` (gzip `475 B`) - one-shot timeout controls.
- [`usePresenceTransition`](https://usereact.org/functions/usePresenceTransition) - Export Size: `1.3 kB` (gzip `552 B`) - derive enter/exit stages with mount control (no clash with React’s useTransition).

### [Component (2)](https://usereact.org/functions/component)

- [`useMountedState`](https://usereact.org/functions/useMountedState) - Export Size: `408 B` (gzip `218 B`) - Check if component is mounted.
- [`useVirtualList`](https://usereact.org/functions/useVirtualList) - Export Size: `1.6 kB` (gzip `637 B`) - render only visible rows for large lists.

### [Watch (12)](https://usereact.org/functions/watch)

- [`useWatchImmediate`](https://usereact.org/functions/useWatchImmediate) - Export Size: `558 B` (gzip `344 B`) - run callback on mount and each source change.
- [`useWatchOnce`](https://usereact.org/functions/useWatchOnce) - Export Size: `805 B` (gzip `424 B`) - fire a callback a single time from a watched value.
- [`useWatchDebounced`](https://usereact.org/functions/useWatchDebounced) - Export Size: `764 B` (gzip `410 B`) - delay watch callback until value stops changing.
- [`useWatchThrottled`](https://usereact.org/functions/useWatchThrottled) - Export Size: `1.5 kB` (gzip `550 B`) - cap how often a watch callback runs.
- [`useWatchAtMost`](https://usereact.org/functions/useWatchAtMost) - Export Size: `701 B` (gzip `394 B`) - only handle the first N value updates.
- [`useWatchArray`](https://usereact.org/functions/useWatchArray) - Export Size: `765 B` (gzip `394 B`) - diff array updates into added/removed items.
- [`useWatchPausable`](https://usereact.org/functions/useWatchPausable) - Export Size: `904 B` (gzip `453 B`) - pause and resume a watch on value changes.
- [`useWatchTriggerable`](https://usereact.org/functions/useWatchTriggerable) - Export Size: `1.0 kB` (gzip `488 B`) - re-run watch side effects on demand.
- [`useWatchWithFilter`](https://usereact.org/functions/useWatchWithFilter) - Export Size: `642 B` (gzip `361 B`) - run a watch only when a predicate matches.
- [`useWatchDeep`](https://usereact.org/functions/useWatchDeep) - Export Size: `778 B` (gzip `399 B`) - trigger callback when deep serialized state changes.
- [`useWatchIgnorable`](https://usereact.org/functions/useWatchIgnorable) - Export Size: `918 B` (gzip `434 B`) - batch updates without firing a watch.
- [`useWhenever`](https://usereact.org/functions/useWhenever) - Export Size: `573 B` (gzip `335 B`) - call side effects when a condition flips to true.

### [Reactivity (3)](https://usereact.org/functions/reactivity)

- [`useRefAutoReset`](https://usereact.org/functions/useRefAutoReset) - Export Size: `1.2 kB` (gzip `458 B`) - reset a value to initial state after a timeout.
- [`useRefDebounced`](https://usereact.org/functions/useRefDebounced) - Export Size: `547 B` (gzip `308 B`) - expose a debounced version of a changing value.
- [`useRefThrottled`](https://usereact.org/functions/useRefThrottled) - Export Size: `1.3 kB` (gzip `456 B`) - expose a throttled version of a changing value.

### [Array (15)](https://usereact.org/functions/array)

- [`useCycleList`](https://usereact.org/functions/useCycleList) - Export Size: `1.3 kB` (gzip `474 B`) - cyclic next/prev index and current item.
- [`useArrayMap`](https://usereact.org/functions/useArrayMap) - Export Size: `265 B` (gzip `195 B`) - useMemo around Array.map for derived rows.
- [`useArrayFilter`](https://usereact.org/functions/useArrayFilter) - Export Size: `288 B` (gzip `203 B`) - useMemo around Array.filter for derived subset.
- [`useArrayReduce`](https://usereact.org/functions/useArrayReduce) - Export Size: `327 B` (gzip `211 B`) - useMemo around Array.reduce for aggregates.
- [`useArrayFind`](https://usereact.org/functions/useArrayFind) - Export Size: `278 B` (gzip `204 B`) - useMemo around Array.find.
- [`useArrayFindIndex`](https://usereact.org/functions/useArrayFindIndex) - Export Size: `299 B` (gzip `205 B`) - useMemo around Array.findIndex.
- [`useArraySome`](https://usereact.org/functions/useArraySome) - Export Size: `283 B` (gzip `204 B`) - useMemo around Array.some.
- [`useArrayIncludes`](https://usereact.org/functions/useArrayIncludes) - Export Size: `304 B` (gzip `212 B`) - useMemo around Array.includes.
- [`useArrayJoin`](https://usereact.org/functions/useArrayJoin) - Export Size: `331 B` (gzip `226 B`) - useMemo around Array.join.
- [`useArrayEvery`](https://usereact.org/functions/useArrayEvery) - Export Size: `279 B` (gzip `201 B`) - useMemo around Array.every.
- [`useArrayDifference`](https://usereact.org/functions/useArrayDifference) - Export Size: `336 B` (gzip `224 B`) - items in source not in values (includes).
- [`useArrayFindLast`](https://usereact.org/functions/useArrayFindLast) - Export Size: `461 B` (gzip `275 B`) - find last match without relying on findLast.
- [`useArrayUnique`](https://usereact.org/functions/useArrayUnique) - Export Size: `270 B` (gzip `202 B`) - first-seen unique values via Set.
- [`useSorted`](https://usereact.org/functions/useSorted) - Export Size: `610 B` (gzip `335 B`) - memoized sorted array copy.
- [`useStepper`](https://usereact.org/functions/useStepper) - Export Size: `1.1 kB` (gzip `419 B`) - numeric step in [min, max] with next/prev.

### [Time (8)](https://usereact.org/functions/time)

- [`useCountdown`](https://usereact.org/functions/useCountdown) - Export Size: `3.4 kB` (gzip `1.1 kB`) - remaining ms, clock fields, optional onComplete.
- [`useDateFormat`](https://usereact.org/functions/useDateFormat) - Export Size: `1.2 kB` (gzip `556 B`) - memoized Intl.DateTimeFormat output string.
- [`useInterval`](https://usereact.org/functions/useInterval) - Export Size: `552 B` (gzip `270 B`) - recurring timer with ref-safe callback and cleanup.
- [`useNow`](https://usereact.org/functions/useNow) - Export Size: `701 B` (gzip `365 B`) - re-render on a wall-clock tick with Date state.
- [`useTimeAgo`](https://usereact.org/functions/useTimeAgo) - Export Size: `2.9 kB` (gzip `1013 B`) - RelativeTimeFormat label with auto bucket choice.
- [`useTimeAgoIntl`](https://usereact.org/functions/useTimeAgoIntl) - Export Size: `227 B` (gzip `165 B`) - same behavior as useTimeAgo, Intl-oriented name.
- [`useTimeout`](https://usereact.org/functions/useTimeout) - Export Size: `546 B` (gzip `269 B`) - schedule a callback with automatic cleanup.
- [`useTimestamp`](https://usereact.org/functions/useTimestamp) - Export Size: `749 B` (gzip `390 B`) - Date.now on an interval, same as useNow but number.

### [Utilities (30)](https://usereact.org/functions/utilities)

**Hooks**

- [`useAsyncQueue`](https://usereact.org/functions/useAsyncQueue) - Export Size: `3.9 kB` (gzip `987 B`) - for-await style results/errors, autoStart option.
- [`useBase64`](https://usereact.org/functions/useBase64) - Export Size: `906 B` (gzip `469 B`) - UTF-8 Base64, optional JSON stringification, memoized.
- [`useCloned`](https://usereact.org/functions/useCloned) - Export Size: `509 B` (gzip `306 B`) - memoized deep clone via structuredClone with JSON fallback.
- [`useCached`](https://usereact.org/functions/useCached) - Export Size: `309 B` (gzip `235 B`) - useMemo with an explicit dependency list in the API.
- [`useConfirmDialog`](https://usereact.org/functions/useConfirmDialog) - Export Size: `1.1 kB` (gzip `452 B`) - reveal→Promise, confirm/cancel, optional payload.
- [`useDebounceFn`](https://usereact.org/functions/useDebounceFn) - Export Size: `1016 B` (gzip `414 B`) - debounced callback with cancel, stable fn ref.
- [`useEventBus`](https://usereact.org/functions/useEventBus) - Export Size: `1.2 kB` (gzip `440 B`) - module-level channels by name, on/off/emit/reset.
- [`useLocalStorage`](https://usereact.org/functions/useLocalStorage) - Export Size: `3.4 kB` (gzip `916 B`) - useState-like API backed by localStorage, sync, SSR-safe.
- [`useMemoize`](https://usereact.org/functions/useMemoize) - Export Size: `802 B` (gzip `396 B`) - per-argument cache via JSON key, stable wrapper.
- [`useOffsetPagination`](https://usereact.org/functions/useOffsetPagination) - Export Size: `1.8 kB` (gzip `615 B`) - page, pageSize, total, next/prev, offset.
- [`useObjectUrl`](https://usereact.org/functions/useObjectUrl) - Export Size: `562 B` (gzip `302 B`) - createObjectURL + revoke on change/unmount.
- [`useSessionStorage`](https://usereact.org/functions/useSessionStorage) - Export Size: `2.4 kB` (gzip `730 B`) - useState-like API backed by sessionStorage.
- [`useThrottleFn`](https://usereact.org/functions/useThrottleFn) - Export Size: `1.4 kB` (gzip `500 B`) - trailing throttle with optional delayed call, cancel.
- [`useTimeoutPoll`](https://usereact.org/functions/useTimeoutPoll) - Export Size: `2.1 kB` (gzip `682 B`) - recursive setTimeout poll, start/stop, async-safe.
- [`useToNumber`](https://usereact.org/functions/useToNumber) - Export Size: `448 B` (gzip `279 B`) - memoized Number() with NaN replaced by fallback.
- [`useToString`](https://usereact.org/functions/useToString) - Export Size: `252 B` (gzip `193 B`) - memoized String(value) for display and keys.
- [`useSupported`](https://usereact.org/functions/useSupported) - Export Size: `427 B` (gzip `261 B`) - safe feature detect, false on SSR.

**Factories**

- [`createEventHook`](https://usereact.org/functions/createEventHook) - Export Size: `98 B` (gzip `105 B`) - on/off/trigger/clear outside React, module-friendly.
- [`createGlobalState`](https://usereact.org/functions/createGlobalState) - Export Size: `102 B` (gzip `106 B`) - module-level state + setState, hook per call site.
- [`createInjectionState`](https://usereact.org/functions/createInjectionState) - Export Size: `108 B` (gzip `109 B`) - context from a custom hook and args tuple.
- [`createSharedComposable`](https://usereact.org/functions/createSharedComposable) - Export Size: `112 B` (gzip `112 B`) - first call wins, shared return forever.
- [`createUnrefFn`](https://usereact.org/functions/createUnrefFn) - Export Size: `94 B` (gzip `103 B`) - MaybeGetter to zero-arg read function.

**Events**

- [`onElementRemoval`](https://usereact.org/functions/onElementRemoval) - Export Size: `97 B` (gzip `102 B`) - MutationObserver until element removed from DOM.
- [`onKeyStroke`](https://usereact.org/functions/onKeyStroke) - Export Size: `87 B` (gzip `98 B`) - add keydown/keyup listener with key filter, cleanup fn.
- [`onLongPress`](https://usereact.org/functions/onLongPress) - Export Size: `87 B` (gzip `98 B`) - mousedown/touch long press with delay, no React hook.
- [`onStartTyping`](https://usereact.org/functions/onStartTyping) - Export Size: `91 B` (gzip `98 B`) - first printable key after idle, keydown on target.

**Helpers**

- [`get`](https://usereact.org/functions/get) - Export Size: `70 B` (gzip `89 B`) - safe nested get by dot path with optional fallback.
- [`makeDestructurable`](https://usereact.org/functions/makeDestructurable) - Export Size: `100 B` (gzip `104 B`) - object + iterable for dual destructuring.
- [`isDefined`](https://usereact.org/functions/isDefined) - Export Size: `82 B` (gzip `95 B`) - null and undefined type guard, filter-friendly.
- [`set`](https://usereact.org/functions/set) - Export Size: `70 B` (gzip `89 B`) - mutates object tree by dot path, creates empty objects.

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

Refer to the **[functions catalog](https://usereact.org/functions)** or the **[docs home](https://usereact.org/)** for more details.

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
