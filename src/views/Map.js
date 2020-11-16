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
import React, { useRef } from "react";
// react plugin used to create google maps
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polygon,
} from "react-google-maps";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col} from "reactstrap";

import PuffLoader from "react-spinners/PuffLoader";

import { Auth, API, graphqlOperation } from "aws-amplify";
// import AWS from "aws-sdk";
import awsconfig from "aws-exports";
import * as queries from "../graphql/queries";

import LatLng from "variables/LatLng";

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

    {props.polygons.map(
      (val) => (<Polygon path={val} options={{fillColor: "blue", strokeWeight: 0}}/>)
    )}

    {props.polygons.map(
      (val) => (<Marker defaultPosition={val[0]}/>)
    )}
    </GoogleMap>
  ))
);

class Map extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      polygons: [],
    };
  }

  async componentDidMount() {

    let forwardToken = null;
    let remaining = true;

    // load all farms
    try {
      while(remaining) {
        const res = await API.graphql(graphqlOperation(queries.listFarms, { limit: 100 , nextToken: forwardToken}));
        
        for (let farm of res.data.listFarms.items) {
          let path = [];
          for (let i = 0; i < farm.coordinatesLat.length; i++) {
            path.push(new LatLng(farm.coordinatesLat[i], farm.coordinatesLng[i]));
          }
          
          this.setState({
            polygons: [...this.state.polygons, path],
          });
        }

        if(res.data.listFarms.nextToken == null) {
          remaining = false;
        } else {
          forwardToken = res.data.listFarms.nextToken;
        }
      }

      this.setState({
        loading: false,
      });

    }
    catch (err) {
      console.log(err);
      this.setState({
        loading: false
      });
    }
  }


  render() {
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
                    style={{ position: "relative", overflow: "hidden", textAlign: "center"}}
                  >
                    <MapWrapper
                      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1DSNQSBG2jH_VCslFAkBH2hl7p2JxN7E"
                      loadingElement={<div style={{ height: `100%` }} />}
                      containerElement={<div style={{ height: `100%` }} />}
                      mapElement={<div style={{ height: `100%` }} />}
                      polygons={this.state.polygons}
                    />
                    <div 
                      style={{
                        display: this.state.loading ? "flex" : "none",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%"
                      }}
                    >
                      <PuffLoader size={150} color="blue" loading={this.state.loading}/>
                    </div>
                    {/* <div style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, margin: "auto"}}>
                      <RingLoader/>
                    </div> */}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Map;
