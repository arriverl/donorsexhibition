import { useState, useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Navbar.module.css'

const navItems = [
  { id: 'hero', label: '首页' },
  { id: 'prologue', label: '序章' },
  { id: 'chapter-1', label: '第一单元' },
  { id: 'chapter-2', label: '第二单元' },
  { id: 'chapter-3', label: '第三单元' },
  { id: 'chapter-4', label: '第四单元' },
  { id: 'epilogue', label: '结语' },
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero')
  const isNavigating = useRef(false)

  const handleNavClick = (e, sectionId) => {
    e.preventDefault()

    // 设置导航状态，避免滚动监听器干扰
    isNavigating.current = true

    const element = document.getElementById(sectionId)
    if (element) {
      try {
        // 强制跳转逻辑：
        // 1. 临时禁用所有 ScrollTrigger
        // 2. 移除所有 pinning
        // 3. 清除固定样式
        // 4. 跳转
        // 5. 恢复

        const triggers = ScrollTrigger.getAll()

        // 保存 pinned elements 的原始样式
        const pinnedStyles = new Map()

        triggers.forEach(trigger => {
          if (trigger.pin && trigger.pin !== true) {
            const pin = trigger.pin
            if (pin instanceof HTMLElement) {
              // 保存原始样式
              pinnedStyles.set(pin, {
                position: pin.style.position,
                top: pin.style.top,
                left: pin.style.left,
                transform: pin.style.transform,
                zIndex: pin.style.zIndex,
              })
              // 临时移除固定样式
              pin.style.position = ''
              pin.style.top = ''
              pin.style.left = ''
              pin.style.transform = ''
              pin.style.zIndex = ''
            }
          }
          // 禁用 trigger
          trigger.disable()
        })

        // 清除 body 固定样式
        const bodyStyles = {
          position: document.body.style.position,
          overflow: document.body.style.overflow,
          height: document.body.style.height,
        }
        document.body.style.position = ''
        document.body.style.overflow = ''
        document.body.style.height = ''

        // 强制跳转到对应章节
        element.scrollIntoView()

        // 立即更新当前激活章节
        setActiveSection(sectionId)

        // 等待跳转完成后恢复所有状态
        setTimeout(() => {
          // 恢复 body 样式
          document.body.style.position = bodyStyles.position
          document.body.style.overflow = bodyStyles.overflow
          document.body.style.height = bodyStyles.height

          // 恢复 pinned elements 样式
          pinnedStyles.forEach((styles, element) => {
            element.style.position = styles.position
            element.style.top = styles.top
            element.style.left = styles.left
            element.style.transform = styles.transform
            element.style.zIndex = styles.zIndex
          })

          // 重新启用所有 triggers
          triggers.forEach(trigger => {
            try {
              trigger.enable()
            } catch (err) {
              console.warn('Failed to re-enable ScrollTrigger:', err)
            }
          })

          // 刷新 ScrollTrigger
          try {
            ScrollTrigger.refresh()
          } catch (err) {
            console.warn('Failed to refresh ScrollTrigger:', err)
          }

          // 恢复导航状态
          isNavigating.current = false
        }, 300)
      } catch (err) {
        console.warn('ScrollTrigger navigation error:', err)
        // 如果出错，直接跳转
        element.scrollIntoView()
        setActiveSection(sectionId)
        isNavigating.current = false
      }
    } else {
      isNavigating.current = false
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      // 如果正在导航中，跳过滚动监听
      if (isNavigating.current) return

      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id),
      }))

      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.element) {
          const rect = section.element.getBoundingClientRect()
          if (rect.top <= scrollPosition) {
            setActiveSection(section.id)
            break
          }
        }
      }
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
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}