import React, { useState } from 'react'

export const Collapsable = function Collapsable({ children }) {
  const [opened, setOpened] = useState(false);

  if (opened) {
    return <>
      <div>
        <a href="javascript:void(0)" onClick={() => setOpened(false)}>コメント欄を隠す</a>
      </div >
      {children}
    </>
  } else {
    return <a href="javascript:void(0)" onClick={() => setOpened(true)}>コメントを見る</a>
  }
}
