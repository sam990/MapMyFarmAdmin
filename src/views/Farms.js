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
import React from "react";
// react plugin used to create google maps

import classnames from 'classnames';

// reactstrap components
import { Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Button } from "reactstrap";


import Popup from 'reactjs-popup';
import HarvestsPopupContent from 'components/Popup/HarvestPopupContent';

import { getAllFarms, getPathOfFarm, updateCredentials, getUserFarms, getAgentFarms } from "utilities/dbOps";

import FilteringPlugin from "components/FixedPlugin/FilteringPlugin";

import FarmMap from "components/FarmPlugins/FarmMap";
import FarmTable from "components/FarmPlugins/FarmTable";


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


  componentDidMount() {

    updateCredentials().then(() => {

      const successCallback = res => {
        this.setState({
          loading: false,
          farms: res,
          filteredFarms: res,
          polygons: res.map(getPathOfFarm),
        });
      }

      const errCallback = err => {
        console.log(err);
        this.setState({
          loading: false,
        });
      }

      const locState = this.props.location.state;

      if (locState?.userSub) {
        getUserFarms(locState.userSub)
          .then(successCallback)
          .catch(errCallback);
      } else if (locState?.agentSub) {
        getAgentFarms(locState.agentSub)
          .then(successCallback)
          .catch(errCallback);
      } else {
        getAllFarms()
          .then(successCallback)
          .catch(errCallback);
      }
    });
  }

  setFilteredFarms = (filteredArr) => this.setState({
    filteredFarms: filteredArr,
    polygons: filteredArr.map(getPathOfFarm),
  });

  toggle = tab => {
    if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
  }

  reset = () => {
    this.props.history.replace(this.props.location.pathname);
    window.location.reload();
  }

  render() {

    const locState = this.props.location.state;

    return (
      <div className="content">
        <Row>
          <Col xs="12" className="my-text text-center">
            {
              locState?.userSub ? (
                <span>Showing farms for user: {locState.fullName} ({locState.phoneNumber}) <Button color="link" onClick={this.reset}><span className="my-danger-text-btn">Reset</span></Button></span>
              ) : locState?.agentSub ? (
                <span>Showing farms by agent: {locState.fullName} ({locState.phoneNumber}) <Button color="link" onClick={this.reset}><span className="my-danger-text-btn">Reset</span></Button></span>
              ) : null
            }
          </Col>

          <Col xs="12">
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
                <FarmMap loading={this.state.loading} polygons={this.state.polygons} farms={this.state.filteredFarms} openHarvestsPopup={this.openModal} />
              </TabPane>
              <TabPane tabId="2">
                <FarmTable loading={this.state.loading} farms={this.state.filteredFarms} openHarvestsPopup={this.openModal} />
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
              <HarvestsPopupContent farmID={this.state.selectedFarm?.id} />
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
          </Col>
        </Row>
      </div>

    );
  }
}

export default FarmsView;
