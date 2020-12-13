/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from "react";
// react plugin used to create google maps
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polygon,
} from "react-google-maps";

import classnames from 'classnames';

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Button } from "reactstrap";

import { PuffLoader, MoonLoader } from "react-spinners";
import Popup from 'reactjs-popup';
import 'assets/css/my-popup.css';
import HarvestsPopupView from 'views/HarvestsPopupView';

import { getUser, getAllFarms, getPathOfFarm, updateCredentials, getHarvestsOfFarm } from "utilities/dbOps";
import textParser from "utilities/TextParser";

import { UserNameView, UserNumberView } from "views/UserDetailViews";

import FilteringPlugin from "components/FixedPlugin/FilteringPlugin";

const MapWrapper = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={4}
      defaultCenter={{ lat: 23.5937, lng: 78.9629 }}
      defaultOptions={{
        // scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
        streetViewControl: false,
      }}
    >
      {/* {props.polygons.map(
        (val, i) => (<Polygon key={props.farms[i].id} path={val} options={{ fillColor: "blue", strokeWeight: 0 }} onClick={() => { props.openModal(props.farms[i]); }} />)
      )} */}

      {/* {props.polygons.map(
        (val, i) => (<Marker key={props.farms[i].id} position={val[0]} onClick={() => { props.openModal(props.farms[i]); }} />)
      )} */}
      {
        props.showMarker && <Marker position={{ lat: -34.397, lng: 150.644 }}  />
      }
    </GoogleMap>
  ))
);

function Map(props) {
  const { loading, polygons, farms } = props;

  console.log(polygons);

  const [modalDetails, setModalDetails] = useState({ selectedFarm: null, openModal: false, });

  const [showMarker, setShowMarker] = useState(true);

  setTimeout(()=> setShowMarker(false), 5000);

  const openModal = (farm) => {
    setModalDetails({
      selectedFarm: farm,
      openModal: true,
    })
  }

  const closeModal = () => setModalDetails({ ...modalDetails, openModal: false });

  const switchToHarvestModal = (farm) => {
    closeModal();
    props.openHarvestsPopup(farm);
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>Google Maps</CardHeader>
              <CardBody>
                <div
                  id="map"
                  className="map"
                  style={{ position: "relative", overflow: "hidden", textAlign: "center" }}
                >
                  <MapWrapper
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1DSNQSBG2jH_VCslFAkBH2hl7p2JxN7E"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    polygons={polygons}
                    farms={farms}
                    openModal={openModal}
                    showMarker={showMarker}
                  />
                  <div
                    style={{
                      display: loading ? "flex" : "none",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%"
                    }}
                  >
                    <PuffLoader size={150} color="#1d8cf8" loading={loading} />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Popup
          open={modalDetails.openModal}
          modal
          lockScroll
          arrow="false"
          position='center center'
          onClose={closeModal}
        >
          <FarmDetailsPopupView farm={modalDetails.selectedFarm} openHarvestsPopup={switchToHarvestModal} />
          <Button close
            style={{
              position: 'absolute',
              right: -7,
              top: -10,
              color: 'white'
            }}
            onClick={closeModal}
          />
        </Popup>
      </div>
    </>
  );
}

function FarmDetailsPopupView(props) {
  const { farm } = props;
  const sub = farm.ownerSub;

  return (
    <div className="d-flex flex-column justify-content-start align-items-center text-white popup-container">
      <span className="py-1"><strong>FARM ID: {farm.farmID}</strong></span>
      <span className="py-1">Owner Name: <strong><UserNameView sub={sub} /></strong></span>
      <span className="py-1">Owner Number: <strong><UserNumberView sub={sub} /></strong></span>
      <span className="py-1">Area: <strong>{farm.area + " acres"}</strong></span>
      <span className="py-1">Locale: <strong>{textParser(farm.locale)}</strong></span>
      <span className="py-1">Land Type: <strong>{textParser(farm.land_type)}</strong></span>
      <Button style={{overflow: "visible"}} color="link" className="pt-4 text-info" onClick={() => props.openHarvestsPopup(farm)}><span>Open Associated Harvests</span></Button>
    </div>
  );

}


function FarmsTableView(props) {
  const { farms, loading } = props;

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Farms Details</CardTitle>
                {/* <p className="category">Well</p> */}
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>FarmID</th>
                      <th>Owner Name</th>
                      <th>Owner Number</th>
                      <th>Area</th>
                      <th>Locale</th>
                      <th>Land Type</th>
                      <th>View Harvests</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      loading ? (
                        <tr key="0">
                          <td colSpan="7" className="text-center">
                            <div style={{ display: "inline-block" }}>
                              <PuffLoader color="#1d8cf8" />
                            </div>
                          </td>
                        </tr>
                      ) : (
                          farms.map(
                            val => (
                              <tr key={val.id}>
                                <td>{val.farmID}</td>
                                <td><UserNameView sub={val.ownerSub} /></td>
                                <td><UserNumberView sub={val.ownerSub} /></td>
                                <td>{val.area + " acres"}</td>
                                <td>{textParser(val.locale)}</td>
                                <td>{textParser(val.land_type)}</td>
                                <td className="text-center">
                                  <Button color="link" onClick={() => props.openHarvestsPopup(val)}>
                                    <i className="tim-icons icon-minimal-down" />
                                  </Button>
                                </td>
                              </tr>
                            )
                          )
                        )
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

class FarmsView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeTab: '1',
      loading: true,
      farms: [],
      filteredFarms: [],
      polygons: [],
      selectedFarm: null,
      openHarvestModal: false,
      position: 0,
    };
  }

  openModal = (farm) => {
    this.setState({
      selectedFarm: farm,
      openHarvestModal: true,
    });
  }

  closeModal = () => {
    this.setState({
      openHarvestModal: false,
    });
  }

  testFunc = () => {
    if (this.state.farms.length === this.state.position) {
      return;
    }

    const i = this.state.position;

    const path = getPathOfFarm(this.state.farms[i]);

    this.setState({
      polygons: [ /* ...this.state.polygons, */ path ],
      position: i + 1,
    });

    setTimeout(this.testFunc, 1000);
  }

  componentDidMount() {

    updateCredentials().then(() => {

      getAllFarms().then(res => {
        this.setState({
          loading: false,
          farms: res,
          filteredFarms: res,
          polygons: res.map(getPathOfFarm),
        });
        // this.testFunc();
      })
        .catch(err => {
          console.log(err);
          this.setState({
            loading: false,
          });
        });
    });
  }

  setFilteredFarms= (filteredArr) => this.setState({ 
    filteredFarms : filteredArr,
    polygons: filteredArr.map(getPathOfFarm),
  });

  toggle = tab => {
    if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
  }

  render() {
    return (
      <div className="content">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' }, "bg-transparent")}
              onClick={() => { this.toggle('1'); }}
              style={{ cursor: 'pointer' }}
            >
              Map View
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' }, "bg-transparent")}
              onClick={() => { this.toggle('2'); }}
              style={{ cursor: 'pointer' }}
            >
              Table View
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Map loading={this.state.loading} polygons={this.state.polygons} farms={this.state.filteredFarms} openHarvestsPopup={this.openModal} />
          </TabPane>
          <TabPane tabId="2">
            <FarmsTableView loading={this.state.loading} farms={this.state.filteredFarms} openHarvestsPopup={this.openModal} />
          </TabPane>
        </TabContent>
        <Popup
          open={this.state.openHarvestModal}
          modal
          lockScroll
          arrow="false"
          position='center center'
          onClose={this.closeModal}
        >
          <HarvestsPopupView farmID={this.state.selectedFarm?.id} />
          <Button close
            style={{
              position: 'absolute',
              right: -7,
              top: -10,
              color: 'white'
            }}
            onClick={this.closeModal}
          />
        </Popup>
        <FilteringPlugin 
          mode="farm"
          data={this.state.farms}
          setFilteredData={this.setFilteredFarms}
        />
      </div>
    );
  }
}

export default FarmsView;
