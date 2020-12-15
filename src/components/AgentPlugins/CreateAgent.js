import React from "react";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback
} from "reactstrap";



import ProgressButton from 'react-progress-button';

import { createAgent } from "utilities/dbOps";



export default class CreateAgent extends React.Component {

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