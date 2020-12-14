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


import React, { Component } from "react";

import {
    createFarmFilterIndex,
    createHarvestFilterIndex,
    createUserFilterIndex,
    filter
} from 'utilities/Filter';


import { PuffLoader } from "react-spinners";

import Select from 'react-select';

import ProgressButton from 'react-progress-button';


// reactstrap components
import { Button } from "reactstrap";

class FilteringPlugin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initLoading: true,
            classes: "dropdown show-dropdown"
        };
    }

    initialise() {
        const { mode, data } = this.props;
        switch (mode) {
            case 'farm':
                createFarmFilterIndex(data).then(res => {
                    this.setState({
                        initLoading: false,
                        filterFields: res,
                        filterState: Object.assign({}, ...res.map(e => ({ [e.ID]: [] }))),
                    });
                });
                break;

            case 'harvest':
                createHarvestFilterIndex(data).then(res => {
                    this.setState({
                        initLoading: false,
                        filterFields: res,
                        filterState: Object.assign({}, ...res.map(e => ({ [e.ID]: [] }))),
                    });
                });
                break;

            case 'user':
                createUserFilterIndex(data).then(res => {
                    this.setState({
                        initLoading: false,
                        filterFields: res,
                        filterState: Object.assign({}, ...res.map(e => ({ [e.ID]: [] }))),
                    });
                });
                break;
        }
    }

    componentDidMount() {
        this.initialise();
        // setTimeout(() => { throw ""; }, 10000 );
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data?.length !== this.props.data?.length) {
            this.initialise();
        }
    }

    handleClick = () => {
        if (this.state.classes === "dropdown show-dropdown") {
            this.setState({ classes: "dropdown show-dropdown show" });
        } else {
            this.setState({ classes: "dropdown show-dropdown" });
        }
    };

    //   activateMode = mode => {
    //     switch (mode) {
    //       case "light":
    //         document.body.classList.add("white-content");
    //         break;
    //       default:
    //         document.body.classList.remove("white-content");
    //         break;
    //     }
    //   };

    handleSelectChange = (fieldID, values) => {
        this.setState({
            filterState: {
                ...this.state.filterState,
                [fieldID]: values,
            }
        })
    }

    clearFilter = () => {
        this.setState({
            filterState: Object.assign({}, ...this.state.filterFields.map(e => ({ [e.ID]: [] })))
        });
        this.props.setFilteredData(this.props.data);
    }

    handleApplyFilter = async () => {
        const filterAttr = {};
        Object.entries(this.state.filterState)
            .forEach(([key, values]) => {
                filterAttr[key] = values?.map(e => e.value);
            });

        const filteredData = await filter(this.props.data, filterAttr);

        this.props.setFilteredData(filteredData);
        return true;

    }

    render() {
        return (
            <div className="fixed-plugin">
                <div className={this.state.classes}>
                    <div onClick={this.handleClick}>
                        <i className="fa fa-cog fa-2x" />
                    </div>
                    <div className="dropdown-menu show text-center">

                        <strong className="text-white d-block py-2">Filter</strong>
                        {
                            this.state.initLoading ?
                                (<div className="d-inline-block py-5">
                                    <PuffLoader color="#1d8cf8" />
                                </div>) :
                                (
                                        this.state.filterFields.map((e) => (
                                            <div className="py-2 px-2" key={e.ID}>
                                                <Select
                                                    isMulti
                                                    menuPlacement="auto"
                                                    name={e.Name}
                                                    value={this.state.filterState[e.ID]}
                                                    id={e.ID}
                                                    options={e.Values}
                                                    placeholder={`Filter by ${e.Name}`}
                                                    onChange={(val) => this.handleSelectChange(e.ID, val)}
                                                />
                                            </div>
                                        ))
                                )
                        }

                        <Button className="px-2" color="link" onClick={this.clearFilter}><span className="my-danger-text-btn">Clear Filters</span></Button>
                        <ProgressButton
                            type="submit"
                            controlled={false}
                            onClick={this.handleApplyFilter}
                            className="pb-3 px-2"
                        >
                            <span className="my-text">Apply Filter</span>
                        </ProgressButton>
                    </div>
                </div>
            </div>
        );
    }
}

export default FilteringPlugin;
