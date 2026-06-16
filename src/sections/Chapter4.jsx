import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Chapter4.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function Chapter4() {
  const openingSceneRef = useRef(null)
  const descriptionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 初始状态设置
      gsap.set(descriptionRef.current, { y: 50, opacity: 0 })

      // 说明文本从下方滑入
      gsap.to(descriptionRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: openingSceneRef.current,
          start: 'top 50%',
          end: 'top 30%',
          scrub: 1,
        },
      })
    }, openingSceneRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="chapter-4" className={`${styles.chapter4} section--chapter-4`} data-section="chapter-4">
      {/* 开场场景 */}
      <div ref={openingSceneRef} className={styles.openingScene}>
        {/* 标题图片 */}
        <div className={styles.titleImageContainer}>
          <img
            src="/picture/chap4/单元标题4.png"
            alt="第四单元标题"
            className={styles.titleImage}
          />
        </div>

        {/* 说明文本 */}
        <div ref={descriptionRef} className={styles.descriptionSection}>
          <p className={styles.descriptionText}>
            攀姻援、跻仕途、遭迁徙、没踪迹，西夏破敦煌，当地的人口被迫迁往河西走廊，而曾经盛极一时的阴氏家族，终在迁徙浪潮中没入中原。
            然而，敦煌还在那里。遭流散、历劫波、启学脉、护遗珍，藏经洞开，文物流散，敦煌在失落中迎来新生。<br />
            本单元回望文物远徙、学脉肇兴、守护传承之路，见证文明在沧桑中永续。
          </p>
        </div>
      </div>
    </section>
  )
}
