import React from "react";

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button } from "reactstrap";

import { PuffLoader } from "react-spinners";

import textParser from "utilities/TextParser";

import { UserNameView, UserNumberView } from "components/DataLoaders/UserDetailLoaders";





export default function FarmsTableView(props) {
  const { farms, loading } = props;

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Farms Details</CardTitle>
                {/* <p className="category">Well</p> */}
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>FarmID</th>
                      <th>Owner Name</th>
                      <th>Owner Number</th>
                      <th>Area</th>
                      <th>Locale</th>
                      <th>Land Type</th>
                      <th>View Harvests</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      loading ? (
                        <tr key="0">
                          <td colSpan="7" className="text-center">
                            <div style={{ display: "inline-block" }}>
                              <PuffLoader color="#1d8cf8" />
                            </div>
                          </td>
                        </tr>
                      ) : (
                          farms.map(
                            val => (
                              <tr key={val.id}>
                                <td>{val.farmID}</td>
                                <td><UserNameView sub={val.ownerSub} /></td>
                                <td><UserNumberView sub={val.ownerSub} /></td>
                                <td>{val.area + " acres"}</td>
                                <td>{textParser(val.locale)}</td>
                                <td>{textParser(val.land_type)}</td>
                                <td className="text-center">
                                  <Button color="link" onClick={() => props.openHarvestsPopup(val)}>
                                    <i className="tim-icons icon-minimal-down" />
                                  </Button>
                                </td>
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