import React from "react";
import {
  // CBadge,
  CButton,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useDispatch } from "react-redux";
import { userLogout } from "../Redux/auth/authActions";
import BrandLogo from '../assets/brandLogo/logo.jpg'
const TheHeaderDropdown = () => {
  const dispatch = useDispatch();
  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={BrandLogo}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
        </CDropdownItem>

        <CDropdownItem>
          <CIcon name="cil-file" className="mfe-2" />
          Account
        </CDropdownItem>

        <CDropdownItem divider />

        <CButton
          name="cil-lock-locked"
          className="mfe-2"
          onClick={() => dispatch(userLogout())}
        >
          Log out
        </CButton>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
