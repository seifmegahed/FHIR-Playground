import { Patient } from "fhir/r4";

export default function PatientGeneralDetailsSection(props: {patient: Patient}) {
  const { patient } = props;
  return (
    <>
      <div className="col-span-2">
        <div className="flex justify-between text-2xl font-bold mb-3">
          <h1>{patient.name![0].given![0] + " " + patient.name![0].family}</h1>
          <h1>{patient.address![0].city}</h1>
        </div>
        <hr></hr>
      </div>
      <div className="flex flex-col gap-2">
        <p>
          <strong>ID: </strong>
          {patient.id}
        </p>
        <p>
          <strong>Date of Birth: </strong>
          {patient.birthDate}
        </p>
        <p>
          <strong>Gender: </strong>
          {patient.gender}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p>
          <strong>Address: </strong>
          {patient.address![0].city + ", " + patient.address![0].country}
        </p>
        <p>
          <strong>Phone Number: </strong>
          {patient.telecom![0].value}
        </p>
        <p>
          <strong>Email: </strong>
          {patient.telecom![1].value}
        </p>
      </div>
    </>
  );
}