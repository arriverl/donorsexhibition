import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ExhibitPanel from '../components/ExhibitPanel'
import Hotspot from '../components/Hotspot'
import ModelViewer from '../components/ModelViewer'
import styles from './Chapter3.module.css'

gsap.registerPlugin(ScrollTrigger)

// 展品数据
const exhibits = {
  baoYuJing: {
    title: '《宝雨经》吐鲁番 MIK III-113号',
    subtitle: '初唐 长寿二年（693）译场列位',
    description: '《宝雨经》是佛教经典，经唐代官方写译及传播后，成为支持武则天树立女性君主，操弄政权的张目。经书以释迦摩尼的口吻告诉武则天：按照佛教理论，女人有五种阶位无法达到，但武则天是特殊的，她可以做轮转王和菩萨。',
  },
  baoEnJunQin: {
    title: '中唐 第231窟 报恩君亲供养人',
    subtitle: '阴嘉政报恩窟',
    description: '阴处士身在吐蕃的统治下，仍不忘大唐的君恩。在吐蕃统治下，"君"已不是唐朝皇帝，而是吐蕃赞普。阴嘉政在碑文中写"为当今圣主及七代父母"——这个"当今圣主"表面上是吐蕃赞普，但窟内所有视觉元素（父母汉装、唐代官衔题记、报恩经变中隐含的"忠君"传统）都在暗示：他们真正怀念的"君"。',
  },
  zhangYiChao: {
    title: '张议潮供养像',
    subtitle: '莫高窟第156窟 甬道南壁',
    description: '位于莫高窟第156窟甬道南壁。公元848年，张议潮联合敦煌阴氏等世家大族，起兵收复陷于吐蕃近七十年的沙州，光复河西，后任归义军节度使。第156窟是为纪念其功绩而建的功德窟。甬道南壁西向第一身供养人即张议潮，头戴幞头，手持香炉，作供佛状。',
  },
  zhangYiChaoWife: {
    title: '张议潮夫人供养像',
    subtitle: '莫高窟第156窟 甬道北壁 晚唐',
    description: '位于莫高窟第156窟甬道北壁，晚唐。此像为张议潮夫人宋氏供养像。宋氏头梳高髻，满插梳钗花钿，身披印花帔帛，长裙曳地。画像旁题记"敕宋国河内郡太夫人广平宋氏一心供养"。',
  },
  zhangYiChaoTravel: {
    title: '张议潮统军出行图',
    subtitle: '莫高窟第156窟 南壁',
    description: '此图绘于莫高窟第156窟南壁，是归义军首任节度使张议潮的功德窟壁画。画面全长逾8米，绘有人物近240身、马匹110余匹，为敦煌壁画中规模最大的现实题材历史画。图中张议潮着红袍、骑白马，在仪仗队簇拥下统军出行。旌旗猎猎，鼓角齐鸣，甲骑鲜明，展现了归义军收复河西后的赫赫军威。',
  },
  anGuoTempleNun: {
    title: '安国寺尼智惠性供养像',
    subtitle: '莫高窟第138窟 主室东壁门上',
    description: '位于莫高窟第138窟主室东壁门上。画面中央，比丘尼智惠性着缁衣、坐于床榻，手持香炉，神情庄重；身后侍立女供养人数身，皆双手捧持供养物品。智惠性题记明确题为"女尼安国寺法律智惠性供养"。"安国寺"为晚唐敦煌著名尼寺，"法律"为僧官体系中掌管戒律的职衔。据《阴处士碑》及相关文献，智惠性或为阴氏家族成员，以其出家身份参与家族佛事，辅佐第138窟之营建。',
  },
}

export default function Chapter3() {
  const openingSceneRef = useRef(null)
  const titleRef = useRef(null)
  const riverPathRef = useRef(null)
  const descriptionRef = useRef(null)
  const exhibit1Ref = useRef(null)
  const exhibit1TextRef = useRef(null)
  const exhibit1ImageRef = useRef(null)
  const exhibit2Ref = useRef(null)
  const exhibit2TextRef = useRef(null)
  const exhibit2ImageRef = useRef(null)
  const exhibit3Ref = useRef(null)
  const exhibit4Ref = useRef(null)
  const exhibit4Section1Ref = useRef(null)
  const exhibit4Section2Ref = useRef(null)
  const exhibit4Section3Ref = useRef(null)
  const exhibit5Ref = useRef(null)
  const exhibit5TextRef = useRef(null)
  const exhibit6Ref = useRef(null)
  const exhibit6TextRef = useRef(null)
  const exhibit6HotspotRef = useRef(null)
  const exhibit7Ref = useRef(null)
  const exhibit7TopLeftHotspotRef = useRef(null)
  const exhibit7BottomRightHotspotRef = useRef(null)
  const exhibit7TopLeftTextRef = useRef(null)
  const exhibit8Ref = useRef(null)
  const exhibit9Ref = useRef(null)
  const exhibit9LeftRef = useRef(null)
  const exhibit9RightRef = useRef(null)
  const exhibit10Ref = useRef(null)
  const exhibit10LeftRef = useRef(null)
  const exhibit10RightRef = useRef(null)
  const exhibit11Ref = useRef(null)
  const exhibit11RightHotspotRef = useRef(null)
  const exhibit12Ref = useRef(null)
  const exhibit12LeftRef = useRef(null)
  const exhibit12RightRef = useRef(null)
  const exhibit12LeftHotspotRef = useRef(null)
  const exhibit12RightHotspotRef = useRef(null)
  const exhibit13Ref = useRef(null)
  const exhibit13LeftHotspotRef = useRef(null)
  const [activePanel, setActivePanel] = useState(null)
  const [activeTuJing, setActiveTuJing] = useState(0)
  const [particles, setParticles] = useState([])

  // 展项4 - 图经叠层查看器
  const tuJingImages = [
    '/picture/chap3/图经1.png',
    '/picture/chap3/图经2.png',
    '/picture/chap3/图经3.png',
  ]

  const togglePanel = (id) => {
    setActivePanel((prev) => (prev === id ? null : id))
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 初始状态设置
      gsap.set(titleRef.current, { y: -50, opacity: 0 })
      gsap.set(descriptionRef.current, { y: 50, opacity: 0 })

      // 标题从上方滑入
      gsap.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: openingSceneRef.current,
          start: 'top 80%',
          end: 'top 60%',
          scrub: 1,
        },
      })

      // 河流动画 - 从右上流向左下
      gsap.to(riverPathRef.current, {
        strokeDashoffset: 0,
        duration: 3,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: openingSceneRef.current,
          start: 'top 70%',
          end: 'top 30%',
          scrub: 1,
        },
      })

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

      // 展项1页面 - 左右分栏从两侧滑入
      if (exhibit1Ref.current && exhibit1TextRef.current && exhibit1ImageRef.current) {
        gsap.set(exhibit1TextRef.current, { x: -100, opacity: 0 })
        gsap.set(exhibit1ImageRef.current, { x: 100, opacity: 0 })

        gsap.to(exhibit1TextRef.current, {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: exhibit1Ref.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
        })

        gsap.to(exhibit1ImageRef.current, {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: exhibit1Ref.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
        })
      }

      // 展项2页面 - 左右分栏从两侧滑入
      if (exhibit2Ref.current && exhibit2TextRef.current && exhibit2ImageRef.current) {
        gsap.set(exhibit2TextRef.current, { x: -100, opacity: 0 })
        gsap.set(exhibit2ImageRef.current, { x: 100, opacity: 0 })

        gsap.to(exhibit2TextRef.current, {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: exhibit2Ref.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
        })

        gsap.to(exhibit2ImageRef.current, {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: exhibit2Ref.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
        })
      }

      // 展项3页面 - 3D模型居中淡入
      if (exhibit3Ref.current) {
        gsap.set(exhibit3Ref.current, { opacity: 0, scale: 0.9 })

        gsap.to(exhibit3Ref.current, {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: exhibit3Ref.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
        })
      }

      // 展项4页面 - 祥瑞三部分从不同方向滑入
      if (exhibit4Ref.current && exhibit4Section1Ref.current && exhibit4Section2Ref.current && exhibit4Section3Ref.current) {
        gsap.set(exhibit4Section1Ref.current, { x: -100, opacity: 0 })
        gsap.set(exhibit4Section2Ref.current, { y: -50, opacity: 0 })
        gsap.set(exhibit4Section3Ref.current, { x: 100, opacity: 0 })

        gsap.to(exhibit4Section1Ref.current, {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: exhibit4Ref.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
        })

        gsap.to(exhibit4Section2Ref.current, {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: exhibit4Ref.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
        })

        gsap.to(exhibit4Section3Ref.current, {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: exhibit4Ref.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
        })
      }

      // 展项5页面 - 淡入动画
      if (exhibit5Ref.current && exhibit5TextRef.current) {
        gsap.set(exhibit5TextRef.current, { y: -50, opacity: 0 })

        gsap.to(exhibit5TextRef.current, {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: exhibit5Ref.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
        })
      }

      // 展项6页面 - 文本浮现动画
      if (exhibit6Ref.current && exhibit6TextRef.current) {
        gsap.set(exhibit6TextRef.current, { opacity: 0, y: 30 })

        gsap.to(exhibit6TextRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: exhibit6Ref.current,
            start: 'top 40%',
            end: 'top 20%',
            scrub: 1,
          },
        })
      }

      // 展项6页面 - 交互点浮现动画
      if (exhibit6Ref.current && exhibit6HotspotRef.current) {
        gsap.set(exhibit6HotspotRef.current, { opacity: 0, scale: 0.8 })

        gsap.to(exhibit6HotspotRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: exhibit6Ref.current,
            start: 'top 25%',
            end: 'top 10%',
            scrub: 1,
          },
        })
      }

      // 展项7页面 - 左上角交互点和文本滑入
      if (exhibit7Ref.current && exhibit7TopLeftHotspotRef.current && exhibit7TopLeftTextRef.current) {
        gsap.set(exhibit7TopLeftHotspotRef.current, { x: -50, opacity: 0 })
        gsap.set(exhibit7TopLeftTextRef.current, { x: -50, opacity: 0 })

        gsap.to(exhibit7TopLeftHotspotRef.current, {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: exhibit7Ref.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
        })

        gsap.to(exhibit7TopLeftTextRef.current, {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: exhibit7Ref.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
        })
      }

      // 展项7页面 - 右下角交互点滑入
      if (exhibit7Ref.current && exhibit7BottomRightHotspotRef.current) {
        gsap.set(exhibit7BottomRightHotspotRef.current, { x: 50, opacity: 0 })

        gsap.to(exhibit7BottomRightHotspotRef.current, {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: exhibit7Ref.current,
            start: 'top 60%',
            end: 'top 30%',
            scrub: 1,
          },
        })
      }

      // 展项8 - 诗句颤抖浮现动效
      if (exhibit8Ref.current) {
        const columns = Array.from(exhibit8Ref.current.querySelectorAll('[class*="exhibit8TextColumn"]'))

        gsap.set(columns, { opacity: 0 })

        columns.forEach((column, index) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: exhibit8Ref.current,
              start: 'top 90%',
            },
            delay: index * 0.3,
          })

          // 淡入，同时伴随颤抖
          tl.to(column, {
            opacity: 0.25,
            x: -1,
            y: 1,
            duration: 0.1,
            ease: 'none',
          })
          .to(column, {
            opacity: 0.5,
            x: 1,
            y: -1,
            duration: 0.1,
            ease: 'none',
          })
          .to(column, {
            opacity: 0.75,
            x: -1,
            y: 1,
            duration: 0.1,
            ease: 'none',
          })
          .to(column, {
            opacity: 1,
            x: 1,
            y: -1,
            duration: 0.1,
            ease: 'none',
          })
          .to(column, {
            opacity: 1,
            x: -1,
            y: 1,
            duration: 0.1,
            ease: 'none',
          })
          .to(column, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.1,
            ease: 'none',
          })
          // 淡入完成后，持续颤抖
          .to(column, {
            x: -1,
            y: 1,
            duration: 0.1,
            repeat: -1,
            yoyo: true,
            ease: 'none',
          })
        })
      }

      // 展项9 - 左右分栏从两侧滑入
      if (exhibit9Ref.current && exhibit9LeftRef.current && exhibit9RightRef.current) {
        gsap.set(exhibit9LeftRef.current, { x: -100, opacity: 0 })
        gsap.set(exhibit9RightRef.current, { x: 100, opacity: 0 })

        gsap.to(exhibit9LeftRef.current, {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: exhibit9Ref.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
        })

        gsap.to(exhibit9RightRef.current, {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: exhibit9Ref.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
        })
      }

      // 展项10 - 左右分栏从两侧滑入
      if (exhibit10Ref.current && exhibit10LeftRef.current && exhibit10RightRef.current) {
        gsap.set(exhibit10LeftRef.current, { x: -100, opacity: 0 })
        gsap.set(exhibit10RightRef.current, { x: 100, opacity: 0 })

        gsap.to(exhibit10LeftRef.current, {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: exhibit10Ref.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
        })

        gsap.to(exhibit10RightRef.current, {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: exhibit10Ref.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
        })
      }

      // 展项11 - 淡入动画
      if (exhibit11Ref.current) {
        gsap.set(exhibit11Ref.current, { opacity: 0 })

        gsap.to(exhibit11Ref.current, {
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: exhibit11Ref.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
        })
      }

      // 展项11 - 右侧交互点浮现动画
      if (exhibit11Ref.current && exhibit11RightHotspotRef.current) {
        gsap.set(exhibit11RightHotspotRef.current, { opacity: 0, scale: 0.8 })

        gsap.to(exhibit11RightHotspotRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: exhibit11Ref.current,
            start: 'top 25%',
            end: 'top 10%',
            scrub: 1,
          },
        })
      }

      // 展项12 - 左右分栏从两侧滑入
      if (exhibit12Ref.current && exhibit12LeftRef.current && exhibit12RightRef.current) {
        gsap.set(exhibit12LeftRef.current, { x: -100, opacity: 0 })
        gsap.set(exhibit12RightRef.current, { x: 100, opacity: 0 })

        gsap.to(exhibit12LeftRef.current, {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: exhibit12Ref.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
        })

        gsap.to(exhibit12RightRef.current, {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: exhibit12Ref.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
        })
      }

      // 展项12 - 左侧交互点浮现动画
      if (exhibit12Ref.current && exhibit12LeftHotspotRef.current) {
        gsap.set(exhibit12LeftHotspotRef.current, { opacity: 0, scale: 0.8 })

        gsap.to(exhibit12LeftHotspotRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: exhibit12Ref.current,
            start: 'top 25%',
            end: 'top 10%',
            scrub: 1,
          },
        })
      }

      // 展项12 - 右侧交互点浮现动画
      if (exhibit12Ref.current && exhibit12RightHotspotRef.current) {
        gsap.set(exhibit12RightHotspotRef.current, { opacity: 0, scale: 0.8 })

        gsap.to(exhibit12RightHotspotRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: exhibit12Ref.current,
            start: 'top 25%',
            end: 'top 10%',
            scrub: 1,
          },
        })
      }

      // 展项13 - 淡入动画
      if (exhibit13Ref.current) {
        gsap.set(exhibit13Ref.current, { opacity: 0 })

        gsap.to(exhibit13Ref.current, {
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: exhibit13Ref.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
        })
      }

      // 展项13 - 左侧交互点浮现动画
      if (exhibit13Ref.current && exhibit13LeftHotspotRef.current) {
        gsap.set(exhibit13LeftHotspotRef.current, { opacity: 0, scale: 0.8 })

        gsap.to(exhibit13LeftHotspotRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: exhibit13Ref.current,
            start: 'top 25%',
            end: 'top 10%',
            scrub: 1,
          },
        })
      }

    }, openingSceneRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="chapter-3" className={`${styles.chapter3} section--chapter-3`} data-section="chapter-3">
      {/* 开场场景 */}
      <div ref={openingSceneRef} className={styles.openingScene}>
        {/* 左上角标题 */}
        <div ref={titleRef} className={styles.titleSection}>
          <img
            className={styles.chapterTitle}
            src="/picture/chap3/单元标题3.png"
            alt="青云之势"
          />
        </div>

        {/* 河流效果 */}
        <div className={styles.riverContainer}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1920 1080"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="riverGradient" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6495ED" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#4169E1" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#87CEEB" stopOpacity="0.6" />
              </linearGradient>
            </defs>

            {/* 主河流路径 - 从右上到左下 */}
            <path
              ref={riverPathRef}
              d="M 1500 100 Q 1400 250, 1200 300 T 800 500 T 400 700 T 200 950"
              className={styles.riverPath}
            />

            {/* 支流路径 */}
            <path
              d="M 1600 150 Q 1450 200, 1300 350 T 900 550 T 500 800"
              fill="none"
              stroke="url(#riverGradient)"
              strokeWidth="20"
              strokeLinecap="round"
              strokeDasharray="2000"
              strokeDashoffset="2000"
              style={{
                animation: 'flowRiver 3.5s ease-out forwards 0.5s',
              }}
            />
          </svg>

          {/* 粒子效果 */}
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className={styles.particle}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animation: `particleFloat 4s ease-in-out infinite ${Math.random() * 2}s`,
              }}
            />
          ))}

          {/* 水波纹装饰 */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={styles.waterRipple}
              style={{
                left: `${60 + Math.random() * 30}%`,
                top: `${20 + Math.random() * 40}%`,
                width: `${20 + Math.random() * 30}px`,
                height: `${20 + Math.random() * 30}px`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* 右下角说明文本 */}
        <div ref={descriptionRef} className={styles.descriptionSection}>
          <h3 className={styles.descriptionTitle}>修水利、兴农事、开石窟、涉军政</h3>
          <p className={styles.descriptionText}>
            五百年间，敦煌阴氏顺势而起、乘时而兴。<br /><br />
            本单元挖掘阴氏在不同历史时期下的生存智慧，呈现出阴氏由地方豪族上升为敦煌政坛核心力量的百年政治博弈。
          </p>
        </div>
      </div>

      {/* 展项1 - 武周时期 */}
      <div ref={exhibit1Ref} className={styles.exhibit1}>
        <div className={styles.exhibit1Inner}>
          <div ref={exhibit1TextRef} className={styles.exhibit1Left}>
            <div className={styles.exhibit1Content}>
              <h3 className={styles.exhibit1Title}>武周时期</h3>
              <p className={styles.exhibit1Text}>
                武周时期，敦煌阴氏在水利建设、农业生产等方面做出了重要贡献，成为地方上的重要力量。通过开凿石窟、参与军政事务，阴氏家族逐步确立了在敦煌地区的地位。
              </p>
            </div>
          </div>
          <div ref={exhibit1ImageRef} className={styles.exhibit1Right}>
            <div className={`${styles.exhibit1ImagePlaceholder} ${styles.exhibit1WithImage}`}>
              <img
                src="/picture/chap3/宝雨经.jpg"
                alt="宝雨经"
                className={styles.exhibit1Image}
              />
              <Hotspot
                x={50}
                y={50}
                active={activePanel === 'baoYuJing'}
                onClick={() => togglePanel('baoYuJing')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 展项2 - 431窟 */}
      <div ref={exhibit2Ref} className={styles.exhibit2}>
        <div className={styles.exhibit2Inner}>
          <div ref={exhibit2TextRef} className={styles.exhibit2Left}>
            <div className={styles.exhibit2Content}>
              <h3 className={styles.exhibit2Title}>431窟</h3>
              <p className={styles.exhibit2Text}>
                431窟是阴氏家族在前人基础上在唐代重修的洞窟，其将洞窟地面下挖，在中心塔柱柱座以及洞窟四壁绘制了壁画。南壁绘有"九品往生"，其中下三品画面生动表现了善导大师的净土思想与凡夫论。这建立了敦煌最早往生西方净土的道场，充分彰显出阴氏家族敏锐的宗教审美与艺术认知。
              </p>
            </div>
          </div>
          <div ref={exhibit2ImageRef} className={styles.exhibit2Right}>
            <div className={`${styles.exhibit2ImagePlaceholder} ${styles.exhibit2WithImage}`}>
              <img
                src="/picture/chap3/431窟南壁壁画.jpg"
                alt="431窟南壁壁画"
                className={styles.exhibit2Image}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 展项3 - 北大像 */}
      <div ref={exhibit3Ref} className={styles.exhibit3}>
        <div className={styles.exhibit3Content}>
          <div className={styles.exhibit3Model}>
            <ModelViewer key="model-xiangta" modelPath="/picture/chap3/像塔.glb" />
          </div>
          <div className={styles.exhibit3Text}>
            <p className={styles.exhibit3TextContent}>
              禅师灵隐、敦煌居士阴祖及当地百姓为了响应武则天建立武周朝的号召，合力开凿96窟并营建北大像。这是阴氏家族顺应时局、攀附朝纲的政治举措，是为了稳固家族权势与名望的手段。高大的佛像褪去宗教礼赞的外衣后是浓厚的政治底色。
            </p>
          </div>
        </div>
      </div>

      {/* 展项4 - 祥瑞 */}
      <div ref={exhibit4Ref} className={styles.exhibit4}>
        <div className={styles.exhibit4Content}>
          <div ref={exhibit4Section1Ref} className={styles.exhibit4Top}>
            <div className={styles.tuJingViewer}>
              {tuJingImages.map((src, i) => {
                const offset = i - activeTuJing
                return (
                  <img
                    key={src}
                    src={src}
                    alt={`图经 ${i + 1}`}
                    className={styles.tuJingCard}
                    style={{
                      transform: `translate(${offset * 24}px, ${Math.abs(offset) * 14}px) rotate(${offset * 2.6}deg) scale(${1 - Math.abs(offset) * 0.05})`,
                      opacity: offset === 0 ? 1 : 0.4,
                      zIndex: 10 - Math.abs(offset),
                      pointerEvents: offset === 0 ? 'auto' : 'none',
                    }}
                  />
                )
              })}

              <button
                type="button"
                className={`${styles.tuJingNav} ${styles.tuJingNavPrev}`}
                onClick={() => setActiveTuJing((p) => Math.max(0, p - 1))}
                disabled={activeTuJing === 0}
                aria-label="上一张图经"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 6 L9 12 L15 18" />
                </svg>
              </button>
              <button
                type="button"
                className={`${styles.tuJingNav} ${styles.tuJingNavNext}`}
                onClick={() => setActiveTuJing((p) => Math.min(tuJingImages.length - 1, p + 1))}
                disabled={activeTuJing === tuJingImages.length - 1}
                aria-label="下一张图经"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 6 L15 12 L9 18" />
                </svg>
              </button>

              <div className={styles.tuJingCounter}>
                {String(activeTuJing + 1).padStart(2, '0')} / {String(tuJingImages.length).padStart(2, '0')}
              </div>
            </div>
          </div>
          <div className={styles.exhibit4Bottom}>
            <div ref={exhibit4Section2Ref} className={styles.exhibit4BottomLeft}>
              <ModelViewer key="model-bailang" modelPath="/picture/chap3/白狼建模.glb" />
            </div>
            <div ref={exhibit4Section3Ref} className={styles.exhibit4BottomRight}>
              <div className={styles.exhibit4TextContent}>
                <p className={styles.exhibit4Text}>
                  祥瑞，又称符瑞，儒家将之定义为表达天意的、对人有益的自然现象。祥瑞种类极多，"五灵"等级最高，也就是麒麟、凤凰、龟、龙和白虎，有"麟凤五灵，王者之嘉瑞"的说法，之后则是大瑞、上瑞、中瑞、下瑞。祥瑞还关乎改朝换代的合法性，武则天在位时十分热衷于此，一度掀起了"献瑞风潮"。
                </p>
                <p className={styles.exhibit4Text}>
                  在获得权势后，阴守忠、阴修己父子开凿了321窟，并在主室西龛外两侧的力士台上塑了两尊"祥瑞白狼"，以此彰显家族独特的政治资产与荣耀。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 展项5 - 217窟 */}
      <div ref={exhibit5Ref} className={styles.exhibit5}>
        <div className={styles.exhibit5Content}>
          <div ref={exhibit5TextRef} className={styles.exhibit5TopText}>
            <h3 className={styles.exhibit5Title}>在获得权势之后，阴家开凿了217窟</h3>
          </div>
          <div className={styles.exhibit5Bottom}>
            <div className={styles.exhibit5Placeholder}>
              <span className={styles.exhibit5PlaceholderText}>内容占位符</span>
            </div>
          </div>
        </div>
      </div>

      {/* 展项6 - 报恩君亲 */}
      <div ref={exhibit6Ref} className={styles.exhibit6}>
        {/* 图片 - sticky固定 */}
        <div className={styles.exhibit6ImageWrapper}>
          <img
            src="/picture/chap3/231窟供养人壁画2.png"
            alt="报恩君亲 - 231窟供养人壁画"
            className={styles.exhibit6Image}
          />
        </div>
        {/* 遮罩 - 正常滚动，覆盖在图片右半部分 */}
        <div className={styles.exhibit6Overlay}>
          <div className={styles.exhibit6OverlayContent}>
            <h3 className={styles.exhibit6Title}>报恩君亲</h3>
          </div>
        </div>
        {/* 文本 - 浮现效果 */}
        <div ref={exhibit6TextRef} className={styles.exhibit6TextContainer}>
          <div className={styles.exhibit6TextContent}>
            <p className={styles.exhibit6Text}>
              盛唐逝去，吐蕃已至，政权更迭，敦煌孤城抵抗十一载，至建中二年（781年）才因外无救援、内无粮械而提出"勿徙他境"的条件与吐蕃议和。
            </p>
            <p className={styles.exhibit6Text}>
              在吐蕃统治之下，敦煌阴氏选择出仕吐蕃维系家族，其表面为吐蕃赞普祈福，却借洞窟流露对大唐的眷恋，表达深藏心底的故国之思。
            </p>
          </div>
        </div>
        {/* 交互点 */}
        <Hotspot
          ref={exhibit6HotspotRef}
          x={25}
          y={85}
          active={activePanel === 'baoEnJunQin'}
          onClick={() => togglePanel('baoEnJunQin')}
        />
      </div>

      {/* 展项7 - 新展项 */}
      <div ref={exhibit7Ref} className={styles.exhibit7}>
        {/* 左上角交互点和文本 */}
        <div className={styles.exhibit7TopLeftContainer}>
          <Hotspot ref={exhibit7TopLeftHotspotRef} inline />
          <div ref={exhibit7TopLeftTextRef} className={styles.exhibit7TextPlaceholder}>
            文本占位符
          </div>
        </div>

        {/* 中间五个图片 */}
        <div className={styles.exhibit7ImagesContainer}>
          {[
            '/picture/chap3/吐蕃告身1.png',
            '/picture/chap3/吐蕃告身2.png',
            '/picture/chap3/吐蕃告身3.png',
            '/picture/chap3/吐蕃告身4.png',
            '/picture/chap3/吐蕃告身5.png'
          ].map((src, i) => (
            <div key={i} className={`${styles.exhibit7ImagePlaceholder} ${styles.exhibit7WithImage}`}>
              <img
                src={src}
                alt={`吐蕃告身 ${i + 1}`}
                className={styles.exhibit7ActualImage}
              />
            </div>
          ))}
        </div>

        {/* 右下角交互点 */}
        <Hotspot ref={exhibit7BottomRightHotspotRef} x={95} y={92} />
      </div>

      {/* 展项8 - 竖版文字 */}
      <div ref={exhibit8Ref} className={styles.exhibit8}>
        <div className={styles.exhibit8VerticalText}>
          <div className={styles.exhibit8TextColumn}>江边乱踏于楚歌，</div>
          <div className={styles.exhibit8TextColumn}>陇上痛闻于豺叫。</div>
          <div className={styles.exhibit8TextColumn}>袅声未殄，</div>
          <div className={styles.exhibit8TextColumn}>路绝河西。</div>
          <div className={styles.exhibit8TextColumn}>燕向幕朝，</div>
          <div className={styles.exhibit8TextColumn}>人倾海外。</div>
          <div className={styles.exhibit8TextColumn}>羁维板籍，</div>
          <div className={styles.exhibit8TextColumn}>已负蕃朝；</div>
          <div className={styles.exhibit8TextColumn}>献血盟书，</div>
          <div className={styles.exhibit8TextColumn}>义存甥舅。</div>
          <div className={styles.exhibit8TextColumn}>熊罴爱子，</div>
          <div className={styles.exhibit8TextColumn}>拆襁褓以文身；</div>
          <div className={styles.exhibit8TextColumn}>鹓鹒夫妻，</div>
          <div className={styles.exhibit8TextColumn}>解鬓钿而辫发。</div>
          <div className={styles.exhibit8TextColumn}>岂图恩移旧日，</div>
          <div className={styles.exhibit8TextColumn}>长辞万代之君；</div>
          <div className={styles.exhibit8TextColumn}>事遇此年，</div>
          <div className={styles.exhibit8TextColumn}>屈膝两朝之主。</div>
        </div>
      </div>

      {/* 展项9 - 阴处士碑 */}
      <div ref={exhibit9Ref} className={styles.exhibit9}>
        <div className={styles.exhibit9Inner}>
          <div ref={exhibit9LeftRef} className={styles.exhibit9Left}>
            <div className={styles.exhibit9ImagePlaceholder}>
              <span className={styles.exhibit9ImageText}>图片占位符</span>
            </div>
          </div>
          <div ref={exhibit9RightRef} className={styles.exhibit9Right}>
            <div className={styles.exhibit9Content}>
              <h3 className={styles.exhibit9Title}>中唐 P.4638 《阴处士碑》（局部）</h3>
              <p className={styles.exhibit9Text}>
                "处士"乃有德才而隐居不仕之人。阴嘉政出身官宦世家，却无任何蕃朝职衔，开窟碑文中仅称"阴处士"。这是刻意为之的自我边缘化——以不仕新朝的方式，保存对大唐的忠节。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 展项10 - 归义军 */}
      <div ref={exhibit10Ref} className={styles.exhibit9}>
        <div className={styles.exhibit9Inner}>
          <div ref={exhibit10LeftRef} className={styles.exhibit9Left}>
            <div className={styles.exhibit9ImagePlaceholder}>
              <span className={styles.exhibit9ImageText}>图片占位符</span>
            </div>
          </div>
          <div ref={exhibit10RightRef} className={styles.exhibit9Right}>
            <div className={styles.exhibit9Content}>
              <h3 className={styles.exhibit9Title}>归义军</h3>
              <p className={styles.exhibit9Text}>
                吐蕃统治末期，阴氏家族参与张议潮起义，共复河西。归义军建立后，阴氏先后与张氏、曹氏归义军政权联姻。凭借联姻与军功，阴氏族人出任凉州防御使、河西都僧统等要职。石壁见证了阴氏家族联姻策略的终极兑现，也折射出敦煌世家大族在晚唐五代风云变幻中的存续之道。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 展项11 - 张议潮出行图 */}
      <div ref={exhibit11Ref} className={styles.exhibit11}>
        <div className={`${styles.exhibit9ImagePlaceholder} ${styles.exhibit9WithImage}`}>
          <img
            src="/picture/chap3/张议潮出行图（抠图）.png"
            alt="张议潮出行图"
            className={styles.exhibit11Image}
          />
          <Hotspot
            ref={exhibit11RightHotspotRef}
            x={85}
            y={85}
            active={activePanel === 'zhangYiChaoTravel'}
            onClick={() => togglePanel('zhangYiChaoTravel')}
          />
        </div>
        {/* 展品面板 */}
        <ExhibitPanel
          title={exhibits.zhangYiChaoTravel.title}
          subtitle={exhibits.zhangYiChaoTravel.subtitle}
          description={exhibits.zhangYiChaoTravel.description}
          visible={activePanel === 'zhangYiChaoTravel'}
          onClose={() => setActivePanel(null)}
        />
      </div>

      {/* 展项12 - 张议潮供养像 */}
      <div ref={exhibit12Ref} className={styles.exhibit9}>
        <div className={styles.exhibit9Inner}>
          <div ref={exhibit12LeftRef} className={styles.exhibit9Left}>
            <div className={`${styles.exhibit9ImagePlaceholder} ${styles.exhibit9WithImage}`}>
              <img
                src="/picture/chap3/张议潮供养像（抠图）.png"
                alt="张议潮供养像"
                className={styles.exhibit9ActualImage}
              />
            </div>
            <Hotspot
              ref={exhibit12LeftHotspotRef}
              x={15}
              y={50}
              active={activePanel === 'zhangYiChao'}
              onClick={() => togglePanel('zhangYiChao')}
            />
          </div>
          <div ref={exhibit12RightRef} className={styles.exhibit9Right}>
            <div className={`${styles.exhibit9ImagePlaceholder} ${styles.exhibit9WithImage}`}>
              <img
                src="/picture/chap3/张议潮夫人（抠图）.png"
                alt="张议潮夫人"
                className={styles.exhibit9ActualImage}
              />
            </div>
            <Hotspot
              ref={exhibit12RightHotspotRef}
              x={85}
              y={50}
              active={activePanel === 'zhangYiChaoWife'}
              onClick={() => togglePanel('zhangYiChaoWife')}
            />
          </div>
        </div>
        {/* 展品面板 - 放在展项12容器内 */}
        <ExhibitPanel
          title={exhibits.zhangYiChao.title}
          subtitle={exhibits.zhangYiChao.subtitle}
          description={exhibits.zhangYiChao.description}
          visible={activePanel === 'zhangYiChao'}
          onClose={() => setActivePanel(null)}
        />
        <ExhibitPanel
          title={exhibits.zhangYiChaoWife.title}
          subtitle={exhibits.zhangYiChaoWife.subtitle}
          description={exhibits.zhangYiChaoWife.description}
          visible={activePanel === 'zhangYiChaoWife'}
          onClose={() => setActivePanel(null)}
        />
      </div>

      {/* 展项13 - 安国寺尼智慧性供养像 */}
      <div ref={exhibit13Ref} className={styles.exhibit9}>
        <div className={styles.exhibit13Content}>
          <div className={`${styles.exhibit9ImagePlaceholder} ${styles.exhibit9WithImage}`}>
            <img
              src="/picture/chap3/安国寺尼智慧性供养像（抠图）.PNG"
              alt="安国寺尼智慧性供养像"
              className={styles.exhibit9ActualImage}
            />
            <Hotspot
              ref={exhibit13LeftHotspotRef}
              x={35}
              y={15}
              active={activePanel === 'anGuoTempleNun'}
              onClick={() => togglePanel('anGuoTempleNun')}
            />
          </div>
        </div>
        {/* 展品面板 */}
        <ExhibitPanel
          title={exhibits.anGuoTempleNun.title}
          subtitle={exhibits.anGuoTempleNun.subtitle}
          description={exhibits.anGuoTempleNun.description}
          visible={activePanel === 'anGuoTempleNun'}
          onClose={() => setActivePanel(null)}
        />
      </div>

      {/* 展品面板 */}
      <ExhibitPanel
        title={exhibits.baoYuJing.title}
        subtitle={exhibits.baoYuJing.subtitle}
        description={exhibits.baoYuJing.description}
        visible={activePanel === 'baoYuJing'}
        onClose={() => setActivePanel(null)}
      />
      <ExhibitPanel
        title={exhibits.baoEnJunQin.title}
        subtitle={exhibits.baoEnJunQin.subtitle}
        description={exhibits.baoEnJunQin.description}
        visible={activePanel === 'baoEnJunQin'}
        onClose={() => setActivePanel(null)}
      />

      {/* 全局CSS动画 */}
      <style jsx global>{`
        @keyframes particleFloat {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.6;
          }
          50% {
            transform: translate(-30px, 20px);
            opacity: 0.8;
          }
        }

        @keyframes flowRiver {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </section>
  )
}
