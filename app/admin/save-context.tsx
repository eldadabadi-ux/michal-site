'use client'
import { createContext, useContext, useRef, useState } from 'react'

type SaveCtx = {
  saveRef: React.MutableRefObject<(() => Promise<void>) | null>
  saving: boolean
  saved: boolean
  error: string
  setSaving: (v: boolean) => void
  setSaved: (v: boolean) => void
  setError: (v: string) => void
}

const Ctx = createContext<SaveCtx | null>(null)

export function SaveProvider({ children }: { children: React.ReactNode }) {
  const saveRef = useRef<(() => Promise<void>) | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  return (
    <Ctx.Provider value={{ saveRef, saving, saved, error, setSaving, setSaved, setError }}>
      {children}
    </Ctx.Provider>
  )
}

export function useSave() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useSave outside SaveProvider')
  return ctx
}
