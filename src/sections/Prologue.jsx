import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Prologue.module.css'

gsap.registerPlugin(ScrollTrigger)

const timelineData = [
  {
    period: '序',
    intro: [
      '地处河西走廊西端，敦煌自古是东西文明的交汇口。三千载岁月，月氏、匈奴、汉人、粟特人在此往来。在敦煌，人们找到了被历史铭记的方式——石壁上，身影因描摹而隽永；石壁下，世家绵延的故事静待发掘。',
      '敦煌阴氏，自河西走来。五百年间，他们开窟造像，联姻通婚，顺势而起，始终活跃于敦煌政教舞台之上。',
      '透过供养人画像，我们将追寻阴氏家族的兴衰轨迹。回到千年前，凝视那些被石壁记住的身影与名字。',
    ],
  },
  { period: '下拉查看敦煌阴氏在莫高窟留下的痕迹', notice: true },
  { period: '西魏', caves: '285窟' },
  { period: '初唐', caves: '431窟、432窟、96窟、321窟、322窟' },
  { period: '盛唐', caves: '129窟、148窟、166窟、199窟、208窟、217窟、225窟' },
  { period: '吐蕃时期（中唐）', caves: '231窟' },
  { period: '张氏归义军时期（五代）', caves: '156窟、138窟、139窟' },
  { period: '曹氏归义军时期（五代）', caves: '61窟、98窟、108窟、55窟' },
]

const cavesByPeriod = [
  [],
  ['285'],
  ['431', '432', '96', '321', '322'],
  ['129', '148', '166', '199', '208', '217', '225'],
  ['231'],
  ['156', '138', '139'],
  ['61', '98', '108', '55'],
]

const allCaves = cavesByPeriod.flat()

const ANGLE_STEP = 25

export default function Prologue() {
  const sectionRef = useRef(null)
  const wheelRef = useRef(null)
  const wrapperRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)
  const itemRefs = useRef([])
  const subItemRefs = useRef([])

  // 根据圆盘旋转角度控制各节点显隐：进入序章时仅显示第一个（序言）节点，
  // 用户向下滚动时其他节点随旋转依次浮现。
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
      // 子节点位于节点 i 与 i+1 之间，随节点 i+1 一同浮现
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

    // 圆盘旋转在前 700vh（7/8）内完成，最后 100vh 用于淡出，过渡到第一单元
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
          // 末段淡出：圆盘转完后整页淡出，衔接第一单元
          const fade = Math.max(0, (p - ROT_END) / (1 - ROT_END))
          section.style.opacity = String(1 - fade)
        },
      })
    }, section)

    // 初始化：仅显示第一个（序言）节点
    applyNodeOpacity(0)

    return () => ctx.revert()
  }, [applyNodeOpacity])

  const activeCaves = new Set(
    cavesByPeriod.slice(0, activeIndex + 1).flat()
  )

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

        {/* 洞窟横截面图层 */}
        <div className={styles.crossSection}>
          {/* 云彩图层 */}
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
