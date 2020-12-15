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
    Row,
    Col,
    Button,
    Collapse,
} from "reactstrap";

import { getUsersInGroup, updateCredentials } from "utilities/dbOps";

import { PuffLoader } from "react-spinners";

import CreateAgent from "components/AgentPlugins/CreateAgent";
import AgentTile from "components/AgentPlugins/AgentTile";


class Agents extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            agents: -1,
            createAgentExpanded: false,
        };
    }


    componentDidMount() {
        updateCredentials().then(() => {
            this.loadAgents();
        });
    }

    loadAgents = () => {
        this.setState({
            agents: -1,
        });

        getUsersInGroup('agent')
                .then(res => {
                    this.setState({
                        agents: res,
                    });
                })
                .catch(err => {
                    console.log(err);
                    this.setState({
                        agents: -2,
                    });
                });
    }

    render() {
        return (

            <div className="content">
                <Row>
                    <Col xs="12" className="pb-4">
                        <Button color="warning" style={{ borderRadius: "25px" }} onClick={() => this.setState({ createAgentExpanded: true })}>
                            Create New Agent
                        </Button>
                    </Col>

                    <Col xs="12">
                        <Collapse isOpen={this.state.createAgentExpanded}>
                            <CreateAgent onClose={() => this.setState({ createAgentExpanded: false })} refreshAgents={this.loadAgents}/>
                        </Collapse>
                    </Col>

                </Row>

                <Row>
                    {
                        this.state.agents === -1 ? (
                            <Col xs="12" className="text-center">
                                <div className="d-inline-block">
                                    <PuffLoader color="#1d8cf8" />
                                </div>
                            </Col>
                        ) : (
                                this.state.agents === -2 ? (
                                    <Col xs="12" className="text-center">
                                        <h1 className="tim-icons icon-alert-circle-exc" />
                                    </Col>
                                ) : (
                                        this.state.agents.map(val => (
                                            <AgentTile user={val} key={val.sub}/>
                                        ))
                                    )
                            )
                    }
                </Row>
            </div>

        );
    }
}

export default Agents;
