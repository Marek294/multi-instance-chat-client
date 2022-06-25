import React from 'react'
import Primary from './Sub/Primary'

function Layout ({ children }) {
  return (
    <main className="layout-wrapper">
      <Primary>{children}</Primary>
    </main>
  )
}

export default Layout
