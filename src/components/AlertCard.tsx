'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'
import { FC } from 'react'

export type AlertStatus = 'ok' | 'error' | 'warning'

interface AlertCardProps {
  title: string
  status: AlertStatus
}

const statusMeta: Record<
  AlertStatus,
  {
    message: string
    emoji: string
    color: string
    dotColor: string
  }
> = {
  ok: {
    message: 'We good twin 🧘‍♂️',
    emoji: '✅',
    color: 'bg-green-800 border-green-400 text-green-100',
    dotColor: 'bg-green-400',
  },
  error: {
    message: 'Nooo la poliziaaa 🚨',
    emoji: '❌',
    color: 'bg-red-800 border-red-400 text-red-100',
    dotColor: 'bg-red-400',
  },
  warning: {
    message: 'BALLERINA CAPPUCCINA ⚠️',
    emoji: '⚠️',
    color: 'bg-yellow-700 border-yellow-300 text-yellow-100',
    dotColor: 'bg-yellow-300',
  },
}

export const AlertCard: FC<AlertCardProps> = ({ title, status }) => {
  const { message, emoji, color, dotColor } = statusMeta[status]
  const timestamp = new Date().toLocaleTimeString()

  return (
    <motion.div
      className={clsx(
        'h-full w-full border rounded-md px-4 py-2 flex items-center justify-between transition-all duration-500 shadow-md',
        color
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {/* LEFT: Title + Timestamp */}
      <div className="flex flex-col justify-center min-w-0 w-[65%] pr-4">
        <div className="text-xs uppercase tracking-wider font-semibold text-white/80 whitespace-nowrap overflow-hidden text-ellipsis">
          {title}
        </div>
        <div className="text-[11px] text-white/50 tracking-wide whitespace-nowrap">
          {timestamp}
        </div>
      </div>

      {/* RIGHT: Status Message + Emoji + Dot */}
      <div className="flex items-center gap-3 text-sm font-semibold whitespace-nowrap">
        <span className="hidden sm:inline">{message}</span>
        <span className="text-lg">{emoji}</span>
        <span className={clsx('w-2.5 h-2.5 rounded-full animate-pulse', dotColor)} />
      </div>
    </motion.div>
  )
}
