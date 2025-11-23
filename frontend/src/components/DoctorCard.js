
const DoctorCard = ({ doctor }) => {
  return (
    <div className="card">
      <h3>{doctor.name}</h3>
      <p><b>Specialty:</b> {doctor.specialty}</p>
      <p>{doctor.bio}</p>
    </div>
  );
};

export default DoctorCard;
