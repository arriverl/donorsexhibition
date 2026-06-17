import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hotspot from '../components/Hotspot'
import ExhibitPanel from '../components/ExhibitPanel'
import styles from './Chapter2.module.css'

gsap.registerPlugin(ScrollTrigger)

// Exhibit data
const exhibits = {
  shiChongji: {
    title: '史崇姬像',
    subtitle: '西魏 第285窟',
    description: '史崇姬为粟特人，穿汉式对襟大袖襦裙，体现了胡人汉服的文化交融现象。作为敦煌阴氏的重要女性成员，她的服饰展现了西魏时期敦煌地区多元文化的融合。',
  },
  yinAnGui: {
    title: '阴安归像',
    subtitle: '西魏 第285窟',
    description: '阴安归为汉人，却穿胡式圆领窄袖袍，反映了汉人穿胡服的文化交流趋势。这种服饰转变体现了敦煌作为丝路重镇的文化开放与包容。',
  },
  zhangYichao: {
    title: '张议潮及其儿子、女婿供养像',
    subtitle: '位于第156窟主室西壁龛下',
    description: '阴氏族人阴文通跟随张议潮参加了从起义到收复凉州所有大的战役，娶张议潮女为妻，后阴氏家族又嫁女张议潮之子张淮鼎。',
  },
  yinLady: {
    title: '阴氏郡君太夫人供养像',
    subtitle: '河西节度使张公夫人',
    description: '题记内容为"河西节度使张公夫人后敕授武威郡君太夫人阴氏一心供养"，位于主室北壁下部，西起第十二身供养人像旁。"河西节度使张公"所指的对象，学界主要有两种观点：一说为张淮深的夫人，另一说为张淮鼎的夫人。但可以确定的是，题记中的"太夫人阴氏"是一位嫁入归义军张氏家族的阴家女性。',
  },
}

export default function Chapter2() {
  const openingSceneRef = useRef(null)
  const portraitLeftRef = useRef(null)
  const portraitRightRef = useRef(null)
  const titleOverlayRef = useRef(null)
  const introTextRef = useRef(null)
  const historyTextRef = useRef(null)
  const leftHotspotRef = useRef(null)
  const rightHotspotRef = useRef(null)
  const leftPortraitImgRef = useRef(null)
  const rightPortraitImgRef = useRef(null)
  const zhangContainerRef = useRef(null)
  const zhangHotspotRef = useRef(null)
  const yinLadyRef = useRef(null)
  const yinLadySectionRef = useRef(null)
  const yinLadyHotspotRef = useRef(null)
  const [activePanel, setActivePanel] = useState(null)

  const togglePanel = (id) => {
    setActivePanel((prev) => (prev === id ? null : id))
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Opening scene animation - portraits slide in from sides
      gsap.set(portraitLeftRef.current, { xPercent: -100, opacity: 0 })
      gsap.set(portraitRightRef.current, { xPercent: 100, opacity: 0 })
      gsap.set(titleOverlayRef.current, { y: 0, opacity: 1 })
      gsap.set(introTextRef.current, { y: 150, opacity: 0 })

      // Set initial image states for smooth animation
      if (leftPortraitImgRef.current && rightPortraitImgRef.current) {
        gsap.set(leftPortraitImgRef.current, { scale: 1, y: 0, force3D: true })
        gsap.set(rightPortraitImgRef.current, { scale: 1, y: 0, force3D: true })
        console.log('Image refs set:', leftPortraitImgRef.current, rightPortraitImgRef.current)
      } else {
        console.log('Image refs not available')
      }

      // Wait for refs to be available, then set hotspot initial state
      setTimeout(() => {
        if (leftHotspotRef.current && rightHotspotRef.current) {
          gsap.set([leftHotspotRef.current, rightHotspotRef.current], { opacity: 0, scale: 0.5 })
        }
      }, 0)

      const openingTl = gsap.timeline({
        scrollTrigger: {
          trigger: openingSceneRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      })

      openingTl
        .to(portraitLeftRef.current, { xPercent: 0, opacity: 1, duration: 1, ease: 'power2.out' })
        .to(portraitRightRef.current, { xPercent: 0, opacity: 1, duration: 1, ease: 'power2.out' }, '<')

      // Credits-style animation with page pin: title moves up, portraits shrink, then intro text scrolls in
      const creditsTl = gsap.timeline({
        scrollTrigger: {
          trigger: openingSceneRef.current,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: 1,
          pinSpacing: true,
        },
      })

      creditsTl
        // 第一段文字平滑向上消失
        .to(titleOverlayRef.current, {
          y: -window.innerHeight * 0.4,
          opacity: 0,
          duration: 1,
          ease: 'power2.in'
        })
        // 同时缩小人像图片，显示全图
        .to(leftPortraitImgRef.current, {
          scale: 0.5,
          y: -20,
          duration: 1.2,
          ease: 'power2.out',
          force3D: true
        }, '<0.3')
        .to(rightPortraitImgRef.current, {
          scale: 0.5,
          y: -20,
          duration: 1.2,
          ease: 'power2.out',
          force3D: true
        }, '<0.3')
        // 显示交互点
        .to([leftHotspotRef.current, rightHotspotRef.current], {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.1
        }, '>')
        // 第一段文字从下方平滑浮现
        .to(introTextRef.current, {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out'
        })
        // 第一段文字上移消失
        .to(introTextRef.current, {
          y: -100,
          opacity: 0,
          duration: 1,
          ease: 'power2.in'
        })

      // 历史文本渐入动画（页面解锁后立即显示）
      if (historyTextRef.current) {
        gsap.fromTo(
          historyTextRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: historyTextRef.current,
              start: 'bottom 100%',
              end: 'bottom 80%',
              scrub: 1,
            },
          }
        )
      }

      // 张议潮图片随滚动下划浮现（在文本完全显示后）
      if (zhangContainerRef.current && historyTextRef.current) {
        gsap.fromTo(
          zhangContainerRef.current,
          {
            y: 150,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: historyTextRef.current,
              start: 'bottom 100%',
              end: 'bottom 60%',
              scrub: 1,
            },
          }
        )
      }

      // 阴氏郡君太夫人走动动画（从右向左跨越整个屏幕，完全可见）
      if (yinLadyRef.current && yinLadySectionRef.current && yinLadyHotspotRef.current) {
        // 初始隐藏交互点
        gsap.set(yinLadyHotspotRef.current, {
          opacity: 0,
          scale: 0.5
        })

        // 标志，确保交互点只显示一次
        let hotspotShown = false

        // 等待图像加载完成后设置起始位置
        const updatePosition = () => {
          const imageWidth = yinLadyRef.current?.offsetWidth || 0
          if (imageWidth > 0) {
            // 起始位置：让图像靠右完全可见
            const startX = window.innerWidth - imageWidth
            // 结束位置：图像靠左完全可见
            const endX = 0

            gsap.set(yinLadyRef.current, {
              x: startX,
              opacity: 1
            })

            // 创建动画：从右侧移动到左侧，禁用倒放
            gsap.to(yinLadyRef.current, {
              x: endX,
              opacity: 1,
              duration: 3,
              ease: 'none',
              scrollTrigger: {
                trigger: yinLadySectionRef.current,
                start: 'top top',
                end: '+=600%',
                pin: true,
                scrub: 1,
                pinSpacing: true,
                // 禁用倒放
                once: true,
                // 监听进度，动画接近完成时显示交互点
                onUpdate: (self) => {
                  if (!hotspotShown && self.progress >= 0.98) {
                    hotspotShown = true
                    const hotspotTop = '20vh'
                    const hotspotLeft = `${imageWidth * 0.8}px`
                    gsap.set(yinLadyHotspotRef.current, { top: hotspotTop, left: hotspotLeft })
                    gsap.to(yinLadyHotspotRef.current, {
                      opacity: 1,
                      scale: 1,
                      duration: 0.3,
                      ease: 'back.out(1.7)'
                    })
                  }
                },
              },
            })
          }
        }

        // 等待图像加载
        if (yinLadyRef.current.complete) {
          updatePosition()
        } else {
          yinLadyRef.current.onload = updatePosition
        }
      }

    }, openingSceneRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="chapter-2" className={`${styles.chapter2} section--chapter-2`} data-section="chapter-2">
      {/* Opening scene - dual portrait display with pinned animation */}
      <div ref={openingSceneRef} className={styles.openingScene}>
        <div className={styles.portraits}>
          <div ref={portraitLeftRef} className={`${styles.portrait} ${styles.portraitLeft}`}>
            <img ref={leftPortraitImgRef} src="/picture/chap2/史崇姬像.png" alt="史崇姬像" style={{ width: '580px' }} />
            <div className={styles.hotspotWrapper}>
              <Hotspot
                ref={leftHotspotRef}
                x={25}
                y={15}
                active={activePanel === 'shiChongji'}
                onClick={() => togglePanel('shiChongji')}
              />
            </div>
          </div>
          <div ref={portraitRightRef} className={`${styles.portrait} ${styles.portraitRight}`}>
            <img ref={rightPortraitImgRef} src="/picture/chap2/阴安归像.png" alt="阴安归像" style={{ width: '500px' }} />
            <div className={styles.hotspotWrapper}>
              <Hotspot
                ref={rightHotspotRef}
                x={75}
                y={15}
                active={activePanel === 'yinAnGui'}
                onClick={() => togglePanel('yinAnGui')}
              />
            </div>
          </div>
        </div>

        <div ref={titleOverlayRef} className={styles.titleOverlay}>
          <img className={styles.chapterTitle} src="/picture/chap2/单元标题2.png" alt="族姻交汇" style={{ height: '40vh', width: 'auto' }} />
          <p className={styles.chapterSubtitle}>通丝路、连族群、结姻亲、融风尚——五百年间，敦煌阴氏以联姻织就文明纽带。<br />本单元以供养人画像为引，追溯阴氏与粟特、世家的通婚脉络，并从中窥见丝路族群交融的日常与深度。</p>
        </div>

        <div ref={introTextRef} className={styles.introText}>
          <p className={styles.introLine}>胡人穿汉服，汉人穿胡服。</p>
          <p className={styles.introDetail}>史崇姬（粟特人）穿的是汉式对襟大袖襦裙；</p>
          <p className={styles.introDetail}>阴安归（汉人）穿的却是胡式圆领窄袖袍。</p>
          <p className={styles.introLine}>西魏敦煌，文化从来不是单向的。</p>
        </div>

        {/* Exhibit panels */}
        <ExhibitPanel
          title={exhibits.shiChongji.title}
          subtitle={exhibits.shiChongji.subtitle}
          description={exhibits.shiChongji.description}
          visible={activePanel === 'shiChongji'}
          onClose={() => setActivePanel(null)}
        />
        <ExhibitPanel
          title={exhibits.yinAnGui.title}
          subtitle={exhibits.yinAnGui.subtitle}
          description={exhibits.yinAnGui.description}
          visible={activePanel === 'yinAnGui'}
          onClose={() => setActivePanel(null)}
        />
      </div>

      {/* Content area */}
      <div className="section section--chapter-2 relative" style={{ minHeight: '180vh', padding: '0 var(--section-padding-x)' }}>
        <div className="section__inner relative" style={{ zIndex: 20, position: 'relative', paddingTop: '2vh' }}>
          <div ref={historyTextRef} className={styles.historyText}>
            <p>大中二年，沙州豪杰张议潮举义旗，逐吐蕃，复河西，归义军由此而立。阴氏家族则以三代联姻，步步为营。先与张议潮家族结为姻亲，再与曹氏归义军世代通婚，先为内亲，后成母族。石窟，不惟礼佛，亦是家谱。</p>
          </div>
        </div>

        {/* 图片容器 */}
        <div
          ref={zhangContainerRef}
          style={{
            position: 'absolute',
            bottom: '0vh',
            right: '5vw',
            width: '50vw',
            maxWidth: 'none',
            zIndex: 10
          }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <img
              src="/picture/chap2/张议潮及其儿子女婿（抠图）.PNG"
              alt="张议潮及其儿子女婿"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.15))'
              }}
            />
            {/* 交互点 */}
            <Hotspot
              ref={zhangHotspotRef}
              x={15}
              y={20}
              active={activePanel === 'zhangYichao'}
              onClick={() => togglePanel('zhangYichao')}
            />

            {/* 张议潮展品面板 */}
            <ExhibitPanel
              title={exhibits.zhangYichao.title}
              subtitle={exhibits.zhangYichao.subtitle}
              description={exhibits.zhangYichao.description}
              visible={activePanel === 'zhangYichao'}
              onClose={() => setActivePanel(null)}
            />
          </div>
        </div>
      </div>

      {/* 阴氏郡君太夫人走动区域 - 在张议潮图片下方 */}
      <div ref={yinLadySectionRef} className="section section--chapter-2 relative" style={{ minHeight: '100vh', height: '100vh', overflow: 'hidden' }}>
        <img
          ref={yinLadyRef}
          src="/picture/chap2/阴氏郡君太夫人（抠图）.PNG"
          alt="阴氏郡君太夫人"
          style={{
            position: 'absolute',
            top: '15vh',
            left: 0,
            width: 'auto',
            height: '70vh',
            objectFit: 'contain',
            filter: 'drop-shadow(0 5px 20px rgba(0,0,0,0.15))'
          }}
        />
        {/* 交互点 - 在图像右上方，位置在动画结束后动态设置 */}
        <div ref={yinLadyHotspotRef} style={{ position: 'absolute', zIndex: 30 }}>
          <Hotspot
            x={0}
            y={0}
            active={activePanel === 'yinLady'}
            onClick={() => togglePanel('yinLady')}
          />
        </div>
        {/* 阴氏郡君展品面板 */}
        <ExhibitPanel
          title={exhibits.yinLady.title}
          subtitle={exhibits.yinLady.subtitle}
          description={exhibits.yinLady.description}
          visible={activePanel === 'yinLady'}
          onClose={() => setActivePanel(null)}
        />
      </div>
    </section>
  )
}
