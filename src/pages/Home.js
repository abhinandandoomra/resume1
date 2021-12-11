import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppointmentGrid from "../components/AppointmentGrid";
import OverviewGraph from "../components/OverviewGraph";
import AppointmentCard from "../components/AppointmentCard";
import Patient from "../components/Patient";
import { auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { collection, onSnapshot } from "@firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Alert } from "@mui/material";

const GridStyle = {
  backgroundColor: "#FFF",
  borderRadius: "10px",
  padding: "10px",
};

function Home() {
  var fireInit = false;
  const [patient, setPatient] = useState([]);

  useEffect(() => {
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
    });
    if (auth.currentUser != null) {
      const docRef = doc(firestore, "doctors", auth.currentUser.uid);
      const docSnap = getDoc(docRef);
      docSnap.then((doc) => {
        setPhone(doc.data() ? doc.data().phone : "Not Given");
        setName(doc.data() ? doc.data().name : "Not Given");
        console.log(phone);
      });
    }
  }, []);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const unsub = onSnapshot(
    collection(
      firestore,
      "doctors",
      "IQxpC1vhUodopipW3sBTwkgrNNG3",
      "appointments"
    ),
    (doc) => {
      if (!fireInit) {
        fireInit = true;
        return;
      }
      console.log("hello");
      if (doc.docChanges()[0].type === "added") {
        toast(
          `New appointment by ${doc.docChanges()[0].doc.data()["patientName"]}`
        );
      }
    }
  );

  return (
    <div className="home">
      <ToastContainer />
      <Header />
      <div className="home__body">
        <div className="home__uppergrid">
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
          <AppointmentCard />
        </div>
        <div className="home__middlegrid">
          <div style={GridStyle} className="home__bookinfo">
            {/* logo */}
            <img
              className="home__profile"
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="profile"
            />
            <h3>{name}</h3>
            <h5 style={{ color: "#2CD889" }}>{auth.currentUser?.email}</h5>
            <h3>{phone}</h3>
            {/* <button className="home__bookButton">Book Appointment</button> */}
            <div className="personal-info">
              <div className="home__rc home__r1c1">Age:</div>
              <div className="home__rc home__r1c2">34Yrs</div>
              <div className="home__rc home__r1c3">Height: </div>
              <div className="home__rc home__r1c4">184cm</div>
              <div className="home__rc home__r2c1">Weight: </div>
              <div className="home__rc home__r2c2">64Kg</div>
              <div className="home__rc home__r2c3">Fat: </div>
              <div className="home__rc home__r2c4">15.4%</div>
            </div>
          </div>

          <div style={GridStyle} className="home__survey">
            <div>HOSPITAL SURVEY</div>
            {/* graph */}
          </div>
          <div style={GridStyle} className="home__overview">
            <h4 className="grid-head">APPOINTMENT OVERVIEW</h4>
            {/* chart */}
            <OverviewGraph height="100" width="300" />
          </div>
        </div>
        <div className="home__lowergrid">
          <div style={GridStyle} className="home__patientList">
            <h4 className="grid-head">UPCOMING PATIENTS</h4>
            {/* TABLE */}
            {patient.map((item) => (
              <Patient data={item} />
            ))}
          </div>
          <div style={GridStyle} className="home__recentVisit">
            <h4 className="grid-head">RECENT VISITS</h4>
            {patient.map((item) => (
              <Patient data={item} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
