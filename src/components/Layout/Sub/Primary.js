import React from 'react'

function Primary ({ children }) {
  return (
    <div className="layout-primary">
      {children}
      <style jsx>{`
        .layout-primary {
          min-height: 100vh;
          padding-top: 72px;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  )
}

export default Primary
