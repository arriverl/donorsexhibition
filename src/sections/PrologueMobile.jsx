import styles from './PrologueMobile.module.css'
import { timelineData } from './prologueData'

export default function PrologueMobile() {
  const periods = timelineData.filter((d) => !d.notice && !d.intro)

  return (
    <section
      id="prologue"
      className={styles.prologue}
      data-section="prologue"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.badge}>序章</span>
          <h2 className={styles.heading}>敦煌阴氏</h2>
        </header>

        <div className={styles.intro}>
          {timelineData[0].intro.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        <p className={styles.hint}>向下滚动，浏览各时期代表洞窟</p>

        <ol className={styles.timeline}>
          {periods.map((item) => (
            <li key={item.period} className={styles.timelineItem}>
              <div className={styles.dot} aria-hidden />
              <div className={styles.timelineBody}>
                <h3 className={styles.period}>{item.period}</h3>
                {item.caves && (
                  <div className={styles.cavesBlock}>
                    <span className={styles.cavesLabel}>代表洞窟</span>
                    <p className={styles.cavesList}>{item.caves}</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.crossSection}>
        <img
          src="/picture/prologue/横截面.png"
          alt="洞窟横截面"
          className={styles.crossSectionImg}
        />
      </div>
    </section>
  )
}
