import { useEffect, useRef } from 'react'

/**
 * Brand Triad Palette for each of the 5 Engineering Domains
 * Uses Ultoxy brand colors: #00FFC6 (Mint Cyan), #006CFF (Electric Cobalt), #FF6EC7 (Neon Magenta)
 */
const MODE_PALETTES = [
  {
    // 01 WEB — Geodesic Global Lattice
    primary: [0, 255, 198], // #00FFC6
    secondary: [0, 108, 255], // #006CFF
    accent: [255, 110, 199], // #FF6EC7
    rotSpeedY: 0.0032,
    rotSpeedX: 0.0011,
  },
  {
    // 02 APPS — Dual Kinetic Helix & Spatial Frames
    primary: [0, 108, 255], // #006CFF
    secondary: [255, 110, 199], // #FF6EC7
    accent: [0, 255, 198], // #00FFC6
    rotSpeedY: 0.0038,
    rotSpeedX: -0.0014,
  },
  {
    // 03 ERP — 4D Tesseract Hypercube Matrix
    primary: [0, 255, 198], // #00FFC6
    secondary: [255, 110, 199], // #FF6EC7
    accent: [0, 108, 255], // #006CFF
    rotSpeedY: 0.0028,
    rotSpeedX: 0.0018,
  },
  {
    // 04 GROWTH — Harmonic Vector Wavefield & Spire
    primary: [255, 110, 199], // #FF6EC7
    secondary: [0, 108, 255], // #006CFF
    accent: [0, 255, 198], // #00FFC6
    rotSpeedY: 0.0034,
    rotSpeedX: 0.001,
  },
  {
    // 05 SEO — Astrolabe Search Radar & Constellation
    primary: [0, 255, 198], // #00FFC6
    secondary: [0, 108, 255], // #006CFF
    accent: [255, 110, 199], // #FF6EC7
    rotSpeedY: -0.003,
    rotSpeedX: 0.0015,
  },
]

/**
 * Generates 5 distinct 3D architectural topologies with exact vertex coordinates
 * and structural edge pairs for `count` vertices.
 */
function buildTopologies(count) {
  const topologies = []

  // =========================================================================
  // MODE 0: 01 / WEB — Geodesic Sphere + Dual Equatorial Orbital Rings
  // =========================================================================
  {
    const pts = []
    const edges = []
    const sphereCount = Math.floor(count * 0.72)
    const ringCount = count - sphereCount
    const goldenAngle = Math.PI * (3 - Math.sqrt(5))

    for (let i = 0; i < sphereCount; i++) {
      const y = 1 - (i / (sphereCount - 1)) * 2
      const r = Math.sqrt(Math.max(0, 1 - y * y))
      const theta = goldenAngle * i
      const rad = 185
      pts.push({
        x: Math.cos(theta) * r * rad,
        y: y * rad,
        z: Math.sin(theta) * r * rad,
        group: 0,
      })
    }

    for (let i = 0; i < ringCount; i++) {
      const angle = (i / ringCount) * Math.PI * 2
      const isOuter = i % 2 === 0
      const rad = isOuter ? 268 : 232
      const tilt = isOuter ? 0.42 : -0.48
      const cx = Math.cos(angle) * rad
      const cz = Math.sin(angle) * rad
      pts.push({
        x: cx,
        y: cz * Math.sin(tilt),
        z: cz * Math.cos(tilt),
        group: isOuter ? 1 : 2,
      })
    }

    // Connect nearest geodesic neighbors on sphere
    for (let i = 0; i < sphereCount; i++) {
      for (let j = i + 1; j < sphereCount; j++) {
        const dx = pts[i].x - pts[j].x
        const dy = pts[i].y - pts[j].y
        const dz = pts[i].z - pts[j].z
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (dist < 78) {
          edges.push([i, j, 0])
        }
      }
    }

    // Connect orbital ring segments
    const outerIndices = []
    const innerIndices = []
    for (let i = sphereCount; i < count; i++) {
      if (pts[i].group === 1) outerIndices.push(i)
      else innerIndices.push(i)
    }
    for (let k = 0; k < outerIndices.length; k++) {
      edges.push([
        outerIndices[k],
        outerIndices[(k + 1) % outerIndices.length],
        1,
      ])
    }
    for (let k = 0; k < innerIndices.length; k++) {
      edges.push([
        innerIndices[k],
        innerIndices[(k + 1) % innerIndices.length],
        2,
      ])
    }

    topologies.push({ pts, edges })
  }

  // =========================================================================
  // MODE 1: 02 / APPS — Synchronized Twin-Helix & Gyroscopic Native Frames
  // =========================================================================
  {
    const pts = []
    const edges = []
    const helixPairs = Math.floor(count * 0.36)
    const usedForHelix = helixPairs * 2
    const rem = count - usedForHelix

    for (let i = 0; i < helixPairs; i++) {
      const t = i / (helixPairs - 1)
      const y = (t - 0.5) * 360
      const angle = t * Math.PI * 3.5
      const rad = 128 + Math.sin(t * Math.PI) * 36

      // Strand A (iOS)
      pts.push({
        x: Math.cos(angle) * rad,
        y,
        z: Math.sin(angle) * rad,
        group: 0,
      })
      // Strand B (Android)
      pts.push({
        x: Math.cos(angle + Math.PI) * rad,
        y,
        z: Math.sin(angle + Math.PI) * rad,
        group: 1,
      })

      const idxA = i * 2
      const idxB = i * 2 + 1
      // Cross-bridge rung every 2 steps
      if (i % 2 === 0) {
        edges.push([idxA, idxB, 2])
      }
      if (i > 0) {
        edges.push([idxA - 2, idxA, 0])
        edges.push([idxB - 2, idxB, 1])
      }
    }

    // Outer gyroscopic frame ring
    for (let i = 0; i < rem; i++) {
      const angle = (i / rem) * Math.PI * 2
      const rad = 248
      pts.push({
        x: Math.cos(angle) * rad,
        y: Math.sin(angle) * rad * 0.55,
        z: Math.sin(angle) * rad * 0.82,
        group: 2,
      })
      const curr = usedForHelix + i
      const next = usedForHelix + ((i + 1) % rem)
      edges.push([curr, next, 1])
      if (i % 4 === 0 && i * 2 < usedForHelix) {
        edges.push([curr, (i * 2) % usedForHelix, 2])
      }
    }

    topologies.push({ pts, edges })
  }

  // =========================================================================
  // MODE 2: 03 / ERP — 4D-Projected Tesseract Hypercube & Core Matrix
  // =========================================================================
  {
    const pts = []
    const edges = []

    // 8 Outer cube corners + 8 Inner cube corners + subdivided edge nodes + inner 3x3x3 lattice
    const outerSize = 168
    const innerSize = 86
    const corners = [
      [-1, -1, -1],
      [1, -1, -1],
      [1, 1, -1],
      [-1, 1, -1],
      [-1, -1, 1],
      [1, -1, 1],
      [1, 1, 1],
      [-1, 1, 1],
    ]

    // First 8: Outer cube vertices
    corners.forEach(([cx, cy, cz]) => {
      pts.push({
        x: cx * outerSize,
        y: cy * outerSize,
        z: cz * outerSize,
        group: 0,
      })
    })
    // Next 8: Inner cube vertices
    corners.forEach(([cx, cy, cz]) => {
      pts.push({
        x: cx * innerSize,
        y: cy * innerSize,
        z: cz * innerSize,
        group: 1,
      })
    })

    const cubeEdges = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],
    ]

    // Connect outer cube, inner cube, and 4D diagonal struts
    cubeEdges.forEach(([a, b]) => {
      edges.push([a, b, 0])
      edges.push([a + 8, b + 8, 1])
    })
    for (let c = 0; c < 8; c++) {
      edges.push([c, c + 8, 2])
    }

    // Subdivide cube edges and populate internal matrix nodes for remaining vertices
    let idx = 16
    while (idx < count) {
      const k = idx - 16
      if (k < 27 && idx < count) {
        // 3x3x3 core matrix
        const gx = (k % 3) - 1
        const gy = (Math.floor(k / 3) % 3) - 1
        const gz = (Math.floor(k / 9) % 3) - 1
        const step = 52
        pts.push({
          x: gx * step,
          y: gy * step,
          z: gz * step,
          group: 2,
        })
        if (k > 0) {
          edges.push([idx, 8 + (k % 8), 1])
        }
      } else {
        // Subdivided outer architectural frame points
        const edgeIdx = k % cubeEdges.length
        const [cA, cB] = cubeEdges[edgeIdx]
        const frac = ((Math.floor(k / cubeEdges.length) % 4) + 1) / 5
        const scale = k % 2 === 0 ? outerSize : innerSize
        const a = corners[cA]
        const b = corners[cB]
        pts.push({
          x: (a[0] + (b[0] - a[0]) * frac) * scale,
          y: (a[1] + (b[1] - a[1]) * frac) * scale,
          z: (a[2] + (b[2] - a[2]) * frac) * scale,
          group: k % 2 === 0 ? 0 : 1,
        })
        if (idx > 16 && k % 3 === 0) {
          edges.push([idx, idx - 1, 0])
        }
      }
      idx++
    }

    topologies.push({ pts, edges })
  }

  // =========================================================================
  // MODE 3: 04 / GROWTH — Harmonic Topographic Wavefield & Ascending Spire
  // =========================================================================
  {
    const pts = []
    const edges = []
    const gridSide = Math.floor(Math.sqrt(count * 0.78))
    const gridTotal = gridSide * gridSide
    const span = 380

    for (let r = 0; r < gridSide; r++) {
      for (let c = 0; c < gridSide; c++) {
        const u = c / (gridSide - 1) - 0.5
        const v = r / (gridSide - 1) - 0.5
        const x = u * span
        const z = v * span
        const dist = Math.sqrt(u * u + v * v) * 6.2
        const y = Math.cos(dist) * 68 - dist * 14 + 30
        pts.push({ x, y, z, group: r % 2 })

        const curr = r * gridSide + c
        if (c < gridSide - 1) edges.push([curr, curr + 1, 0])
        if (r < gridSide - 1) edges.push([curr, curr + gridSide, 1])
      }
    }

    // Ascending central vortex spire for remaining nodes
    const rem = count - gridTotal
    for (let i = 0; i < rem; i++) {
      const t = i / Math.max(1, rem - 1)
      const angle = t * Math.PI * 5
      const rad = (1 - t * 0.75) * 145
      const y = 140 - t * 310
      pts.push({
        x: Math.cos(angle) * rad,
        y,
        z: Math.sin(angle) * rad,
        group: 2,
      })
      const curr = gridTotal + i
      if (i > 0) edges.push([curr - 1, curr, 2])
    }

    topologies.push({ pts, edges })
  }

  // =========================================================================
  // MODE 4: 05 / SEO — Astrolabe Search Radar & Precision Constellation
  // =========================================================================
  {
    const pts = []
    const edges = []

    // 4 Concentric tilted astrolabe rings + central octant core
    const rings = [
      { rad: 255, tiltX: 0.22, tiltZ: 0.1, group: 0 },
      { rad: 198, tiltX: -0.65, tiltZ: 0.35, group: 1 },
      { rad: 142, tiltX: 0.85, tiltZ: -0.45, group: 2 },
      { rad: 82, tiltX: -0.3, tiltZ: 0.9, group: 0 },
    ]

    const perRing = Math.floor((count - 8) / rings.length)
    let cursor = 0

    rings.forEach((ring, rIdx) => {
      const start = cursor
      for (let i = 0; i < perRing; i++) {
        const a = (i / perRing) * Math.PI * 2
        let x = Math.cos(a) * ring.rad
        let y = 0
        let z = Math.sin(a) * ring.rad

        // Rotate by tiltX then tiltZ
        const y1 = y * Math.cos(ring.tiltX) - z * Math.sin(ring.tiltX)
        const z1 = y * Math.sin(ring.tiltX) + z * Math.cos(ring.tiltX)
        const x2 = x * Math.cos(ring.tiltZ) - y1 * Math.sin(ring.tiltZ)
        const y2 = x * Math.sin(ring.tiltZ) + y1 * Math.cos(ring.tiltZ)

        pts.push({ x: x2, y: y2, z: z1, group: ring.group })
        cursor++
      }
      for (let i = 0; i < perRing; i++) {
        edges.push([start + i, start + ((i + 1) % perRing), rIdx % 3])
        if (rIdx > 0 && i % 4 === 0) {
          edges.push([start + i, start - perRing + i, 2])
        }
      }
    })

    // Remaining nodes form central precision beacon
    const beaconStart = cursor
    while (cursor < count) {
      const k = cursor - beaconStart
      const a = (k / 8) * Math.PI * 2
      const isAxis = k < 2
      pts.push({
        x: isAxis ? 0 : Math.cos(a) * 38,
        y: k === 0 ? -165 : k === 1 ? 165 : 0,
        z: isAxis ? 0 : Math.sin(a) * 38,
        group: 2,
      })
      if (cursor > beaconStart) {
        edges.push([beaconStart, cursor, 2])
        if (beaconStart + 1 < count) {
          edges.push([beaconStart + 1, cursor, 0])
        }
      }
      cursor++
    }

    topologies.push({ pts, edges })
  }

  return topologies
}

export default function ServicesHeroCanvas({ activeMode = 0 }) {
  const canvasRef = useRef(null)
  const modeRef = useRef(activeMode)

  useEffect(() => {
    modeRef.current = activeMode
  }, [activeMode])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const isMobile = window.innerWidth < 768
    const NODE_COUNT = isMobile ? 96 : 156
    const STAR_COUNT = isMobile ? 28 : 56
    const PULSE_COUNT = isMobile ? 10 : 18

    const topologies = buildTopologies(NODE_COUNT)

    // Initialize live 3D vertices
    const initialPts = topologies[modeRef.current]?.pts || topologies[0].pts
    const nodes = initialPts.map((pt, i) => ({
      x: pt.x * 1.35,
      y: pt.y * 1.35,
      z: pt.z * 1.35,
      vx: 0,
      vy: 0,
      vz: 0,
      phase: (i / NODE_COUNT) * Math.PI * 2,
      group: pt.group,
    }))

    // Deep-field spatial dust particles
    const stars = Array.from({ length: STAR_COUNT }, (_, i) => ({
      x: (Math.random() - 0.5) * 1200,
      y: (Math.random() - 0.5) * 760,
      z: (Math.random() - 0.5) * 600,
      size: 0.8 + (i % 3) * 0.55,
      alpha: 0.16 + (i % 5) * 0.08,
      speed: 0.18 + (i % 4) * 0.08,
    }))

    // Luminous data packets travelling along structural edges
    const pulses = Array.from({ length: PULSE_COUNT }, (_, i) => ({
      edgeIndex: i * 3,
      progress: Math.random(),
      speed: 0.008 + (i % 5) * 0.0032,
      colorType: i % 3,
    }))

    // Smooth interpolated palette state
    const currentPalette = {
      primary: [...MODE_PALETTES[modeRef.current].primary],
      secondary: [...MODE_PALETTES[modeRef.current].secondary],
      accent: [...MODE_PALETTES[modeRef.current].accent],
    }

    let width = 0
    let height = 0
    let dpr = 1

    const updateSize = () => {
      if (!canvas.parentElement) return
      const rect = canvas.parentElement.getBoundingClientRect()
      width = Math.max(320, rect.width)
      height = Math.max(480, rect.height)
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    updateSize()
    window.addEventListener('resize', updateSize)

    // Pointer interaction state
    const pointer = {
      x: 0,
      y: 0,
      screenX: -9999,
      screenY: -9999,
      targetRotX: 0.16,
      targetRotY: -0.24,
      rotX: 0.16,
      rotY: -0.24,
      autoAngleY: 0,
      autoAngleX: 0,
      isDragging: false,
      lastX: 0,
      lastY: 0,
    }

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const clientY = e.touches ? e.touches[0].clientY : e.clientY
      pointer.screenX = clientX - rect.left
      pointer.screenY = clientY - rect.top

      const nx = (pointer.screenX / Math.max(1, width) - 0.5) * 2
      const ny = (pointer.screenY / Math.max(1, height) - 0.5) * 2

      if (pointer.isDragging) {
        const dx = clientX - pointer.lastX
        const dy = clientY - pointer.lastY
        pointer.targetRotY += dx * 0.0065
        pointer.targetRotX = Math.max(
          -1.1,
          Math.min(1.1, pointer.targetRotX + dy * 0.0065)
        )
        pointer.lastX = clientX
        pointer.lastY = clientY
      } else {
        pointer.targetRotY = nx * 0.48
        pointer.targetRotX = -ny * 0.34
      }
    }

    const handlePointerDown = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const clientY = e.touches ? e.touches[0].clientY : e.clientY
      pointer.isDragging = true
      pointer.lastX = clientX
      pointer.lastY = clientY
    }

    const handlePointerUp = () => {
      pointer.isDragging = false
    }

    const handlePointerLeave = () => {
      pointer.isDragging = false
      pointer.screenX = -9999
      pointer.screenY = -9999
    }

    window.addEventListener('mousemove', handlePointerMove, { passive: true })
    canvas.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('mouseup', handlePointerUp)
    canvas.addEventListener('mouseleave', handlePointerLeave)
    canvas.addEventListener('touchstart', handlePointerDown, { passive: true })
    canvas.addEventListener('touchmove', handlePointerMove, { passive: true })
    canvas.addEventListener('touchend', handlePointerUp, { passive: true })

    let rafId = null
    let time = 0

    const lerpColor = (curr, targ, t) => {
      curr[0] += (targ[0] - curr[0]) * t
      curr[1] += (targ[1] - curr[1]) * t
      curr[2] += (targ[2] - curr[2]) * t
    }

    const rgbStr = (arr, alpha = 1) =>
      `rgba(${Math.round(arr[0])}, ${Math.round(arr[1])}, ${Math.round(
        arr[2]
      )}, ${alpha})`

    const render = () => {
      time += prefersReducedMotion ? 0.004 : 0.016
      const activeIdx = modeRef.current % topologies.length
      const activeTopology = topologies[activeIdx]
      const targetPal = MODE_PALETTES[activeIdx]

      // Smoothly transition brand triad colors
      lerpColor(currentPalette.primary, targetPal.primary, 0.05)
      lerpColor(currentPalette.secondary, targetPal.secondary, 0.05)
      lerpColor(currentPalette.accent, targetPal.accent, 0.05)

      ctx.clearRect(0, 0, width, height)

      const centerX = width * 0.5
      const centerY = height * (width < 768 ? 0.44 : 0.47)
      const scaleFactor = Math.min(width, height) / (width < 768 ? 580 : 690)
      const fov = 680

      // Smoothly update 3D orbital angles
      if (!prefersReducedMotion) {
        pointer.autoAngleY += targetPal.rotSpeedY
        pointer.autoAngleX += targetPal.rotSpeedX
      }
      pointer.rotX += (pointer.targetRotX - pointer.rotX) * 0.055
      pointer.rotY += (pointer.targetRotY - pointer.rotY) * 0.055

      const totalRotY = pointer.autoAngleY + pointer.rotY
      const totalRotX =
        Math.sin(pointer.autoAngleX) * 0.22 + pointer.rotX * 0.85

      const cosY = Math.cos(totalRotY)
      const sinY = Math.sin(totalRotY)
      const cosX = Math.cos(totalRotX)
      const sinX = Math.sin(totalRotX)

      // 1. Volumetric Core Light Field behind the 3D structure
      const coreRadius = Math.min(width, height) * 0.48
      const coreGrad = ctx.createRadialGradient(
        centerX + pointer.rotY * 45,
        centerY - pointer.rotX * 35,
        8,
        centerX,
        centerY,
        coreRadius
      )
      coreGrad.addColorStop(0, rgbStr(currentPalette.primary, 0.16))
      coreGrad.addColorStop(0.42, rgbStr(currentPalette.secondary, 0.11))
      coreGrad.addColorStop(0.75, rgbStr(currentPalette.accent, 0.04))
      coreGrad.addColorStop(1, 'rgba(4, 7, 17, 0)')

      ctx.fillStyle = coreGrad
      ctx.fillRect(0, 0, width, height)

      // 2. Render Deep-Field Spatial Dust
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        if (!prefersReducedMotion) {
          s.y -= s.speed
          if (s.y < -380) s.y = 380
        }
        const rx = s.x * cosY - s.z * sinY
        const rz = s.x * sinY + s.z * cosY
        const proj = fov / Math.max(120, fov + rz + 220)
        const sx = centerX + rx * proj
        const sy = centerY + s.y * proj
        if (sx >= 0 && sx <= width && sy >= 0 && sy <= height) {
          ctx.fillStyle =
            i % 3 === 0
              ? rgbStr(currentPalette.primary, s.alpha * proj)
              : i % 3 === 1
                ? rgbStr(currentPalette.secondary, s.alpha * proj)
                : rgbStr(currentPalette.accent, s.alpha * proj)
          ctx.beginPath()
          ctx.arc(sx, sy, s.size * proj, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // 3. Morph 3D Vertices toward Active Topology + Project to 2D Screen Space
      const projected = new Array(NODE_COUNT)
      const targetPts = activeTopology.pts

      for (let i = 0; i < NODE_COUNT; i++) {
        const node = nodes[i]
        const target = targetPts[i]

        // Subtle harmonic breathing oscillation
        const breathe = Math.sin(time * 1.7 + node.phase) * 5.5
        const tx = (target.x + (target.x > 0 ? breathe : -breathe)) * scaleFactor
        const ty = (target.y + Math.cos(time * 1.4 + node.phase) * 5.5) * scaleFactor
        const tz = target.z * scaleFactor

        // Spring interpolation to target topology
        node.vx = (node.vx + (tx - node.x) * 0.068) * 0.78
        node.vy = (node.vy + (ty - node.y) * 0.068) * 0.78
        node.vz = (node.vz + (tz - node.z) * 0.068) * 0.78

        node.x += node.vx
        node.y += node.vy
        node.z += node.vz
        node.group = target.group

        // Rotate in 3D space (Y-axis then X-axis)
        const x1 = node.x * cosY - node.z * sinY
        const z1 = node.x * sinY + node.z * cosY
        const y2 = node.y * cosX - z1 * sinX
        const z2 = node.y * sinX + z1 * cosX

        const perspective = fov / Math.max(140, fov + z2)
        let sx = centerX + x1 * perspective
        let sy = centerY + y2 * perspective

        // Interactive cursor magnetic field
        const dxMouse = sx - pointer.screenX
        const dyMouse = sy - pointer.screenY
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)
        let mouseBoost = 0
        if (distMouse < 150 && distMouse > 0.1) {
          mouseBoost = (1 - distMouse / 150)
          const push = mouseBoost * 16 * perspective
          sx += (dxMouse / distMouse) * push
          sy += (dyMouse / distMouse) * push
        }

        projected[i] = {
          sx,
          sy,
          z: z2,
          scale: perspective,
          group: node.group,
          mouseBoost,
        }
      }

      // 4. Draw Structural Architectural Edges
      const edges = activeTopology.edges
      ctx.lineCap = 'round'

      for (let i = 0; i < edges.length; i++) {
        const [aIdx, bIdx, colorGroup] = edges[i]
        const pA = projected[aIdx]
        const pB = projected[bIdx]
        if (!pA || !pB) continue

        const avgZ = (pA.z + pB.z) * 0.5
        // Normalize depth (-260 near to +260 far)
        const depthNorm = Math.max(0.08, Math.min(1, (260 - avgZ) / 520))
        const boost = Math.max(pA.mouseBoost, pB.mouseBoost)
        const alpha = depthNorm * 0.34 + boost * 0.45

        const col =
          colorGroup === 0
            ? currentPalette.primary
            : colorGroup === 1
              ? currentPalette.secondary
              : currentPalette.accent

        ctx.strokeStyle = rgbStr(col, alpha)
        ctx.lineWidth = (0.75 + depthNorm * 0.85 + boost * 1.3)
        ctx.beginPath()
        ctx.moveTo(pA.sx, pA.sy)
        ctx.lineTo(pB.sx, pB.sy)
        ctx.stroke()
      }

      // 5. Render Travelling Luminous Data Pulses Along Edges
      if (edges.length > 0 && !prefersReducedMotion) {
        for (let i = 0; i < pulses.length; i++) {
          const pulse = pulses[i]
          pulse.progress += pulse.speed
          if (pulse.progress >= 1) {
            pulse.progress = 0
            pulse.edgeIndex = Math.floor(Math.random() * edges.length)
          }
          const edge = edges[pulse.edgeIndex % edges.length]
          if (!edge) continue
          const pA = projected[edge[0]]
          const pB = projected[edge[1]]
          if (!pA || !pB) continue

          const px = pA.sx + (pB.sx - pA.sx) * pulse.progress
          const py = pA.sy + (pB.sy - pA.sy) * pulse.progress
          const tailT = Math.max(0, pulse.progress - 0.22)
          const tx = pA.sx + (pB.sx - pA.sx) * tailT
          const ty = pA.sy + (pB.sy - pA.sy) * tailT

          const col =
            pulse.colorType === 0
              ? currentPalette.primary
              : pulse.colorType === 1
                ? currentPalette.secondary
                : currentPalette.accent

          const pulseGrad = ctx.createLinearGradient(tx, ty, px, py)
          pulseGrad.addColorStop(0, rgbStr(col, 0))
          pulseGrad.addColorStop(1, rgbStr(col, 0.95))

          ctx.strokeStyle = pulseGrad
          ctx.lineWidth = 2.2
          ctx.beginPath()
          ctx.moveTo(tx, ty)
          ctx.lineTo(px, py)
          ctx.stroke()

          ctx.fillStyle = '#ffffff'
          ctx.beginPath()
          ctx.arc(px, py, 2.1, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // 6. Render 3D Vertices Sorted Back-to-Front
      const sortedIndices = projected
        .map((_, idx) => idx)
        .sort((a, b) => projected[b].z - projected[a].z)

      for (let k = 0; k < sortedIndices.length; k++) {
        const p = projected[sortedIndices[k]]
        const depthNorm = Math.max(0.12, Math.min(1, (260 - p.z) / 520))
        const col =
          p.group === 0
            ? currentPalette.primary
            : p.group === 1
              ? currentPalette.secondary
              : currentPalette.accent

        const r = (1.6 + depthNorm * 2.1 + p.mouseBoost * 2.8) * p.scale

        // Outer halo on foreground or cursor-illuminated nodes
        if (depthNorm > 0.62 || p.mouseBoost > 0.15) {
          ctx.fillStyle = rgbStr(
            col,
            depthNorm * 0.22 + p.mouseBoost * 0.35
          )
          ctx.beginPath()
          ctx.arc(p.sx, p.sy, r * 2.9, 0, Math.PI * 2)
          ctx.fill()
        }

        // Core node
        ctx.fillStyle = rgbStr(col, 0.4 + depthNorm * 0.6)
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2)
        ctx.fill()

        // Specular center spark
        if (depthNorm > 0.72 || p.mouseBoost > 0.25) {
          ctx.fillStyle = `rgba(255, 255, 255, ${0.55 + p.mouseBoost * 0.4})`
          ctx.beginPath()
          ctx.arc(p.sx, p.sy, r * 0.45, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      rafId = window.requestAnimationFrame(render)
    }

    rafId = window.requestAnimationFrame(render)

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId)
      window.removeEventListener('resize', updateSize)
      window.removeEventListener('mousemove', handlePointerMove)
      canvas.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('mouseup', handlePointerUp)
      canvas.removeEventListener('mouseleave', handlePointerLeave)
      canvas.removeEventListener('touchstart', handlePointerDown)
      canvas.removeEventListener('touchmove', handlePointerMove)
      canvas.removeEventListener('touchend', handlePointerUp)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="srv-nexus-canvas"
      aria-hidden="true"
    />
  )
}
