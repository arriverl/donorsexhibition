import { useState, useEffect, useRef } from 'react'
import styles from './Navbar.module.css'

const navItems = [
  { id: 'hero', label: '首页', shortLabel: '首页' },
  { id: 'prologue', label: '序章', shortLabel: '序章' },
  { id: 'chapter-1', label: '第一单元', shortLabel: '一' },
  { id: 'chapter-2', label: '第二单元', shortLabel: '二' },
  { id: 'chapter-3', label: '第三单元', shortLabel: '三' },
  { id: 'epilogue', label: '结语', shortLabel: '结语' },
  { id: 'chapter-4', label: '了解更多', shortLabel: '更多' },
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isCompact, setIsCompact] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 480 : false
  )
  const isNavigating = useRef(false)

  useEffect(() => {
    const onResize = () => setIsCompact(window.innerWidth <= 480)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleNavClick = (e, sectionId) => {
    e.preventDefault()

    const element = document.getElementById(sectionId)
    if (!element) return

    // 设置导航状态，避免滚动监听器在跳转过程中覆盖当前单元
    isNavigating.current = true
    // 立即更新激活单元，反馈即时
    setActiveSection(sectionId)

    // 关键：在「保留所有 pin spacer 的当前布局」下计算目标位置。
    // 每个 <section> 的顶部正好对齐该单元首页（含"单元标题"图片的场景）的顶部，
    // 因此滚动到 section 的文档绝对位置即可精准落在单元首页。
    // 切勿在此前禁用 ScrollTrigger——禁用会令 pin spacer 收缩、整页布局错位，
    // 导致计算出的目标位置失真，跳转后落在错误页面。
    const targetY = element.getBoundingClientRect().top + window.scrollY

    // 全局 CSS 设了 scroll-behavior: smooth，这里临时覆盖为即时跳转，
    // 保证一次到位地停在单元首页，而非平滑滚动途中被 pin 动画带偏。
    const html = document.documentElement
    const prevBehavior = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto'
    window.scrollTo(0, targetY)
    html.style.scrollBehavior = prevBehavior

    // 等待 ScrollTrigger 依据新滚动位置更新各场景状态后，再恢复滚动监听。
    setTimeout(() => {
      isNavigating.current = false
    }, 250)
  }

  useEffect(() => {
    const handleScroll = () => {
      // 如果正在导航中，跳过滚动监听
      if (isNavigating.current) return

      // 取视口顶部偏下一点作为判定线：当某单元首页顶部越过该线时，
      // 即认为用户已进入该单元区域。这样导航栏能忠实反映当前所在单元。
      const checkPoint = window.scrollY + window.innerHeight * 0.35

      // 逐个比较各单元在文档中的绝对顶部位置（rect.top 已含 pin spacer 布局，
      // 加回 scrollY 还原为文档绝对坐标），最后一个顶部不超过判定线的单元即为当前单元。
      let current = navItems[0].id
      for (const item of navItems) {
        const el = document.getElementById(item.id)
        if (!el) continue
        const docTop = el.getBoundingClientRect().top + window.scrollY
        if (docTop <= checkPoint) {
          current = item.id
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li key={item.id} className={styles.navItem}>
            <a
              href={`#${item.id}`}
              className={`${styles.navLink} ${activeSection === item.id ? styles.navLinkActive : ''}`}
              onClick={(e) => handleNavClick(e, item.id)}
            >
              {isCompact ? item.shortLabel : item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}