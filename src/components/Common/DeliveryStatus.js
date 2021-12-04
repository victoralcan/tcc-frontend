import React from "react";

const DeliveryStatus = (props) => {
  return props.status === "Pickup" ? (
    <div className="badge badge-soft-success font-size-12 px-2">
      Retirada
    </div>
  ) : props.status === "Deliver" ? (
    <div className="badge badge-soft-primary font-size-12 px-2">
      Entrega
    </div>
  ) : (
    <div className="badge badge-soft-dark font-size-12 px-2">
      {props.status}
    </div>
  );
};
export default DeliveryStatus;
