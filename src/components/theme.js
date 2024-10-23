import * as React from 'react'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const darkModeAtom = atomWithStorage('darkMode', false)

export const DarkModeButton = () => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom)
  const toggleDarkMode = () => setDarkMode(!darkMode)

  return (
    <button onClick={toggleDarkMode}>Switch to {darkMode ? 'light' : 'dark'} mode.</button>
  )
}

