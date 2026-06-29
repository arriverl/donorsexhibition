import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { timelineData, ANGLE_STEP } from './prologueData'
import styles from './Prologue.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function PrologueWheel() {
  const sectionRef = useRef(null)
  const wheelRef = useRef(null)
  const wrapperRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)
  const itemRefs = useRef([])
  const subItemRefs = useRef([])

  const applyNodeOpacity = useCallback((rotation) => {
    itemRefs.current.forEach((el, i) => {
      if (!el) return
      const op = i === 0
        ? 1
        : Math.max(0, Math.min(1, (rotation - (i - 1) * ANGLE_STEP) / ANGLE_STEP))
      el.style.opacity = op
    })
    subItemRefs.current.forEach((el, i) => {
      if (!el) return
      const op = Math.max(0, Math.min(1, (rotation - i * ANGLE_STEP) / ANGLE_STEP))
      el.style.opacity = op
    })
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const wheelEl = wheelRef.current
    if (!section || !wheelEl) return

    const numItems = timelineData.length
    const maxRotation = (numItems - 1) * ANGLE_STEP
    const ROT_END = 7 / 8

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=800%',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress
          const rotation = Math.min(p / ROT_END, 1) * maxRotation
          wheelEl.style.transform = `rotate(${-rotation}deg)`
          wrapperRefs.current.forEach((wrapper, index) => {
            if (!wrapper) return
            const angle = index * ANGLE_STEP
            const netRotation = angle - rotation
            wrapper.style.transform = `rotate(${-netRotation}deg)`
          })
          applyNodeOpacity(rotation)
          let newActive = Math.round(rotation / ANGLE_STEP)
          newActive = Math.max(0, Math.min(numItems - 1, newActive))
          setActiveIndex(newActive)
          const fade = Math.max(0, (p - ROT_END) / (1 - ROT_END))
          section.style.opacity = String(1 - fade)
        },
      })
    }, section)

    applyNodeOpacity(0)

    return () => ctx.revert()
  }, [applyNodeOpacity])

  return (
    <section
      id="prologue"
      className={styles.prologue}
      data-section="prologue"
      ref={sectionRef}
    >
      <div className={styles.timelineContainer}>
        <div className={styles.wheel} ref={wheelRef}>
          {timelineData.map((data, i) => {
            const angle = i * ANGLE_STEP
            const isActive = i === activeIndex
            const containerClass = isActive
              ? `${styles.itemContainer} ${styles.active}`
              : styles.itemContainer

            return (
              <div key={`main-${i}`}>
                <div
                  className={containerClass}
                  ref={(el) => { itemRefs.current[i] = el }}
                  style={{ transform: `rotate(${angle}deg)`, opacity: i === 0 ? 1 : 0 }}
                >
                  <div className={styles.dot} />
                  <div
                    className={data.notice ? `${styles.contentWrapper} ${styles.noticeWrapper}` : styles.contentWrapper}
                    ref={(el) => { wrapperRefs.current[i] = el }}
                  >
                    <div
                      className={`${styles.content} ${data.intro ? styles.contentIntro : ''} ${data.notice ? styles.contentNotice : ''}`}
                    >
                      {data.intro ? (
                        <div className={styles.intro}>
                          {data.intro.map((p, idx) => (
                            <p key={idx}>{p}</p>
                          ))}
                        </div>
                      ) : (
                        <>
                          <div className={data.notice ? styles.noticePeriod : styles.period}>{data.period}</div>
                          {!data.notice && (
                            <div className={styles.details}>
                              <div className={styles.cavesTitle}>代表洞窟</div>
                              <div className={styles.cavesList}>{data.caves}</div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {i < timelineData.length - 1 && (
                  <div
                    className={`${styles.itemContainer} ${styles.subItem}`}
                    ref={(el) => { subItemRefs.current[i] = el }}
                    style={{ transform: `rotate(${angle + ANGLE_STEP / 2}deg)`, opacity: 0 }}
                  >
                    <div className={styles.dot} />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className={styles.crossSection}>
          <div className={styles.cloudContainer}>
            <img
              src="/picture/prologue/云彩.png"
              alt="云彩"
              className={styles.cloudImg}
            />
          </div>
          <img
            src="/picture/prologue/横截面.png"
            alt="洞窟横截面"
            className={styles.crossSectionImg}
          />
        </div>
      </div>
    </section>
  )
}
