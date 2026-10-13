'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import dict from '@/content/ar.json'
import { applyArabic, restoreEnglish, observeArabic } from '@/lib/translate'

const LangCtx = createContext<{ ar: boolean; toggle: () => void }>({ ar: false, toggle: () => {} })
export const useLang = () => useContext(LangCtx)

export default function LangProvider({ children }: { children: ReactNode }) {
  const [ar, setAr] = useState(false)
  const path = usePathname()

  useEffect(() => {
    const d = document.documentElement
    d.lang = ar ? 'ar' : 'en'
    d.dir = ar ? 'rtl' : 'ltr'
    if (!ar) {
      restoreEnglish()
      return
    }
    applyArabic(dict.AR2, dict.MON)
    const stop = observeArabic(dict.AR2, dict.MON)
    dispatchEvent(new Event('resize'))
    return stop
  }, [ar])

  // translate freshly mounted pages while Arabic is on
  useEffect(() => {
    if (ar) applyArabic(dict.AR2, dict.MON)
  }, [path, ar])

  return <LangCtx.Provider value={{ ar, toggle: () => setAr((a) => !a) }}>{children}</LangCtx.Provider>
}
