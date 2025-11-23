import React from "react";
import "../styles/Doctors.css";
import { doctorsData } from "../data/DoctorsList";
import DoctorCard from "../components/DoctorCard";

const Doctors = () => {
  return (
    <div className="page doctors-page">
      <h1>Our Doctors</h1>
      <p>Meet our medical professionals.</p>

      <div className="doctor-cards">
        {doctorsData.map((doc) => (
          <DoctorCard key={doc.id} doctor={doc} />
        ))}
      </div>
    </div>
  );
};

export default Doctors;
