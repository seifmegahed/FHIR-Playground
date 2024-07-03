import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Patient } from "fhir/r4";
import { getPatient } from "../../../server/patient";

import Loader from "../../../components/Loader";
import SectionTitle from "../../../components/SectionTitle";
import GeneralPractitionerUpdateSection from "./GeneralPractitionerUpdateSection";
import PatientGeneralDetailsSection from "./PatientGeneralDetailsSection";

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

  const generalPractitioner = patient.generalPractitioner ? [0] : null;

  return (
    <>
      <SectionTitle title="Patient" />
      <div className="flex-grow w-full bg-white m-10 rounded-2xl p-10">
        <div className="grid md:grid-cols-2 gap-4 w-full">
          <PatientGeneralDetailsSection patient={patient} />
          <div className="flex flex-col gap-2">
            <p>
              <strong>General Practitioner: </strong>
              {generalPractitioner || "None"}
            </p>
          </div>
          <GeneralPractitionerUpdateSection />
        </div>
      </div>
    </>
  );
}
