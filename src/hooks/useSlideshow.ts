"use client";

import { useCallback, useEffect, useState, useSyncExternalStore, type RefObject } from "react";

type Options = {
  /** Element whose visibility gates playback (paused while off-screen). */
  root: RefObject<HTMLElement | null>;
  /** Visitor prefers reduced motion — start paused; they can still press play. */
  reduceMotion: boolean;
  interval?: number;
};

const noSubscription = () => () => {};

function prefersSaveData() {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  return Boolean(nav.connection?.saveData);
}

/**
 * Playback state for background media (a slide sequence or a film). Only
 * advances to slides that have finished loading, pauses when the root is
 * off-screen or the tab is hidden, and exposes a pause/play toggle (WCAG 2.2.2).
 */
export function useSlideshow(count: number, { root, reduceMotion, interval = 8000 }: Options) {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [loaded, setLoaded] = useState<readonly boolean[]>(() => Array(count).fill(false));
  const [userPlaying, setUserPlaying] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(true);
  const saveData = useSyncExternalStore(noSubscription, prefersSaveData, () => false);

  const playing = userPlaying ?? (!reduceMotion && !saveData);
  const running = playing && visible;

  // Load the remaining slides once the first is in and playback is wanted.
  // Sticky, so pausing never unmounts the slide currently on screen.
  const [loadRest, setLoadRest] = useState(false);
  if (!loadRest && loaded[0] && playing) setLoadRest(true);

  // Pause while the hero is off-screen or the tab is in the background.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let inView = true;
    const update = () => setVisible(inView && document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [root]);

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => {
      for (let step = 1; step < count; step++) {
        const next = (active + step) % count;
        if (loaded[next]) {
          setPrevious(active);
          setActive(next);
          return;
        }
      }
    }, interval);
    return () => window.clearTimeout(timer);
  }, [running, active, loaded, count, interval]);

  const markLoaded = useCallback((index: number) => {
    setLoaded((current) => (current[index] ? current : current.map((v, i) => v || i === index)));
  }, []);

  const toggle = useCallback(() => setUserPlaying(!playing), [playing]);

  return {
    active,
    previous,
    count,
    playing,
    toggle,
    markLoaded,
    loadRest,
  };
}

export type Slideshow = ReturnType<typeof useSlideshow>;
