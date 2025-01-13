import React from "react"
import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

export const collapseAtom = atomWithStorage("collapse", true)

export function Collapsable({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useAtom(collapseAtom)

  if (!collapsed) {
    return (
      <>
        <a href="javascript:void(0)" onClick={() => setCollapsed(true)}>
          Hide comments
        </a>
        {children}
      </>
    )
  } else {
    return (
      <a href="javascript:void(0)" onClick={() => setCollapsed(false)}>
        Show comments
      </a>
    )
  }
}
