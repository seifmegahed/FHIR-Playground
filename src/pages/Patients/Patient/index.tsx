import Loader from "../../../components/Loader";
import { useEffect, useState } from "react";
import { Patient } from "fhir/r4";
import { getPatient } from "../../../server/patient";
import { useParams } from "react-router-dom";

export default function PatientPage() {
  const [patient, setPatient] = useState<Patient>();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    getPatient(id).then((res) => {
      setPatient(res);
      console.log(res);
    });
  }, [id]);

  if (!patient) return <Loader />;

  return <div>Patient</div>;
}
