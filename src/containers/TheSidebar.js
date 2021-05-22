import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
// import Logo from '../assets/icons/logo.jpg'
// sidebar nav config
import navigation from './_nav'
import * as actionTypes from '../Redux/SideBar/actionTypes';
const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarReducer.sidebarShow)
  
  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({type: actionTypes.SET, sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        {/* <img src={Logo} alt="brand logo" /> */}
        <CIcon
          className="c-sidebar-brand-full"
          name="logo"
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        /> 
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
