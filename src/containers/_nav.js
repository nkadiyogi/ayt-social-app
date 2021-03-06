import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/admin/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Profile",
    to: "/admin/profile",
    icon: <CIcon name="" customClasses="c-sidebar-nav-icon" />,

  },
  {
    _tag: "CSidebarNavItem",
    name: "Users",
    to: "/admin/users",
    icon: <CIcon name="" customClasses="c-sidebar-nav-icon" />,

  },
  {
    _tag: "CSidebarNavItem",
    name: "Posts",
    to: "/admin/posts",
    icon: <CIcon name="" customClasses="c-sidebar-nav-icon" />,

  },
 
];

export default _nav;
