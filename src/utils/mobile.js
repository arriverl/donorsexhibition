export const MOBILE_MQ = '(max-width: 768px)'

export function isMobileViewport() {
  return typeof window !== 'undefined' && window.matchMedia(MOBILE_MQ).matches
}

/** 移动端缩短 pin 滚动距离，减少手指滑动量 */
export function scrollPinEnd(percent) {
  const n = Number(percent) || 100
  return isMobileViewport() ? `+=${Math.round(n * 0.55)}%` : `+=${n}%`
}
