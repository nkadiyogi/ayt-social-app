import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { CWidgetBrand, CRow, CCol } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ChartLineSimple from "../charts/ChartLineSimple";
import { useSelector } from "react-redux";
import * as services from "../../Services/services";
import { notify } from "../../reusable/ToastNotification/Notif";
const WidgetsBrand = ({ withCharts }) => {
  const authState = useSelector((state) => state.authReducer);
  const { user, token } = authState.userData;
  const [allUserCount, setAllUserCount] = useState(0);
  const [allActiveUserCount, setAllActiveUserCount] = useState(0);
  const [allBlockedUserCount, setAllBlockedUserCount] = useState(0);
  useEffect(() => {
    getAllUsers();
    getAllActiveUsers();
    getAllBlockedUsers();
  }, []);

  const getAllUsers = () => {
    services.getAllUserCount({ token, adminId: user.id })
      .then((result) => {
        // console.log("result ", result);
        // setLoading(false);
        if (result.status === 200) {
          setAllUserCount(result.data.totalUsers);
          return;
        }
        notify("Failed to Get users count" + result.message, "warn");
      })
      .catch((err) => {
        // setLoading(false);
        console.log("getting error ", err);
        notify("Failed to Get users count " + err.message, "warn");
      });
  };
  const getAllActiveUsers = () => {
    services.getAllActiveUserCount({ token, adminId: user.id })
      .then((result) => {

        // console.log("result ", result);
        // setLoading(false);
        if (result.status === 200) {
          setAllActiveUserCount(result.data.totalUsers);
          return;
        }
        notify("Failed to Get Active users count" + result.message, "warn");
      })
      .catch((err) => {
        // setLoading(false);
        console.log("getting error ", err);
        notify("Failed to Get Active users count " + err.message, "warn");
      });
  };
  const getAllBlockedUsers = () => {
    services.getAllBlockedUserCount({ token, adminId: user.id })
      .then((result) => {
        // console.log("result ", result);
        // setLoading(false);
        if (result.status === 200) {
          setAllBlockedUserCount(result.data.totalUsers);
          return;
        }
        notify("Failed to Get Blocked users count" + result.message, "warn");
      })
      .catch((err) => {
        // setLoading(false);
        console.log("getting error ", err);
        notify("Failed to Get Blocked users count " + err.message, "warn");
      });
  };
  return withCharts ? (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetBrand
          color="facebook"
          rightHeader={allActiveUserCount.toString()}
          rightFooter="Active"
          leftHeader={allBlockedUserCount.toString()}
          leftFooter="In-Active"
        >
          <h3 className="z-index-10 text-black">Users : {allUserCount}</h3>
          <CIcon name="" height="52" className="my-4" />
          <ChartLineSimple
            className="position-absolute w-100 h-100"
            // backgroundColor="rgba(255,255,255,.1)"
            backgroundColor="rgba(251,239,60,1)"
            dataPoints={[65, 59, 84, 84, 51, 55, 40]}
            label="Friends"
            labels="months"
          />
        </CWidgetBrand>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetBrand
          rightHeader="12k"
          rightFooter="Comments"
          leftHeader="412K"
          leftFooter="Likes"
          color="gradient-warning"
        >
          <h3 className="z-index-10 text-black">Post : 3k</h3>
          <CIcon name="" height="52" className="my-4" />
          <ChartLineSimple
           
            className="position-absolute w-100 h-100 "
            // backgroundColor="rgba(255,255,255,.1)"
            backgroundColor="rgba(251,239,60,1)"
            dataPoints={[35, 23, 56, 22, 97, 23, 64]}
            label="Followers"
            labels="months"
          />
        </CWidgetBrand>
      </CCol>
    </CRow>
  ) : (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetBrand
          color="facebook"
          rightHeader="89k"
          rightFooter="friends"
          leftHeader="459"
          leftFooter="feeds"
        >
          <CIcon name="cib-facebook" height="56" className="my-4" />
        </CWidgetBrand>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetBrand
          color="twitter"
          rightHeader="973k"
          rightFooter="followers"
          leftHeader="1.792"
          leftFooter="tweets"
        >
          <CIcon name="cib-twitter" height="56" className="my-4" />
        </CWidgetBrand>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetBrand
          color="linkedin"
          rightHeader="500+"
          rightFooter="contracts"
          leftHeader="292"
          leftFooter="feeds"
        >
          <CIcon name="cib-linkedin" height="56" className="my-4" />
        </CWidgetBrand>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetBrand
          rightHeader="12"
          rightFooter="events"
          leftHeader="4"
          leftFooter="meetings"
          color="gradient-warning"
        >
          <CIcon name="cil-calendar" height="56" className="my-4" />
        </CWidgetBrand>
      </CCol>
    </CRow>
  );
};

WidgetsBrand.propTypes = {
  withCharts: PropTypes.bool,
};

export default WidgetsBrand;
