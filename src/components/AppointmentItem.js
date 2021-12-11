import React from 'react'

function AppointmentItem(props) {
    var parts = props.data.date.slice(0, -1).split("T");
    var dateComponent = parts[0];

    return (
        <div className="upcoming_appointment_tile">
            <div className="upcoming_patient_details">
                <div
                    className="upcoming_patient_image"
                    style={{
                        backgroundImage:
                            `url('${props.data.patientPhoto}')`,
                    }}
                ></div>
                <div className="upcoming_patient_subdetail">
                    <div className="upcoming_patient_name">{props.data.patientName}</div>
                    <div className="upcoming_patient_time">{props.data.time}</div>
                </div>
            </div>
            <div className="upcoming_patient_date">{dateComponent}</div>
        </div>
    )
}

export default AppointmentItem
