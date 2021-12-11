import Person from "@mui/icons-material/Person";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AppointmentGrid from "./AppointmentGrid";
function StatsGrid() {
  return (
    <>
      <div className="stats_grid">
        <div className="stats_card">
          <div className="stats_card_icon">
            <Person />
          </div>
          <div className="stats_details">
            <div className="stats_card_title">Patients</div>
            <div className="stats_card_number">666</div>
          </div>
        </div>

        <div className="stats_card">
          <div className="stats_card_icon">
            <Person />
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
            <div className="stats_card_title">Appointments</div>
            <div className="stats_card_number">201</div>
          </div>
        </div>

        <div className="stats_card " style={{ marginRight: 0 }}>
          <div className="stats_card_icon stats_card_icon-heart">
            <FavoriteBorderIcon />
          </div>
          <div className="stats_details">
            <div className="stats_card_title">Treatments</div>
            <div className="stats_card_number">510</div>
          </div>
        </div>
      </div>
      <div className="stats_grid">
        <AppointmentGrid
          title="APPOINTMENTS"
          left="124"
          right="86%"
          data={[10, 20, 50, 30, 70, 50, 73, 30, 80, 30, 10]}
          color={["#F44336"]}
          dash="2"
        />
        <AppointmentGrid
          title="NEW PATIENTS"
          left="-98"
          right="145%"
          data={[-10, -20, -50, -30, -70, -50, -73, -30, -80, -30, -10]}
          color={["#2CD889"]}
          rev={true}
        />
        <AppointmentGrid
          title="TODAYS OPT"
          left="48"
          right="91%"
          data={[10, 20, 50, 30, 70, 50, 73, 30, 80, 30, 10]}
          color={["#2CD889"]}
        />
        <AppointmentGrid
          title="APPOINTMENTS"
          left="124"
          right="86%"
          data={[10, 20, 50, 30, 70, 50, 73, 30, 80, 30, 10]}
          color={["#F44336"]}
          dash="2"
        />
      </div>
    </>
  );
}

export default StatsGrid;
