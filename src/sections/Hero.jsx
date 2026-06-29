import styles from './Hero.module.css'

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
      className={styles.hero}
      data-section="hero"
    >
      <div className={styles.heroVisual} aria-hidden>
        <img
          src="/picture/hero.jpg"
          alt=""
          className={styles.heroImg}
          decoding="async"
          fetchPriority="high"
        />
      </div>
      <div className={styles.enterWrap}>
        <button
          type="button"
          onClick={handleEnterExhibition}
          className={styles.enterBtn}
        >
          进入展览
        </button>
      </div>
    </section>
  )
}
