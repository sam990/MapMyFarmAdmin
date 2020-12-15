import React, { useState } from "react";
// react plugin used to create google maps
import {
  LoadScriptNext,
  GoogleMap,
  Marker,
  Polygon,
} from "@react-google-maps/api";


// reactstrap components
import { Card, CardHeader, CardBody, Row, Col, Button } from "reactstrap";

import { PuffLoader } from "react-spinners";
import Popup from 'reactjs-popup';

import FarmPopupContent from "components/Popup/FarmPopupContent";

const MapWrapper = props => (
  <LoadScriptNext
    googleMapsApiKey={props.apiKey}
    loadingElement={props.loadingElement}
  >

    <GoogleMap
      zoom={4}
      center={{ lat: 23.5937, lng: 78.9629 }}
      options={{
        // scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
        streetViewControl: false,
      }}
      mapContainerClassName="h-100"
    >
      {props.polygons.map(
        (val, i) => (<Polygon key={props.farms[i].id} path={val} options={{ fillColor: "blue", strokeWeight: 0 }} onClick={() => { props.openModal(props.farms[i]); }} />)
      )}

      {props.polygons.map(
        (val, i) => (<Marker key={props.farms[i].id} position={val[0]} onClick={() => { props.openModal(props.farms[i]); }} />)
      )}
    </GoogleMap>
  </LoadScriptNext>
);

export default function FarmMap(props) {
  const { loading, polygons, farms } = props;

  const [modalDetails, setModalDetails] = useState({ selectedFarm: null, openModal: false, });

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
                    apiKey="AIzaSyD1DSNQSBG2jH_VCslFAkBH2hl7p2JxN7E"
                    loadingElement={<div style={{ height: `100%` }} />}
                    polygons={polygons}
                    farms={farms}
                    openModal={openModal}
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
          <FarmPopupContent farm={modalDetails.selectedFarm} openHarvestsPopup={switchToHarvestModal} />
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