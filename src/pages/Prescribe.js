import React, { useState } from "react";

import Medicine from "../components/Medicine";
import "../styles/Prescribe.css";

import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import { TextareaAutosize } from "@mui/core";
import { Button, FormControl } from "@material-ui/core";
import { Input, List, ListItem, ListItemText, Modal, TextField } from "@mui/material";


import "../styles/newdash.css";

import Navbar from "../components/Navbar";
import { auth, firestore } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";

function Prescribe() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  const [edit, setEdit] = useState("");
  const [open, setOpen] = useState(false);
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

  const addMed = (e) => {
    console.log(e);
    e.preventDefault();
    setList([input, ...list]);
    setInput("");
  };

  const handleDelete = (item) => {
    const filterArray = list.filter(data => data !== item)
    console.log(filterArray);
    setList(filterArray);
  }

  const updateMed = (item) => {
    const mappedArray = list.map((data) => {
      if (data === item)
        data = edit;
      return data;
    })
    setList(mappedArray);
    setEdit('');
    setOpen(false);
  }

  const handleClose = () => {
    setEdit("");
    setOpen(false);
  };

  return (
    <>

      <div className="newdash">
        <Navbar />
        <div className="main_container">
          <div className="prescribe__container">
            <div className="appointmentid">
              <div className="appointmentid_heading">Appointment Id </div>
              <div className="appointmentid_id"> - {patient[0] && patient[0].patientId}</div>
            </div>

            <div className="prescribe__info">
              <div className="prescribe__infodata">
                <img
                  className="prescribe__infodataImg"
                  src={patient[0] && patient[0].patientPhoto}
                  alt=""
                />
                <div className="prescribe__infodataleft">
                  <div className="prescribe__Name"> {patient[0] && patient[0].patientName}</div>
                  <div className="prescribe__email prescribe__iconcenter">
                    <div className="prescribe__iconcenter_icon">
                      <EmailIcon />
                    </div>
                    {patient[0] && patient[0].patientEmail}
                  </div>
                  <div className="prescribe__phone prescribe__iconcenter">
                    <div className="prescribe__iconcenter_icon">
                      <PhoneIcon />
                    </div>
                    {patient[0] && patient[0].patientNumber}
                  </div>
                  <div className="prescribe__address prescribe__iconcenter">
                    <div className="prescribe__iconcenter_icon">
                      <HomeIcon />
                    </div>
                    {patient[0] && patient[0].patientAddress}
                  </div>
                </div>
                {/* <div className="infodataright">
                              <div>
                                  <div>AGE</div>
                                  <div>23Yrs</div>
                              </div>
                              <div>
                                  <div>SEX</div>
                                  <div>MALE</div>
                              </div>
                              <div>
                                  <div>WEIGHT</div>
                                  <div>76 Kg</div>
                              </div>
                              <div>
                                  <div>HEIGHT</div>
                                  <div>175 cm</div>
                              </div>
                          </div> */}
              </div>
              {/* <div className="prescribe__infodate">16 NOV 2020</div> */}
            </div>
            <div className="prescribe__centercontainer">
              <div className="prescribe__medicine">
                <h3>Prescription</h3>
                <form>
                  <div className="medicine-form">
                    <FormControl>
                      <TextField
                        className="inputMed"
                        type="text"
                        id="outlined-basic"
                        label="Add Medicine"
                        variant="outlined"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                      />
                    </FormControl>
                  </div>
                  {list.map((item, id) => (
                    // <Medicine item={item} />
                    <>

                      <Modal open={open} onClose={handleClose}>
                        <div >
                          <h1>EDIT MEDICINE</h1>
                          <p>Recent MEDICINE: <b>{item}</b></p>
                          <Input placeholder={item} value={edit} onChange={event => setEdit(event.target.value)} />
                          <Button variant="contained" color="primary" size="small" disabled={!edit} onClick={(e) => updateMed(item)}>Update Medicine</Button>
                          <CloseIcon color="secondary" fontSize="large" onClick={handleClose} />
                        </div>
                      </Modal>
                      <List key={id} className="med_list">
                        <ListItem>
                          <ListItemText primary={item} />
                          <div>
                            <Button className="edit-btn" color="primary" variant="contained" onClick={e => setOpen(true)}>
                              EDIT
                            </Button>
                            <DeleteIcon
                              className="delete-btn"
                              cursor="pointer"
                              color="secondary"
                              onClick={() => handleDelete(item)}
                            />
                          </div>
                        </ListItem>
                      </List>
                    </>
                  ))}
                  <Button
                    className="addMedicineBtn"
                    type="submit"
                    disabled={!input}
                    variant="contained"
                    onClick={addMed}
                  >
                    ADD MEDICINE
                  </Button>
                </form>
              </div>
              <div className="prescribe__remarks">
                <h3>Comments</h3>

                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={10}
                  placeholder="Add Your Remarks"
                  style={{ width: "40em", height: "320px" }}
                />
              </div>
            </div>
            <Button className="submit_prescription_button" variant="contained" disabled={!list}>
              Submit Priscription
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Prescribe;
