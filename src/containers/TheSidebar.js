import React from "react";
import { useSelector, useDispatch } from "react-redux";
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
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
// import Logo from '../assets/icons/logo.jpg'
// sidebar nav config
import navigation from "./_nav";
import * as actionTypes from "../Redux/SideBar/actionTypes";
import Logo from "../assets/brandLogo/logo.jpg";
const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarReducer.sidebarShow);

  return (
    <CSidebar
      show={show}
      onShowChange={(val) =>
        dispatch({ type: actionTypes.SET, sidebarShow: val })
      }
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <img
          src={Logo}
          height="35"
          alt="brand logo"
          style={{ width: "98px", height: "64px", borderRadius: "19px" }}
        />
        <CIcon className="c-sidebar-brand-full" name="" height={35} />
        <CIcon className="c-sidebar-brand-minimized" name="" height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
