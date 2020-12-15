import React, { useState, useEffect } from "react";

import { getUserFarms } from "utilities/dbOps";

import { MoonLoader } from "react-spinners";



export default function UserFarmCountLoader({ sub }) {

  let [farmNumbers, setFarmNumbers] = useState(-1);

  useEffect(() => {
    getUserFarms(sub)
      .then(res => {
        setFarmNumbers(res.length);
      })
      .catch(err => {
        console.log(err);
        setFarmNumbers(-2);
      })
  }, []);

  if (farmNumbers === -1) {
    return (
      <div className="d-inline-block">
        <MoonLoader color="#1d8cf8" size="12px" />
      </div>
    );
  } else if (farmNumbers === -2) {
    return (<span className="text-error">err</span>);
  } else {
    return (<span>{farmNumbers}</span>);
  }
}
