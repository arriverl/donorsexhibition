import { forwardRef } from 'react'

const Hotspot = forwardRef(function Hotspot(
  { x = 50, y = 50, active = false, onClick, className = '', inline = false },
  ref
) {
  return (
    <button
      ref={ref}
      className={`hotspot ${active ? 'hotspot--active' : ''} ${className}`}
      onClick={onClick}
      aria-label="查看展品信息"
      style={{
        position: inline ? 'relative' : 'absolute',
        left: inline ? 'auto' : `${x}%`,
        top: inline ? 'auto' : `${y}%`,
        transform: inline ? 'none' : 'translate(-50%, -50%)',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        border: '2px solid rgba(26,26,26,0.7)',
        background: active ? 'rgba(139,94,42,0.2)' : 'transparent',
        cursor: 'pointer',
        zIndex: 10,
        padding: 0,
        outline: 'none',
        WebkitTapHighlightColor: 'transparent',
        transformOrigin: 'center center',
        willChange: 'transform, opacity',
      }}
    >
      <span className="hotspot__pulse" />
    </button>
  )
})

export default Hotspot
