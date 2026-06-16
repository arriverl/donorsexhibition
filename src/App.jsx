import { useState, useEffect, useLayoutEffect, useCallback } from 'react'
import './App.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Hero, Prologue, Chapter1, Chapter2, Chapter3, Chapter4, Epilogue } from './sections'
import Navbar from './components/Navbar'

gsap.registerPlugin(ScrollTrigger)

function Divider() {
  return <div className="section-divider" />
}

export default function App() {
  const [showNavbar, setShowNavbar] = useState(false)
  // 是否已通过“进入展览”按钮进入展览。未进入前锁定滚动，仅显示首页。
  const [entered, setEntered] = useState(false)

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

  // 在未进入展览前锁定滚动，保证首页是用户第一个看到且唯一可见的内容
  useLayoutEffect(() => {
    const html = document.documentElement
    const body = document.body
    if (!entered) {
      html.style.overflow = 'hidden'
      body.style.overflow = 'hidden'
      body.style.height = '100vh'
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
  }, [entered])

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
            <Chapter4 />
            <Divider />
            <Epilogue />
          </>
        )}
      </main>
    </>
  )
}
