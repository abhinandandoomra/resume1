import React from "react";
import Graph from "../components/Graph";
import "../styles/AppointmentGrid.css";

function AppointmentGrid(props) {
  return (
    <div
      style={{ background: "#FFF", borderRadius: "10px" }}
      className="appointmentGrid"
    >
      <div className="appointmentGrid__Top" style={{ color: props.color }}>
        <div className="appointmentGrid__TopLeft" style={{ fontSize: "24px" }}>
          {props.left}
        </div>
        <div className="appointmentGrid__TopRight">{props.right}</div>
      </div>
      <div className="appointmentGrid__Middle">{props.title}</div>
      <div className="appointmentsGrid__Lower">
        {/* graph */}
        <Graph
          height="80"
          width="330"
          data={props.data}
          color={props.color}
          dash={props.dash}
          rev={props.rev}
        />
      </div>
    </div>
  );
}

export default AppointmentGrid;
