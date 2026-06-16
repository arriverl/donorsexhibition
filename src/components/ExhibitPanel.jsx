import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './ExhibitPanel.module.css'

/**
 * 全局展品卡片
 * 点击交互点后，从页面右侧拉出，占屏幕 3/4 宽，黑底。
 *
 * props:
 *  - title:       标题
 *  - subtitle:    副标题（可选）
 *  - description: 说明文字
 *  - image:       展品图片地址（可选，一般即交互点跟随的图片）
 *  - imagePosition: 图片位置 'left'(默认, 图左文右) | 'top'(图上文下)
 *  - visible:     是否显示
 *  - onClose:     关闭回调
 */
export default function ExhibitPanel({
  title,
  subtitle,
  description,
  image,
  imagePosition = 'left',
  visible,
  onClose,
}) {
  // 控制 DOM 挂载，以便实现滑入/滑出动画
  const [mounted, setMounted] = useState(visible)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (visible) {
      setMounted(true)
      // 下一帧再触发动画，确保 transition 生效
      const raf = requestAnimationFrame(() => setShow(true))
      return () => cancelAnimationFrame(raf)
    } else {
      setShow(false)
      const t = setTimeout(() => setMounted(false), 500)
      return () => clearTimeout(t)
    }
  }, [visible])

  // 打开时锁定背景滚动
  useEffect(() => {
    if (show) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [show])

  // ESC 关闭
  useEffect(() => {
    if (!show) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [show, onClose])

  if (!mounted) return null

  const layoutClass =
    imagePosition === 'top' ? styles.panelTop : styles.panelLeft

  return createPortal(
    <>
      <div
        className={`${styles.backdrop} ${show ? styles.backdropShow : ''}`}
        onClick={onClose}
      />
      <aside
        className={`${styles.panel} ${layoutClass} ${
          show ? styles.panelShow : ''
        }`}
        role="dialog"
        aria-modal="true"
      >
        <button
          className={styles.close}
          onClick={onClose}
          aria-label="关闭"
          type="button"
        >
          &times;
        </button>

        {image && (
          <div className={styles.imageArea}>
            <img src={image} alt={title || '展品图片'} />
          </div>
        )}

        <div className={styles.textArea}>
          {title && <h4 className={styles.title}>{title}</h4>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {(title || subtitle) && <span className={styles.divider} />}
          {description && (
            <p className={styles.description}>{description}</p>
          )}
        </div>
      </aside>
    </>,
    document.body
  )
}
