import React from "react";


// reactstrap components
import { Button } from "reactstrap";


import textParser from "utilities/TextParser";

import { UserNameView, UserNumberView } from "components/DataLoaders/UserDetailLoaders";


export default function FarmDetailsPopupView(props) {
  const { farm } = props;
  const sub = farm.ownerSub;

  return (
    <div className="d-flex flex-column justify-content-start align-items-center text-white popup-container">
      <span className="py-1"><strong>FARM ID: {farm.farmID}</strong></span>
      <span className="py-1">Owner Name: <strong><UserNameView sub={sub} /></strong></span>
      <span className="py-1">Owner Number: <strong><UserNumberView sub={sub} /></strong></span>
      <span className="py-1">Area: <strong>{farm.area + " acres"}</strong></span>
      <span className="py-1">Locale: <strong>{textParser(farm.locale)}</strong></span>
      <span className="py-1">Land Type: <strong>{textParser(farm.land_type)}</strong></span>
      <Button style={{ overflow: "visible" }} color="link" className="pt-4 text-info" onClick={() => props.openHarvestsPopup(farm)}><span>Open Associated Harvests</span></Button>
    </div>
  );
}