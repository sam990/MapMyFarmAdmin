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
import React, { useState } from "react";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
    Button,
    Collapse,
    CardSubtitle,
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback
} from "reactstrap";

import { Link } from "react-router-dom";

import ProgressButton from 'react-progress-button';

import { getAllHarvests, updateCredentials, getAgentFarms, getAgentHarvests, getUsersInGroup, createAgent, changePassword } from "utilities/dbOps";
import textParser from "utilities/TextParser";

import { PuffLoader, MoonLoader } from "react-spinners";

import { UserNameView, UserNumberView } from "views/UserDetailViews";
import { string } from "prop-types";


function LoadingViewWrapper(currState, modifierFunction) {
    if (currState === -1) {
        return (
            <MoonLoader color="#1d8cf8" size="12px" />
        );
    }
    else if (currState === -2) {
        return (
            <span className="text-error">err</span>
        );
    } else {
        const finalVal = modifierFunction(currState);
        return (
            <strong>{finalVal}</strong>
        );
    }
}

class CreateAgentView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            password: '',
            locale: '',
            district: '',
            state: '',
            validate: false,
        }
    }

    checkValidation = () => {
        const { email, validate, ...rest } = this.state;
        const isValid = Object.values(rest).reduce((prev, curr) => prev && (curr?.length != 0));
        if (!isValid) {
            this.setState({
                validate: true,
            })
        }
        return isValid;
    }

    validateField = (e) => {
        if(!this.state.validate) return true;
        return this.state[e]?.length != 0;
    }

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    resetState = () => {
        this.setState({
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            password: '',
            locale: '',
            district: '',
            state: '',
            validate: false,
        });
    }

    close = () => {
        this.resetState();
        this.props.onClose();
    }

    resolveAfter2Seconds() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve('resolved');
          }, 2000);
        });
    }

    handleClick = async () =>  {
        if (!this.checkValidation()) {
            throw "";
        }
        // call api 
        const { validate, ...options } = this.state;
        try {
            const res = await createAgent(options);
            this.props.refreshAgents();
            setTimeout(() => {
                this.close();
            }, 200);
            return true;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }

    render() {
        return (
            <Card className="card-chart" style={{ borderRadius: "30px" }}>
                <CardHeader >
                    <CardTitle tag="h3">
                        Fill Details
                </CardTitle>
                </CardHeader>
                <CardBody className="mx-md-5 mx-3 pr-4 mb-2">
                    <Form>
                        <FormGroup>
                            <Label for="firstName">First Name</Label>
                            <Input 
                                type="text" 
                                name="firstName" 
                                id="firstName"
                                invalid={!this.validateField("firstName")}
                                onChange={this.updateInput}
                                value={this.state.firstName}
                            />
                            <FormFeedback tooltip>
                                Can't be empty
                            </FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label for="lastName">Last Name</Label>
                            <Input 
                                type="text" 
                                name="lastName" 
                                id="lastName"
                                invalid={!this.validateField("lastName")}
                                onChange={this.updateInput}
                                value={this.state.lastName}
                            />
                            <FormFeedback tooltip>
                                Can't be empty
                            </FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label for="phoneNumber">Phone Number (with country code)</Label>
                            <Input 
                                type="text" 
                                name="phoneNumber" 
                                id="phoneNumber" 
                                invalid={!this.validateField("phoneNumber")}
                                onChange={this.updateInput}
                                value={this.state.phoneNumber}
                            />
                            <FormFeedback tooltip>
                                Can't be empty
                            </FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input 
                                type="email" 
                                name="email" 
                                id="email" 
                                onChange={this.updateInput}
                                value={this.state.email}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input 
                                type="password" 
                                name="password" 
                                id="password" 
                                invalid={!this.validateField("password")}
                                onChange={this.updateInput}
                                value={this.state.password}
                            />
                            <FormFeedback tooltip>
                                Can't be empty
                            </FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label for="locale">Locale</Label>
                            <Input 
                                type="text" 
                                name="locale" 
                                id="locale" 
                                invalid={!this.validateField("locale")}
                                onChange={this.updateInput}
                                value={this.state.locale}
                            />
                            <FormFeedback tooltip>
                                Can't be empty
                            </FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label for="district">District</Label>
                            <Input 
                                type="text" 
                                name="district" 
                                id="district" 
                                invalid={!this.validateField("district")}
                                onChange={this.updateInput}
                                value={this.state.district}
                            />
                            <FormFeedback tooltip>
                                Can't be empty
                            </FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label for="state">State</Label>
                            <Input 
                                type="text" 
                                name="state" 
                                id="state" 
                                invalid={!this.validateField("state")}
                                onChange={this.updateInput}
                                value={this.state.state}
                            />
                            <FormFeedback tooltip>
                                Can't be empty
                            </FormFeedback>
                        </FormGroup>


                    </Form>
                    <ProgressButton
                        type="submit"
                        controlled={false}
                        onClick={this.handleClick}
                    >
                       <span className="my-text">Create Agent</span>
                    </ProgressButton>
                </CardBody>

                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    height: "100%",
                    cursor: "pointer",
                    backgroundColor: "#ED2939",
                }} onClick={this.close}>
                    <i className="tim-icons icon-simple-remove text-white px-1" />
                </div>
            </Card>
        );
    }
}

class ChangePasswordView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            password: '',
            validate_password: false,
            confirmPassword: '',
            validate_confirmPassword: false,
        }

        this.minPasswordLength = 8;
    }

    resetState = () => {
        this.setState({
            password: '',
            validate_password: false,
            confirmPassword: '',
            validate_confirmPassword: false,
        });
    }

    isValidPassword = () => {
        console.log(this.state);
        if (!this.state.validate_password) {
            return true;
        } else {
            return this.state.password.length >= this.minPasswordLength;
        }
    }

    isValidConfirmPassword = () => {
        console.log(this.state);
        if (!this.state.validate_confirmPassword) {
            return true;
        } else {
            return this.state.password === this.state.confirmPassword ;
        }
    }

    close = () => {
        this.resetState();
        this.props.onClose();
    }

    updateInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value,
            ["validate_" + e.target.name]: true,
        });
    }

    handleClick = async () => {
        if (this.state.password.length < this.minPasswordLength || this.state.password !== this.state.confirmPassword) {
            throw "";
        }
        const options = {
            username: this.props.username,
            password: this.state.password,
        };

        try {
            const res = await changePassword(options);
            setTimeout(() => {
                this.close();
            }, 200);
            return true;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    render() {
        return (
            <Card className="card-chart" style={{ borderRadius: "30px" }}>
                <CardHeader >
                    <CardTitle tag="h4">
                        Change Password
                </CardTitle>
                </CardHeader>
                <CardBody className="mx-md-5 mx-3 pr-4 mb-2">
                    <Form>

                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input 
                                type="password" 
                                name="password" 
                                id="password" 
                                invalid={!this.isValidPassword()}
                                onChange={this.updateInput}
                                value={this.state.password}
                            />
                            <FormFeedback tooltip>
                                Should be atleast {this.minPasswordLength} digits long
                            </FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label for="confirmPassword">Confirm Password</Label>
                            <Input 
                                type="password" 
                                name="confirmPassword" 
                                id="confirmPassword" 
                                invalid={!this.isValidConfirmPassword()}
                                onChange={this.updateInput}
                                value={this.state.confirmPassword}
                            />
                            <FormFeedback tooltip>
                                Passwords don't match
                            </FormFeedback>
                        </FormGroup>

                    </Form>
                    <ProgressButton
                        type="submit"
                        controlled={false}
                        onClick={this.handleClick}
                    >
                       <span className="my-text">Change Password</span>
                    </ProgressButton>
                </CardBody>

                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    height: "100%",
                    cursor: "pointer",
                    backgroundColor: "#ED2939",
                }} onClick={this.close}>
                    <i className="tim-icons icon-simple-remove text-white px-1" />
                </div>
            </Card>
        );
    }

}

class AgentDetailView extends React.Component {
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
                            <ChangePasswordView 
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


function AgentTile(props) {
    const [expanded, setExpanded] = useState(false);
    const { user } = props;
    return (
        <Col lg="6">
            <Card className="card-chart" style={{ borderRadius: "30px" }}>
                <CardHeader style={{ cursor: 'pointer' }} onClick={() => setExpanded(!expanded)}>
                    <CardTitle tag="h3">
                        {user.fullName}
                    </CardTitle>
                    <CardSubtitle tag="h5">
                        {user.phone_number}
                    </CardSubtitle>
                </CardHeader>
                <CardBody>
                    <Collapse isOpen={expanded}>
                        <AgentDetailView sub={user.sub} username={user.phone_number} fullName={user.fullName}/>
                    </Collapse>
                </CardBody>
            </Card>
        </Col>
    );
}


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
                            <CreateAgentView onClose={() => this.setState({ createAgentExpanded: false })} refreshAgents={this.loadAgents}/>
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
