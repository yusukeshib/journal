import React, { type ReactNode, useState } from "react"
import { styled } from "styled-components"

export function Collapsable({
  defaultCollapsed = false,
  title,
  children,
}: {
  defaultCollapsed?: boolean
  title: ReactNode
  children: ReactNode
}) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  const toggle = () => {
    setCollapsed(c => !c)
  }

  return (
    <>
      <Title onClick={toggle}>
        {collapsed ? "▸" : "▾"}
        {title}
      </Title>

      {!collapsed && children}
    </>
  )
}

const Title = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`
