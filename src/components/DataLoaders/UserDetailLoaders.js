import React, { useState, useEffect } from "react";

import { MoonLoader } from "react-spinners";

import { getUser } from "utilities/dbOps";
import textParser from "utilities/TextParser";

export function UserNameView(props) {
  const [ownerName, setOwnerName] = useState(-1);

  useEffect(() => {
    getUser(props.sub)
      .then(res => {
        setOwnerName(res.fullName);
      })
      .catch(err => {
        console.log(err);
        setOwnerName(-2);
      })
  }, []);

  if (ownerName === -2) {
    return (<span className="text-error">err</span>);
  } else if (ownerName === -1) {
    return (
      <div className="d-inline-block text-center">
        <MoonLoader color="#1d8cf8" size="12px" />
      </div>
    );
  } else return (<span>{textParser(ownerName)}</span>);
}

export function UserNumberView(props) {
  const [ownerNumber, setOwnerNumber] = useState(-1);

  useEffect(() => {
    getUser(props.sub)
      .then(res => {
        setOwnerNumber(res.phone_number);
      })
      .catch(err => {
        console.log(err);
        setOwnerNumber(-2);
      })
  }, []);

  if (ownerNumber === -2) {
    return (<span className="text-error">err</span>);
  } else if (ownerNumber === -1) {
    return (
      <div className="d-inline-block text-center">
        <MoonLoader color="#1d8cf8" size="12px" />
      </div>
    );
  } else return (<span>{textParser(ownerNumber)}</span>);
}

export default {
  UserNameView,
  UserNumberView,
}