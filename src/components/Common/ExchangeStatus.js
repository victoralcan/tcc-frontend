import React from "react";

const ExchangeStatus = (props) => {
  return props.status === "Returned" ? (
    <div className="badge badge-soft-success font-size-12 px-2">
      Retornado
    </div>
  ) : props.status === "Ongoing" ? (
    <div className="badge badge-soft-warning font-size-12 px-2">
      Com a cliente
    </div>
  ) : props.status === "Pending" ? (
    <div className="badge badge-soft-info font-size-12 px-2">
      Pendente
    </div>
  ) : props.status === "Awaiting Shipment" ? (
    <div className="badge badge-soft-info font-size-12 px-2">
      Aguardando Envio
    </div>
  ) : props.status === "Awaiting Pickup" ? (
    <div className="badge badge-soft-info font-size-12 px-2">
      Aguardando Retirada
    </div>
  ) : props.status === "New" ? (
    <div className="badge badge-soft-primary font-size-12 px-2">
      Novo
    </div>
  ) : props.status === "Canceled" ? (
    <div className="badge badge-soft-danger font-size-12 px-2">
      Cancelado
    </div>
  ) : (
    <div className="badge badge-soft-dark font-size-12 px-2">
      {props.status}
    </div>
  );
};
export default ExchangeStatus;
