import React from 'react'
import { Outlet } from 'react-router-dom'

const Content = () => {
  return (
    <main className="container">
      <Outlet />
    </main>
  )
}

export default Content