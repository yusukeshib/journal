import * as React from 'react'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import styled from 'styled-components'

const Button = styled.a`
  cursor: pointer;
`

export const darkModeAtom = atomWithStorage('darkMode', false)

export const DarkModeButton = () => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom)
  const toggleDarkMode = () => setDarkMode(!darkMode)

  return (
    <Button onClick={toggleDarkMode}>{darkMode ? '☀️' : '🌙'}</Button>
  )
}

