'use client'

import { AlertCard, AlertStatus } from '@/components/AlertCard'
import { FakeTerminal } from '@/components/FakeTerminal'
import { MatrixRain } from '@/components/MatrixRain'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Alert = {
  id: number
  title: string
  status: AlertStatus
}

let alertId = 0

const STATIC_ALERTS: Alert[] = [
  { id: ++alertId, title: 'Internet Connection Stable', status: 'ok' },
  { id: ++alertId, title: 'Database Connectivity Healthy', status: 'ok' },
  { id: ++alertId, title: 'Claims DB Offline Detected', status: 'error' },
  { id: ++alertId, title: 'API Load Reaching Threshold', status: 'warning' },
]

function generateClaimsAlerts(): Alert[] {
  const okAlerts = [
    'Auto-approved 42 low-risk claims',
    'Ingested 128 claims from Ontario batch',
    'NLP tagging success rate: 100%',
    'ClaimsAI_CoreModel v2.8.12 loaded successfully',
    'All API endpoints responded < 200ms',
    'Fraud scoring model running within baseline range',
    '100% of predictions within confidence threshold',
    'Tokenization pipeline operational',
    'Real-time claims stream processed',
    'Latency < 90ms on fraud prediction',
    'Data sync with claims DB successful',
    'Zero anomalies detected in batch 7839',
    'Claims AI passed all health checks',
    'JWT tokens refreshed and valid',
    'Nightly model retraining completed successfully',
    'Entity recognition passed on 100% of samples',
    'Auto-labeling pipeline stable for past 24 hours',
    'Input data schema matches expected v4.2',
    'Worker threads balanced across nodes',
    'Vector embeddings synced to shared memory',
  ]

  const warningAlerts = [
    'Latency spike in inference cluster #2',
    '6% of claims flagged as borderline cases',
    'Fraud score deviation nearing 3σ threshold',
    'Model prediction confidence dropped to 82%',
    'Anomaly rate: 2.9% (baseline: 0.87%)',
    'Batch 9843 missing provider zip code in 12 records',
    'Unexpected entity detected: “PayerOverride”',
    'Average claim ingestion rate decreased by 40%',
    'NLP tokenizer fallback triggered for 17 samples',
    '1 of 5 retraining tasks exceeded time limit',
    'Validation schema version mismatch: v4.1 vs v4.2',
    'Auto-correction applied to 9 malformed claim dates',
    'Redis cache saturation at 75% capacity',
    'Worker thread CPU load exceeded 80%',
    'Retry queue increased from 3 → 24 in last 10 min',
    'Duplicate claim detection triggered (possible flood)',
  ]

  const errorAlerts = [
    'Claims DB unreachable – 3 attempts failed',
    'Claim ID: 98234 failed scoring – null features',
    'JWT token expired – re-authentication failed',
    'POST /claims → 502 Bad Gateway',
    'NLP parser exception on Claim ID 77191',
    'Timeout contacting provider API (timeout: 30s)',
    'Retry limit exceeded for batch: 9942',
    'Embedding vector dimension mismatch detected',
    'Redis cache connection refused',
    'Duplicate Claim ID received from upstream',
    'Job scheduler failed to execute nightly retrain',
    'Model drift threshold exceeded: 12.3% shift',
    'Labeling service returned empty labels',
    'EntityRecognizer crashed (SegFault)',
    'Claim note preprocessing returned NaN',
    'Unauthorized access attempt blocked (IP: 10.1.3.42)',
    'Zero claims processed in last 15 min – ingestion stall',
  ]

  const allAlerts: Alert[] = []

  for (let i = 0; i < 40; i++) {
    const roll = Math.random()
    let status: AlertStatus
    let message: string

    if (roll < 0.7) {
      status = 'ok'
      message = okAlerts[Math.floor(Math.random() * okAlerts.length)]
    } else if (roll < 0.9) {
      status = 'warning'
      message = warningAlerts[Math.floor(Math.random() * warningAlerts.length)]
    } else {
      status = 'error'
      message = errorAlerts[Math.floor(Math.random() * errorAlerts.length)]
    }

    allAlerts.push({
      id: ++alertId,
      title: message,
      status,
    })
  }

  return allAlerts
}

const CARD_HEIGHT = 72
const INTERVAL_MS = 1500

export default function Home() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    setAlerts([...STATIC_ALERTS, ...generateClaimsAlerts()])
  }, [])

  const duplicatedAlerts = [...alerts, ...alerts]

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => {
        const next = prev + 1
        if (next >= alerts.length) {
          // Instantly reset offset to 0 visually (no blink)
          return 0
        }
        return next
      })
    }, INTERVAL_MS)

    return () => clearInterval(interval)
  }, [alerts])

  return (
    <main className="flex flex-col justify-between min-h-screen bg-black text-matrixGreen font-mono">
      <MatrixRain />

      <div className="px-6 pt-6 grow">
        <div className="flex flex-col lg:flex-row gap-6 h-full">
          <div className="w-full lg:w-1/3 h-[85vh] border border-green-500 rounded-xl bg-black/80 backdrop-blur-md p-4 overflow-hidden shadow-md neon-frame">
            <FakeTerminal />
          </div>

          <div className="w-full lg:w-2/3 h-[85vh] border border-green-500 rounded-xl bg-black/80 backdrop-blur-md shadow-inner relative overflow-hidden neon-frame">
            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

            <motion.div
              animate={{ y: -CARD_HEIGHT * offset }}
              transition={{ ease: 'linear', duration: 0.5 }}
              className="flex flex-col"
              style={{ height: `${CARD_HEIGHT * duplicatedAlerts.length}px` }}
            >
              {duplicatedAlerts.map((alert, index) => (
                <div key={`${alert.id}-${index}`} className="h-[72px] overflow-hidden">
                  <AlertCard title={alert.title} status={alert.status} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 flex flex-col items-center gap-3 z-10">
        <div className="text-xs text-green-400 font-mono bg-black/60 rounded-lg border border-green-700 px-6 py-2 shadow-inner flex justify-center gap-6 tracking-wider">
          <span>💚 System Pulse: ▓ ▓ ▓ ▓ ░ ░ ░</span>
          <span>🧠 CPU: 42%</span>
          <span>📦 RAM: 7.3 GB / 16 GB</span>
          <span>🌀 Claims/s: 37</span>
        </div>

        <div className="bg-black/70 border-t border-green-500 py-1 w-full overflow-hidden">
          <div className="animate-marquee whitespace-nowrap text-green-400 text-xs font-mono px-4 tracking-wide">
            🔁 {alerts.slice(-5).map(a => a.title).join('  •  ')}
          </div>
        </div>
      </div>
    </main>
  )
}
