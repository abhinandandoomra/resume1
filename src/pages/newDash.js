import "../styles/newdash.css";

import UpcomingAppointmnetList from "../components/Upcoming_appointment_list";
import NextAppointment from "../components/Next_appointment";
import Navbar from "../components/Navbar";
import StatsGrid from "../components/Stats_grid";
const NewDash = () => {
  return (
    <>
      <div className="newdash">
        <Navbar />
        <div className="main_container">
          <div className="main_container_heading">Dashboard</div>
          <StatsGrid />

          <div className="appointment_gird 1">
            <UpcomingAppointmnetList />

            <NextAppointment />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewDash;
