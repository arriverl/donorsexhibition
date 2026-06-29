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
  caoLady: {
    title: '曹氏家族女供养人',
    subtitle: '五代曹氏归义军时期 第61窟',
    description: '从左往右依次为回鹘天公主、甘州回鹘天公主、于阗皇后、广平宋氏，回鹘天公主与曹议金一女"出适阴氏"，由此引出曹氏归义军和阴氏家族。',
  },
}

export default function Chapter2() {
  const marriageFamilyCards = ['曹氏归义军联姻家族', '翟氏', '张氏', '罗氏', '阴氏', '回鹘', '索氏', '于阗', '宋氏']
  const marriageFamilyImages = [
    { src: '/picture/chap2/武威郡夫人.png', alt: '武威郡夫人', title: '武威郡夫人',
      cardSrc: '/picture/chap2/威武郡夫人像展品卡片.jpg',
      desc: '五代曹氏归义军时期 第61窟 “故伯母武威郡夫人阴氏”供养像\n位于莫高窟第61窟东壁门北侧第八身，该画像右侧第一身，榜题“故伯母武威郡夫人阴氏”。\n“武威郡” 为阴氏郡望标识，印证墓主出身敦煌阴氏望族。' },
    { src: '/picture/chap2/61窟外甥小娘子阴氏一心供养 (2).png', alt: '61窟外甥小娘子阴氏一心供养', title: '外甥小娘子阴氏',
      cardSrc: '/picture/chap2/外甥小娘子阴氏供养像.jpg',
      desc: '五代曹氏归义军时期 第61窟 “外甥小娘子阴氏”供养像\n位于莫高窟61窟东壁门北侧第八身，该画像右侧第一身。\n“外甥”说明此阴氏为曹氏外戚，是曹氏宗室女子嫁入阴氏所生之女。依托曹阴联姻的家世得以入画，和同窟武威郡夫人阴氏互为补充，印证两家长期通婚结盟。' },
    { src: '/picture/chap2/ai延萌.png', src2: '/picture/chap2/ai延胜.png', alt: '延萌与延胜', title: '延萌与延胜', desc: '五代曹氏归义军时期 第98窟 “出适阴氏”小娘子供养像 \n位于莫高窟第 98 窟。曹议金之女延萌、延胜供养画像，榜题题记标注 “出适阴氏”，意为两位曹氏千金嫁入阴家。这则壁画文字是五代沙州曹氏、阴氏两大望族缔结姻亲的直接实物佐证，印证了归义军时代豪门依靠联姻稳固势力、互通联盟的地方社会特征。', combined: true, cardSrc: '/picture/chap2/延萌延胜展品卡片.jpg' },
    { src: '/picture/chap2/阴子升.png', alt: '阴子升', title: '阴子升',
      cardSrc: '/picture/chap2/12、河西督僧统抠图版.png',
      desc: '五代曹氏归义军时期 P.3720 敦煌文书 《河西都僧统阴海晏墓志铭并序》\n志文载明阴海晏出任河西都僧统，是五代沙州佛教最高统领，总领河西僧团教务，为曹氏归义军倚重的佛门领袖。墓志与莫高窟98窟供养题记相互印证，完整记录阴氏祖孙两代接连与曹氏联姻：阴海晏一辈，曹议金将女儿延胜、延萌出嫁阴氏；阴海晏之孙阴子升迎娶曹议金第十三女，两代姻亲层层绑定。\n曹氏通过两代婚嫁笼络敦煌老牌望族阴氏，既以宗室女缔结世俗宗族盟约，又借阴海晏执掌僧权掌控全境佛教势力。' },
    { src: '/picture/chap2/阴善雄.png', alt: '阴善雄', title: '阴善雄',
      cardSrc: '/picture/chap2/13.P.2482阴善雄墓志铭抠图版.png',
      desc: '五代曹氏归义军时期 P.2482 敦煌文书 《阴善雄墓志铭》\n本卷为是五代敦煌阴氏望族核心一手文献。\n墓主阴善雄出身敦煌顶级阴氏宗族，为曹议金妹夫（曹议金胞姊嫁阴善雄），是曹氏初代联姻阴氏的关键人物。墓志载明其官衔：归义军节度使内亲从都头、守常乐县令、银青光禄大夫、检校国子祭酒兼御史大夫、上柱国，身居归义军藩镇要职，执掌常乐县地方军政，是曹议金倚重的心腹地方大员。\n图源：敦煌研究院官网' },
  ]

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
  const yinLadyWrapRef = useRef(null)
  const zhangYinSectionRef = useRef(null)
  const yinLadyHotspotRef = useRef(null)
  const caoLadyContainerRef = useRef(null)
  const caoLadyDocRef = useRef(null)
  const marriageFamilySectionRef = useRef(null)
  const yinXiaoNiangZiRef = useRef(null)
  const marriageFamilyBottomRef = useRef(null)
  const marriageFamilyCardsLayerRef = useRef(null)
  const marriageFamilyOverlayLayerRef = useRef(null)
  const marriageFamilyImageStageRef = useRef(null)
  const yinFamilyCardRef = useRef(null)
  const glowTweenRef = useRef(null)
  const glowPlayedRef = useRef(false)
  const [activePanel, setActivePanel] = useState(null)
  const [activeFigure, setActiveFigure] = useState(null)

  const togglePanel = (id) => {
    setActivePanel((prev) => (prev === id ? null : id))
  }

  useEffect(() => {
    if (activeFigure === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setActiveFigure(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeFigure])

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

      // 张议潮 + 阴氏郡君太夫人 合并展项：pin → 文本浮现 → 张议潮浮现 → 郡君夫人从右侧走入左侧
      if (zhangYinSectionRef.current && zhangContainerRef.current && yinLadyWrapRef.current && yinLadyHotspotRef.current) {
        gsap.set(historyTextRef.current, { opacity: 0, y: 20 })
        gsap.set(zhangContainerRef.current, { y: 150, opacity: 0 })
        gsap.set(yinLadyWrapRef.current, { x: () => window.innerWidth, opacity: 0 })
        gsap.set(yinLadyHotspotRef.current, { opacity: 0, scale: 0.5 })

        let yinHotspotShown = false

        const zhangYinTl = gsap.timeline({
          scrollTrigger: {
            trigger: zhangYinSectionRef.current,
            start: 'top top',
            end: '+=500%',
            pin: true,
            scrub: 1,
            pinSpacing: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (!yinHotspotShown && self.progress >= 0.9) {
                yinHotspotShown = true
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

        zhangYinTl
          // 历史文本浮现
          .to(historyTextRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' })
          // 张议潮浮现
          .to(zhangContainerRef.current, { y: 0, opacity: 1, duration: 1.5, ease: 'power2.out' })
          // 阴氏郡君太夫人从右侧走入左侧
          .to(yinLadyWrapRef.current, { x: 0, opacity: 1, duration: 3, ease: 'none' })
          // 短暂停留
          .to({}, { duration: 0.5 })

        // 图片加载完成后刷新
        const refreshOnLoad = () => ScrollTrigger.refresh()
        if (yinLadyRef.current?.complete) {
          refreshOnLoad()
        } else if (yinLadyRef.current) {
          yinLadyRef.current.addEventListener('load', refreshOnLoad, { once: true })
        }
      }

      // 曹氏家族女供养人组渐入动画
      if (caoLadyContainerRef.current) {
        gsap.fromTo(
          caoLadyContainerRef.current,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: caoLadyContainerRef.current,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        )
      }

      // 曹氏归义军联姻家族展项 pinned 交互
      if (
        marriageFamilySectionRef.current &&
        yinXiaoNiangZiRef.current &&
        marriageFamilyBottomRef.current &&
        marriageFamilyCardsLayerRef.current &&
        marriageFamilyOverlayLayerRef.current &&
        marriageFamilyImageStageRef.current &&
        yinFamilyCardRef.current
      ) {
        gsap.set(yinXiaoNiangZiRef.current, { opacity: 1, y: 0 })
        gsap.set(marriageFamilyOverlayLayerRef.current, { yPercent: 0 })
        gsap.set(marriageFamilyCardsLayerRef.current, { autoAlpha: 1, y: 0, scale: 1 })
        gsap.set(marriageFamilyImageStageRef.current, { autoAlpha: 0, xPercent: 8 })
        gsap.set(yinFamilyCardRef.current, {
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
          borderColor: 'rgba(60, 44, 30, 0.18)',
          filter: 'brightness(1)',
        })

        glowTweenRef.current?.kill()
        glowTweenRef.current = gsap.timeline({ paused: true })
          .to(yinFamilyCardRef.current, {
            boxShadow: '0 0 34px rgba(255, 228, 130, 0.95), 0 0 70px rgba(255, 188, 70, 0.6)',
            borderColor: 'rgba(196, 143, 32, 0.95)',
            filter: 'brightness(1.16)',
            duration: 0.5,
            ease: 'power2.out',
          })
          .to(yinFamilyCardRef.current, {
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
            borderColor: 'rgba(60, 44, 30, 0.18)',
            filter: 'brightness(1)',
            duration: 0.5,
            ease: 'power2.inOut',
          })

        const marriageFamilyTl = gsap.timeline({
          scrollTrigger: {
            trigger: marriageFamilySectionRef.current,
            start: 'top top',
            end: '+=500%',
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (self.progress >= 0.56 && !glowPlayedRef.current) {
                glowPlayedRef.current = true
                glowTweenRef.current?.restart()
              }
              if (self.progress < 0.56) {
                glowPlayedRef.current = false
                glowTweenRef.current?.pause(0)
                gsap.set(yinFamilyCardRef.current, {
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
                  borderColor: 'rgba(60, 44, 30, 0.18)',
                  filter: 'brightness(1)',
                })
              }
            },
          },
        })

        marriageFamilyTl
          .to(marriageFamilyOverlayLayerRef.current, {
            yPercent: -100,
            duration: 5.5,
            ease: 'none',
          })
          .to({}, { duration: 1.4 })
          .to(marriageFamilyCardsLayerRef.current, {
            autoAlpha: 0,
            y: -20,
            scale: 0.985,
            duration: 1.2,
            ease: 'power2.out',
          })
          .to(marriageFamilyImageStageRef.current, {
            autoAlpha: 1,
            xPercent: 0,
            duration: 1.8,
            ease: 'power2.out',
          }, '<0.15')
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

      {/* 张议潮 + 阴氏郡君太夫人 walk-in（合并展项） */}
      <div ref={zhangYinSectionRef} style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        {/* 历史文本 - 置于合并区域顶部 */}
        <div ref={historyTextRef} className={styles.historyText} style={{ position: 'absolute', top: '10vh', left: 0, right: 0, zIndex: 20 }}>
          <p>大中二年，沙州豪杰张议潮举义旗，逐吐蕃，复河西，归义军由此而立。阴氏家族则以三代联姻，步步为营。先与张议潮家族结为姻亲，再与曹氏归义军世代通婚，先为内亲，后成母族。石窟，不惟礼佛，亦是家谱。</p>
        </div>
        {/* 张议潮 - 右侧 */}
        <div ref={zhangContainerRef} style={{ position: 'absolute', bottom: '0vh', right: '5vw', width: '50vw', maxWidth: 'none', zIndex: 10 }}>
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
            <Hotspot
              ref={zhangHotspotRef}
              x={15}
              y={20}
              active={activePanel === 'zhangYichao'}
              onClick={() => togglePanel('zhangYichao')}
            />
            <ExhibitPanel
              title={exhibits.zhangYichao.title}
              subtitle={exhibits.zhangYichao.subtitle}
              description={exhibits.zhangYichao.description}
              visible={activePanel === 'zhangYichao'}
              onClose={() => setActivePanel(null)}
            />
          </div>
        </div>
        {/* 阴氏郡君太夫人 - 从右侧走入，站定在张议潮左边 */}
        <div ref={yinLadyWrapRef} style={{ position: 'absolute', top: '30vh', left: 0, height: '70vh', width: 'auto' }}>
          <img
            ref={yinLadyRef}
            src="/picture/chap2/阴氏郡君太夫人（抠图）.PNG"
            alt="阴氏郡君太夫人"
            style={{
              height: '100%',
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 5px 20px rgba(0,0,0,0.15))'
            }}
          />
          <div ref={yinLadyHotspotRef} style={{ position: 'absolute', inset: 0 }}>
            <Hotspot
              x={80}
              y={20}
              active={activePanel === 'yinLady'}
              onClick={() => togglePanel('yinLady')}
            />
          </div>
        </div>
        <ExhibitPanel
          title={exhibits.yinLady.title}
          subtitle={exhibits.yinLady.subtitle}
          description={exhibits.yinLady.description}
          visible={activePanel === 'yinLady'}
          onClose={() => setActivePanel(null)}
        />
      </div>

      {/* 曹氏家族女供养人组 - 在阴氏郡君太夫人展项下方 */}
      <div className="section section--chapter-2 relative" style={{ minHeight: '100vh', height: '100vh', overflow: 'hidden', padding: '0 var(--section-padding-x)' }}>
        {/* 左侧：阴家小娘子文书（靠上）+ 文本（靠下） */}
        <div
          ref={caoLadyDocRef}
          style={{
            position: 'absolute',
            top: '8vh',
            left: '5vw',
            width: '38vw',
            maxWidth: '640px',
            zIndex: 10,
          }}
        >
          <img
            src="/picture/chap2/阴家小娘子文书.png"
            alt="阴家小娘子文书"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '46vh',
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.2))'
            }}
          />
          <div style={{ marginTop: '3vh', maxWidth: '38vw' }}>
            <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary, #2a2a2a)', lineHeight: 1.7, marginBottom: '0.8em' }}>
              五代曹氏归义军时期 S.4536 《为故小娘子小祥追福文》（斯坦敦煌手稿）
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary, #555)', lineHeight: 1.9, marginBottom: '0.8em' }}>
              英藏S.4536号敦煌汉文斋愿文书，同卷兼抄造幡文、造窟功德记三篇文书，本篇为佛教斋会追福范文实录。
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary, #555)', lineHeight: 1.9 }}>
              愿文存关键题记："于孫承作河西之舊石不待勝福欲用涯巖陰家小娘"，文中 "故父大王、国母圣天公主" 分别指代归义军节度使曹议金、回鹘天公主（曹议金回鹘正妻）；这位亡故小娘子是曹议金与回鹘天公主的亲生女儿，成年嫁入敦煌望族阴氏，故称阴家小娘，周年亡故后，曹氏亲族举办佛事斋醮、书写此愿文荐亡祈福。
            </p>
          </div>
        </div>

        {/* 右侧：曹氏家族女供养人图 */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '5vw',
            transform: 'translateY(-50%)',
            width: '45vw',
            maxWidth: '760px',
            zIndex: 10,
          }}
        >
          <div ref={caoLadyContainerRef} style={{ position: 'relative', width: '100%' }}>
            <img
              src="/picture/chap2/61窟女供养人.png"
              alt="曹氏家族女供养人"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '85vh',
                objectFit: 'contain',
                display: 'block',
                filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.2))'
              }}
            />
            {/* 交互点 */}
            <Hotspot
              x={10}
              y={20}
              active={activePanel === 'caoLady'}
              onClick={() => togglePanel('caoLady')}
            />

            {/* 曹氏家族女供养人展品面板 */}
            <ExhibitPanel
              title={exhibits.caoLady.title}
              subtitle={exhibits.caoLady.subtitle}
              description={exhibits.caoLady.description}
              visible={activePanel === 'caoLady'}
              onClose={() => setActivePanel(null)}
            />
          </div>
        </div>
      </div>

      {/* 阴家小娘子新展项 - 在61窟女供养人像与阴家小娘子文书下方 */}
      <div ref={marriageFamilySectionRef} className={`section section--chapter-2 relative ${styles.marriageFamilySection}`}>
        <div ref={yinXiaoNiangZiRef} className={styles.marriageFamilyExhibit}>
          {activeFigure !== null && marriageFamilyImages[activeFigure] ? (
            <div className={styles.marriageDetailCard} role="dialog" aria-modal="true">
              <div className={styles.marriageDetailImage}>
                {marriageFamilyImages[activeFigure].cardSrc ? (
                  <img
                    src={marriageFamilyImages[activeFigure].cardSrc}
                    alt={marriageFamilyImages[activeFigure].alt}
                  />
                ) : (
                  <>
                    <img
                      src={marriageFamilyImages[activeFigure].src}
                      alt={marriageFamilyImages[activeFigure].alt}
                    />
                    {marriageFamilyImages[activeFigure].src2 && (
                      <img
                        src={marriageFamilyImages[activeFigure].src2}
                        alt={marriageFamilyImages[activeFigure].alt}
                      />
                    )}
                  </>
                )}
              </div>
              <div className={styles.marriageDetailText}>
                <h4 className={styles.marriageDetailTitle}>
                  {marriageFamilyImages[activeFigure].title}
                </h4>
                <p className={styles.marriageDetailDesc}>
                  {marriageFamilyImages[activeFigure].desc}
                </p>
              </div>
              <button
                type="button"
                className={styles.marriageDetailClose}
                onClick={() => setActiveFigure(null)}
                aria-label="关闭"
              >
                &times;
              </button>
            </div>
          ) : (
            <div className={styles.marriageFamilyTop}>
              <div className={styles.marriageFamilyTitle}></div>
            </div>
          )}
          <div ref={marriageFamilyBottomRef} className={styles.marriageFamilyBottomViewport}>
            <div ref={marriageFamilyCardsLayerRef} className={styles.marriageFamilyBottom}>
              {marriageFamilyCards.map((item) => (
                <div
                  key={item}
                  ref={item === '阴氏' ? yinFamilyCardRef : null}
                  className={styles.marriageFamilyCard}
                >
                  <div className={styles.marriageFamilyCardText}>{item}</div>
                </div>
              ))}
            </div>

            <div ref={marriageFamilyOverlayLayerRef} className={styles.marriageFamilyOverlayLayer} aria-hidden="true">
              {marriageFamilyCards.map((item, index) => (
                <div
                  key={`${item}-overlay`}
                  className={index === 0 ? styles.marriageFamilyOverlayBlank : styles.marriageFamilyOverlayCell}
                />
              ))}
            </div>

            <div ref={marriageFamilyImageStageRef} className={styles.marriageFamilyImageStage}>
              <div className={styles.marriageFamilyImageGrid}>
                {marriageFamilyImages.map((image, idx) => (
                  <div key={image.src} className={styles.marriageFamilyImageCell} style={image.combined ? { gridColumn: 'span 2' } : undefined}>
                    <div className={styles.marriageFamilyImageWrap} style={image.combined ? { display: 'flex', gap: '1vw' } : undefined}>
                      <img
                        src={image.src}
                        alt={image.alt}
                        className={styles.marriageFamilyImage}
                      />
                      {image.src2 && (
                        <img
                          src={image.src2}
                          alt={image.alt}
                          className={styles.marriageFamilyImage}
                        />
                      )}
                      <Hotspot
                        x={image.combined ? 50 : 14}
                        y={14}
                        active={activeFigure === idx}
                        onClick={() => setActiveFigure(idx)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
