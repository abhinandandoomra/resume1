import React from "react";
import "../styles/patient.css";
function Patient(props) {
  var parts = props.data.date.slice(0, -1).split("T");
  var dateComponent = parts[0];
  return (
    <div className="patient-tile">
      <div className="patient-img">
        <img src={props.data.patientPhoto} className="patient__img" />
      </div>
      <div className="patientdoc">
        <div className="patient-name">{props.data.patientName}</div>
        <div className="date">{dateComponent}</div>
        <div className="time">{props.data.time}</div>
      </div>
      <div className="date-time">
        <div className="patient-detail">{props.data.patientNumber}</div>
        <div className="patient-detail">{props.data.patientEmail}</div>
      </div>
      <div className="patientId">
        <div className="id">Patient ID</div>
        <div className="id_num">{props.data.patientId}</div>
      </div>
    </div>
  );
}

export default Patient;
