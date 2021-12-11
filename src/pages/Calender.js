import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppointmentCalender from "../components/AppointmentCalender";
import Person from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import "../styles/newdash.css";

import Navbar from "../components/Navbar";
import StatsGrid from "../components/Stats_grid";
import { AttachMoneyOutlined, CancelPresentation } from "@mui/icons-material";

function Calender() {
  return (
    <>
      <div className="newdash">
        <Navbar />
        <div className="main_container calender_container">
          <div className="calender_heading">
            <h2>Your Schedule for November</h2>
            <div className="stats_grid">
              <div className="stats_card">
                <div className="stats_card_icon">
                  <Person />
                </div>
                <div className="stats_details">
                  <div className="stats_card_title"> Appointments</div>
                  <div className="stats_card_number">23</div>
                </div>
              </div>

              <div className="stats_card">
                <div className="stats_card_icon">
                  <AttachMoneyOutlined />
                </div>
                <div className="stats_details">
                  <div className="stats_card_title">Income</div>
                  <div className="stats_card_number">RS.22000</div>
                </div>
              </div>

              <div className="stats_card">
                <div className="stats_card_icon stat_card_icon-cal">
                  <CalendarTodayIcon />
                </div>
                <div className="stats_details">
                  <div className="stats_card_title">Done</div>
                  <div className="stats_card_number">11</div>
                </div>
              </div>

              <div className="stats_card " style={{ marginRight: 0 }}>
                <div className="stats_card_icon stats_card_icon-heart">
                  <CancelPresentation />
                </div>
                <div className="stats_details">
                  <div className="stats_card_title">Canceled</div>
                  <div className="stats_card_number">3</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <AppointmentCalender />
          </div>
        </div>
      </div>
    </>
  );
}

export default Calender;
