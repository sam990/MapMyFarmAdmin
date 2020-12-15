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


// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

import {
  getNumberOfUsers,
  getUsersInGroup,
  getAllFarms,
  updateCredentials,
} from "utilities/dbOps";

import LoadingViewWrapper from "components/DataLoaders/LoadingViewWrapper";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numUsers: -1,
      numAgents: -1,
      area: -1,
    };
  }

componentDidMount() {

    updateCredentials().then(res => {

      getNumberOfUsers()
      .then( res => {
        this.setState({
          numUsers: res,
        })
      })
      .catch( err => {
        console.log(err);
        this.setState({
          numUsers: -2,
        });
      });


      getUsersInGroup('agent')
      .then( res => {
        this.setState({
          numAgents: res.length,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          numAgents: -2,
        });
      });
    });


    getAllFarms()
    .then(res => {
      this.setState({
        area: Math.round(res.map((val) => val.area).reduce((a, b) => (a + b))),
      });
    })
    .catch(err => {
      console.log(err);
      this.setState({
        area: -2,
      });
    });
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col lg="6">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Statistics</h5>
                    <CardTitle tag="h3">
                      Registered Users
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="text-center">
                      <h1>
                        {LoadingViewWrapper(this.state.numUsers, undefined, false)}
                      </h1>
                    </div>
                  </CardBody>
                </Card>
            </Col>

            <Col lg="6">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Statistics</h5>
                    <CardTitle tag="h3">
                      Active Agents
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                  <div className="text-center">
                      <h1>
                        {LoadingViewWrapper(this.state.numAgents, undefined, false)}
                      </h1>
                    </div>
                  </CardBody>
                </Card>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Statistics</h5>
                    <CardTitle tag="h3">
                      Farm Area Mapped
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                  <div className="text-center">
                      <h1>
                        {LoadingViewWrapper(this.state.area, e => e + " acres", false)}
                      </h1>
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

export default Dashboard;
