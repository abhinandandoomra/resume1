import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { auth, firestore } from "../firebase";
import AppointmentItem from "./AppointmentItem";

function UpcomingAppointmnetList() {
  const [loading, setLoading] = useState(true);

  const [patient, setPatient] = useState([]);
  auth.onAuthStateChanged(function (user) {
    if (user && loading) {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      today = mm + "/" + dd + "/" + yyyy;
      var todayDate = new Date(today);
      var temp = [];
      const collectionref = collection(
        firestore,
        "doctors",
        auth.currentUser.uid,
        "appointments"
      );
      const q = query(collectionref, orderBy("date"));
      onSnapshot(q, (snapshot) => {
        const pat = snapshot.docs.map((doc) => {
          return doc.data();
        });

        pat.forEach((item) => {
          var parts = item.date.slice(0, -1).split("T");
          var dateComponent = parts[0];
          var datee = new Date(dateComponent);
          if (todayDate.getTime() <= datee.getTime()) {
            temp.push(item);
          }
        });
        console.log(temp);
        setPatient(temp);
      });
      setLoading(false);
    }
  });

  return (
    <div className="appointment_grid_item upcoming">
      <div className="appointment_gird_heading">Upcoming Appointments</div>
      <div className="appointmentGrid_card upcoming">
        {patient.map((item) => (
          <AppointmentItem data={item} />
        ))}

        {/* <div className="upcoming_appointment_tile">
          <div className="upcoming_patient_details">
            <div
              className="upcoming_patient_image"
              style={{
                backgroundImage:
                  "url('https://i1.sndcdn.com/artworks-000355196283-xf1753-t500x500.jpg')",
              }}
            ></div>
            <div className="upcoming_patient_subdetail">
              <div className="upcoming_patient_name">Deepak Singh</div>
              <div className="upcoming_patient_time">12:26 PM</div>
            </div>
          </div>
          <div className="upcoming_patient_date">12 JUN</div>
        </div>

        <div className="upcoming_appointment_tile">
          <div className="upcoming_patient_details">
            <div
              className="upcoming_patient_image"
              style={{
                backgroundImage:
                  "url('https://i1.sndcdn.com/artworks-000355196283-xf1753-t500x500.jpg')",
              }}
            ></div>
            <div className="upcoming_patient_subdetail">
              <div className="upcoming_patient_name">Deepak Singh</div>
              <div className="upcoming_patient_time">12:26 PM</div>
            </div>
          </div>
          <div className="upcoming_patient_date">12 JUN</div>
        </div>

        <div className="upcoming_appointment_tile">
          <div className="upcoming_patient_details">
            <div
              className="upcoming_patient_image"
              style={{
                backgroundImage:
                  "url('https://i1.sndcdn.com/artworks-000355196283-xf1753-t500x500.jpg')",
              }}
            ></div>
            <div className="upcoming_patient_subdetail">
              <div className="upcoming_patient_name">Deepak Singh</div>
              <div className="upcoming_patient_time">12:26 PM</div>
            </div>
          </div>
          <div className="upcoming_patient_date">12 JUN</div>
        </div> */}
      </div>
    </div>
  );
}

export default UpcomingAppointmnetList;
