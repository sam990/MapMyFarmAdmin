import React, { useState } from "react";

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

import { changePassword } from "utilities/dbOps";


export default class ChangePasswordView extends React.Component {

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
