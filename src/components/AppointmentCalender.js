import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Scheduler,
  WeekView,
  MonthView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";
import { collection, onSnapshot } from "@firebase/firestore";
import { auth, firestore } from "../firebase";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { ViewState } from "@devexpress/dx-react-scheduler";

const ExternalViewSwitcher = ({ currentViewName, onChange }) => (
  <RadioGroup
    aria-label="Views"
    style={{ flexDirection: "row" }}
    name="views"
    value={currentViewName}
    onChange={onChange}
  >
    <FormControlLabel value="Work Week" control={<Radio />} label="Work Week" />
    <FormControlLabel value="Month" control={<Radio />} label="Month" />
  </RadioGroup>
);

function AppointmentCalender() {
  const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(" ");

    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM" || modifier === "pm") {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  };

  const getEndTime = (time12h) => {
    const [time, modifier] = time12h.split(" ");

    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM" || modifier === "pm") {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours + 1}:${minutes}`;
  };
  const [loading, setLoading] = useState(true);

  const [patient, setPatient] = useState([]);
  auth.onAuthStateChanged(function (user) {
    if (user && loading) {
      const collectionref = collection(
        firestore,
        "doctors",
        auth.currentUser.uid,
        "appointments"
      );
      onSnapshot(collectionref, (snapshot) => {
        const pat = snapshot.docs.map((doc) => {
          return doc.data();
        });

        setPatient(pat);
        var temp = [];
        pat.forEach((item) => {
          var parts = item.date.slice(0, -1).split("T");
          var dateComponent = parts[0];
          var time = convertTime12to24(item.time);
          var endTime = getEndTime(item.time);

          console.log(time);

          temp.push({
            startDate: dateComponent + "T" + time,
            endDate: dateComponent + "T" + endTime,
            title: "Appointment By " + item.patientName,
          });
        });
        setSchedulerData(temp);
        console.log(schedulerData);
      });
      setLoading(false);
    }
  });

  const [currentViewName, currentViewNameChangeHandler] = useState("Month");
  const [schedulerData, setSchedulerData] = useState([]);
  const currentViewNameChange = (e) => {
    currentViewNameChangeHandler(e.target.value);
  };

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + "-" + mm + "-" + yyyy;

  return (
    <>
      <ExternalViewSwitcher
        currentViewName={currentViewName}
        onChange={currentViewNameChange}
      />
      <Paper>
        <Scheduler data={schedulerData} height={600}>
          <ViewState
            defaultCurrentDate={today}
            currentViewName={currentViewName}
          />
          <WeekView startDayHour={10} endDayHour={19} />
          <WeekView
            name="Work Week"
            excludedDays={[0, 6]}
            startDayHour={9}
            endDayHour={19}
          />
          <MonthView />

          <Appointments />
          <AppointmentTooltip showCloseButton showOpenButton />
          <AppointmentForm readOnly />
        </Scheduler>
      </Paper>
    </>
  );
}

export default AppointmentCalender;
