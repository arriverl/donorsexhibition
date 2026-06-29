import { useState, useEffect, useLayoutEffect, useCallback } from 'react'
import './App.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Hero, Prologue, Chapter1, Chapter2, Chapter3, Chapter4, Epilogue } from './sections'
import Navbar from './components/Navbar'
import Preloader from './components/Preloader'

gsap.registerPlugin(ScrollTrigger)

function Divider() {
  return <div className="section-divider" />
}

export default function App() {
  const [showNavbar, setShowNavbar] = useState(false)
  // 是否已通过”进入展览”按钮进入展览。未进入前锁定滚动，仅显示首页。
  const [entered, setEntered] = useState(false)
  // 资源是否加载完毕
  const [loaded, setLoaded] = useState(false)
  // 结语"点击了解更多"是否已点击，控制第四单元是否可访问
  const [chapter4Unlocked, setChapter4Unlocked] = useState(false)

  // 确保页面加载时滚动到顶部
  useEffect(() => {
    // 立即滚动到顶部
    window.scrollTo(0, 0)
    // 再次确保，防止其他效果干扰
    const timer = setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // 在未加载完毕或未进入展览前锁定滚动
  useLayoutEffect(() => {
    const html = document.documentElement
    const body = document.body
    if (!loaded || !entered) {
      html.style.overflow = 'hidden'
      body.style.overflow = 'hidden'
      body.style.height = '100dvh'
    } else {
      html.style.overflow = ''
      body.style.overflow = ''
      body.style.height = ''
    }
    return () => {
      html.style.overflow = ''
      body.style.overflow = ''
      body.style.height = ''
    }
  }, [loaded, entered])

  // 横竖屏切换 / 窗口缩放时刷新 ScrollTrigger 布局
  useEffect(() => {
    let timer
    const refresh = () => {
      clearTimeout(timer)
      timer = setTimeout(() => ScrollTrigger.refresh(), 200)
    }
    window.addEventListener('resize', refresh)
    window.addEventListener('orientationchange', refresh)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', refresh)
      window.removeEventListener('orientationchange', refresh)
    }
  }, [entered, loaded, chapter4Unlocked])

  const handleEnter = useCallback(() => {
    // 解锁滚动
    setEntered(true)
    // 解锁后即时跳转到序章第一个页面（而非平滑滚动，避免过渡过程中触发圆盘动画）
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const prologue = document.getElementById('prologue')
        if (!prologue) return

        // 跳转前临时禁用所有 ScrollTrigger，防止跳转过程触发序章圆盘旋转
        const triggers = ScrollTrigger.getAll()
        triggers.forEach((t) => {
          try { t.disable() } catch (e) { /* ignore */ }
        })

        // 即时跳转到序章顶部（序章第一个页面）
        // 临时覆盖 CSS 的 scroll-behavior: smooth，确保是即时跳转而非平滑滚动
        const html = document.documentElement
        const prevBehavior = html.style.scrollBehavior
        html.style.scrollBehavior = 'auto'
        const targetY = prologue.getBoundingClientRect().top + window.scrollY
        window.scrollTo(0, targetY)
        html.style.scrollBehavior = prevBehavior

        // 跳转完成后恢复 ScrollTrigger 并刷新
        setTimeout(() => {
          triggers.forEach((t) => {
            try { t.enable() } catch (e) { /* ignore */ }
          })
          ScrollTrigger.refresh()
        }, 60)
      })
    })
  }, [])

  const handleChapter4Unlock = useCallback(() => {
    setChapter4Unlocked(true)
    // 等 Chapter4 渲染 + ScrollTrigger 刷新后，平滑滚动到第四单元
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        const ch4 = document.getElementById('chapter-4')
        if (ch4) {
          const targetY = ch4.getBoundingClientRect().top + window.scrollY
          window.scrollTo({ top: targetY, behavior: 'smooth' })
        }
      })
    })
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('hero')
      const prologue = document.getElementById('prologue')

      if (hero && prologue) {
        const heroRect = hero.getBoundingClientRect()
        const prologueRect = prologue.getBoundingClientRect()

        // 当 Prologue 进入视口时显示导航栏
        if (prologueRect.top <= 100) {
          setShowNavbar(true)
        } else {
          setShowNavbar(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // 初始检查

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      {showNavbar && <Navbar />}
      <main className="exhibition">
        <Hero onEnter={handleEnter} />
        <Prologue />
        {entered && (
          <>
            <Chapter1 />
            <Divider />
            <Chapter2 />
            <Divider />
            <Chapter3 />
            <Divider />
            <Epilogue onUnlock={handleChapter4Unlock} />
            {chapter4Unlocked && (
              <>
                <Divider />
                <Chapter4 />
              </>
            )}
          </>
        )}
      </main>
    </>
  )
}
