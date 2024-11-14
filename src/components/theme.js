import * as React from 'react'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import styled, { createGlobalStyle } from 'styled-components'

export const darkModeAtom = atomWithStorage('darkMode', false)

const Button = styled.a`
  cursor: pointer;
`

const DarkMode = createGlobalStyle`
body {
  font-family: times, serif;
  background: ${props => props.dark ? '#111' : '#fff'};
  color: ${props => props.dark ? '#fff' : '#000'};
}
a {
  color: ${props => props.dark ? '#fff' : 'auto'};
}
`

export const ThemeStyles = () => {
  const [darkMode] = useAtom(darkModeAtom)
  return <DarkMode dark={darkMode} />
}

export const DarkModeButton = () => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom)
  const toggleDarkMode = () => setDarkMode(!darkMode)

  return (
    <Button onClick={toggleDarkMode}>{!darkMode ? '☀️' : '🌙'}</Button>
  )
}

