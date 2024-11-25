import React, { useState } from "react"
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const collapseAtom = atomWithStorage('collapse', true);

export const Collapsable: React.FC<{ children: React.ReactNode }> = function Collapsable({ children }) {
  const [collapsed, setCollapsed] = useAtom(collapseAtom);

  if (!collapsed) {
    return (
      <>
        <div>
          <a href="javascript:void(0)" onClick={() => setCollapsed(true)}>
            コメント欄を隠す
          </a>
        </div>
        {children}
      </>
    )
  } else {
    return (
      <a href="javascript:void(0)" onClick={() => setCollapsed(false)}>
        コメントを見る
      </a>
    )
  }
}
