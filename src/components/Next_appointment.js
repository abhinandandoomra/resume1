import {
  MedicalServices,
  MessageOutlined,
  NoteAddOutlined,
} from "@mui/icons-material";
import { Button } from "@material-ui/core";
import { useState } from "react";
import { auth, firestore } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { useHistory } from "react-router";


function NextAppointment() {

  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState([]);
  const history = useHistory();

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

  const dateSplit = (item) => {
    var parts = item.slice(0, -1).split("T");
    var dateComponent = parts[0];
    return dateComponent;
  }

  const handlePrescribe = () => {
    history.push('/prescribe')
  }


  return (
    <div className="appointment_grid_item next">
      <div className="appointment_gird_heading">Next Appointment</div>
      <div className="appointmentGrid_card next_appointment">
        <div>
          <div className="next_appointment_patient_details">
            <div
              className="next_appointment_patient_image"
              style={{
                backgroundImage:
                  `url('${patient[0] && patient[0].patientPhoto}')`,
              }}
            ></div>
            <div className="next_appointment_patient_subdetails">
              <div className="next_appointment_patient_name">
                {patient[0] && patient[0].patientName}
              </div>
              <div className="next_appointment_patient_date">{patient[0] && dateSplit(patient[0].date)}</div>
              <div className="next_appointment_patient_time">{patient[0] && patient[0].time}</div>
            </div>
          </div>
          <div className="next_appointment_age_symptom_container">
            <div className="next_appointment_patient_symptoms">
              <div className="next_appointment_patient_symptoms_heading">
                Symptoms
              </div>
              <ul className="next_appointment_patient_symptoms_list">
                <li>Headache</li>
                <li>Cold</li>
                <li>Mild Fever</li>
              </ul>
            </div>

            <div className="next_appointment_age_details">
              <div className="next_appointment_age_tile">
                <div className="age_heading">Age : </div>
                <div className="age_value">{patient[0] && patient[0].patientAge}</div>
              </div>
              <div className="next_appointment_age_tile">
                <div className="age_heading">Sex : </div>
                <div className="age_value">{patient[0] && patient[0].patientAddress}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="next_appointment_buttons">
          <Button className="prescribe" variant="contained" onClick={() => handlePrescribe()}>
            <NoteAddOutlined /> Prescribe
          </Button>
          <Button className="chat" variant="outlined">
            <MessageOutlined /> Chat
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NextAppointment;
