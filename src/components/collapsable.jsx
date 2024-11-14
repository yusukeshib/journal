import React, { useState } from 'react'
import styled from 'styled-components'

const A = styled.a`
  text-decoration: underline;
  cursor: pointer;
`

export const Collapsable = function Collapsable({ children }) {
  const [opened, setOpened] = useState(false);

  if (opened) {
    return <>
      <div>
        <A onClick={() => setOpened(false)}>コメント欄を隠す</A>
      </div >
      {children}
    </>
  } else {
    return <A onClick={() => setOpened(true)}>コメントを見る</A>
  }
}
