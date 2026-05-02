type NavigatorWithHints = Navigator & {
  connection?: {
    saveData?: boolean;
  };
  deviceMemory?: number;
};

export function shouldUseLiteEffects(): boolean {
  if (typeof window === "undefined") {
    return true;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const navigatorWithHints = navigator as NavigatorWithHints;
  const saveData = navigatorWithHints.connection?.saveData ?? false;
  const lowCpu = (navigator.hardwareConcurrency ?? 8) <= 4;
  const lowMemory = (navigatorWithHints.deviceMemory ?? 8) <= 4;

  return reducedMotion || coarsePointer || saveData || lowCpu || lowMemory;
}
