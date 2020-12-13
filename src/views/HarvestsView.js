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
    Table,
    Row,
    Col,
} from "reactstrap";


import { getAllHarvests } from "utilities/dbOps";
import textParser from "utilities/TextParser";


import { PuffLoader } from "react-spinners";

import { UserNameView, UserNumberView } from "views/UserDetailViews";

class HarvestTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            harvestsLoading: true,
            harvests: [],
        };
    }


    componentDidMount() {

        getAllHarvests()
            .then(res => {
                this.setState({
                    harvests: res,
                    harvestsLoading: false,
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    harvestsLoading: false
                });
            });

    }

    render() {
        return (
            <>
                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card className="card-plain">
                                <CardHeader>
                                    <CardTitle tag="h4">Harvests</CardTitle>
                                    {/* <p className="category">Well</p> */}
                                </CardHeader>
                                <CardBody>
                                    <Table className="tablesorter" responsive>
                                        <thead className="text-primary">
                                            <tr>
                                                <th>Crop</th>
                                                <th>Owner Name</th>
                                                <th>Owner Number</th>
                                                <th>Sowing Date</th>
                                                <th>Seed Brand</th>
                                                <th>Planting Mode</th>
                                                <th>Weeding Mode</th>
                                                <th>Harvest Cutting Mode</th>
                                                <th>Fertilizer</th>
                                                <th>Pesticide</th>
                                                <th>Seed Packets</th>
                                                <th>Seed Price</th>
                                                <th>Number of labours</th>
                                                <th>Labour Charge</th>
                                                <th>Machine Charge</th>
                                                <th>Fertilizer Packets</th>
                                                <th>Fertilizer Charge</th>
                                                <th>Pesticide Packets</th>
                                                <th>Pesticide Charge</th>
                                                <th>Comments</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.harvestsLoading ? (
                                                    <tr key="0">
                                                        <td colSpan="20" className="text-center">
                                                            <div style={{ display: "inline-block" }}>
                                                                <PuffLoader color="#1d8cf8" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ) : (
                                                        this.state.harvests.map(
                                                            val => (
                                                                <tr key={val.id}>
                                                                    <td>{textParser(val.crop)}</td>
                                                                    <td><UserNameView sub={val.ownerSub} /></td>
                                                                    <td><UserNumberView sub={val.ownerSub} /></td>
                                                                    <td>{textParser(val.sowing_date)}</td>
                                                                    <td>{textParser(val.seed_brand)}</td>
                                                                    <td>{textParser(val.planting_mode)}</td>
                                                                    <td>{textParser(val.weeding_mode)}</td>
                                                                    <td>{textParser(val.harvest_cutting_mode)}</td>
                                                                    <td>{textParser(val.fertilizer)}</td>
                                                                    <td>{textParser(val.pesticide)}</td>
                                                                    <td>{textParser(val.prev_seed_packets)}</td>
                                                                    <td>{"INR " + textParser(val.prev_seed_price)}</td>
                                                                    <td>{textParser(val.prev_num_labour)}</td>
                                                                    <td>{"INR " + textParser(val.prev_labour_charge)}</td>
                                                                    <td>{textParser(val.prev_machine_charge)}</td>
                                                                    <td>{textParser(val.prev_fertilizer_packets)}</td>
                                                                    <td>{"INR " + textParser(val.prev_fertilizer_charge)}</td>
                                                                    <td>{textParser(val.prev_pesticide_packets)}</td>
                                                                    <td>{"INR " + textParser(val.prev_pesticide_charge)}</td>
                                                                    <td>{textParser(val.comments)}</td>
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
                </div>
            </>
        );
    }
}

export default HarvestTable;
