import * as React from 'react'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const darkModeAtom = atomWithStorage('darkMode', false)

export const DarkModeButton = () => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom)
  const toggleDarkMode = () => setDarkMode(!darkMode)
  return (
    <a href="javascript:void(0)" onClick={toggleDarkMode}>{!darkMode ? '☀️' : '🌙'}</a>
  )
}

