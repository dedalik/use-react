import { RefObject, useCallback, useEffect, useMemo, useState } from 'react'

export interface UseMediaControlsReturn {
  playing: boolean
  muted: boolean
  volume: number
  currentTime: number
  duration: number
  play: () => Promise<boolean>
  pause: () => void
  seek: (time: number) => void
  setVolume: (value: number) => void
  setMuted: (value: boolean) => void
}

/**
 * Provides reactive controls for audio/video elements.
 */
export default function useMediaControls(target: RefObject<HTMLMediaElement | null>): UseMediaControlsReturn {
  const [playing, setPlaying] = useState(false)
  const [muted, setMutedState] = useState(false)
  const [volume, setVolumeState] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const media = target.current
    if (!media) return

    const sync = () => {
      setPlaying(!media.paused)
      setMutedState(media.muted)
      setVolumeState(media.volume)
      setCurrentTime(media.currentTime)
      setDuration(Number.isFinite(media.duration) ? media.duration : 0)
    }

    media.addEventListener('play', sync)
    media.addEventListener('pause', sync)
    media.addEventListener('timeupdate', sync)
    media.addEventListener('durationchange', sync)
    media.addEventListener('volumechange', sync)
    sync()

    return () => {
      media.removeEventListener('play', sync)
      media.removeEventListener('pause', sync)
      media.removeEventListener('timeupdate', sync)
      media.removeEventListener('durationchange', sync)
      media.removeEventListener('volumechange', sync)
    }
  }, [target])

  const play = useCallback(async () => {
    const media = target.current
    if (!media) return false

    try {
      await media.play()
      return true
    } catch {
      return false
    }
  }, [target])

  const pause = useCallback(() => {
    target.current?.pause()
  }, [target])

  const seek = useCallback(
    (time: number) => {
      const media = target.current
      if (!media) return
      media.currentTime = Math.max(0, time)
      setCurrentTime(media.currentTime)
    },
    [target],
  )

  const setVolume = useCallback(
    (value: number) => {
      const media = target.current
      if (!media) return
      const next = Math.max(0, Math.min(1, value))
      media.volume = next
      setVolumeState(next)
    },
    [target],
  )

  const setMuted = useCallback(
    (value: boolean) => {
      const media = target.current
      if (!media) return
      media.muted = value
      setMutedState(value)
    },
    [target],
  )

  return useMemo(
    () => ({
      playing,
      muted,
      volume,
      currentTime,
      duration,
      play,
      pause,
      seek,
      setVolume,
      setMuted,
    }),
    [currentTime, duration, muted, pause, play, playing, seek, setMuted, setVolume, volume],
  )
}
