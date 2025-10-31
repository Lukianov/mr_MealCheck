export function usePollMealAnalysisStatus() {
  if (import.meta.env.DEV) {
    console.warn(
      'usePollMealAnalysisStatus is deprecated in favor of worker-based polling.',
    )
  }

  return {
    status: null,
    isPolling: false,
    attempts: 0,
    error: null,
    start: async () => {},
    stop: () => {},
    fetchOnce: async () => null,
  }
}
