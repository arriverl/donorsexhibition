import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Epilogue.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function Epilogue() {
  const sectionRef = useRef(null)
  const ruleRef = useRef(null)
  const paraRefs = useRef([])
  const closingRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = [
        ruleRef.current,
        ...paraRefs.current,
        closingRef.current,
      ].filter(Boolean)

      gsap.set(items, { y: 48, opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 62%',
        },
      })

      items.forEach((el, i) => {
        tl.to(el, {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
        }, i * 0.14)
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const paragraphs = [
    '西夏兵锋东指，风云骤变，盛极一时的阴氏家族，悄然隐入历史尘烟。',
    '繁华落幕，传奇暂歇。金戈铁蹄或曾踏破月牙泉的水波，激扬起鸣沙飞灰，然石壁不灭、题记犹存、风骨未泯。',
    '家族故事虽已远去，文明火种从未熄灭。敦煌的传奇，在守护与探寻中延续，在岁月长河里，开启新的篇章。',
  ]

  return (
    <section
      id="epilogue"
      ref={sectionRef}
      className={`section section--epilogue ${styles.epilogue}`}
      data-section="epilogue"
    >
      <span className={styles.watermark} aria-hidden="true">终</span>

      <div className={styles.inner}>
        <div ref={ruleRef} className={styles.rule} aria-hidden="true">
          <span className={styles.ruleLine}></span>
          <span className={styles.ruleDiamond}></span>
          <span className={styles.ruleLine}></span>
        </div>

        {paragraphs.map((text, i) => (
          <p
            key={i}
            ref={el => paraRefs.current[i] = el}
            className={styles.body}
          >
            {text}
          </p>
        ))}

        <div ref={closingRef} className={styles.closing} aria-hidden="true">
          <span className={styles.closingDot}></span>
          <span className={`${styles.closingDot} ${styles.closingDotMid}`}></span>
          <span className={styles.closingDot}></span>
        </div>
      </div>
    </section>
  )
}
