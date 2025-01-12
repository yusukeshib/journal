import React from "react"
import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

export const collapseAtom = atomWithStorage("collapse", true)

export const Collapsable: React.FC<{ children: React.ReactNode }> =
  function Collapsable({ children }) {
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
