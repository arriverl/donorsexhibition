export default function Hero({ onEnter }) {
  const handleEnterExhibition = () => {
    if (onEnter) {
      onEnter()
    } else {
      const prologue = document.getElementById('prologue')
      if (prologue) {
        prologue.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section
      id="hero"
      className="section section--hero"
      data-section="hero"
      style={{
        backgroundImage: "url('/picture/hero.jpg')",
        // 图片已为 16:9，使用 cover 铺满整屏无黑边
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
        position: 'relative'
      }}
    >
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        zIndex: 10
      }}>
        <button
          onClick={handleEnterExhibition}
          style={{
            padding: '18px 48px',
            fontSize: '1.25rem',
            fontFamily: "'Noto Serif SC', serif",
            fontWeight: 500,
            letterSpacing: '0.15em',
            color: '#fff',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
            backdropFilter: 'blur(10px)',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.25)'
            e.target.style.transform = 'translateY(-2px)'
            e.target.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = 'none'
          }}
        >
          进入展览
        </button>
      </div>
    </section>
  )
}
