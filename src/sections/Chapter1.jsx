import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hotspot from '../components/Hotspot'
import ExhibitPanel from '../components/ExhibitPanel'
import ImagePlaceholder from '../components/ImagePlaceholder'
import styles from './Chapter1.module.css'

gsap.registerPlugin(ScrollTrigger)

// Exhibit data
const exhibits = {
  bodhisattva: {
    title: '敦煌日历2022年 第431窟 供养菩萨',
    description:
      '佛教僧侣远离红尘、不事生产，生活所需全赖信徒布施。这便是"供养"的起源。早期佛教强调"四事供养"：衣服、饮食、卧具、医药。后来，供养从保障僧人生存，扩展到造窟、塑像、写经、燃灯——对象也从僧宝延伸到佛宝、法宝。对信徒而言，供养不仅是付出，更是"种福田"：禳灾祛病、超度亡亲、求现世安稳、祈来生净土。每一次供养，都是在佛菩萨面前，许下一个愿望。',
  },
  nobleWoman: {
    title: '西魏 第285窟 女贵族供养人',
    description:
      '人像头饰双鬟髻，穿对襟宽袖长衫，飘带披肩，腰束蔽膝，下着间色曳地长裙，穿高头履，右臂弯曲置腰前，持鲜花，左手持一弯柄香炉。从排布位次与衣冠形制判断，首铺供养人当属西魏敦煌望族，或为地方掌权者。而图像上这一女供养人身阶则更尊。',
  },
  governorWife: {
    title: '盛唐 第130窟 都督夫人礼佛图',
    subtitle: '段文杰复原临摹',
    description:
      '《都督夫人礼佛图》为盛唐代表性供养人像，描绘沙州都督眷属组团礼佛场面。人物服饰华贵、队列规整，直观反映盛唐敦煌世家风貌与供养习俗。是研究唐代敦煌士族生活、服饰礼制与供养文化的重要图像史料。',
  },
  kingKhotan: {
    title: '五代 第98窟 于阗国王李圣天供养像',
    description:
      '于阗国王李圣天，据考证，即于阗国狮子王尉迟沙缚婆，由于前代尉迟氏曾有功于唐室，赐姓李，子孙相袭，到五代后梁时建年号"同庆"，10世纪时与沙州曹氏归义军政权有密切联系，娶曹议金之女为皇后。此像系归义军曹氏将外戚国王尊奉为"窟主"之举。',
  },
  fiveDynastiesWoman: {
    title: '五代 第98窟 五代女供养人',
    subtitle: '1992年欧阳琳复原画',
    description:
      '女供养人均身着花纹华丽繁复的礼服，肩披花帔，长裙曳地，颈间佩戴璎珞。其的妆容沿用晚唐时期的风格，细长的柳叶眉，朱唇。花靥，花钿修饰面容。整体展现出五代时期贵族女性装扮风格。',
  },
  commoner: {
    title: '隋代 第62窟 平民供养人及牛车',
    description:
      '在莫高窟中，大部分普通平民没有能力独自开凿洞窟。他们通过捐资、出力参与石窟营建，凭借自己的供养功德，将个人画像绘制在壁画之中，留下属于普通人的时代印记。',
  },
  slave: {
    title: '晚唐 第107窟 奴隶供养人',
    description:
      '二人位列北壁女供养人队列末尾，衣着朴素、无头饰，怀抱供养物，神情虔诚庄重。壁画题记记载，母女二人捐资造释迦牟尼佛像六躯，一心礼佛供养。她们希望凭借礼佛功德舍贱从良，摆脱奴婢低微身份，从依附人口转变为唐代身份自由的良人。',
  },
  shiChongji: {
    title: '史崇姬',
    description: '修建洞窟的出资者，人像头扎单髻，侧身站立，上身外穿对襟大袖襦，颜色有黑、红、蓝色，领、袖均有边饰，内著浅色圆领衫，下着间色曳地长裙，作袖礼供养状。',
  },
  biqiu: {
    title: '比丘辯化',
    description: '修建洞窟的出资者，人像穿交领袈裟，左手置胸前，右手托一无柄香炉。',
  },
  yinAnGui: {
    title: '阴安归',
    description: '修建洞窟的出资者，人像扎头巾，脑后露出一段头发，穿圆领窄袖袍服，颜色有红、蓝二色，袍服正中宽边到腰部，身系腰带，正中及领、袖皆有边饰，双手拢入袖中。',
  },
}

export default function Chapter1() {
  const [activePanel, setActivePanel] = useState(null)
  const chapterRef = useRef(null)

  // Group 1 refs
  const g1SceneRef = useRef(null)
  const g1ImageRef = useRef(null)
  const g1HotspotRef = useRef(null)
  const g1TextRef = useRef(null)
  const g1TitleRef = useRef(null)

  // Group 2 refs
  const g2WalkSceneRef = useRef(null)
  const g2WalkFigureRef = useRef(null)
  const g2WalkOverlayRef = useRef(null)
  const g2WalkHotspotRef = useRef(null)

  const g2CarouselSceneRef = useRef(null)
  const g2CarouselTrackRef = useRef(null)
  const g2MergeImg1Ref = useRef(null)
  const g2MergeImg2Ref = useRef(null)
  const g2MergeImg3Ref = useRef(null)
  const g2MergeOverlayRef = useRef(null)
  const g2MergeHotspotRef = useRef(null)
  const g2MergeFullRef = useRef(null)
  const g2MergeCaptionRef = useRef(null)

  const g2KingFigureRef = useRef(null)
  const g2KingHotspotRef = useRef(null)

  const g2WomanFigureRef = useRef(null)
  const g2WomanHotspotRef = useRef(null)

  const g2DualSceneRef = useRef(null)

  // Group 3 refs
  const g3SectionRef = useRef(null)
  const g3VowRef = useRef(null)
  const g3CardsRef = useRef(null)
  const g3VowImgRef = useRef(null)
  const g3DonorImgRef = useRef(null)
  const g3Hotspot1Ref = useRef(null)
  const g3Hotspot2Ref = useRef(null)
  const g3Hotspot3Ref = useRef(null)

  const togglePanel = (id) => {
    setActivePanel((prev) => (prev === id ? null : id))
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // === Group 1: Bodhisattva 大图居中 → 缩小移左 + 文字上浮 ===
      // 初始：图片放大到跨两屏，平移到屏幕中央；文字在底部外
      gsap.set(g1ImageRef.current, { xPercent: -50, yPercent: 0 })
      gsap.set(g1TextRef.current, { xPercent: 0, yPercent: -50, y: '60vh', opacity: 0 })
      gsap.set(g1HotspotRef.current, { opacity: 0, scale: 0.5 })
      gsap.set(g1TitleRef.current, { opacity: 1 })
      gsap.set(g2KingHotspotRef.current, { opacity: 0 })
      gsap.set(g2WomanHotspotRef.current, { opacity: 0 })

      const g1tl = gsap.timeline({
        scrollTrigger: {
          trigger: g1SceneRef.current,
          start: 'top top',
          end: '+=500%',
          pin: true,
          scrub: 1,
        },
      })
      g1tl
        .to(g1ImageRef.current, { yPercent: -37, duration: 1.2, ease: 'none' }) // 从头滚到底
        .to(g1ImageRef.current, { height: '85vh', left: '25%', top: '50%', yPercent: -50, duration: 1, ease: 'power2.inOut' }, '+=0.1')
        .to(g1TitleRef.current, { opacity: 0, duration: 0.6, ease: 'power2.in' }, '<') // 单元标题随供养菩萨像缩放淡出
        .to(g1TextRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '<0.2')
        .to(g1HotspotRef.current, { opacity: 1, scale: 1, duration: 0.3 }, '<0.5')

      // === Group 2, Figure 1: Walk in ===
      const g2Walktl = gsap.timeline({
        scrollTrigger: {
          trigger: g2WalkSceneRef.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 1,
        },
      })
      g2Walktl
        .fromTo(
          g2WalkFigureRef.current,
          { xPercent: -120, opacity: 0 },
          { xPercent: 40, opacity: 1, duration: 1 }
        )
        .fromTo(
          g2WalkHotspotRef.current,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.4 },
          '>'
        )

      // === Group 2: 走马灯 — 礼佛图三图合并 → 国王像 → 五代女供养人 ===
      gsap.set(g2KingFigureRef.current, { opacity: 0 })
      gsap.set(g2WomanFigureRef.current, { opacity: 0 })

      const g2Carouseltl = gsap.timeline({
        scrollTrigger: {
          trigger: g2CarouselSceneRef.current,
          start: 'top top',
          end: '+=1000%',
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
      g2Carouseltl
        // — 礼佛图三图合并 —
        .to(g2MergeImg1Ref.current, { xPercent: 100, scale: 1.3, duration: 1 })
        .to(g2MergeImg3Ref.current, { xPercent: -100, scale: 1.3, duration: 1 }, '<')
        .to(g2MergeImg2Ref.current, { scale: 1.5, duration: 1 }, '<')
        .to(
          [g2MergeImg1Ref.current, g2MergeImg2Ref.current, g2MergeImg3Ref.current],
          { opacity: 0, duration: 0.4 },
          '+=0.1'
        )
        .fromTo(g2MergeFullRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '<')
        .fromTo(g2MergeCaptionRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '<0.2')
        .fromTo(g2MergeHotspotRef.current, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.4 }, '<')
        // — 走马灯：礼佛图 → 国王像 —
        .to(g2CarouselTrackRef.current, { x: () => -window.innerWidth, duration: 1.2, ease: 'none' }, '+=0.3')
        .fromTo(g2KingFigureRef.current, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.6 }, '<0.2')
        .fromTo(g2KingHotspotRef.current, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.4 }, '<0.3')
        .to({}, { duration: 0.6 }) // 国王像停留
        // — 走马灯：国王像 → 五代女供养人 —
        .to(g2CarouselTrackRef.current, { x: () => -window.innerWidth * 2, duration: 1.2, ease: 'none' })
        .fromTo(g2WomanFigureRef.current, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.6 }, '<0.2')
        .fromTo(g2WomanHotspotRef.current, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.4 }, '<0.3')
        .to({}, { duration: 0.6 }) // 五代女供养人停留

      // === Group 2, Figure 5: Dual ===
      gsap.fromTo(
        g2DualSceneRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: g2DualSceneRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      )

      // === Group 3: 文字收束到发愿文图片 ===
      gsap.set(g3VowImgRef.current, { opacity: 0, y: 80 })
      gsap.set(g3DonorImgRef.current, { opacity: 0, y: 80 })
      gsap.set([g3Hotspot1Ref.current, g3Hotspot2Ref.current, g3Hotspot3Ref.current], { opacity: 0 })
      const g3tl = gsap.timeline({
        scrollTrigger: {
          trigger: g3SectionRef.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 1,
        },
      })
      g3tl
        .fromTo(g3VowRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4 })
        .to(g3DonorImgRef.current, { opacity: 1, y: 0, duration: 0.6 }, '>')
        .to(g3VowRef.current, {
          x: () => g3VowImgRef.current.getBoundingClientRect().left - g3VowRef.current.getBoundingClientRect().left,
          y: () => g3VowImgRef.current.getBoundingClientRect().top - g3VowRef.current.getBoundingClientRect().top,
          scale: 0.3,
          opacity: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        }, '>')
        .to(g3DonorImgRef.current, { y: -40, duration: 1.2, ease: 'none' }, '<')
        .to(g3VowImgRef.current, { opacity: 1, y: 0, duration: 0.6 }, '<0.3')
        .to(g3DonorImgRef.current, { y: -80, duration: 0.6, ease: 'none' }, '<')
        .to([g3Hotspot1Ref.current, g3Hotspot2Ref.current, g3Hotspot3Ref.current], { opacity: 1, duration: 0.4 }, '>')

      if (g3CardsRef.current) {
        gsap.fromTo(
          g3CardsRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            scrollTrigger: {
              trigger: g3CardsRef.current,
              start: 'top 80%',
              end: 'top 30%',
              scrub: 1,
            },
          }
        )
      }
    }, chapterRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="chapter-1"
      className={styles.chapter1}
      data-section="chapter-1"
      ref={chapterRef}
    >
      {/* ========== 第一组：何为供养 ========== */}
      <div className={styles.group}>
        {/* 展项：第431窟 供养菩萨 */}
        <div ref={g1SceneRef} className={styles.g1Scene}>
          {/* 单元标题：初始在左侧，随供养菩萨像缩小时淡出 */}
          <img
            ref={g1TitleRef}
            src="/picture/chap1/单元标题1.PNG?v=3"
            alt="第一单元标题"
            className={styles.g1Title}
          />
          {/* 图片：初始居中超大，动画后缩至左侧 */}
          <img
            ref={g1ImageRef}
            src="/picture/chap1/敦煌日历2022年，第431窟 供养菩萨.png"
            alt="第431窟 供养菩萨"
            className={styles.g1Img}
          />
          {/* 热点（动画结束后显示） */}
          <div ref={g1HotspotRef} className={styles.g1HotspotWrap}>
            <Hotspot
              x={72}
              y={18}
              active={activePanel === 'bodhisattva'}
              onClick={() => togglePanel('bodhisattva')}
            />
          </div>
          <ExhibitPanel
            title={exhibits.bodhisattva.title}
            description={exhibits.bodhisattva.description}
            visible={activePanel === 'bodhisattva'}
            onClose={() => setActivePanel(null)}
          />
          {/* 右侧文字：初始在屏幕底部外，动画后上移到位 */}
          <div ref={g1TextRef} className={styles.g1Text}>
            <p className={styles.g1Poem}>
              供佛、养僧、积功德，<br />
              绘像、写经、资建窟，<br />
              皆为供养。
            </p>
            <p className={styles.g1Def}>
              ——供养人，即出资开窟、造像、绘壁、写经的佛教功德主。
            </p>
          </div>
        </div>
      </div>

      {/* ========== 第二组：供养人群像 ========== */}
      <div className={styles.group}>
        {/* 展项：西魏 第285窟 女贵族供养人 */}
        <div ref={g2WalkSceneRef} className={styles.scene}>
          <div className={styles.walkScene}>
            <div
              ref={g2WalkOverlayRef}
              className={styles.overlay}
              style={{ opacity: 0 }}
            />
            <div ref={g2WalkFigureRef} className={styles.walkGroup}>
              <img
                src="/picture/chap1/第285窟北壁第一铺 女贵族供养人.png"
                alt="第285窟 女贵族供养人"
                style={{ height: '75vh', width: 'auto', display: 'block' }}
              />
              <p className={styles.walkText}>
                供养人画像所呈现的群体并不局限于某一阶层。从已发现的洞窟题记和图像来看，供养人身份跨度很大，既有地方权贵，也有普通僧尼、平民信众，甚至像古代奴隶这样身份低微的形象也被绘入壁画。这种身份上的混杂说明，能否被绘制上墙，取决于的并非社会地位，而是是否有发愿造像、施舍财物的虔诚之举——只要做出供养行为，无论贵贱，都有机会以画像和题名的方式被留存在石壁上，成为后世可考的痕迹。
              </p>
            </div>
            <Hotspot
              ref={g2WalkHotspotRef}
              x={55}
              y={35}
              active={activePanel === 'nobleWoman'}
              onClick={() => togglePanel('nobleWoman')}
            />
            <ExhibitPanel
              title={exhibits.nobleWoman.title}
              description={exhibits.nobleWoman.description}
              visible={activePanel === 'nobleWoman'}
              onClose={() => setActivePanel(null)}
            />
          </div>
        </div>

        {/* 展项：走马灯 — 都督夫人礼佛图（三图合并）→ 于阗国王 → 五代女供养人 */}
        <div ref={g2CarouselSceneRef} className={styles.carouselScene}>
          <div ref={g2CarouselTrackRef} className={styles.carouselTrack}>
            {/* 第 1 屏：盛唐 第130窟 都督夫人礼佛图（三图合并动画） */}
            <div className={styles.carouselPanel}>
              <div
                ref={g2MergeOverlayRef}
                className={styles.overlay}
                style={{ opacity: 0 }}
              />
              <div className={styles.mergeImages}>
                <img
                  ref={g2MergeImg1Ref}
                  src="/picture/chap1/礼佛图左.png"
                  alt="礼佛图 左"
                  className={styles.mergeImage}
                  style={{ height: '60vh', width: 'auto' }}
                />
                <img
                  ref={g2MergeImg2Ref}
                  src="/picture/chap1/礼佛图中.png"
                  alt="礼佛图 中"
                  className={styles.mergeImage}
                  style={{ height: '60vh', width: 'auto' }}
                />
                <img
                  ref={g2MergeImg3Ref}
                  src="/picture/chap1/礼佛图右.png"
                  alt="礼佛图 右"
                  className={styles.mergeImage}
                  style={{ height: '85vh', width: 'auto' }}
                />
              </div>
              {/* 合并后全图 */}
              <img
                ref={g2MergeFullRef}
                src="/picture/chap1/段文杰复原临摹莫高窟 130窟 都督夫人礼佛图.png"
                alt="都督夫人礼佛图"
                style={{ position: 'absolute', height: '90vh', width: 'auto', opacity: 0 }}
              />
              <p ref={g2MergeCaptionRef} className={styles.mergeCaption}>
                贵族供养像在敦煌壁画中极为常见，其中不乏雍容华贵的女性形象，多以功德主家眷的身份出现于洞窟之中。虽然，记载中的开窟功德主大多数为男性，但若进一步追问营建一座洞窟所需的资源调度、人脉维系乃至家族决策过程，女性在其中扮演的角色未必只是陪衬。
              </p>
              <Hotspot
                ref={g2MergeHotspotRef}
                x={50}
                y={50}
                active={activePanel === 'governorWife'}
                onClick={() => togglePanel('governorWife')}
              />
              <ExhibitPanel
                title={exhibits.governorWife.title}
                subtitle={exhibits.governorWife.subtitle}
                description={exhibits.governorWife.description}
                visible={activePanel === 'governorWife'}
                onClose={() => setActivePanel(null)}
              />
            </div>

            {/* 第 2 屏：五代 第98窟 于阗国王李圣天供养像 */}
            <div className={styles.carouselPanel}>
              <div ref={g2KingFigureRef} className={styles.figureGroup}>
                <img
                  src="/picture/chap1/第98窟 于阗国王李圣天供养像.png"
                  alt="第98窟 于阗国王李圣天供养像"
                  style={{ height: '80vh', width: 'auto', maxWidth: '60vw' }}
                />
                <p className={styles.figureText}>
                  敦煌供养人像中还会出现外族君主的形象，这类外姓君主供养像的存在，说明敦煌作为丝路枢纽，其壁画体系所反映的不仅是汉地佛教信仰圈内部的供养行为，也包含了与当时周边政权之间深层的政治联系与文化交流。
                </p>
              </div>
              <Hotspot
                ref={g2KingHotspotRef}
                x={40}
                y={20}
                active={activePanel === 'kingKhotan'}
                onClick={() => togglePanel('kingKhotan')}
              />
              <ExhibitPanel
                title={exhibits.kingKhotan.title}
                description={exhibits.kingKhotan.description}
                visible={activePanel === 'kingKhotan'}
                onClose={() => setActivePanel(null)}
              />
              <div className={styles.cloud} />
              <div className={styles.cloud} />
            </div>

            {/* 第 3 屏：五代 第98窟 五代女供养人（欧阳琳复原画） */}
            <div className={styles.carouselPanel}>
              <img
                ref={g2WomanFigureRef}
                src="/picture/chap1/第98窟 五代女供养人欧阳琳1992年复原画.png"
                alt="第98窟 五代女供养人 (欧阳琳复原画)"
                style={{ height: '80vh', width: 'auto', maxWidth: '50vw' }}
              />
              <Hotspot
                ref={g2WomanHotspotRef}
                x={35}
                y={35}
                active={activePanel === 'fiveDynastiesWoman'}
                onClick={() => togglePanel('fiveDynastiesWoman')}
              />
              <ExhibitPanel
                title={exhibits.fiveDynastiesWoman.title}
                subtitle={exhibits.fiveDynastiesWoman.subtitle}
                description={exhibits.fiveDynastiesWoman.description}
                visible={activePanel === 'fiveDynastiesWoman'}
                onClose={() => setActivePanel(null)}
              />
              <div className={styles.cloud} />
            </div>
          </div>
        </div>

        {/* 展项：隋代 第62窟 平民供养人 + 晚唐 第107窟 奴隶供养人（并列展示） */}
        <div ref={g2DualSceneRef} className={styles.dualLayout}>
          <p className={styles.transitionCaption}>
            平民甚至奴婢形象多列于贵族供养人行列之末，画幅与位置远不及贵族显赫。
          </p>
          <div className={styles.dualItem}>
            <img
              src="/picture/chap1/第62窟东壁下部 平民供养人及牛车.png"
              alt="第62窟 平民供养人及牛车"
              style={{ width: '100%', maxHeight: '50vh', objectFit: 'contain' }}
            />
            <Hotspot
              x={50}
              y={30}
              active={activePanel === 'commoner'}
              onClick={() => togglePanel('commoner')}
            />
            <ExhibitPanel
              title={exhibits.commoner.title}
              description={exhibits.commoner.description}
              visible={activePanel === 'commoner'}
              onClose={() => setActivePanel(null)}
            />
          </div>
          <div className={styles.dualItem}>
            <img
              src="/picture/chap1/第107窟东壁北侧 奴隶供养人.png"
              alt="第107窟 奴隶供养人"
              style={{ width: '100%', maxHeight: '50vh', objectFit: 'contain' }}
            />
            <Hotspot
              x={50}
              y={45}
              active={activePanel === 'slave'}
              onClick={() => togglePanel('slave')}
            />
            <ExhibitPanel
              title={exhibits.slave.title}
              description={exhibits.slave.description}
              visible={activePanel === 'slave'}
              onClose={() => setActivePanel(null)}
            />
          </div>
        </div>
      </div>

      {/* ========== 第三组：阴氏题记 ========== */}
      <div className={styles.group}>
        {/* 展项：敦煌阴氏285窟发愿文 + 人物卡片（史崇姬、比丘辯化、阴安归） */}
        <div ref={g3SectionRef} className={styles.inscriptionSection}>
          <blockquote ref={g3VowRef} className={styles.vowText}>
            夫至极阒旷正为尘罗所约圣遁归趣
            非积垒何能济拔是以佛弟子比丘辯化仰
            为七世父母所生父母敬造迎叶佛一区并二菩
            萨因斯微福愿亡者神游净土永离三途现
            在居眷位太安吉普及蠕动之类速登常乐
            大代大魏大统四年岁次戊午八月中旬造
          </blockquote>
          <div ref={g3DonorImgRef} style={{ position: 'relative', width: '90vw', marginLeft: 'calc(-45vw + 50%)', overflow: 'visible' }}>
            <img
              src="/picture/chap1/285窟北壁第二铺供养人 .png"
              alt="285窟北壁第二铺供养人"
              style={{ width: '100%', display: 'block' }}
            />
            <img
              ref={g3VowImgRef}
              src="/picture/chap1/285窟敦煌阴氏发愿文.png"
              alt="285窟敦煌阴氏发愿文"
              style={{ position: 'absolute', top: '5%', left: '38%', height: '90%', width: 'auto' }}
            />
            {/* 三个人物交互点：贴在图片底部边缘 */}
            <div ref={g3Hotspot1Ref} style={{ position: 'absolute', left: '34%', bottom: '-30px' }}>
              <Hotspot x={0} y={0} active={activePanel === 'shiChongji'} onClick={() => togglePanel('shiChongji')} />
            </div>
            <div ref={g3Hotspot2Ref} style={{ position: 'absolute', left: '59%', bottom: '-30px' }}>
              <Hotspot x={0} y={0} active={activePanel === 'biqiu'} onClick={() => togglePanel('biqiu')} />
            </div>
            <div ref={g3Hotspot3Ref} style={{ position: 'absolute', left: '68%', bottom: '-30px' }}>
              <Hotspot x={0} y={0} active={activePanel === 'yinAnGui'} onClick={() => togglePanel('yinAnGui')} />
            </div>
            <ExhibitPanel title={exhibits.shiChongji.title} description={exhibits.shiChongji.description} visible={activePanel === 'shiChongji'} onClose={() => setActivePanel(null)} />
            <ExhibitPanel title={exhibits.biqiu.title} description={exhibits.biqiu.description} visible={activePanel === 'biqiu'} onClose={() => setActivePanel(null)} />
            <ExhibitPanel title={exhibits.yinAnGui.title} description={exhibits.yinAnGui.description} visible={activePanel === 'yinAnGui'} onClose={() => setActivePanel(null)} />
          </div>
        </div>
      </div>
    </section>
  )
}
