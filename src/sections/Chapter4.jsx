import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hotspot from '../components/Hotspot'
import styles from './Chapter4.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function Chapter4() {
  const openingSceneRef = useRef(null)
  const descriptionRef = useRef(null)
  const newExhibitRef = useRef(null)
  const secondExhibitRef = useRef(null)
  const [showTreasures, setShowTreasures] = useState(false)
  const treasuresRef = useRef(null)
  const imageContainerRef = useRef(null)
  const verticalTextRef = useRef(null)
  const questionTextRef = useRef(null)
  const dongLeftImageRef = useRef(null)
  const secondImageRef = useRef(null)
  const secondTextRef = useRef(null)
  const [selectedExplorer, setSelectedExplorer] = useState(null)
  const mosaicRefs = useRef([])
  const artifactRefs = useRef([])
  const timelineSectionRef = useRef(null)
  const timelineAxisRef = useRef(null)
  const timelineItemRefs = useRef([])

  const explorers = [
    {
      name: '斯坦因',
      description: '1907年奥雷尔・斯坦因来到敦煌，以四块银锭换走五十捆汉文写卷、五捆藏文写卷，另有一批画作、织物、雕版印刷品及各类器物。1914年，又以极低的价格从王道士手中买走了几百卷写本，装满四大箱。如今，大部分藏品收藏于大英博物馆、大英图书馆、维多利亚与阿尔伯特博物馆，以及印度新德里国家博物馆。'
    },
    {
      name: '伯希和',
      description: '1906-1909年，法国学者保罗・伯希和（1879-1945）从第17窟及莫高窟其他洞窟中，获取了数以万计的文书、数百幅可移动画作，以及大量织物与各类器物。如今，这批文物主要收藏于法国国家图书馆和吉美博物馆。'
    },
    {
      name: '奥登堡',
      description: '俄国奥登堡1914年对莫高窟进行了全面发掘，劫走写卷、绢画等文物。写卷现藏俄罗斯东方学研究所，艺术品及考察日记藏冬宫，俄藏藏经洞文物数量居世界第一。'
    },
    {
      name: '大谷光瑞',
      description: '1910-1914年，日本大谷光瑞伯爵（1876-1948）出资组织三支探险队，前往中亚及中国搜集汉文佛教经卷。大谷探险队第三次考察时，从敦煌获得数百件文书。如今这批文物分藏于中、日、韩多国馆藏机构。'
    }
  ]

  const artifacts = [
    { src: '/picture/chap4/流失文物（1）存哈佛大学艺术博物馆.png', name: '流失文物（1）' },
    { src: '/picture/chap4/流失文物（2）哈佛大学博物馆.png', name: '流失文物（2）' },
    { src: '/picture/chap4/流失文物（3）英国国家博物馆.png', name: '流失文物（3）' },
    { src: '/picture/chap4/流失文物（4）英国国家博物馆.png', name: '流失文物（4）' },
    { src: '/picture/chap4/流失文物（5）俄国人奥登堡.png', name: '流失文物（5）' },
    { src: '/picture/chap4/流失文物（6）俄国人奥登堡.png', name: '流失文物（6）' },
    { src: '/picture/chap4/流失文物（7）俄国人奥登堡.png', name: '流失文物（7）' },
    { src: '/picture/chap4/流失文物（8）纳尔.png', name: '流失文物（8）' },
    { src: '/picture/chap4/流失文物（9）纳尔.png', name: '流失文物（9）' },
    { src: '/picture/chap4/流失文物（10）纳尔.png', name: '流失文物（10）' },
    { src: '/picture/chap4/流失文物（11）法国国家图书馆.png', name: '流失文物（11）' }
  ]

  const timelineEvents = [
    { year: '1909', text: '罗振玉撰写《敦煌石室遗书》《鸣沙山石室秘录》' },
    { year: '1910', text: '清政府将劫余的八千多卷敦煌遗书交送到了北京保存' },
    { year: '1924', text: '陈垣根据劫余遗书编写出《敦煌劫余录》' },
    { year: '1944', text: '国立敦煌艺术研究所成立' },
    { year: '1950', text: '国立敦煌艺术研究所改名为敦煌文物研究所' },
    { year: '1979', text: '兰州大学成立敦煌学研究小组' },
    { year: '1982', text: '兰州大学敦煌学研究小组扩建为敦煌学研究室' },
    { year: '1983', text: '中国敦煌吐鲁番学会成立' },
    { year: '1984', text: '敦煌文物研究所扩建为敦煌研究院' },
    { year: '1999', text: '兰州大学敦煌学研究室扩建为敦煌学研究所' },
    { year: '如今', text: '敦煌的故事仍在继续……' },
  ]

  const getArtifactPosition = (index) => {
    const positions = [
      { top: '8%', left: '3%', width: '24%', height: '25%', transform: 'rotate(-8deg)' },
      { top: '4%', left: '34%', width: '21%', height: '22%', transform: 'rotate(14deg)' },
      { top: '13%', left: '62%', width: '23%', height: '24%', transform: 'rotate(-5deg)' },
      { top: '6%', left: '86%', width: '13%', height: '15%', transform: 'rotate(16deg)' },
      { top: '42%', left: '6%', width: '22%', height: '23%', transform: 'rotate(9deg)' },
      { top: '36%', left: '38%', width: '20%', height: '21%', transform: 'rotate(-12deg)' },
      { top: '48%', left: '66%', width: '24%', height: '25%', transform: 'rotate(6deg)' },
      { top: '40%', left: '88%', width: '11%', height: '13%', transform: 'rotate(-10deg)' },
      { top: '72%', left: '4%', width: '25%', height: '26%', transform: 'rotate(13deg)' },
      { top: '66%', left: '36%', width: '21%', height: '22%', transform: 'rotate(-7deg)' },
      { top: '76%', left: '64%', width: '23%', height: '24%', transform: 'rotate(11deg)' }
    ]
    return positions[index] || positions[0]
  }

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

      // 新展项进入动画
      gsap.set(verticalTextRef.current, { opacity: 0, x: -50 })
      gsap.set(questionTextRef.current, { opacity: 0, x: 50 })
      gsap.set(imageContainerRef.current, { opacity: 0, x: -100 })
      gsap.set(dongLeftImageRef.current, { opacity: 0 })

      gsap.to(verticalTextRef.current, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: newExhibitRef.current,
          start: 'top 70%',
        },
      })

      gsap.to(questionTextRef.current, {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: newExhibitRef.current,
          start: 'top 70%',
        },
      })

      // 第二个展项进入动画
      gsap.set(secondImageRef.current, { opacity: 0, x: 100 })
      gsap.set(secondTextRef.current, { opacity: 0, y: 50 })

      gsap.to(secondImageRef.current, {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: secondExhibitRef.current,
          start: 'top 60%',
        },
      })

      gsap.to(secondTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: secondExhibitRef.current,
          start: 'top 60%',
        },
      })

      // 流失文物过渡动画
      // 逻辑：用户先完整浏览探险家页面（一屏），滚到该页顶部对齐视口顶部时锁定（pin），
      // 继续下滑才驱动 timeline：文字消失 → 探险家照片破碎 → 流失文物碎片重组出现。
      const explorerRotations = [-1.5, 2, 1, -1]

      // 探险家照片初始状态（覆盖 inline transform，保证反向可逆）
      mosaicRefs.current.forEach((ref, i) => {
        if (ref) {
          gsap.set(ref, {
            rotation: explorerRotations[i],
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            x: 0,
            y: 0,
          })
        }
      })

      // 流失文物碎片初始状态（不可见）
      artifactRefs.current.forEach((ref) => {
        if (ref) {
          gsap.set(ref, { opacity: 0, scale: 0.3, rotation: 0 })
        }
      })

      // 过渡 timeline，pin 锁定 + scrub 滚动驱动
      const transitionTl = gsap.timeline({
        scrollTrigger: {
          trigger: secondExhibitRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      // 1. 右侧文字向右滑出消失
      transitionTl.to(secondTextRef.current, {
        opacity: 0,
        x: 60,
        duration: 0.25,
        ease: 'power2.in',
      }, 0)

      // 2. 探险家照片依次破碎飞散
      mosaicRefs.current.forEach((ref, i) => {
        if (ref) {
          transitionTl.to(ref, {
            opacity: 0,
            scale: 0.5,
            rotation: explorerRotations[i] + (Math.random() - 0.5) * 60,
            filter: 'blur(6px)',
            duration: 0.3,
            ease: 'power3.in',
          }, 0.15 + i * 0.04)
        }
      })

      // 3. 流失文物碎片重组浮现
      artifactRefs.current.forEach((ref, i) => {
        if (ref) {
          transitionTl.fromTo(ref,
            { opacity: 0, scale: 0.3, rotation: Math.random() * 360 },
            {
              opacity: 1,
              scale: 1,
              rotation: (Math.random() - 0.5) * 8,
              duration: 0.35,
              ease: 'power2.out',
            },
            0.6 + i * 0.035
          )
        }
      })

      // 时间轴过渡与节点呈现
      // 1) 收束：滚动从流失文物进入时间轴时，碎片向时间轴顶端汇聚并消融
      // 2) 节点：时间轴 pin 锁定，轴线随滚动下绘，节点逐个浮现
      const mm = gsap.matchMedia()

      mm.add('(min-width: 769px)', () => {
        const targetX = window.innerWidth * 0.86
        const targetY = 96

        // 收束 timeline
        const convergeTl = gsap.timeline({
          scrollTrigger: {
            trigger: timelineSectionRef.current,
            start: 'top bottom',
            end: 'top top',
            scrub: 1,
          },
        })

        artifactRefs.current.forEach((ref) => {
          if (!ref) return
          const rect = ref.getBoundingClientRect()
          const dx = targetX - (rect.left + rect.width / 2)
          const dy = targetY - (rect.top + rect.height / 2)
          convergeTl.to(ref, {
            x: dx,
            y: dy,
            scale: 0.12,
            rotation: 0,
            opacity: 0,
            duration: 1,
            ease: 'power2.in',
          }, 0)
        })

        // 节点呈现 timeline（pin）
        gsap.set(timelineAxisRef.current, { scaleY: 0, transformOrigin: 'top center' })
        gsap.set(timelineItemRefs.current.filter(Boolean), { opacity: 0, x: 40 })

        const nodeTl = gsap.timeline({
          scrollTrigger: {
            trigger: timelineSectionRef.current,
            start: 'top top',
            end: '+=300%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        })

        nodeTl.to(timelineAxisRef.current, {
          scaleY: 1,
          duration: 1,
          ease: 'none',
        }, 0)

        timelineItemRefs.current.forEach((ref, i) => {
          if (ref) {
            nodeTl.to(ref, {
              opacity: 1,
              x: 0,
              duration: 0.5,
              ease: 'power2.out',
            }, 0.1 + i * 0.08)
          }
        })
      })

      // 移动端：无碎片收束，节点随滚动简单浮现
      mm.add('(max-width: 768px)', () => {
        gsap.set(timelineItemRefs.current.filter(Boolean), { opacity: 0, y: 30 })
        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: timelineSectionRef.current,
            start: 'top 70%',
            end: 'bottom 90%',
            scrub: 1,
          },
        })
        timelineItemRefs.current.forEach((ref, i) => {
          if (ref) {
            mobileTl.to(ref, {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: 'power2.out',
            }, i * 0.08)
          }
        })
      })
    }, null)

    // 图片加载后高度变化会导致 ScrollTrigger 位置错位（pin 提前触发、页面重叠），
    // 必须在图片加载完成后刷新所有触发点。
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const refreshTimer = setTimeout(refresh, 500)
    setTimeout(refresh, 1500)

    return () => {
      ctx.revert()
      window.removeEventListener('load', refresh)
      clearTimeout(refreshTimer)
    }
  }, [])

  // 点击问号显示宝藏列表
  const handleQuestionClick = () => {
    setShowTreasures(true)
    // 图片淡入动画
    gsap.to(imageContainerRef.current, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power2.out',
    })
    // 小图片淡入动画
    gsap.to(dongLeftImageRef.current, {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    })
  }

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

        {/* 藏经洞进入页面图片和展品组标题 */}
        <div className={styles.openingPageContainer}>
          {/* 左边图片 */}
          <img
            src="/picture/chap4/藏经洞进入页面（2）.png"
            alt="藏经洞进入页面"
            className={styles.openingPageImage}
          />
          {/* 右边展品组标题和说明 */}
          <div className={styles.exhibitInfoContainer}>
            <h3 className={styles.exhibitTitle}>藏经洞</h3>
            <p className={styles.exhibitDescription}>
              张议潮收复河西得僧首吴洪辩助力，二人分别受封归义军节度使与朝廷敕赏。吴洪辩营建16、365等窟，16窟侧的17窟原为其影堂，弟子塑像、镌告身、撰邈真赞以祀。后窟中封存大批经卷文书，即敦煌藏经洞。
            </p>
          </div>
        </div>
      </div>

      {/* 新增展项页面 */}
      <div ref={newExhibitRef} className={styles.newExhibitPage}>
        {/* 左侧图片容器 */}
        <div ref={imageContainerRef} className={styles.leftImageContainer}>
          <img
            src="/picture/chap4/藏经洞里有什么（1）.png"
            alt="藏经洞里有什么1"
            className={styles.leftImage}
          />
        </div>

        {/* 文本区域 */}
        <div className={styles.textArea}>
          {/* 第一段：竖向文本 */}
          <div ref={verticalTextRef} className={styles.verticalText}>
            藏经洞里
            {/* 第二张小图片放在"洞里"左边 */}
            <img
              ref={dongLeftImageRef}
              src="/picture/chap4/藏经洞里有什么（2）.png"
              alt="藏经洞里有什么2"
              className={styles.dongLeftImage}
            />
          </div>

          {/* 第二段和第三段：问号文本和宝藏列表 */}
          <div className={styles.questionContainer}>
            {/* 横向问号文本 */}
            <div ref={questionTextRef} className={styles.questionText}>
              有什么？
              <Hotspot
                inline
                active={showTreasures}
                onClick={handleQuestionClick}
                className={styles.questionHotspot}
              />
            </div>

            {/* 宝藏列表（点击后显示） */}
            {showTreasures && (
              <div ref={treasuresRef} className={styles.treasuresList}>
                <div className={styles.treasureTitle}>藏经洞里的十大类宝贝</div>
                <ul className={styles.treasureItems}>
                  <li>宗教典籍</li>
                  <li>儒家经典</li>
                  <li>历史地理文献</li>
                  <li>官私文书</li>
                  <li>科技文献</li>
                  <li>文学典籍</li>
                  <li>非汉文文献</li>
                  <li>工匠和商行</li>
                  <li>书法</li>
                  <li>绢画和刺绣等艺术品</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 展项之间的分隔 */}
      <div className={styles.exhibitDivider}></div>

      {/* 第二个展项页面 */}
      <div ref={secondExhibitRef} className={styles.secondExhibitPage}>
        {/* 探险家内容区（带内边距） */}
        <div className={styles.explorerContent}>
        {/* 左侧图片容器 - 四分之三页面 */}
        <div ref={secondImageRef} className={styles.leftImageMosaic}>
          <div className={styles.mosaicContainer}>
            {/* 探险家马赛克 */}
            <div
              ref={el => mosaicRefs.current[0] = el}
              className={styles.mosaicItem}
              style={{ top: '4%', left: '3%', width: '46%', height: '42%', zIndex: 4, transform: 'rotate(-1.5deg)' }}
            >
              <img
                src="/picture/chap4/斯坦因.png"
                alt="斯坦因"
                className={styles.mosaicImage}
                onClick={() => setSelectedExplorer(explorers[0])}
              />
            </div>
            <div
              ref={el => mosaicRefs.current[1] = el}
              className={styles.mosaicItem}
              style={{ top: '10%', left: '48%', width: '48%', height: '40%', zIndex: 3, transform: 'rotate(2deg)' }}
            >
              <img
                src="/picture/chap4/伯希和.png"
                alt="伯希和"
                className={styles.mosaicImage}
                onClick={() => setSelectedExplorer(explorers[1])}
              />
            </div>
            <div
              ref={el => mosaicRefs.current[2] = el}
              className={styles.mosaicItem}
              style={{ top: '45%', left: '1%', width: '49%', height: '48%', zIndex: 2, transform: 'rotate(1deg)' }}
            >
              <img
                src="/picture/chap4/奥登堡.png"
                alt="奥登堡"
                className={styles.mosaicImage}
                onClick={() => setSelectedExplorer(explorers[2])}
              />
            </div>
            <div
              ref={el => mosaicRefs.current[3] = el}
              className={styles.mosaicItem}
              style={{ top: '50%', left: '50%', width: '47%', height: '45%', zIndex: 1, transform: 'rotate(-1deg)' }}
            >
              <img
                src="/picture/chap4/大谷光瑞.png"
                alt="大谷光瑞"
                className={styles.mosaicImage}
                onClick={() => setSelectedExplorer(explorers[3])}
              />
            </div>

            {/* 裂缝效果 */}
            <div className={styles.crackEffect}></div>
          </div>
        </div>

        {/* 右侧文本区域 - 四分之一页面 */}
        <div ref={secondTextRef} className={styles.rightTextArea}>
          {selectedExplorer ? (
            <div className={styles.explorerInfo}>
              <h3 className={styles.explorerName}>{selectedExplorer.name}</h3>
              <p className={styles.explorerDescription}>
                {selectedExplorer.description}
              </p>
              <button
                className={styles.backButton}
                onClick={() => setSelectedExplorer(null)}
              >
                返回
              </button>
            </div>
          ) : (
            <div className={styles.defaultText}>
              <h3 className={styles.defaultTitle}>探险家与莫高窟文物的流浪</h3>
              <p className={styles.defaultDescription}>
                19世纪末起，多国探险队涌入敦煌，大肆劫掠壁画与彩塑。敦煌文物的流失，其数量无从估计，以至有"敦煌者，我国学术之伤心史也"之嗟叹。
              </p>
            </div>
          )}
        </div>
        </div>
      </div>

      {/* 流失文物碎片 - 固定视口层，初始不可见；从流失文物收束至时间轴顶端 */}
      {artifacts.map((artifact, index) => {
        const position = getArtifactPosition(index)
        const clipPaths = [
          'polygon(0% 18%, 22% 0%, 58% 6%, 100% 0%, 94% 38%, 100% 72%, 70% 100%, 28% 94%, 0% 80%, 6% 48%)',
          'polygon(12% 0%, 50% 8%, 88% 0%, 100% 30%, 92% 68%, 100% 100%, 60% 92%, 18% 100%, 0% 62%, 8% 28%)',
          'polygon(0% 8%, 38% 0%, 78% 10%, 100% 0%, 96% 42%, 100% 78%, 72% 100%, 30% 96%, 0% 88%, 4% 50%)',
          'polygon(8% 0%, 46% 6%, 100% 4%, 92% 34%, 100% 66%, 84% 100%, 40% 94%, 0% 88%, 6% 52%, 0% 20%)',
          'polygon(0% 12%, 30% 0%, 70% 8%, 100% 0%, 94% 40%, 100% 74%, 64% 100%, 24% 96%, 0% 82%, 8% 46%)',
          'polygon(14% 0%, 54% 4%, 90% 0%, 100% 36%, 96% 70%, 100% 100%, 56% 90%, 14% 100%, 0% 64%, 4% 26%)',
          'polygon(0% 6%, 34% 0%, 74% 8%, 100% 2%, 98% 44%, 100% 80%, 68% 100%, 26% 92%, 0% 86%, 2% 44%)',
          'polygon(10% 0%, 48% 6%, 86% 0%, 100% 32%, 94% 66%, 100% 100%, 62% 96%, 20% 100%, 0% 70%, 6% 30%)',
          'polygon(0% 14%, 26% 0%, 66% 6%, 100% 0%, 96% 38%, 100% 76%, 74% 100%, 32% 94%, 0% 84%, 4% 48%)',
          'polygon(12% 0%, 52% 8%, 90% 2%, 100% 34%, 92% 68%, 100% 100%, 58% 92%, 16% 100%, 0% 66%, 6% 28%)',
          'polygon(0% 10%, 36% 0%, 76% 8%, 100% 4%, 94% 42%, 100% 76%, 70% 100%, 28% 96%, 0% 88%, 6% 50%)'
        ]
        return (
          <div
            key={index}
            ref={el => artifactRefs.current[index] = el}
            className={styles.artifactFragment}
            style={{
              ...position,
              opacity: 0,
              clipPath: clipPaths[index]
            }}
          >
            <img
              src={artifact.src}
              alt={artifact.name}
              className={styles.artifactImage}
            />
          </div>
        )
      })}

      {/* 时间轴页面：学脉传承 */}
      <div ref={timelineSectionRef} className={styles.timelinePage}>
        <div className={styles.timelineTrack}>
          {/* 右侧轴线 */}
          <div className={styles.timelineAxisWrap}>
            <div ref={timelineAxisRef} className={styles.timelineAxis}></div>
          </div>

          {/* 时间节点 */}
          {timelineEvents.map((event, index) => (
            <div
              key={index}
              ref={el => timelineItemRefs.current[index] = el}
              className={`${styles.timelineItem} ${event.year === '如今' ? styles.timelineItemFinal : ''}`}
            >
              <div className={styles.timelineContent}>
                <span className={styles.timelineYear}>{event.year}</span>
                <span className={styles.timelineText}>{event.text}</span>
              </div>
              <div className={styles.timelineNode}>
                <span className={styles.timelineNodeInner}></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
