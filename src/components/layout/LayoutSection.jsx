import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderSection from '../header/HeaderSection'

const LayoutSection = () => {
  return (
    <div>
          <HeaderSection />
        <Outlet />
    </div>
  )
}

export default LayoutSection