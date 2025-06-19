'use client'

import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

const terminalLines = [
  '[INFO] 🧠 Model loaded: ClaimsAI_CoreModel v2.8.12',
  '[INIT] 🔌 Connecting to claims stream...',
  '[EMBEDDING] 🧬 embeddings/claim-types.vec [OK]',
  '[NLP] Entity match: "PolicyHolder" → ENTITY_PROTECTED',
  '[QUEUE] 📦 Queued 88 claims for scoring',
  '[FRAUD] 🕵️ Claim 77812 scored 0.91 (risk threshold: 0.7)',
  '[RESULT] ✅ Auto-approved 42 low-risk claims',
  '[WARN] ⚠️ Latency spike in inference cluster #2',
  '[DB] ⛔ Timeout contacting Claims DB',
  '[TOKEN] 🔐 JWT refreshed for worker-batch-11',
  '[POST] /ai/evaluate → 202 Accepted',
  '[MONITOR] 📈 Health OK • Load: 79.2%',
  '[ALERT] 🚨 Claim volume anomaly detected',
]

export const FakeTerminal = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasMounted, setHasMounted] = useState(false)
  const [lines, setLines] = useState<string[]>([])
  const [typedLine, setTypedLine] = useState<string | null>(null)

  // Typewriter logic
  useEffect(() => {
    if (!hasMounted) return

    const nextLine = terminalLines[Math.floor(Math.random() * terminalLines.length)]
    let charIndex = 0

    const typeInterval = setInterval(() => {
      charIndex++
      setTypedLine(nextLine.slice(0, charIndex))

      if (charIndex >= nextLine.length) {
        clearInterval(typeInterval)
        setLines((prev) => [...prev, nextLine])
        setTypedLine(null)
      }
    }, 15)

    const delay = setTimeout(() => {
      // Trigger typing every 1.5s
    }, 1500 + nextLine.length * 15)

    return () => {
      clearInterval(typeInterval)
      clearTimeout(delay)
    }
  }, [lines, hasMounted]) // triggered after each new line is added

  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Scroll terminal to bottom when new line appears
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [lines, typedLine])

  if (!hasMounted) return null

  return (
    <div className="h-full w-full bg-black text-green-400 text-sm font-mono px-2 py-2 overflow-hidden">
      <div
        ref={containerRef}
        className="h-full w-full flex flex-col gap-[2px] overflow-hidden"
        style={{
          overflowY: 'hidden',
          maskImage: 'linear-gradient(to bottom, white 90%, transparent 100%)',
        }}
      >
        {lines.map((line, idx) => (
          <div
            key={idx}
            className={clsx(
              'whitespace-pre leading-tight',
              line.includes('[ERROR]') && 'text-red-400',
              line.includes('[WARN]') && 'text-yellow-300',
              line.includes('[FRAUD]') && 'text-pink-400',
              line.includes('[DB]') && 'text-cyan-300',
              line.includes('[RESULT]') && 'text-green-300',
              line.includes('[POST]') && 'text-blue-300',
              line.includes('[MONITOR]') && 'text-emerald-300',
              line.includes('[ALERT]') && 'text-rose-400 font-bold'
            )}
          >
            {line}
          </div>
        ))}

        {/* Currently typing line */}
        {typedLine && (
          <div className="whitespace-pre leading-tight">{typedLine}</div>
        )}
      </div>
    </div>
  )
}
