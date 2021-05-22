import React from "react";
import PropTypes from "prop-types";
import { CWidgetBrand, CRow, CCol } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ChartLineSimple from "../charts/ChartLineSimple";

const WidgetsBrand = ({ withCharts }) => {
  // render

  return withCharts ? (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetBrand
          color="facebook"
          rightHeader="89k"
          rightFooter="Active"
          leftHeader="459"
          leftFooter="In-Active"
        >
          <h3>Users</h3>
          <CIcon name="" height="52" className="my-4" />
          <ChartLineSimple
            className="position-absolute w-100 h-100"
            backgroundColor="rgba(255,255,255,.1)"
            dataPoints={[65, 59, 84, 84, 51, 55, 40]}
            label="Friends"
            labels="months"
          />
        </CWidgetBrand>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetBrand
          rightHeader="12k"
          rightFooter="Post"
          leftHeader="412K"
          leftFooter="Likes"
          color="gradient-warning"
        >
          <h3>Post</h3>
          <CIcon name="" height="52" className="my-4" />
          <ChartLineSimple
            className="position-absolute w-100 h-100"
            backgroundColor="rgba(255,255,255,.1)"
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
