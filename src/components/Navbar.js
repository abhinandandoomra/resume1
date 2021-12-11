import TableChartIcon from "@mui/icons-material/TableChart";
import { ExitToApp, Message } from "@material-ui/icons";
import {
  MedicalServices,
  MessageOutlined,
  NoteAddOutlined,
} from "@mui/icons-material";
import { Button } from "@material-ui/core";
import TodayIcon from "@mui/icons-material/Today";
import Person from "@mui/icons-material/Person";
import { useState, useEffect } from "react";
import { doc, getDoc } from "@firebase/firestore";
import { useHistory } from "react-router";
import { auth } from "../firebase";
import { firestore } from "../firebase";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [doctor, setDoctor] = useState({});
  const [loading, setLoading] = useState(true);
  auth.onAuthStateChanged(function (user) {
    if (user && loading) {
      if (auth.currentUser != null) {
        const docRef = doc(firestore, "doctors", auth.currentUser.uid);
        const docSnap = getDoc(docRef);
        docSnap.then((doc) => {
          setDoctor(doc.data() ? doc.data() : {});
          console.log("change");
        });
        setLoading(false);
      }
    }
  });

  const history = useHistory();

  const handleSignout = () => {
    auth.signOut().then(() => {
      history.push("/sign");
    });
  };
  return (
    <div className="nav_container">
      <div className="doctor_profile_container">
        <div
          className="doctor_profile_image"
          style={{
            backgroundImage: `url('${doctor.imageUrl}')`,
          }}
        ></div>
        <div className="doctor_name">
          {" "}
          {loading ? "Loading.." : `Dr.${doctor.name}`}
        </div>
        <div className="doctor_speciality">
          {loading ? "Loading.." : doctor.speciality}
        </div>
      </div>

      <div className="nav_links">
        <NavLink
          className="nav_link"
          exact
          activeStyle={{ color: "#0099ff" }}
          to="/"
        >
          <TableChartIcon /> Dashboard
        </NavLink>

        <NavLink
          className="nav_link"
          activeStyle={{ color: "#0099ff" }}
          to="/calender"
        >
          <TodayIcon /> Schedule
        </NavLink>

        <a className="nav_link">
          <Person /> Patient
        </a>
        <a className="nav_link">
          <Message /> Messages
        </a>
        <a className="nav_link">
          <MedicalServices /> Medicines
        </a>
      </div>
      <a className="logout" onClick={handleSignout}>
        <ExitToApp /> Logout
      </a>
    </div>
  );
}

export default Navbar;
