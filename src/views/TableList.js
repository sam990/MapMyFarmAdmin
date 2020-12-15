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

import { Link } from "react-router-dom";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button
} from "reactstrap";

import AWS, { CognitoIdentityServiceProvider } from "aws-sdk";
import { Auth, API, graphqlOperation } from "aws-amplify";

import awsconfig from "aws-exports";
import { getUsersInGroup, getUserFarms, updateCredentials } from "utilities/dbOps";
import textParser from "utilities/TextParser";

import Popup from 'reactjs-popup';

import { PuffLoader, MoonLoader } from "react-spinners";
import HarvestsPopupView from 'views/HarvestsPopupView';

import FilteringPlugin from "components/FixedPlugin/FilteringPlugin";



function FarmNumberView({ sub }) {

  let [farmNumbers, setFarmNumbers] = useState(-1);

  useEffect(() => {
    getUserFarms(sub)
      .then(res => {
        setFarmNumbers(res.length);
      })
      .catch(err => {
        console.log(err);
        setFarmNumbers(-2);
      })
  }, []);

  if (farmNumbers === -1) {
    return (
      <div className="d-inline-block">
        <MoonLoader color="#1d8cf8" size="12px" />
      </div>
    );
  } else if (farmNumbers === -2) {
    return (<span className="text-error">err</span>);
  } else {
    return (<span>{farmNumbers}</span>);
  }
}


class Tables extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      usersLoading: true,
      users: [],
      filteredUsers: [],
      selectedUserSub: null,
      openHarvestModal: false,
    };
  }

  openModal = (sub) => {
    this.setState({
      selectedUserSub: sub,
      openHarvestModal: true,
    });
  }

  closeModal = () => {
    this.setState({
      openHarvestModal: false,
    });
  }

  componentDidMount() {

    updateCredentials().then(res => {

      getUsersInGroup('user')
        .then(res => {
          this.setState({
            users: res,
            filteredUsers: res,
            usersLoading: false,
          });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            usersLoading: false
          });
        });
    });

  }

  setFilteredUsers = data => this.setState({ filteredUsers: data });

  render() {

    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card className="card-plain">
                <CardHeader>
                  <CardTitle tag="h4">Registered Users</CardTitle>
                  {/* <p className="category">Well</p> */}
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Locale</th>
                        <th>No. of Farms</th>
                        <th>View Farms</th>
                        <th>View Harvests</th>
                        <th>District</th>
                        <th>State</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.usersLoading ? (
                          <tr key="0">
                            <td colSpan="7" className="text-center">
                              <div style={{ display: "inline-block" }}>
                                <PuffLoader color="#1d8cf8" />
                              </div>
                            </td>
                          </tr>
                        ) : (
                            this.state.filteredUsers.map(
                              val => (
                                <tr key={val.sub}>
                                  <td>{textParser(val.fullName)}</td>
                                  <td>{textParser(val.phone_number)}</td>
                                  <td>{textParser(val.email)}</td>
                                  <td>{textParser(val.locale)}</td>
                                  <td className="text-center"><FarmNumberView sub={val.sub} /></td>
                                  <td className="text-center">
                                    <Link 
                                      to={{
                                        pathname: "/farms",
                                        state: { userSub: val.sub, phoneNumber: val.phone_number, fullName: val.fullName }
                                      }}><i className="tim-icons icon-minimal-down" /></Link>
                                  </td>
                                  <td className="text-center">
                                    <Button color="link" onClick={() => this.openModal(val.sub)}>
                                      <i className="tim-icons icon-minimal-down my-link-text" />
                                    </Button>
                                  </td>
                              <td>{textParser(val["custom:district"])}</td>
                              <td>{textParser(val["custom:state"])}</td>
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

          <Popup
            open={this.state.openHarvestModal}
            modal
            lockScroll
            arrow="false"
            position='center center'
            onClose={this.closeModal}
          >
            <HarvestsPopupView userMode userSub={this.state.selectedUserSub} />
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
            mode="user"
            data={this.state.users}
            setFilteredData={this.setFilteredUsers}
          />
        </div>
      </>
    );
  }
}

export default Tables;
