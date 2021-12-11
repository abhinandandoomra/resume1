import React from "react";
import "../styles/AppointmentCard.css";

import HomeIcon from "@mui/icons-material/Home";
import { Button } from "@mui/material";

function AppointmentCard() {
  return (
    <div
      className="appointment-card"
      style={{ background: "#FFF", borderRadius: "10px" }}
    >
      <div className="card-title">UPCOMING APOOINTMENT</div>
      <div className="card-body">
        <div className="card-top">
          <div className="cardtop-left">
            <img
              className="cardtop-leftImg"
              src="https://i2-prod.manchestereveningnews.co.uk/sport/article21284985.ece/ALTERNATES/s1200c/0_GettyImages-1333254883.jpg"
            />
          </div>
          <div className="cardtop-right">
            <div className="card-name">
              <h3>DEEPAK SINGH</h3>
            </div>
            <div className="card-describe">Nov 14, 2021</div>
            <div className="card-describe">12:00 PM</div>
            <Button variant="contained">Details</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentCard;
