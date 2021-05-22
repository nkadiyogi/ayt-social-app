import React from 'react'
import {  CHeader,CHeaderBrand } from '@coreui/react'
import Logo from '../assets/brandLogo/logo.jpg'
const PublicHeader = () => {
  return (
    <CHeader fixed={false} className="background-yellow">
      <div className="ml-3">
      <CHeaderBrand>
      <a href="/" target="_blank" rel="noopener noreferrer">
      <img src={Logo} alt="brandLogo" />Social Media</a>

      </CHeaderBrand>
    
      </div>
      {/* <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        
      </div> */}
    </CHeader>
  )
}

export default React.memo(PublicHeader)
