import * as React from 'react'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import styled from 'styled-components'

export const darkModeAtom = atomWithStorage('darkMode', false)

const Button = styled.a`
  cursor: pointer;
`

export const DarkModeButton = () => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom)
  const toggleDarkMode = () => setDarkMode(!darkMode)

  return (
    <Button onClick={toggleDarkMode}>{!darkMode ? '☀️' : '🌙'}</Button>
  )
}

