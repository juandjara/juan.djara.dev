"use client"

import { useEffect, useRef } from "react"

const NUM_POINTS = 20
const SPRING = 0.4

function applySpring(from: number, to: number, spring = SPRING) {
  return from + (to - from) * spring
}

export default function Canvas({ theme }: { theme?: "light" | "dark" }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const data = useRef({
    color: "",
    enabled: false,
    lastPoint: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    trail: new Array(NUM_POINTS).fill({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    })
  })

  useEffect(() => {
    if (ref.current) {
      const color = window.getComputedStyle(ref.current).color
      data.current.color = color
    }
  }, [theme])

  useEffect(() => {
    if (ref.current) {
      ref.current.width = window.innerWidth
      ref.current.height = window.innerHeight
    }
    const handleMousemove = (ev: MouseEvent) => {
      const x = ev.clientX
      const y = ev.clientY
      data.current.lastPoint = { x, y }
    }
    const handleMouseover = () => {
      if (!data.current.enabled) {
        data.current.enabled = true
        animate()
      }
    }
    const handleMouseleave = () => {
      const { x, y } = data.current.lastPoint
      data.current = {
        color: data.current.color,
        enabled: false,
        lastPoint: { x, y },
        trail: new Array(NUM_POINTS).fill({ x, y })
      }
      const ctx = ref.current?.getContext("2d")
      if (ref.current && ctx) {
        ctx.clearRect(0, 0, ref.current.width, ref.current.height)
      }
      if (rafID) {
        cancelAnimationFrame(rafID)
      }
    }
    ref.current?.addEventListener("mousemove", handleMousemove)
    ref.current?.addEventListener("mouseover", handleMouseover)
    ref.current?.addEventListener("mouseleave", handleMouseleave)
    let rafID: number | null = null

    const animate = () => {
      const ctx = ref.current?.getContext("2d")
      if (ref.current && ctx) {
        const { lastPoint, trail } = data.current
        ctx.clearRect(0, 0, ref.current.width, ref.current.height)
        ctx.beginPath()
        ctx.moveTo(lastPoint.x, lastPoint.y)
        data.current.trail = trail.map((p, idx) => {
          const prev = idx === 0 ? lastPoint : trail[idx - 1]
          const spring = idx === 0 ? SPRING : SPRING + 1 / idx
          const x = applySpring(p.x, prev.x, spring)
          const y = applySpring(p.y, prev.y, spring)
          return { x, y }
        })
        data.current.trail.forEach((p, idx) => {
          const next = data.current.trail[idx + 1]
          const { x, y } = p
          if (next) {
            const xc = 0.5 * (x + next.x)
            const yc = 0.5 * (y + next.y)
            ctx.quadraticCurveTo(x, y, xc, yc)
            console.log("line width", ctx.lineWidth)
          }
        })
        ctx.strokeStyle = data.current.color
        ctx.stroke()
        rafID = requestAnimationFrame(animate)
      }
    }

    return () => {
      ref.current?.removeEventListener("mousemove", handleMousemove)
      ref.current?.removeEventListener("mouseover", handleMouseover)
      ref.current?.removeEventListener("mouseleave", handleMouseleave)
      if (rafID) {
        cancelAnimationFrame(rafID)
      }
    }
  }, [])

  return (
    <canvas
      style={{ imageRendering: "pixelated" }}
      ref={ref}
      className="text-primary fixed top-0 left-0 h-full w-full"
    ></canvas>
  )
}
