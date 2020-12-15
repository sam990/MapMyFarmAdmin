import React from "react";

// reactstrap components
import {
    Row,
    Col,
    Button,
    Collapse,

} from "reactstrap";

import { Link } from "react-router-dom";


import { getAgentFarms, getAgentHarvests } from "utilities/dbOps";

import LoadingViewWrapper from "components/DataLoaders/LoadingViewWrapper";

import ChangePassword from "components/AgentPlugins/ChangePassword";

export default class AgentDetail extends React.Component {
    constructor(props) {
        super(props);

        this.sub = props.sub;

        this.state = {
            farms: -1,
            mappedArea: -1,
            harvests: -1,
            changePasswordExpanded: false,
        };
    }

    componentDidMount() {
        getAgentFarms(this.sub)
            .then(res => {
                this.setState({
                    farms: res,
                    mappedArea: Math.round(res.map((val) => val.area).reduce((a, b) => (a + b), 0)),
                })
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    farms: -2,
                    mappedArea: -2,
                });
            });

        getAgentHarvests(this.sub)
            .then(res => {
                this.setState({
                    harvests: res,
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    harvests: -2,
                });
            });
    }


    render() {
        return (
            <div className="content">
                <Row>
                    <Col xs="12" className="text-center my-text py-1">
                        <span>Number of farms mapped: {LoadingViewWrapper(this.state.farms, (v) => v.length)}</span>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12" className="text-center my-text py-1">
                        <span>Area Mapped: {LoadingViewWrapper(this.state.mappedArea, (v) => v + " acres")}</span>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12" className="text-center pb-2">
                        <Link to={{
                            pathname: "/farms",
                            state: {
                                agentSub: this.props.sub,
                                phoneNumber: this.props.username,
                                fullName: this.props.fullName,
                            }
                        }}>
                            <strong className="my-danger-text-btn pt-1">View Mapped Farms</strong>
                        </Link>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12" className="text-center my-text py-1">
                        <span>Number of harvests entered: {LoadingViewWrapper(this.state.harvests, (v) => v.length)}</span>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12" className="text-center pb-2">
                        <Link to={{
                            pathname: "/harvests",
                            state: {
                                agentSub: this.props.sub,
                                phoneNumber: this.props.username,
                                fullName: this.props.fullName,
                            }
                        }}>
                           <strong className="my-danger-text-btn pt-1">View Entered Harvets</strong>
                        </Link>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12" className="text-center py-1" >
                        <Button color="warning" size="sm" 
                                style={{ borderRadius: "25px" }}
                                onClick={() => this.setState({ changePasswordExpanded: true })}
                        >Change Password</Button>
                    </Col>
                    <Col xs="12">
                        <Collapse isOpen={this.state.changePasswordExpanded} className="mx-md-2" >
                            <ChangePassword
                                username={this.props.username}
                                onClose={() => this.setState({ changePasswordExpanded: false })}
                            />
                        </Collapse>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12" className="text-center py-1" >
                        <Button color="danger" size="sm" style={{ borderRadius: "25px" }}>Remove Agent</Button>
                    </Col>
                </Row>

            </div>
        );
    }

}