import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default function ModelViewer({ modelPath }) {
  const containerRef = useRef(null)
  const [status, setStatus] = useState('loading') // loading | loaded | error

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    let width = container.clientWidth
    let height = container.clientHeight
    // 容器尚未布局时回退到一个安全尺寸，避免 aspect 为 NaN / 渲染尺寸为 0
    if (!width || !height) {
      width = width || 400
      height = height || 400
    }

    // 创建场景
    const scene = new THREE.Scene()
    scene.background = null // 透明背景

    // 创建相机
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 5000)
    camera.position.set(0, 0, 5)

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // 鼠标交互：拖动旋转（不抢页面滚动）
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.enablePan = false
    controls.enableZoom = false
    controls.rotateSpeed = 0.8

    // 添加灯光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0)
    directionalLight.position.set(5, 8, 6)
    scene.add(directionalLight)

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4)
    fillLight.position.set(-6, -2, -4)
    scene.add(fillLight)

    // 用于在加载完成后调整相机的模型句柄
    let modelRoot = null

    // 加载模型
    const loader = new GLTFLoader()

    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene

        // 计算模型包围盒
        const box = new THREE.Box3().setFromObject(model)
        const size = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z) || 1

        // 归一化到统一的世界尺寸（与像素无关），避免相机落入模型内部
        const targetSize = 4
        const scale = targetSize / maxDim
        model.scale.setScalar(scale)

        // 缩放后重新居中到原点
        model.position.x = -center.x * scale
        model.position.y = -center.y * scale
        model.position.z = -center.z * scale

        scene.add(model)
        modelRoot = model

        // 根据缩放后的模型尺寸自动调整相机距离，保证完整可见
        const fov = camera.fov * (Math.PI / 180)
        const scaledMax = maxDim * scale
        const fitDistance = scaledMax / 2 / Math.tan(fov / 2)
        const distance = fitDistance * 1.4
        camera.near = distance / 100
        camera.far = distance * 100
        camera.position.set(0, 0, distance)
        camera.lookAt(0, 0, 0)
        camera.updateProjectionMatrix()
        controls.update()

        setStatus('loaded')
      },
      (progress) => {
        if (progress.total > 0) {
          // 可在控制台观察大模型加载进度
          console.log(
            `${modelPath} 加载进度:`,
            ((progress.loaded / progress.total) * 100).toFixed(1) + '%'
          )
        }
      },
      (error) => {
        console.error('模型加载失败:', modelPath, error)
        setStatus('error')
      }
    )

    // 动画循环（驱动 OrbitControls 阻尼）
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // 处理窗口大小变化
    const handleResize = () => {
      const newWidth = container.clientWidth || width
      const newHeight = container.clientHeight || height
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }
    window.addEventListener('resize', handleResize)

    // 清理
    return () => {
      window.removeEventListener('resize', handleResize)
      controls.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      // 释放模型显存
      if (modelRoot) {
        modelRoot.traverse((obj) => {
          if (obj.geometry) obj.geometry.dispose()
          if (obj.material) {
            const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
            mats.forEach((m) => {
              Object.values(m).forEach((v) => {
                if (v && v.isTexture) v.dispose()
              })
              m.dispose()
            })
          }
        })
      }
    }
  }, [modelPath])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      {status === 'loading' && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'rgba(0,0,0,0.3)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          3D模型加载中...
        </div>
      )}
      {status === 'error' && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'rgba(180,40,40,0.6)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          模型加载失败
        </div>
      )}
    </div>
  )
}