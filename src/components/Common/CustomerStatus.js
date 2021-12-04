import React from "react";

const CustomerStatus = (props) => {

  return (
    props.status === 'Ativo' ?
      <div className="badge badge-soft-success font-size-12 px-2">{props.status}</div>
    :
    props.status === 'Inativo' ?
      <div className="badge badge-soft-danger font-size-12 px-2">{props.status}</div>
    :
      <div className="badge badge-soft-dark font-size-12 px-2">{props.status}</div>
  )

}
export default CustomerStatus;