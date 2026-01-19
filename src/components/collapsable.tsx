import { type ReactNode, useState } from "react"
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
      <Title collapsed={collapsed} href="javascript:void(0)" onClick={toggle}>
        {title}
      </Title>

      {!collapsed && children}
    </>
  )
}

const Title = styled.a<{ collapsed: boolean }>`
  cursor: pointer;
  &:before {
    content: "${props => (props.collapsed ? "▸" : "▾")}";
  }
`
