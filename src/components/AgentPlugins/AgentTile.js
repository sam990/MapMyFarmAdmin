import React, { useState } from "react";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Col,
    Collapse,
    CardSubtitle,
} from "reactstrap";

import AgentDetail from "components/AgentPlugins/AgentDetails";

export default function AgentTile(props) {
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
                        <AgentDetail sub={user.sub} username={user.phone_number} fullName={user.fullName}/>
                    </Collapse>
                </CardBody>
            </Card>
        </Col>
    );
}